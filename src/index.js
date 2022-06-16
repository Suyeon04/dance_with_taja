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

let count = 0;

const httpserver = http.createServer(app);
const wsServer = new Server(httpserver,{
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});

function publicRooms() {
    const {
      sockets: {
        adapter: { sids, rooms },
      },
    } = wsServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
      if (sids.get(key) === undefined) {
        publicRooms.push(key);
      }
    });
    return publicRooms;
  }

function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anon";
    socket.onAny((event) => {
      console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
        wsServer.sockets.emit("room_change", publicRooms());
      });
    socket.on("disconnecting", () => {
      socket.rooms.forEach((room) =>
        socket.to(room).emit("bye", socket.nickname)
      );
    });
    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
      });
    socket.on("start", () => {
    if(count!=countRoom(room)){
        count++;
        socket.to(room).emit("new_message", socket.nickname);
        done();
    }else{
        socket.to(room).emit("go");
    }
    });
  });


