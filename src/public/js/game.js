const str = "Type this as fast as possible."

const char_r = document.getElementById("mychar"); // 리정 이미지
const char_n = document.getElementById("youchar"); // 노제 이미지
let text = document.querySelector('.word-display'); // 타자미리보기
let input = document.querySelector('.word-input'); // 타자치는 곳
const charEls = []

/*음악버튼*/
let cnt=1;
function imgbtn(){
    if(cnt%2==1){
        document.querySelector("").src="../images/false.png";
        cnt = 1;
        haha = 0;
      }else{
        document.getElementById("musicbtn").src="../images/true.png";
        cnt = 0;
        haha = 1;
      }
      localStorage.setItem("cnt",cnt);
      cnt++;
}
function populateText(str){
    str.split("").map(letter => {
        const span = document.createElement("span")
        span.innerText = letter
        text.appendChild(span)

        charEls.push(span)
    })
}
populateText(str)

function resetCharEls(){
    charEls.map(charEl => {
        charEl.classList.remove("correct")
        charEl.classList.remove("wrong")
    })
}
input.addEventListener("keyup", () => {
    const val = input.value
    let errorCount = 0
    let start=false;
    val.split("").map((letter, i) => {
        if(letter === str[i]){
            charEls[i].classList.add("correct")
        }else{
            charEls[i].classList.add("wrong")
            errorCount++
        }
    })

    if(val.length == str.length){
        $(function(){
            $("#out2").animate({opacity:0, top:'-40px'},1500);
            start=true
        })
        $(function(){
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
            })
        },1600); 
    }
})
