const socket = io();

const form = document.getElementById("welcome");
const list = document.getElementById("list");
const select = document.querySelector("#select");
const start = document.querySelector(".Startbtn");

let version = 0; // 방 버전
let roomName = 0; // 방 이름
let count = 0; // 방 번호

function handleRoomSubmit(event) {
  event.preventDefault();
  const name = document.querySelector(".input-name");
  console.log(name.value + " "+ version);
  socket.emit("enter_room", {room : name.value, version : version, door : open});//emit 마지막 argument는 funciton
  roomName = name.value;
  name.value = "";
}

function showRoom(){
  location.replace('/charView');
  localStorage.setItem("roomName",JSON.stringify(roomName));
  localStorage.setItem("version",JSON.stringify(version));
}
select.addEventListener("click", handleRoomSubmit);

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
  new_list.innerHTML = `<td class="number">${count}</td>`
  new_list.innerHTML = `<td class="Language">${room.id}</td>`
  new_list.innerHTML = `<td class="NickName">${room.version}</td>`
  new_list.innerHTML = `<td class="Startbtn" id = ${room.id}><button class="Clickbtn">CLICK</button></td>`
  count++;
  tagArea.appendChild(new_list);
}

start.addEventListener("click", addUser);

function addUser(e){
  //socket.emit("enter_room", {room: input.value, id : },showRoom);
}

//모달창
var trigger = document.querySelector(".trigger");
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
var cancelButton = document.querySelector("#cancel");

//console.log(modal);

function toggleModal() {
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
      version = parseInt(v);
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






