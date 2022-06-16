const socket = io();

const form = document.getElementById("welcome");
const list = document.getElementById("list");
const select = document.querySelector("#select");
const start = document.querySelector(".Startbtn");
// 방장 닉넴
const name = document.querySelector(".input-name2");


let version = 0; // 방 버전
let roomName = 0; // 방 이름
let count = 1; // 방 번호
let roomCount = 0;

//방 들어간 사람 처리
function handleRoomSubmit(event) {
  console.log(name.value + " "+ version);
  socket.emit("enter_room", name.value, showRoom);//emit 마지막 argument는 funciton
  socket.emit("nickname", name.value);
  roomName = name.value;
  name.value = "";
}

function showRoom(){
  location.replace('/charView');
  localStorage.setItem("roomName",JSON.stringify(roomName));
  localStorage.setItem("version",JSON.stringify(version));
}
socket.on("room_change", (nickname, rooms)=>{
  let new_list = form.querySelector('.sd');
  rooms.forEach((room)=>{
    new_list.innerHTML = "";
    `<td class="number">${count}</td>
    <td class="NickName">${nickname}</td>
    <td class="Language">${room}</td>
    <td class="Startbtn" id = ${count}><button class="Clickbtn" onclick="addUser()">CLICK</button></td>`
    count++;
    console.log("hsidfhisd")
    tagArea.appendChild(new_list);
  })
});


function addUser(e){
  socket.emit("nickname", input.value);
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



