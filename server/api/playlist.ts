import { Router } from 'express';
import r, { Connection } from 'rethinkdb';
import { getConnection } from '../db';

export const playlist = (io: any) => {
    const router = Router();

    router.get('/:id', (req, res) => {
        console.log('get by id')

        res.sendStatus(200);
    });

    router.get('/', async (req, res) => {
        console.log('yes baby oh yes')

        const cursor = await r.table("playlist").run(await getConnection() as Connection);
        cursor.each((err, song) => {
            // Send song through socket connection
            if (song.new_val !== null) {
                io.emit('Playlist:update', song.new_val)
            }
        })

        res.sendStatus(200);

        //Whenever someone connects this gets executed
        // io.on('connection', function (socket: any) {
        //     console.log('A user connected');

        //     //Whenever someone disconnects this piece of code executed
        //     socket.on('disconnect', function () {
        //         console.log('A user disconnected');
        //     });
        // });
    });


    router.patch('/:id', (req, res) => {
        console.log('patch by id')

        res.sendStatus(200);
    });

    router.delete('/:id', (req, res) => {
        console.log('delete by id')

        res.sendStatus(200);
    });

    return router;
};