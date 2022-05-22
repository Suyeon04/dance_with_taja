let cnt=0
const char_r = document.getElementById("mychar");
const char_n = document.getElementById("youchar");

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
            $("<div class=box id=out2> <input type=text class=Text placeholder=타자치는곳2 autofocus> </div>").appendTo("#taja");
        })
    }
}))

let nowkeyword = "My name is Suyeon";
let nextkeyword = "My name is hyuna";
let alp = "";
let keywords = "";
let alpLength = 0;

function change(){
    now.innerText = nowkeyword;
    next.innerText = nextkeyword;
}//걍 input으로 하는데 밑줄을 그어버릴까?
nowinput.oninput = function(){
    document.addEventListener("keydown",isRight, false);
    let inputvalue = nowinput.value;
    alp = (inputvalue||"").split("");
    keywords = (nowkeyword||"").split("");
    if(alp[alp.length-1]!=keywords[alp.length-1]){
        now.style.color = "#228B22";
    }else{

    }

}

function isRight(){

}

change();
