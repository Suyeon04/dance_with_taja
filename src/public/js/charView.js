// import { io } from "socket.io-client";
// const io = require("socket.io-client")

// const socket = io();

//오디오
let playbtn=document.querySelector("#playbtn");
let musicimg=document.querySelector(".btnimg");
let musicbtn=document.querySelector("#musicbtn");
let cnt=1;
let ClickSound=new Audio("/audio/clicksound.wav");
let audio=new Audio();
audio.src="/audio/Music4.mp3";
audio.autoplay=true;
audio.volume=0.02;
ClickSound.volume=0.1;
audio.pause()

function MusicPlay(){
  ClickSound.play();
  audio.volume=0.02;
  ClickSound.volume=0.1;
  if(cnt%2==1){
    musicimg.src="../img/play.png"; //시작
    audio.play();
    ++cnt;
  }else if(cnt%2==0){
    musicimg.src="../img/pause.png"; //멈춤
    audio.pause()
    ++cnt; 
  }
}
function MusicSelect(){
  audio=null;
  ClickSound.play();
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

let McurPos= 1; // 현재 보고 있는 이미지의 인덱스 번호!
let Mposition = 0; // 현재 .images 의 위치값!
let YcurPos= 1; // 현재 보고 있는 이미지의 인덱스 번호!
let Yposition = 0; // 현재 .images 의 위치값!
const IMAGE_WIDTH = 600; // 한번 움직일 때 이동해야 할 거리!

// 요소 선택
const MprevBtn = document.querySelector(".Mprev")
const MnextBtn = document.querySelector(".Mnext")
const Mimages = document.querySelector(".Mimages")

// const youchar = document.querySelector(".youchar")
// const YprevBtn = document.querySelector(".Yprev")
// const YnextBtn = document.querySelector(".Ynext")
// const Yimages = document.querySelector(".Yimages")

const select1=document.querySelector("#select1"); // 내가 선택완료 됬을 때
const select2=document.querySelector("#select2"); // 상대가 선택완료 됬을 때


Minit();
//Yinit();

//youchar.hidden = true; // youchar div를 없애는 속성
// 선택완료 숨기기
select1.hidden=true;
select2.hidden=true;

function Mprev(){
    
    if(McurPos > 1){
    MnextBtn.removeAttribute("disabled") /* disabled 속성 제거*/
    Mposition += IMAGE_WIDTH /* position 값 증가 */
    
    Mimages.style.transform = `translateX(${Mposition}px)` /* images 스타일 transform, x축 변경*/
    McurPos -= 1; /* curPos 값 감소*/
    console.log(McurPos) // 이미지 번호 넘겨줄 위치
    }
    if(McurPos == 1){ /* 이미지 index값 0 되면 prev 못하게 */
        MprevBtn.setAttribute("disabled", 'true')
    }

    // mychar이미지 변동 값 보내기
    postImgNumber('http://localhost:3002/moveChar', McurPos)

 }
function Mnext(){
    if(McurPos < 4){
        MprevBtn.removeAttribute("disabled")
        Mposition -= IMAGE_WIDTH
        /*
            트랜스폼(변형)의 네가지 속성값(함수)
            - scale() : 확대 또는 축소
            - translate() : 위치 이동
            - rotate() : 회전시키기
            - skew() : 요소 비틀기
        */
        Mimages.style.transform = `translateX(${Mposition}px)`
        McurPos += 1;
        console.log(McurPos) // 이미지 번호 넘겨줄 위치
    }
    if(McurPos == 4){
        // 뒤로 못 가게 하기
        MnextBtn.setAttribute("disabled", 'true') // 못 누르는 버튼이 됨
    }

    // mychar이미지 변동 값 보내기
    postImgNumber('http://localhost:3002/moveChar', McurPos)
}

// 초기 랜더링 시 최초 호출 함수의 관습적 이름
function Minit(){
    // 앞으로 가기는 처음부터 못누르게!
    console.log(McurPos) // 이미지 번호 넘겨줄 위치
    MprevBtn.setAttribute("disabled", 'true')
    MprevBtn.addEventListener("click", Mprev)
    MnextBtn.addEventListener("click", Mnext)
}

//완료되면 complete 버튼 색 바꾸고 div 뜨게 하기
function complete(){
    const completeBtn = document.querySelector("#mycomplete")
    completeBtn.classList.add("btncomplete");
    completeBtn.classList.add("completed");
    console.log(McurPos+" 캐릭터 선택완료");
    // MprevBtn.setAttribute("disabled", 'true')
    // MnextBtn.setAttribute("disabled", 'true')
    MprevBtn.hidden=true;
    MnextBtn.hidden=true;
    
    //선택완료 보이기
    select1.hidden=false;
    // select2.hidden=false;

    // mychar 선택 완료 값 넘기기
    
    postImgNumber('http://localhost:3002/makeChar', McurPos)

}

function complete2(){
    const completeBtn2 = document.querySelector("#yourecomplete")
    completeBtn2.classList.add("btncomplete");
    completeBtn2.classList.add("completed");
    console.log(McurPos+"캐릭터 선택완료");
    // MprevBtn.setAttribute("disabled", 'true')
    // MnextBtn.setAttribute("disabled", 'true')
    // MprevBtn.hidden=true;
    // MnextBtn.hidden=true;
    
    //선택완료 보이기
    // select1.hidden=false;
    select2.hidden=false;

    // mychar 선택 완료 값 가지고 오기

}

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
   
    let answer = result.data

    return answer;
 
}

//서버와 계속 통신하여 상대방의 정보 가지고 오기
setInterval(async() => {
    // 상대방 캐릭터 이동 정보
    // 값에 따른 이미지 이동 함수 필요
    postImgNumber('http://localhost:3002/moveChar', YcurPos);
    
    // 상대방 캐릭터 complete 정보
    let inputdata = {test:1};
    let result = await sendAjax('http://localhost:3002/makeChar2', inputdata);

    if(result === "true") console.log('상대방 complete')
    
}, 1000);

function postImgNumber(url, idx) {
    // index : r, n, i, g
    let imgNumber = "";
    switch(idx-1) {
        case 0 : imgNumber = "r";
                 break;
        case 1 : imgNumber = "n";
                 break;
        case 2 : imgNumber = "i";
                 break;
        case 3 : imgNumber = "g";
                 break;
    }

    let inputdata = {imgNumber:imgNumber};
    sendAjax(url, inputdata)
}

