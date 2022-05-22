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

function ChnImg(){
    
//     let str=""
//     let timer
//     for(let i=1; i<10; i++){
//         str="/css/r"+i+".jpg"
//         console.log(i);
//         char_id.src=str;
//         //timer=setInterval(()=>char_id.src=str, 800);
//     }
//     clearInterval(timer);
}
