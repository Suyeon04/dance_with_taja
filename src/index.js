// var admin = require("firebase-admin");
// var firestore = require("firebase-admin/firestore");

// var serviceAccount = require("./firebasekey.json");

import express from 'express';
import { Server } from 'socket.io';
import http from "http";

import path from 'path';
const __dirname = path.resolve();

const app = express();
const router = express.Router();


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
  // console.log('/list 호출됨.');
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
})

//기존 방 들어가기
app.post("/list/join", async (req, res) => {
  // console.log('/list/join 호출됨.');
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
})

const handleListen = () => console.log(`Listening on http://localhost:3002`);
httpServer.listen(3002, handleListen);