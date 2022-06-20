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
const IMAGE_WIDTH = 500; // 한번 움직일 때 이동해야 할 거리!

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

const Startbtn=document.querySelector(".Start"); // 게임 시작 버튼

Minit();
//Yinit();

//youchar.hidden = true; // youchar div를 없애는 속성
// 선택완료 숨기기
select1.hidden=true;
select2.hidden=true;
Startbtn.hidden=true;

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
    const completeBtn = document.querySelector(".complete")
    completeBtn.classList.add("completed");
    console.log(McurPos+"캐릭터 선택완료");
    // MprevBtn.setAttribute("disabled", 'true')
    // MnextBtn.setAttribute("disabled", 'true')
    MprevBtn.hidden=true;
    MnextBtn.hidden=true;
    Startbtn.hidden=false; // 게임시작버튼 보이기
    
    //선택완료 보이기
    select1.hidden=false;
    // select2.hidden=false;
}

function GameStart(){
    location.href="http://localhost:3002/game";
}