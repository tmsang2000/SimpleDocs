import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import http from 'http';
import socketIO from 'socket.io';
import { ServerEventSystem } from './server-events';

const app = express();
app.disable('x-powered-by');

app.use("/loaderio-a3a4eab850ea7c97ae58ad1654d54dee.txt", (req, res) => {
    res.send("Server is running !");
});

app.use(express.static(__dirname + '/..'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV == 'test') {
    // app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use(fileUpload());
app.use(cors());

const server = http.createServer(app);
const socketIOServer = socketIO(server);

ServerEventSystem.initialize(socketIOServer);

export { app, server };