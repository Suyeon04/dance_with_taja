let McurPos= 1; // 현재 보고 있는 이미지의 인덱스 번호!
let Mposition = 0; // 현재 .images 의 위치값!
let YcurPos= 1; // 현재 보고 있는 이미지의 인덱스 번호!
let Yposition = 0; // 현재 .images 의 위치값!
const IMAGE_WIDTH = 400; // 한번 움직일 때 이동해야 할 거리!

// 요소 선택
const MprevBtn = document.querySelector(".Mprev")
const MnextBtn = document.querySelector(".Mnext")
const Mimages = document.querySelector(".Mimages")

const youchar = document.querySelector(".youchar")
const YprevBtn = document.querySelector(".Yprev")
const YnextBtn = document.querySelector(".Ynext")
const Yimages = document.querySelector(".Yimages")

Minit();
Yinit();

youchar.hidden = true; // youchar div를 없애는 속성

function Mprev(){
    
    if(McurPos > 1){
    MnextBtn.removeAttribute("disabled") /* disabled 속성 제거*/
    Mposition += IMAGE_WIDTH /* position 값 증가 */
    
    Mimages.style.transform = `translateX(${Mposition}px)` /* images 스타일 transform, x축 변경*/
    McurPos -= 1; /* curPos 값 감소*/
    console.log(McurPos) // 이미지 번호 넘겨줄 위치
    }
    if(McurPos == 1){ /* 이미지 index값 0 되면 prev 못하게 */
        MprevBtn.setAttribute("disabled", 'true')
    }
 }
function Mnext(){
    if(McurPos < 4){
        MprevBtn.removeAttribute("disabled")
        Mposition -= IMAGE_WIDTH
        /*
            트랜스폼(변형)의 네가지 속성값(함수)
            - scale() : 확대 또는 축소
            - translate() : 위치 이동
            - rotate() : 회전시키기
            - skew() : 요소 비틀기
        */
        Mimages.style.transform = `translateX(${Mposition}px)`
        McurPos += 1;
        console.log(McurPos) // 이미지 번호 넘겨줄 위치
    }
    if(McurPos == 4){
        // 뒤로 못 가게 하기
        MnextBtn.setAttribute("disabled", 'true') // 못 누르는 버튼이 됨
    }
}
// 초기 랜더링 시 최초 호출 함수의 관습적 이름
function Minit(){
    // 앞으로 가기는 처음부터 못누르게!
    console.log(McurPos) // 이미지 번호 넘겨줄 위치
    MprevBtn.setAttribute("disabled", 'true')
    MprevBtn.addEventListener("click", Mprev)
    MnextBtn.addEventListener("click", Mnext)
}

function Yprev(){
    
    if(YcurPos > 1){
    YnextBtn.removeAttribute("disabled") /* disabled 속성 제거*/
    Yposition += IMAGE_WIDTH /* position 값 증가 */
    
    Yimages.style.transform = `translateX(${Yposition}px)` /* images 스타일 transform, x축 변경*/
    YcurPos -= 1; /* curPos 값 감소*/
    console.log("slide2 : "+YcurPos) // 이미지 번호 넘겨줄 위치
    }
    if(YcurPos == 1){ /* 이미지 index값 0 되면 prev 못하게 */
        YprevBtn.setAttribute("disabled", 'true')
    }
 }
function Ynext(){
    if(YcurPos < 4){
        YprevBtn.removeAttribute("disabled")
        Yposition -= IMAGE_WIDTH
        /*
            트랜스폼(변형)의 네가지 속성값(함수)
            - scale() : 확대 또는 축소
            - translate() : 위치 이동
            - rotate() : 회전시키기
            - skew() : 요소 비틀기
        */
        Yimages.style.transform = `translateX(${Yposition}px)`
        YcurPos += 1;
        console.log("slide2 : "+YcurPos) // 이미지 번호 넘겨줄 위치
    }
    if(YcurPos == 4){
        // 뒤로 못 가게 하기
        YnextBtn.setAttribute("disabled", 'true') // 못 누르는 버튼이 됨
    }
}
// 초기 랜더링 시 최초 호출 함수의 관습적 이름
function Yinit(){
    // 앞으로 가기는 처음부터 못누르게!
    console.log("slide2 : "+YcurPos) // 이미지 번호 넘겨줄 위치
    YprevBtn.setAttribute("disabled", 'true')
    YprevBtn.addEventListener("click", Yprev)
    YnextBtn.addEventListener("click", Ynext)
}

//완료
function complete(){
    const completeBtn = document.querySelector(".complete")
    completeBtn.setAttribute("visited", 'true')

}