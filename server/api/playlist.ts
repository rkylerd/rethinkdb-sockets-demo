import { Router } from 'express';
import r from 'rethinkdb';

export const playlist = (io: any) => {
    const router = Router();

    router.get('/:id', (req, res) => {
        res.sendStatus(200);
    });

    router.get('/', async (_req, res) => {
        const cursor = await r
            .db('ijams')
            .table("playlist")
            .run(res.locals.rethinkConnection);

        const results = await cursor.toArray();
        await cursor.close();

        res.status(200).send(results);
    });

    router.patch('/:id/vote', async (req, res) => {
        const { id } = req.params;
        const trackId = parseInt(id);

        const { direction = "up" } = req.query;
        try {
            if (direction === "down") {
                const cursor = await r.table('playlist')
                    .filter({ trackId })
                    .run(res.locals.rethinkConnection);

                // Don't allow songs to be downvoted past 0 
                if ((await cursor.toArray())?.[0].votes <= 0) {
                    res.sendStatus(204);
                    return;
                }

            }

            await r.table("playlist")
                .filter({ trackId })
                .update({
                    votes: r.row("votes").add(direction === "up" ? 1 : -1)
                })
                .run(res.locals.rethinkConnection);

            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    });

    router.post('/', async (req, res) => {
        const song = req.body;

        if (!song.trackId) {
            res.status(400).send({ message: "Songs must have a trackId" });
            return;
        }

        try {
            const cursor = await r.table('playlist')
                .filter({ trackId: parseInt(song.trackId) })
                .run(res.locals.rethinkConnection);

            // Don't allow songs to be added more than once
            if ((await cursor.toArray()).length) {
                res.sendStatus(201);
                return;
            }

            await r.table("playlist")
                .insert({ ...song, timestamp: Date.now(), votes: 0 })
                .run(res.locals.rethinkConnection);

            res.sendStatus(201);
        } catch (err) {
            res.sendStatus(500);
        }

    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        const trackId = parseInt(id);

        try {
            await r.table("playlist")
                .filter({ trackId })
                .delete()
                .run(res.locals.rethinkConnection);
        } catch (err) {
            // Do nothing.
        }

        res.sendStatus(204);
    });

    return router;
};