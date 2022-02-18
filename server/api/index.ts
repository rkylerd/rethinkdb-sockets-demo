import { Router } from 'express';
import { playlist } from './playlist';
import { song } from './song';

export const getApiRoutes = (io: any) => {
    const router = Router();

    router.use('/playlist', playlist(io));
    router.use('/song', song());

    return router;
};