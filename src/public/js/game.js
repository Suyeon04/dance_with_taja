<<<<<<< HEAD
let cnt=0;
$($("#btn").on("click", function(){
    ++cnt;
    if(cnt%2==1){
        $(function(){
            $("#out2").animate({opacity:0, top:'-40px'},1500);
        }
        )
    }
    else {
        $(function(){
        $("#out2").remove();
        $("<div class=box id=out2> <input type=text class=Text placeholder=타자치는곳2 autofocus> </div>").appendTo("#taja");
        })
    }
}))
=======
const now = document.querySelector('#now');
const next = document.querySelector('#next');
const nowinput = document.querySelector('#nowinput');
const nextinput = document.querySelector('#nextinput');

let nowkeyword = "My name is Suyeon";
let nextkeyword = "My name is hyuna";
let alp = "";
let keywords = "";
let alpLength = 0;

function change(){
    now.innerText = nowkeyword;
    next.innerText = nextkeyword;
}
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
>>>>>>> 19eacc18ba74f6009a075a98e7da67e236d1cd9a
