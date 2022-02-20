import { Request, Response } from 'express';
import r, { Connection, ConnectionOptions } from 'rethinkdb';

// docker run -d -P --name rethink1 rethinkdb
const options: ConnectionOptions = {
    host: 'localhost',
    port: 49154,
    // 0.0.0.0:49163->28015
    db: "ijams"
};

let connection: Connection | undefined;
export const getConnection = (io: any) => async (_req: Request, res: Response, next: Function) => {
    if (connection) {
        res.locals.rethinkConnection = connection;
        next();
        return;
    }

    r.connect(options, async (err, conn) => {
        if (err) {
            console.log('Could not connect to rethinkdb.');
            throw new Error(err.message);
        }

        try {
            await r.dbCreate('ijams').run(conn);
            await r.db('ijams').tableCreate('playlist').run(conn);
        } catch (err) {
            console.log("___________Playlist table exists_____________");
        }

        r.db('ijams').table('playlist')
            .changes()
            .run(conn)
            .then((cursor) => {
                cursor.each((err, song) => {
                    if (song.old_val === null) {
                        io.emit('Song:created', song.new_val)
                    } else if (song.new_val !== null) {
                        io.emit('Song:updated', song.new_val)
                    } else {
                        io.emit('Song:deleted', song.old_val.trackId)
                    }
                })
            });
        connection = conn;
        res.locals.rethinkConnection = conn;
        next();
    });
};