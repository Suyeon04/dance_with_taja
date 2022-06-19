const socket = io();

const form = document.getElementById("welcome");
const list = document.getElementById("list");
const select = document.querySelector("#select");
const start = document.querySelector(".Startbtn");
const name = document.querySelector(".input-name2");

let version = 0; // 방 버전
let roomName = 0; // 방 이름
let count = 1; // 방 번호
let roomCount = 0;

function handleRoomSubmit(event) {
  event.preventDefault();
  console.log(name.value + " "+ version);
  socket.emit("enter_room", name.value);//emit 마지막 argument는 funciton
  socket.emit("nickname", name.value);
  roomName = name.value;
  name.value = "";
  showRoom();
}

function showRoom(){
  location.replace('/charView');
  localStorage.setItem("roomName",JSON.stringify(roomName));
  localStorage.setItem("version",JSON.stringify(version));
}
//방 생성 누르면 이거 실행
select.addEventListener("click", createList);

socket.on("room_change", (rooms, nickname)=>{
  const roomlist = welcome.querySelector("ul");
  roomlist.innerHTML= "";
  count = 0;
   rooms.forEach((room)=>{
       if(room.room!=undefined&&room.door==open) {
         createList();
       }
   })
});

function createList(){ //요소 추가
  let tagArea = document.getElementById('tagArea');
  let new_list = document.createElement('tr');
  new_list.innerHTML = `<td class="number">${count}</td><td class="NickName">${version}</td><td class="Language">${name.value}</td><td class="Startbtn" id = ${count}><button class="Clickbtn">CLICK</button></td>`
  count++;
  tagArea.appendChild(new_list);
}

function addBtnEvent(e) { 
  if (e.target.dataset.password === 'true') {
      const password = prompt('비밀번호를 입력하세요');
      location.href = '/room/' + e.target.dataset.id + '?password=' + password;
  } else {
      location.href = '/room/' + e.target.dataset.id;
  }
}

start.addEventListener("click", addUser);

function addUser(e){
  //socket.emit("enter_room", {room: input.value, id : },showRoom);
}

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
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
var cancelButton = document.querySelector("#cancel");

//console.log(modal);

function toggleModal() {
    // music.play();
    // audio.play();
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
cancel.addEventListener("click", toggleModal);
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
      version = value;
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
var modal2 = document.querySelector(".modal2");
var closeButton2 = document.querySelector(".close-button2");
var cancelButton2 = document.querySelector("#cancel2");

//console.log(modal);

function toggleModal2() {
      modal2.classList.toggle("show-modal2");
  }

function windowOnClick2(event) {
      if (event.target === modal2) {
          toggleModal2();
      }
  }

  Clickbtns.forEach(b => b.addEventListener("click", toggleModal2));
  closeButton2.addEventListener("click", toggleModal2);
  cancelButton2.addEventListener("click", toggleModal2);
//  CLICK 모달창 end

// 버튼 클릭시 이동
function moveView(){
  location.href="http://localhost:3000/charView";
}





