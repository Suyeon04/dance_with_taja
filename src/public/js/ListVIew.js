const socket = io();

const form = document.getElementById("welcome");
const list = document.getElementById("list");
const select = document.querySelector("#select");

let version = 0;
let roomName = 0;

function handleRoomSubmit(event) {
  event.preventDefault();
  const name = document.querySelector(".input-name");
  console.log(name.value + " "+ version);
  socket.emit("enter_room", name.value);//emit 마지막 argument는 funciton
  socket.emit("version", version);
  socket.emit("nickname", nickname)
  roomName = name.value;
  name.value = "";
}

function showRoom(){
  location.replace('/charView');
  localStorage.setItem("roomName",JSON.stringify(roomName));
  localStorage.setItem("version",JSON.stringify(version));
}
select.addEventListener("click", handleRoomSubmit);

// 방 만들기 모달창
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
  var modal2 = document.querySelector(".modal2");
  var trigger2 = document.querySelector(".custom-btn");
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

trigger2.addEventListener("click", toggleModal2);
  closeButton2.addEventListener("click", toggleModal2);
  cancel2.addEventListener("click", toggleModal2);
  window2.addEventListener("click", windowOnClick2);
//  CLICK 모달창 end






