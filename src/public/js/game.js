const x = 
`<!DOCTYPE html>
<html lang="en">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
border-collapse: collapse; }
border-bottom: 1px solid #444444;
input:focus { background:rgb(250, 217, 157); }
<form method="post" action="insert.php" enctype="multipart/form-data">
<table  cellspacing=0 cellpadding=0>
<tr><td >제목: <input type="text" name="title" size="10">
<button type="submit">입력완료</button></td></tr>`;

let str = x.split('\n');
let input_text = '';

const char_r = document.getElementById("mychar"); // 리정 이미지
const char_n = document.getElementById("youchar"); // 노제 이미지
let text = document.querySelector('.word-display'); // 타자미리보기
let input = document.querySelector('.word-input'); //타자치는곳
let charEls = [];
let order = 0;

changeWord();

function changeWord(){
    order++;
    populateText(str[order]);
    
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

input.addEventListener("keyup", (event) => {
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
                    $("#out2").animate({opacity:0, top:'-35px'},1500); // 타자를 친 후 애니메이션
                    /*!! input이 사라지는게 아니라 하나의 input을 가지고 사라지는 효과만 내줌 !! */
                    removeCorrectCharacter(); // 친 글자 사라지기
                })
                console.log("Well Done!")

                // 리정 애니메이션
                for(let i=2; i<10; i++){
                    (x => {
                        setTimeout(() => {
                        let str="/img/ygx"+x+".png"
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
                    $("#out2").animate({opacity:100, top:'40px'}); // input 나타나는 애니메이션
                    start=true;
                    input.value=null; // input 나타난 후 썼던 글자 지워주기
                })

                changeWord() // 다음 타자로 넘어가기
            }
        })
    }
})

