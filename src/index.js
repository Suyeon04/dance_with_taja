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

// 리스트 정보 보내기
app.post("/list", async (req, res) => {
  console.log('/list 호출됨.');
  let data = [];
  const snapshot = await db.collection("list").where('fighter', '==', "").get;
  if (snapshot.empty) {
    console.log('No matching documents.');
  } else {
    snapshot.forEach(doc => {
      data.push({
        version: doc.data().version,
        name: doc.id()
      });
    })
  }
  res.send(data);
  // let data = [];
  // const snapshot = await db.collection("list").where('fighter', '==', "").get;
  // if (snapshot.empty) {
  //   console.log('No matching documents.');
  // } else {
  //   snapshot.forEach(doc => {
  //     data.push({
  //       version: doc.data().version,
  //       name: doc.id()
  //     });
  //   })
  // }
  // res.send(data);

  data = [
    {
      'language':'Android',
      'ninkname':'쭈꾸',
    }, {
      'language':'JAVA',
      'ninkname':'뿌꾸',
    }, {
      'language':'JavaScript',
      'ninkname':'어피치',
    }, {
      'language':'Android',
      'ninkname':'신기방기뿡뿡방기',
    }, {
      'language':'PHP',
      'ninkname':'동방신기',
    }
  ]

  res.json({"data":data})
})



//기존 방 들어가기
app.post("/list/join", async (req, res) => {
  console.log('/list/join 호출됨.');
  let data = true;
  let roomName = req.body.roomName;
  let nickname = req.body.nickname;
  const doc = db.collection("list").doc(roomName);
  const firebase = await doc.get()
  if (!firebase.exists) {
    data = false;
    console.log('No such document!');
  } else {
    if(firebase.data().fighter==""){
      data = true;
      await doc.update({fighter: nickname});
    }else{
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
    let list={
      version: paramVersion,
      fighter: ""
    }
    await hey.set(list);
  } else {
    data = false;
  }
  res.send(data);
})



const io = require("socket.io")(3000,{
  cors:{
    origin : ["http:/localhost:3002"]
  }
})

io.on("connection", (socket) => {
  console.log(socket.id);
});

 
  
  // let data = true;
  // let version = req.body.version || req.query.version;
  // let nickname = req.body.nickname || req.query.nickname;
  // const doc = db.collection("list").doc(nickname);
  // const firebase = await doc.get()
  // if (!firebase.exists) {
  //   data = true;
  //   let list={
  //     version: version,
  //     fighter: ""
  //   }
  //   await db.doc.set(list);
  // } else {
  //   data = false;
  // }
  // res.send(data);

  //const paramCode  = req.body.barcode || req.query.barcode;

const handleListen = () => console.log(`Listening on http://localhost:3002`);
httpServer.listen(3002, handleListen);