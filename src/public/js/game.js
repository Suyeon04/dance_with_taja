const x = 
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<style>
table {
width: 50%;
border-top: 1px solid #444444;
border-collapse: collapse; }
th, td {
border-bottom: 1px solid #444444;
padding: 10px; }
input:focus { background:rgb(250, 217, 157); }
</style>
</head>
<body>
<form method="post" action="insert.php" enctype="multipart/form-data">
<table  cellspacing=0 cellpadding=0>
<tr><td >제목: <input type="text" name="title" size="10">
<tr><td >저자: <input type="text" name="author" size="10">
<tr><td >가격: <input type="text" name="price" size="10">
<tr><td >표지: <input type="file" name="image" size="10">
<tr><td >상세정보: <input type="text" name="description" size="10">
<tr><td style="border-bottom:0" colspan="2" align="center">
<button type="submit">입력완료</button></td></tr>
</table>
</form> 
</body>
</html>`;
let str = x.split('\n');
let input_text = '';

const char_r = document.getElementById("mychar"); // 리정 이미지
const char_n = document.getElementById("youchar"); // 노제 이미지
let text = document.querySelector('.word-display'); // 타자미리보기
let input = document.querySelector('.word-input'); // 타자치는 곳
let charEls = [];
let order = 0;

changeWord();
function populateText(str){
    charEls=[];
    console.log(charEls)
    str.split("").map(letter => {
        const span = document.createElement("span")
        span.innerText = letter
        span.style.color = '#808080';
        text.appendChild(span)
        charEls.push(span)
    })
}


function resetCharEls(){
    charEls.map(charEl => {
        charEl.classList.remove("correct")
        charEl.classList.remove("wrong")
    })
}
function changeWord(){
    order++;
    populateText(str[order]);
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
            $("#out2").animate({opacity:0, top:'-40px'},1500);
            start=true
        })
        $(function(){
            console.log(charEls)
            if(errorCount === 0){
                console.log("Well Done!")
                for(let i=2; i<10; i++){
                    (x => {
                        setTimeout(() => {
                        console.log(x)
                        let str="/img/ygx"+x+".png"
                        char_r.src=str
                        },150*x)
                    })(i)
                }

                for(let i=2;i<12;i++){
                    (y => {
                        setTimeout(() => {
                        console.log(y)
                        let str="/img/wavy"+y+".png"
                        char_n.src=str
                        },150*y)
                    })(i)
                }
            }
        })
        setTimeout(()=>{
            $(function(){
                $("#out2").remove();
                $("<div class=box id=out2> <input type=text class=word-input placeholder=타자치는곳2 autofocus> </div>").appendTo("#taja");
                changeWord();
            })
        },1600); 
        
    }
})
