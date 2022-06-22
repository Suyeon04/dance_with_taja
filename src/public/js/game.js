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
let startcount=document.querySelector(".start");
let countspan = document.querySelector(".count");
let counts=5;
startcount.hidden=true;
countspan.hidden=true;
let timer = () =>{
    setTimeout(() => { clearInterval(timerId);  startcount.hidden=true; countspan.hidden=true;}, 6000);
    let timerId=setInterval(() =>{
        startcount.hidden=false; countspan.hidden=false;
        countspan.innerText=counts--;
    }, 1000);
}
//test
// setTimeout(()=>timer(), 10000);

//캐릭터 랜덤
const char_my = document.getElementById("mychar"); // 나의 이미지
const char_your = document.getElementById("youchar"); // 상대 이미지
let mychar;
let yourchar;
randchar();
function shuffle(array){
    array.sort(() => Math.random() - 0.5);
}
function randchar(){
    let numbers = [1,2,3,4];
    shuffle(numbers);
    
    switch(numbers[0]){
        case 1 : mychar="hook"; break;
        case 2 : mychar="lachica"; break;
        case 3 : mychar="wavy"; break;
        case 4 : mychar="ygx"; break;
    }
    char_my.src="/img/"+mychar+"/1.png";

    switch(numbers[1]){
        case 1 : yourchar="hook"; break;
        case 2 : yourchar="lachica"; break;
        case 3 : yourchar="wavy"; break;
        case 4 : yourchar="ygx"; break;
    }
    char_your.src="/img/"+yourchar+"/1.png";
    console.log(mychar+" "+yourchar);
}
// 타자
const x = 
`<!DOCTYPE html>
<html lang="en">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge">`;

let startWord = 'start';

let str = x.split('\n');
let input_text = '';

let text = document.querySelector('.word-display'); // 타자미리보기
let input = document.querySelector('.word-input'); //타자치는곳
let NowText=document.querySelector('.NowText'); // 현재 타자치는 부분
let TotalText=document.querySelector('.TotalText');// 타자 총 수
let endingbtn=document.querySelector('.ending'); // ending 버튼
/*effect 조명 */
let m1=document.querySelector('#m1');
let m2=document.querySelector('#m2');
/*effect 꽃가루 */
let m4_1=document.querySelector('#m4_1');
let m4_2=document.querySelector('#m4_2');
let y4_1=document.querySelector('#y4_1');
let y4_2=document.querySelector('#y4_2');
/*effect 작은 꽃가루 */
let m5=document.querySelector('#m5');
let y5=document.querySelector('#y5');

let charEls = [];
let order = -1;

TotalText.innerHTML=str.length;
m4_1.hidden=true;
m4_2.hidden=true;
y4_1.hidden=true;
y4_2.hidden=true;
m5.hidden=true;
y5.hidden=true;
endingbtn.hidden=true;

changeWord();

function changeWord(){
    // if(order==str.length-1){
    //     console.log("타자 끝")
    // }
    //console.log("order : "+order+ " str : "+str.length);
    
    if(order >= str.length-1){
        // alert("끝")
        m4_1.hidden=false;
        m4_2.hidden=false;
        y4_1.hidden=false;
        y4_2.hidden=false;
        ClapSound.play();
        endingbtn.hidden=false;
        return 0;        
    }else{
        order++;
        NowText.innerHTML=order+1;
        effects(order)
        populateText(str[order]);
    }
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

let mysizeup; // 나의 캐릭터 커지기
$(document).ready(function(){
    function chareffect(){
    // $("#mychar").animate({width:'351px', height:'450px'},2000);
    // $("#mychar").animate({width:'251px', height:'350px'},1500);
    // $('#mychar').css({width:'351px', height:'450px'});
    $('#mychar').css({width:'30%'});
    $('#mychar').css({height:'55%'});
   }
   mysizeup=chareffect;
});

let mysizedown; // 나의 캐릭터 작아지기
$(document).ready(function(){
    function chareffect(){
    $('#mychar').css({width:'20%'});
    $('#mychar').css({height:'38%'});
   }
   mysizedown=chareffect;
});

let youresizeup; // 상대 캐릭터 커지기
$(document).ready(function(){
    function chareffect(){
    // $("#mychar").animate({width:'351px', height:'450px'},2000);
    // $("#mychar").animate({width:'251px', height:'350px'},1500);
    // $('#mychar').css({width:'351px', height:'450px'});
    $('#youchar').css({width:'30%'});
    $('#youchar').css({height:'55%'});
   }
   yoursizeup=chareffect;
});

let yoursizedown; // 상대 캐릭터 커지기
$(document).ready(function(){
    function myeffect(){
    $('#youchar').css({width:'20%'});
    $('#youchar').css({height:'38%'});
   }
   yoursizedown=myeffect;
});

function mydance(){ // 나의 캐릭터 춤
    // my 애니메이션
    let x=2;
    for(let i=1; i<=26; i++){
        if(x<14){
            (m => {
                setTimeout(() => {
                let str="/img/"+mychar+"/"+m+".png"
                char_my.src=str
                },150*m)
            })(x)
            ++x;
        }else{
            x=2;
        }
    }
}
function yourdane(){
    // you 애니메이션
    let x=2;
    for(let i=1;i<=26;i++){
        
        if(x<14){
            
            (y => {
                setTimeout(() => {
                let str="/img/"+yourchar+"/"+y+".png"
                char_your.src=str
                },150*y)
                // console.log("x"+y);
            })(x)
            ++x;
        }else{
            x=2;
        }
    }
}
function effects(order){
    switch(order){
        case 1 : overcolor(); 
                 mysizedown();
                 yoursizeup(); 
                 yourdane(); break;

        case 2 : wincolor();
                 mysizeup();
                 yoursizedown();
                 ClapSound.play(); 
                 mydance(); break;

        case 3 : identicalcolor(); 
                 mysizedown(); break;

        case 4 : identicalcolor();
                //  m5.hidden=false;
                // ClapSound.play(); 
                break;

        case 5 : wincolor();
                 m5.hidden=true;
                 mysizeup();
                 yoursizedown();
                 ClapSound.play(); break;

        case 6 : identicalcolor();
                 mysizedown(); break;
        case 7 : break;
        case 8 : break;
        case 9 : break;
        case 10 : break;
        case 11 : break;
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
            // console.log(errorCount)
            if(errorCount === 0){

                $(function(){
                    start=true;
                    $("#out2").animate({opacity:0, top:'-25px'},2000); // 타자를 친 후 애니메이션
                    /*!! input이 사라지는게 아니라 하나의 input을 가지고 사라지는 효과만 내줌 !! */
                    removeCorrectCharacter(); // 친 글자 사라지기
                })

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