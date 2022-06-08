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

function publicRooms() {
    const {
         sockets: { 
             adapter: { sids, rooms }, 
            },
        }= wsServer ;
    const publicRooms= [];
    rooms.forEach((_,key)=>{
        if(sids.get(key.room)===undefined){
            publicRooms.push(key)
            console.log(key);
        }
    })
    return publicRooms;
}

function countRoom(roomName){
    let x = wsServer.sockets.adapter.rooms.get(roomName)?.size;
    if(x==2) roomName.door = close;
}

wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anon";
    socket.onAny((event) => {
        console.log(wsServer.sockets.adapter);
        console.log(`Socket event : ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.version, countRoom(roomName));
        wsServer.sockets.emit("room_change", publicRooms());
    });;
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => 
            socket.to(room).emit("bye", socket.nickname,countRoom(room))
        );
    })
    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    })
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
        done();
    });
    socket.on("nickname", (nickname) => (socket["nickname"] = nickname))
})


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpserver.listen(3000, handleListen)

