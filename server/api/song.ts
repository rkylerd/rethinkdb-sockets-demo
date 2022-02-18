
import axios from "axios";
import { Router } from "express";

export const itunesSettings = {
    itunesApi: "https://itunes.apple.com/",
    searchEndpoint: "search?term=",
    lookupEndpoint: "lookup?id=",
    songEntity: "&entity=song",
    albumEntity: "&entity=album",
    limit: "&limit=200"
};
const { itunesApi, searchEndpoint, songEntity, limit } = itunesSettings;

export const song = () => {
    const router = Router();
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        console.log({ id });
        const response = await axios.get(`${itunesApi}${searchEndpoint}${id}${songEntity}${limit}`);
        res.json(response.data);
    })

    return router;
};