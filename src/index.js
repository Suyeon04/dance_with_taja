import express from 'express';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import http from "http";

import path from 'path';
const __dirname = path.resolve();

const app = express();
const router = express.Router();


app.set("view engine", "ejs");
app.set("views", "src/public/html");
app.use(express.static(`${__dirname}/src/public`));
app.get("/", (req, res) => res.render("home/ListView"));
app.get("/charView",(req, res) =>  res.render("home/charView"));
//src\public\html\home\charView.ejs
app.get("/game",(req, res) =>  res.render("home/game"));
app.get("/ranking", (req, res) => res.render("home/ranking"));

const httpserver = http.createServer(app);
const wsServer = new Server(httpserver,{
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});
instrument(wsServer, {
    auth: false
});
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpserver.listen(3000, handleListen)

