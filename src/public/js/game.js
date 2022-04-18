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