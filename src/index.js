const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();
const router = express.Router();

app.use(bodyParser.json())
const httpServer = http.createServer(app);


app.set("view engine", "ejs");
app.set("views", "src/public/html");
app.use(express.static(`${__dirname}/public`));
app.get("/", (req, res) => res.render("home/index"));
app.get("/game", (req, res) => res.render("home/game"));
app.get("/ranking", (req, res) => res.render("home/ranking"));


app.post("")

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:3002"]
  }
})

let rooms = [];

io.on("connection", (socket) =>{
  socket.on("join-room",(roomId,id) => {
    socket.join(roomId)
    const room = io.of(rooms).adapter.rooms.get(roomId)
     if(room === undefined || room.size <= 2) {
      if(room === undefined ||room.size === 2) {
        console.log(rooms);
        socket.server.in(roomId).emit('news_by_server', id);
      }
     }else {
       io.emit("can't join link")
     }
  })
  socket.on('start',(room)=>{
    socket.to(room).emit('go');
  })
  socket.on('give_length', (room, length)=>{
    socket.to(room).emit('receive',length);
  })
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye")
      )
    })
})
app.post("/ranking/record",async (req, res)=>{
    console.log('ranking 기록하기');
    const doc = db.collection('ranking').doc(paramNickName);
    let list = {
      version: paramVersion, 
      tasu : tasu
    }
    await doc.set(list);
})
app.post("/ranking",async (req, res)=>{
  const doc = db.collection('ranking');
  const rank = await doc.orderBy('name').get();
  res.json({"data":rank})
})

const handleListen = () => console.log(`Listening on http://localhost:3002`);
httpServer.listen(3002, handleListen);