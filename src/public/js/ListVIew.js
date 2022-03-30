let clickButton = document.querySelectorAll(".Startbtn");

clickButton.forEach((box) =>{
    box.addEventListener('click', onclickBox)
});

function onclickBox(e){
    let value = this.id;//id이름 가져오기(여기에선 번호 가져옴-id이름이 번호이기 때문)
    //alert(value);
    location.replace('/game'); //파일 game으로 넘어가기
}