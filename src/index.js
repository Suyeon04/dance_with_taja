// var admin = require("firebase-admin");
// var firestore = require("firebase-admin/firestore");

// var serviceAccount = require("./firebasekey.json");

import express from 'express';
import { Server } from 'socket.io';
import http from "http";
import bodyParser from 'body-parser'

import path from 'path';
const __dirname = path.resolve();

const app = express();
const router = express.Router();

app.use(bodyParser.json())


app.set("view engine", "ejs");
app.set("views", "src/public/html");
app.use(express.static(`${__dirname}/src/public`));
app.get("/", (req, res) => res.render("home/ListView"));
app.get("/charView", (req, res) => res.render("home/charView"));
//src\public\html\home\charView.ejs
app.get("/game", (req, res) => res.render("home/game"));
app.get("/ranking", (req, res) => res.render("home/ranking"));

let count = 2;

const httpServer = http.createServer(app);

// 리스트 정보 보내기
app.post("/list", async (req, res) => {
  console.log('/list 호출됨.');
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

  let data = [
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

  const paramVersion = req.body.version;
  const paramRoomName = req.body.roomName;
  const paramNickName = req.body.nickName;
  
  console.log(paramVersion, paramRoomName, paramNickName)

  // let data = true;
  // let roomName = req.body.roomName || req.query.roomName;
  // let nickname = req.body.nickname || req.query.nickname;
  // const doc = db.collection("list").doc(roomName);
  // const firebase = await doc.get()
  // if (!firebase.exists) {
  //   data = false;
  //   console.log('No such document!');
  // } else {
  //   if(firebase.data().fighter==""){
  //     data = true;
  //     await doc.update({fighter: nickname});
  //   }else{
  //     data = false;
  //   }
  // }
  // res.send(data);
})

//방 만들기
app.post("/list/make", async (req, res) => {
  console.log('/list/make 호출됨.');

  const paramVersion = req.body.version;
  const paramRoomName = req.body.roomName;
  
  console.log(paramVersion, paramRoomName)
  
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


  res.json({"test":"성공했다!!ㅜㅜ"})
})

//방금 넘어간 거 데이터 넘겨주기
app.post("/moveChar", async (req, res)=>{
  console.log('/moveChar 호출됨.');

  const paramImgNumber = req.body.imgNumber;
  console.log(paramImgNumber);
  
  // const paramRoomName = req.body.roomName;
  // const char = req.body.roomName;
  // const doc = db.collection("list").doc(paramRoomName);
  // const firebase = await doc.get();
 
  // if(firebase.id == nickName){
  //   await doc.update({ maker: char});
  // }else{
  //   await doc.update({ partner: char});
  // }
  //r1, n1, i1, g1
  //사진 이름 ==r1, n1, i1, g1
  //지금 r1사진을 보고 있다 == r 넘겨주기

  res.json({"data":"okay"})
})
  
//상대방이 움직인 거 데이터 넘겨받기
app.post("/moveChar/partner", async (req, res)=>{
  console.log('/moveChar/partner 호출됨.');

  // const paramRoomName = req.body.roomName;
  // const nickName = req.body.nickName;
  // const doc = db.collection("list").doc(paramRoomName);
  // const firebase = await doc.get();

  // if(firebase.id == nickName){
  //   return firebase.data().partner;
  // }else{
  //   return firebase.data().maker;
  // }
})

// 내 캐릭터 선택완료 값
app.post("/makeChar", async (req, res)=>{
  console.log('/makeChar 호출됨.');

  const paramImgNumber = req.body.imgNumber;
  console.log(paramImgNumber);
  
  res.json({"data":"okay"})
})

// 상대방 캐릭터 선택 완료 값 넘겨 받기
app.post("/makeChar2", async (req, res)=>{
  console.log('/makeChar2 호출됨.');

  let data = "true"
  
  res.json({"data":data})
})
  

const handleListen = () => console.log(`Listening on http://localhost:3002`);
httpServer.listen(3002, handleListen);