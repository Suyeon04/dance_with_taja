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
        rooms.push(roomId)
        rooms = rooms.filter(r => r !== roomId);
        console.log(rooms);
        socket.server.in(roomId).emit('news_by_server', id);
      }
     }else {
       io.emit("can't join link")
     }
  })
  socket.on("start",(room)=>{
    socket.to(room).emit('go');
  } )
  socket.on('give_length', (room, length)=>{
    socket.to(room).emit('receive',length);
  })
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye")
    );
  });
  socket.on("remove_room", (room)=>{
      rooms[room] = null;
  })
})

app.post("/ranking/record",async (req, res)=>{
    console.log('ranking 기록하기');

    const paramNickname = req.body.nickname;
    const paramTyping = req.body.typing;

    console.log(paramNickname,paramTyping);

    // const doc = db.collection('ranking').doc(paramNickName);
    // let list = {
    //   version: paramVersion, 
    //   tasu : tasu
    // }
    // await doc.set(list);
})

// ranking 리스트 데이터 전송하기
app.post("/ranking",async (req, res)=>{
  console.log('ranking list 전송하기');
  let rank = [
    { 
      nickname:"John",
      typing:"95"
    }, { 
      nickname:"Adam",
      typing:"90"
    }, { 
      nickname:"Kevin",z
      typing:"85"
    }, { 
      nickname:"Smith",
      typing:"80"
    }, { 
      nickname:"Michel",
      typing:"75"
    }, { 
      nickname:"John",
      typing:"70"
    }, { 
      nickname:"Adam",
      typing:"65"
    }, { 
      nickname:"일등하고싶다",
      typing:"60"
    }, { 
      nickname:"이등하고싶다",
      typing:"55"
    }, { 
      nickname:"삼등하고싶다",
      typing:"50"
    }
  ]

  // const doc = db.collection('ranking');
  // const rank = await doc.orderBy('name').get();

  res.json({"data":rank})
})

const handleListen = () => console.log(`Listening on http://localhost:3002`);
httpServer.listen(3002, handleListen);