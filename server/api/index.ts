import { Router } from 'express';
import { getConnection } from '../db';
import { playlist } from './playlist';
import { song } from './song';

export const getApiRoutes = (io: any) => {
    const router = Router();

    router.use('/playlist', getConnection(io), playlist(io));
    router.use('/song', song());

    return router;
};