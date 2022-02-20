import express, { Request, Response } from 'express'
import { getApiRoutes } from './api';
import path from "path";
import cors, { CorsOptions } from 'cors';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const logger = (req: Request, res: Response, next: Function) => {
    console.log(req.method.toUpperCase() + ' ' + req.path);
    next();
};

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// Parse request body
app.use(express.json());

const corsOptions: CorsOptions = {
    origin: ["localhost:3000"],
};

app.use(cors(corsOptions));

app.use('/api', logger, getApiRoutes(io));

app.use((req, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"))
});

http.listen(3001, function () {
    console.log('listening on port 3001');
});