var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = firestore.getFirestore();

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
app.get("/charView", (req, res) => res.render("home/charView"));
//src\public\html\home\charView.ejs
app.get("/game", (req, res) => res.render("home/game"));
app.get("/ranking", (req, res) => res.render("home/ranking"));
app.get("/ListView", (req, res) => res.render("home/ListView"));

let count = 2;

router.route('/game/:id').get(function(req, res){
   let x = (req.params.id);
  let user = req.param('userName');
  let roomName = x[1];
})



app.post("")

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:3002"]
  }
})
// const io = require("socket.io")(3000)

// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.on('send-message', (message) =>{
//     socket.broadcast.emit('receive-message', message)
//   })
// });

let rooms = [];
const nicknames = {};

io.on("connection", (socket) =>{
  socket.on("join-room",roomId => {
    socket.join(roomId)
    const room = io.of(rooms).adapter.rooms.get(roomId)
     if(room === undefined || room.size <= 2) {
      if(room === undefined ||room.size === 2) {
        rooms = rooms.filter(r => r.data.roomname !== roomname);
        console.log(rooms);
        socket.server.in(roomId).emit('news_by_server');
      }
     }else {
       io.emit("can't join link")
     }
  })
  socket.on("nicknames", (person)=>{
    
  })
  socket.on('give_length', (room, length)=>{
    socket.to(room).emit('receive',length);
  })
  socket.on('success', (room)=>{
    socket.to(room).emit('lose');
  })
  // socket.on("join-room", (roomId)=>{
    
  //   let x = io._nsps.get('/').adapter.rooms.get(roomName).size;
  //   if(z < 2) {
  //     socket.join(roomId)
  //     if(countRoom(roomId) == 2){
  //      socket.to(roomId).emit('news_by_server', roomId);
  //     }else{
  //       socket.to(roomId).emit("nothing");
  //     }
  //   }else {
  //     io.of(`/${roomId}`).emit("can't join link")
  //   }
  // })
   socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });
  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
})


// // 리스트 정보 보내기
// app.post("/list", async (req, res) => {
//   console.log('/list 호출됨.');
//   let data = [];
//   let snapshot = await db.collection("list").where('fighter', '==', "").get();
//   if (snapshot.empty) {
//     console.log('No matching documents.');
//   } else {
//     snapshot.forEach(doc => {
//       data.push({
//         language: doc.data().version,
//         nickname: doc.id
//       });
//     })
//   }
//   console.log(data);
//   res.json({ "data": data })
// })

// let paramRoomName;

// //기존 방 들어가기
// app.post("/list/join", async (req, res) => {
//   console.log('/list/join 호출됨.');
//   const paramVersion = req.body.version;
//   const paramNickName = req.body.roomName;
//   paramRoomName = req.body.nickName;
//   console.log(paramRoomName+ " "+paramNickName)
//   let data = true;
//   const doc = db.collection("list").doc(paramRoomName);
//   const firebase = await doc.get()
//   if (!firebase.exists) {
//     data = false;
//     console.log('No such document!');
//   } else {
//     if (firebase.data().fighter == "") {
//       data = true;
//       await doc.update({ fighter: paramNickName });
//     } else {
//       data = false;
//     }
//   }
//   res.send(data);
// })

// //방 만들기

// app.post("/list/make", async (req, res) => {
//   console.log('/list/make 호출됨.');
//   let data = true;
//   const paramVersion = req.body.version;
//   paramRoomName = req.body.roomName;
//   console.log(paramRoomName)
//   const hey = db.collection("list").doc(paramRoomName);
//   const firebase = await hey.get()
//   if (!firebase.exists) {
//     data = true;
//     let list = {
//       version: paramVersion,
//       fighter: "",
//       maker : "r",
//       partner : "r",
//       makerSummit : false,
//       partnerSummit : false
//     }
//     await hey.set(list);
//   } else {
//     data = false;
//   }
//   res.send(data);
// })

// //----------------charView---------------

// // 방금 넘어간 거 데이터 가져오기
// // 내가 움직이는거
// app.post("/moveChar", async (req, res)=>{
//   console.log('/moveChar 호출됨.');
//   const paramRoomName = req.body.roomName;
//   const char = req.body.roomName;
//   const doc = db.collection("list").doc(paramRoomName);
//   const firebase = await doc.get();
//   if(firebase.id == nickName){
//     await doc.update({ partner: char});
//   }else{
//     await doc.update({ maker: char});
//   }
//   res.json({"data":"okay"})
// })
  
// // 데이터 넘겨주기
// // 상대방이 움직이는거
// app.post("/moveChar2", async (req, res)=>{
//   console.log('/moveChar2 호출됨.');
//   const paramRoomName = req.body.roomName;
//   const nickName = req.body.nickName;
//   const doc = db.collection("list").doc(paramRoomName);
//   const firebase = await doc.get();
//   let data = "n";
//   if(firebase.id == nickName){
//     data = firebase.data().partner;
//   }else{
//     data = firebase.data().maker;
//   }
//   switch(data) {
//     case "r" : data = 1;
//              break;
//     case "n" : data = 2;
//              break;
//     case "i" : data = 3;
//              break;
//     case "g" : data = 4;
//              break;
// }
//   res.json({"data":data})
// })


// // 상대방 캐릭터 선택 완료 값 넘겨 받기 
// app.post("/makeChar2", async (req, res)=>{
//   console.log('/makeChar2 호출됨.');
//   let data = "false"
  
//   res.json({"data":data})
// })

// app.post("/makeChar", async (req, res)=>{
//   console.log('/makeChar 호출됨.');
//   const paramImgNumber = req.body.imgNumber;
//   const doc = db.collection("list").doc(paramRoomName);
//   const firebase = await doc.get();
//   if(firebase.id == nickName){
//       await doc.update({
//         makerSummit : true
//       })
//   }else{
//       await doc.update({
//         dapartnerSummit : true
//       })
//   }
//   res.json({"data":"okay"})
// })

// // 나와 상대방 complete 확인하고 넘겨주기: true, false
// app.post("/MYcomplete", async (req, res)=>{
//   console.log('/MYcomplete 호출됨.');
//   let data = "false"
//   const doc = db.collection("list").doc(paramRoomName);
//   const firebase = await doc.get();
//   if(firebase.id == nickName){
//     if(firebase.data().partnerSummit==true){
//       data = true;
//     }
//   }else{
//     if(firebase.data().makerSummit==true){
//       data = true;
//     }
//   }
//   res.json({"data":data})
// })
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