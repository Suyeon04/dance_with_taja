// const socket = io();

const form = document.querySelector(".welcome");
const list = document.getElementById("list");
const select = document.querySelector("#select");
const start = document.querySelector(".Startbtn");  // 방장 닉넴

// version 종류
const versions = [ "JAVA", "JavaScript" ,  "Android" , "PHP" ]

let version = 0;    // 방 버전
let roomName = 0;   // 방 이름
let count = 1;      // 방 번호
let roomCount = 0;

//ajax 보내는 부분 : async api
async function sendAjax(url, data){

  var dataInfo = {
      method : "POST",  //메소드 반드시 지정해줘야 app.js 파일에서 찾을수 있음.
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
  };

  const reqURL = await fetch(url,dataInfo);  
  const result = await reqURL.json(); //JSON값 받아오기
 
  // console.log(result.test)

  return result.data;
}

// 방장 방 만들기: post방식 fetch API
function CreateRoom(event) {
  // socket.emit("enter_room", name.value, version, showRoom);//emit 마지막 argument는 funciton
  // socket.emit("nickname", name.value);
  
  const name = document.querySelectorAll(".input-name2");

  roomName = name[0].value;
  console.log(roomName + " "+ version);

  let inputdata = {version:version, roomName:roomName};
  sendAjax('http://localhost:3002/list/make', inputdata)

}

// 기존 방 그리기
async function roomList() {
  let inputdata = {test:1};
  let data = await sendAjax('http://localhost:3002/list', inputdata)

  let wprtbody = document.querySelector('.wprtbody')

  data.map((item, idx) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerHTML = `<td>${idx}</td>`;
    td1.id = `idx${idx}`
    td1.className ='number'

    const td2 = document.createElement("td");
    td2.innerHTML = `<td>${item.language}</td>`;
    td2.id = `language${idx}`
    td2.className ='Language'

    const td3 = document.createElement("td");
    td3.innerHTML = `<td>${item.ninkname}</td>`;
    td3.id = `nickName${idx}`
    td3.className ='NickName'

    const td4 = document.createElement("td");
    td4.innerHTML = `<td id=${idx}><button class="Clickbtn"  onClick="roomDataSet(${idx})">CLICK</button></td>`;
    td4.className ='Startbtn'

    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tr.append(td4)

    wprtbody.append(tr)
  })
}

// 기존 방 들어가기: version 저장
const roomDataSet = (index) => {
  let language = document.querySelector(`#language${index}`).outerText;

  versions.map((item, idx) => {
    if(index === idx)  version = idx;
  })

  toggleModal2()

}

// 기존 방 들어가기: post방식 fetch API
function handleRoomSubmit(event) {
  // socket.emit("enter_room", name.value, version, showRoom);//emit 마지막 argument는 funciton
  // socket.emit("nickname", name.value);
  const name = document.querySelectorAll(".input-name2");
  const nickName = document.querySelector(`#nickName${version}`).outerText;
  roomName = name[1].value;
  console.log(roomName + " "+ version, nickName)

  let inputdata = {version:version, roomName:roomName, nickName:nickName};
  sendAjax('http://localhost:3002/list/join', inputdata)

}

function showRoom(){

//   location.replace('/charView');
//   localStorage.setItem("roomName",JSON.stringify(roomName));
//   localStorage.setItem("version",JSON.stringify(version));
// }
// socket.on("room_change", (nickname, rooms)=>{
//   const new_list = form.querySelector('.gamelist');
//   rooms.forEach((room)=>{
//     const tr = document.createElement("tr");
//     tr.innerText=`<td class="number">${count}</td>
//     <td class="NickName">${nickname}</td>
//     <td class="Language">${room}</td>
//     <td class="Startbtn" id = ${count}><button class="Clickbtn" onclick="addUser()">CLICK</button></td>`;
//     new_list.append(new_list);
//     count++;
//     console.log("hsidfhisd")
//   })
}


// function addUser(e){
//   socket.emit("nickname", input.value);
//   //socket.emit("enter_room", {room: input.value, id : },showRoom);
// }

//오디오
// let musicimg=document.querySelector(".btnimg");

let cnt=1;
let ClickSound=new Audio("/audio/clicksound.wav");
let audio=new Audio();
audio.src="/audio/Music3.mp3";
audio.autoplay=true;
audio.volume=0.02;
ClickSound.volume=0.1;

function MusicPlay(){
  ClickSound.play();
  audio.volume=0.02;
  ClickSound.volume=0.1;
  if(cnt%2==1){
    //musicimg.src="../img/play.png"; //시작
    audio.play();
    ++cnt;
  }else if(cnt%2==0){
    //musicimg.src="../img/pause.png"; //멈춤
    audio.pause()
    ++cnt; 
  }
}
function MusicSelect(){
  audio=null;
  let rand=Math.floor(Math.random() * 5)+1;
  console.log(rand)
  switch(rand){
      case 1 : audio=new Audio("/audio/Music1.mp3"); break;
      case 2 : audio=new Audio("/audio/Music2.mp3"); break;
      case 3 : audio=new Audio("/audio/Music3.mp3"); break;
      case 4 : audio=new Audio("/audio/Music4.mp3"); break;
      case 5 : audio=new Audio("/audio/Music5.wav"); break;
  }
}


//모달창
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");
var cancelButton = document.querySelector("#cancel");

//console.log(modal);

function toggleModal() {
    // music.play();
    // audio.play();
    
    var modal = document.querySelector(".modal");
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    var modal = document.querySelector(".modal");
    if (event.target === modal) {
        toggleModal();
    }
}

// trigger.addEventListener("click", toggleModal);
// closeButton.addEventListener("click", toggleModal);
// cancel.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
window.onload=()=>{
    document.querySelector('.dropbtn_click').onclick = ()=>{
      dropdown();
    }
    document.getElementsByClassName('code').onclick = ()=>{
      showMenu(value, version);
    };
    dropdown = () => {
      var v = document.querySelector('.dropdown-content');
      var dropbtn = document.querySelector('.dropbtn')
      v.classList.toggle('show');
      dropbtn.style.borderColor = 'rgb(94, 94, 94)';
    }

    showMenu=(value, v)=>{
      var dropbtn_content = document.querySelector('.dropbtn_content');
      var dropbtn = document.querySelector('.dropbtn');
      version = v;
      dropbtn_content.innerText = value;
      dropbtn_content.style.color = '#252525';
      dropbtn.style.borderColor = '#3992a8';
    }
  }
  window.onclick= (e)=>{
    if(!e.target.matches('.dropbtn_click')){
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
// 방 만들기 모달창 end

// CLICK 모달창
var Clickbtns = document.querySelectorAll(".Clickbtn");
// var modal2 = document.querySelector(".modal2");
var closeButton2 = document.querySelector(".close-button2");
var cancelButton2 = document.querySelector("#cancel2");

//console.log(modal);

function toggleModal2() {
  var modal2 = document.querySelector(".modal2");
  modal2.classList.toggle("show-modal2");
}

function windowOnClick2(event) {
      if (event.target === modal2) {
          toggleModal2();
      }
  }

  Clickbtns.forEach(b => b.addEventListener("click", toggleModal2));
// closeButton2.addEventListener("click", toggleModal2);
 // cancelButton2.addEventListener("click", toggleModal2);
//  CLICK 모달창 end




