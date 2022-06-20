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
  console.log('/process/users/:id 처리함.');
  
  let x = (req.params.id).split("-");
  let roomName = x[1];
})

router.get('/game/:id/cha/:cha/version/:version', function (req, res) {
  let roomName = req.params.id;
  let cha = req.params.cha;
  let version = req.params.version;
});
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on('send-message', (message) =>{
    socket.broadcast.emit('receive-message', message)
  })
});

app.post("")

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:3002"]
  }
})
// const io = require("socket.io")(3000)
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on('send-message', (message) =>{
    socket.broadcast.emit('receive-message', message)
  })
});


// 리스트 정보 보내기
app.post("/list", async (req, res) => {
  console.log('/list 호출됨.');
  let data = [];
  let snapshot = await db.collection("list").where('fighter', '==', "").get();
  if (await snapshot.empty) {
    console.log('No matching documents.');
  } else {
    snapshot.forEach(doc => {
      data.push({
        language: doc.data().version,
        nickname: doc.id
      });
    })
  }
  console.log(data);
  res.json({ "data": data })
})



//기존 방 들어가기
app.post("/list/join", async (req, res) => {
  console.log('/list/join 호출됨.');
  const paramVersion = req.body.version;
  const paramNickName = req.body.roomName;
  const paramRoomName = req.body.nickName;
  console.log(paramRoomName+ " "+paramNickName)
  let data = true;
  const doc = db.collection("list").doc(paramRoomName);
  const firebase = await doc.get()
  if (!firebase.exists) {
    data = false;
    console.log('No such document!');
  } else {
    if (firebase.data().fighter == "") {
      data = true;
      await doc.update({ fighter: paramNickName });
    } else {
      data = false;
    }
  }
  res.send(data);
})

//방 만들기
app.post("/list/make", async (req, res) => {
  console.log('/list/make 호출됨.');
  let data = true;
  const paramVersion = req.body.version;
  const paramRoomName = req.body.roomName;
  console.log(paramRoomName)
  const hey = db.collection("list").doc(paramRoomName);
  const firebase = await hey.get()
  if (!firebase.exists) {
    data = true;
    let list = {
      version: paramVersion,
      fighter: ""
    }
    await hey.set(list);
  } else {
    data = false;
  }
  res.send(data);
})

//----------------charView---------------

// 방금 넘어간 거 데이터 가져오기
// 내가 움직이는거
app.post("/moveChar", async (req, res)=>{
  console.log('/moveChar 호출됨.');
  const paramRoomName = req.body.roomName;
  const char = req.body.roomName;
  const doc = db.collection("list").doc(paramRoomName);
  const firebase = await doc.get();
  if(firebase.id == nickName){
    await doc.update({ maker: char});
  }else{
    await doc.update({ partner: char});
  }
  res.json({"data":"okay"})
  //r1, n1, i1, g1
  //사진 이름 ==r1, n1, i1, g1
  //지금 r1사진을 보고 있다 == r 넘겨주기
})
  
// 데이터 넘겨주기
// 상대방이 움직이는거
app.post("/moveChar2", async (req, res)=>{
  console.log('/moveChar2 호출됨.');

  // const paramRoomName = req.body.roomName;
  // const nickName = req.body.nickName;
  // const doc = db.collection("list").doc(paramRoomName);
  // const firebase = await doc.get();

  // if(firebase.id == nickName){
  //   return firebase.data().partner;
  // }else{
  //   return firebase.data().maker;
  // }

  let data = "n"

  switch(data) {
    case "r" : data = 1;
             break;
    case "n" : data = 2;
             break;
    case "i" : data = 3;
             break;
    case "g" : data = 4;
             break;
}
  
  res.json({"data":data})
})


// 상대방 캐릭터 선택 완료 값 넘겨 받기 
app.post("/makeChar2", async (req, res)=>{
  console.log('/makeChar2 호출됨.');

  let data = "false"
  
  res.json({"data":data})
})

// 나와 상대방 complete 확인하고 넘겨주기: true, false
app.post("/MYcomplete", async (req, res)=>{
  console.log('/MYcomplete 호출됨.');

  let data = "false"
  
  res.json({"data":data})
})
  

const handleListen = () => console.log(`Listening on http://localhost:3002`);
httpServer.listen(3002, handleListen);