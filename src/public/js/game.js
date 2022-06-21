const socket = io('http://localhost:3000')
socket.on('connect', () =>{
        console.log(socket.id);
})
function handleRoomSubmit() {
    socket.emit("join-room", "hello");
    roomName = input.value;
    input.value = "";
}
handleRoomSubmit();


function init(){
}
// 오디오
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

function MusicPlay(){
  ClickSound.play();
  audio.volume=0.02;
  ClickSound.volume=0.1;
  if(cnt%2==1){
    musicimg.src="../img/pause.png"; //멈춤
    audio.pause()
    ++cnt; 
  }else if(cnt%2==0){
    musicimg.src="../img/play.png"; //시작
    audio.play();
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

// 타자
const x = 
`<!DOCTYPE html>
<html lang="en">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`;

let startWord = 'start';

let str = x.split('\n');
let input_text = '';

const char_r = document.getElementById("mychar"); // 리정 이미지
const char_n = document.getElementById("youchar"); // 노제 이미지
let text = document.querySelector('.word-display'); // 타자미리보기
let input = document.querySelector('.word-input'); //타자치는곳
let NowText=document.querySelector('.NowText'); // 현재 타자치는 부분
let TotalText=document.querySelector('.TotalText');// 타자 총 수
/*effect 조명 */
let effect1=document.querySelector('#b1');
let effect2=document.querySelector('#b2');
let effect3=document.querySelector('#b3');

let charEls = [];
let order = 0;

TotalText.innerHTML=str.length;
effect1.hidden=true;
effect2.hidden=true;
effect3.hidden=true;
changeWord();
function letmeStart(){
    if(input==startWord){
        socket.emit('newUserConnect', showRoom)
    }
}

function changeWord(){
    // if(order==str.length-1){
    //     console.log("타자 끝")
    // }
    console.log("order : "+order+ " str : "+str.length);
    order++;
    if(order != str.length){
        populateText(str[order]);
    }else{
        alert("끝")
    }
    effect(order)
    NowText.innerHTML=order;
}
function effect(order){
    if(order==2){
        effect1.hidden=false;
    }else if(order==3){
        effect2.hidden=false;
        effect3.hidden=false;
    }
}
function populateText(str){
    charEls=[];
    str.split("").map(letter => {
        const span = document.createElement("span")
        span.innerText = letter
        // span.style.color = '#808080';
        text.appendChild(span)
        charEls.push(span)
    })
}

// 어디에 필요한 함수일까..? 없어도 잘 돌아가긴 함
// function resetCharEls(){
//     charEls.map(charEl => {
//         charEl.classList.remove("correct")
//         charEl.classList.remove("wrong")
//     })
// }

function removeCorrectCharacter() { // 친 글자 사라지는 함수
    document.querySelectorAll('.correct').forEach(item => item.remove());
}
socket.on('receive-message', message=>{
    console.log(message)
})
input.addEventListener("keyup", () => {
    const val = input.value
    let errorCount = 0;
    let start=false;
    val.split("").map((letter, i) => {
        if(letter != str[order][i]){
            charEls[i].classList.add("wrong")
            errorCount++;
        }else{
            charEls[i].classList= ``;
            charEls[i].classList.add("correct");
        }
    })
    socket.emit('send-message', val.length)
    if(val.length == str[order].length){
        $(function(){
            console.log(errorCount)
            if(errorCount === 0){

                $(function(){
                    start=true;
                    $("#out2").animate({opacity:0, top:'-25px'},1500); // 타자를 친 후 애니메이션
                    /*!! input이 사라지는게 아니라 하나의 input을 가지고 사라지는 효과만 내줌 !! */
                    removeCorrectCharacter(); // 친 글자 사라지기
                })
                console.log("Well Done!")

                // 리정 애니메이션
                for(let i=2; i<10; i++){
                    (x => {
                        setTimeout(() => {
                        let str="/img/ygx/ygx"+x+".png"
                        char_r.src=str
                        },150*x)
                    })(i)
                }

                // 노제 애니메이션
                // for(let i=2;i<12;i++){
                //     (y => {
                //         setTimeout(() => {
                //         let str="/img/wavy"+y+".png"
                //         char_n.src=str
                //         },150*y)
                //     })(i)
                // }

                $(function(){
                    $("#out2").animate({opacity:100, top:'70px'}); // input 나타나는 애니메이션
                    start=true;
                    input.value=null; // input 나타난 후 썼던 글자 지워주기
                })
                changeWord() // 다음 타자로 넘어가기
            }
        })
    }
})

