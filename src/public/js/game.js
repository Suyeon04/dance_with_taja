const str = "Type this as fast as possible."

let text = document.querySelector('.word-display'); // 타자미리보기
let input = document.querySelector('.word-input'); // 타자치는 곳
const charEls = []

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
                        let str="/img/r"+x+".jpg"
                        char_r.src=str
                        },150*x)
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


let cnt=0
const char_r = document.getElementById("mychar"); // 리정 이미지
const char_n = document.getElementById("youchar"); // 노제 이미지

$($("#btn").on("click", function(){
    ++cnt
    if(cnt%2===1){
        $(function(){
            $("#out2").animate({opacity:0, top:'-40px'},1500);
        })
        for(let i=2; i<10; i++){
            (x => {
                setTimeout(() => {
                console.log(x)
                let str="/css/r"+x+".jpg"
                char_r.src=str
                },150*x)
            })(i)
        }
    }
    else {
        $(function(){
            $("#out2").remove();
            $("<div class=box id=out2> <input type=text class=word-input placeholder=타자치는곳2 autofocus> </div>").appendTo("#taja");
        })
    }
}))