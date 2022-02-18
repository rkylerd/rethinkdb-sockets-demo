import r, { ConnectionOptions, Connection } from 'rethinkdb';

const options: ConnectionOptions = {
    host: 'localhost',
    port: 49154,
    db: "test"
};

let connection: Connection | undefined;
export const getConnection = async () => {
    if (connection) return connection;

    r.connect(options, function (err, conn) {
        if (err) {
            console.log('Could not connect to rethinkdb.');
            throw new Error(err.message);
        }

        connection = conn;
        return connection;
    });
};