
import express from 'express';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import http from "http";

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
        if(sids.get(key)===undefined){
            publicRooms.push(key)
        }
    })
    return publicRooms;
}
function countRoom(roomName){
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
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
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
        wsServer.sockets.emit("room_change", publicRooms());
    });
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