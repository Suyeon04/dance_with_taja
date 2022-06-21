//복사 방지
// window.addEventListener("copy", (e) => {
//     alert("정정당당히 경쟁해라!");
//     e.preventDefault();
//     e.clipboardData.clearData("Text"); // 클립보드에 저장된 컨텐츠 삭제
// });

// const { RedisStore } = require("@socket.io/admin-ui");

// 오디오
let playbtn=document.querySelector("#playbtn");
let musicimg=document.querySelector(".btnimg");
let musicbtn=document.querySelector("#musicbtn");
let cnt=1;
let ClickSound=new Audio("/audio/clicksound.wav");
let ClapSound=new Audio("/audio/박수소리.wav");
let audio=new Audio();
audio.src="/audio/Music4.mp3";
audio.autoplay=true;
audio.volume=0.02;
ClickSound.volume=0.1;
ClapSound.volume=0.1;
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

// 시작 전 count
let timer = () =>{
    setTimeout(() => { clearInterval(timerId);  start.hidden=true; countspan.hidden=true;}, 6000);
    let timerId=setInterval(() =>{
        start.hidden=false; countspan.hidden=false;
        countspan.innerText=counts--;
    }, 1000);
}
//test
// setTimeout(()=>timer(), 10000);
let start=document.querySelector(".start");
let countspan = document.querySelector(".count");
let counts=5;
start.hidden=true;
countspan.hidden=true;
//5초 후에 정지
//let timerstop = () => setTimeout(() => { clearInterval(timerId);  start.hidden=true; countspan.hidden=true;}, 6000);

//캐릭터 랜덤
function randchar(){

}
// 타자
const x = 
`<!DOCTYPE html>
<html lang="en">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge">`;

let startWord = 'start';

let str = x.split('\n');
let input_text = '';

const char_my = document.getElementById("mychar"); // 리정 이미지
const char_youre = document.getElementById("youchar"); // 노제 이미지
let text = document.querySelector('.word-display'); // 타자미리보기
let input = document.querySelector('.word-input'); //타자치는곳
let NowText=document.querySelector('.NowText'); // 현재 타자치는 부분
let TotalText=document.querySelector('.TotalText');// 타자 총 수
let endingbtn=document.querySelector('.ending'); // ending 버튼
/*effect 조명 */
let effect2=document.querySelector('#b2');
let effect3=document.querySelector('#b3');
/*effect 꽃가루 */
let effect4_1=document.querySelector('#b4_1');
let effect4_2=document.querySelector('#b4_2');
/*effect 음표효과 */
let effect5=document.querySelector('#b5');

let charEls = [];
let order = -1;

TotalText.innerHTML=str.length;
// effect2.hidden=true;
// effect3.hidden=true;
effect4_1.hidden=true;
effect4_2.hidden=true;
effect5.hidden=true;
endingbtn.hidden=true;

changeWord();

function changeWord(){
    // if(order==str.length-1){
    //     console.log("타자 끝")
    // }
    //console.log("order : "+order+ " str : "+str.length);
    order++;
    if(order != str.length){
        effect(order)
        populateText(str[order]);
    }else{
        // alert("끝")
        effect4_1.hidden=false;
        effect4_2.hidden=false;
        effect5.hidden=true;
        ClapSound.play();
        endingbtn.hidden=false;
    }
    NowText.innerHTML=order;
}
let overcolor;// 지고 있는 사람 빨간색
$(document).ready(function(){
    function coloreffect(){
    $("#out1").css("background-color", "lightcoral");
    $(".word-display").css("color", "white");
    // $(".box").css("background-color", "green");
   }
   overcolor=coloreffect;
});

let wincolor;// 이기고 있는 사람 초록색
$(document).ready(function(){
    function coloreffect(){
    $("#out1").css("background-color", "aquamarine");
    $(".word-display").css("color", "white");
    // $(".box").css("background-color", "green");
   }
   wincolor=coloreffect;
});

let identicalcolor;// 대전 중
$(document).ready(function(){
    function coloreffect(){
    $("#out1").css("background-color", "chocolate");
    $(".word-display").css("color", "white");
    // $(".box").css("background-color", "green");
   }
   identicalcolor=coloreffect;
});

let myeffect1; // 캐릭터가 커지는 효과
$(document).ready(function(){
    function myeffect(){
    // $("#mychar").animate({width:'351px', height:'450px'},2000);
    // $("#mychar").animate({width:'251px', height:'350px'},1500);
    // $('#mychar').css({width:'351px', height:'450px'});
    $('#mychar').css({width:'20%'});
    // , , marginleft:'10%'
    $('#mychar').css({height:'60%'});
    // $('#mychar').animate($('#mychar').css({'transform':'rotate('+test0+'deg)'}),2000);
   }
   myeffect1=myeffect;
});

function effect(order){
    if(order==1){
        effect2.hidden=false;
        overcolor();
        ClapSound.play();
    }else if(order==2){
        wincolor();
        myeffect1();
        ClapSound.play();
    }else if(order==3){
        identicalcolor();
        effect3.hidden=false;
        // myeffect1();
    }else if(order==4){
        identicalcolor();
        effect5.hidden=false;
        // myeffect1();
        ClapSound.play();
    }else if(order==5){
        effect5.hidden=true;
        wincolor();
        myeffect1();
        ClapSound.play();
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
    if(val.length == str[order].length){
        $(function(){
            console.log(errorCount)
            if(errorCount === 0){

                $(function(){
                    start=true;
                    $("#out2").animate({opacity:0, top:'-25px'},4000); // 타자를 친 후 애니메이션
                    /*!! input이 사라지는게 아니라 하나의 input을 가지고 사라지는 효과만 내줌 !! */
                    removeCorrectCharacter(); // 친 글자 사라지기
                })
                // console.log("Well Done!")

                // my 애니메이션
                for(let i=2; i<14; i++){
                    (x => {
                        setTimeout(() => {
                        let str="/img/hook/"+x+".png"
                        char_my.src=str
                        },150*x)
                    })(i)
                }

                // you 애니메이션
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

function move(){
    location.href="http://localhost:3002/ranking";
}