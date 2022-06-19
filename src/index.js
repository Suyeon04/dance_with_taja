const io = require('socket.io')(3002)

io.on('connection', socket =>{
  log(socket.id)
})
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

let count = 2;

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer,{
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});

function publicRooms(version) {
    const {
      sockets: {
        adapter: { sids, rooms },
      },
    } = wsServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
      if (sids.get(publicRooms.key) === undefined) {
        publicRooms.push({key:key, version : version});
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
    socket.on("enter_room", (roomName, version, done) => {
      socket.join(roomName);
      done();
      (version) =>(socket["version"] = version)
      socket.to(roomName).emit("welcome", countRoom(roomName));
      wsServer.sockets.emit("room_change", publicRooms(version));
    });
    socket.on("disconnecting", () => {
      socket.rooms.forEach((room) =>
        socket.to(room).emit("bye", socket.nickname)
      );
    });
    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", socket.nickname, publicRooms());
    });
    socket.on("nickname", (nickname) => (socket["nickname"] = nickname))
    
  });

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3002, handleListen);


