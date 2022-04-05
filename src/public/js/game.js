const now = document.querySelector('#now');
const next = document.querySelector('#next');


let nowkeyword = "My name is Suyeon";
let nextkeyword = "My name is hyuna";

function change(){
    now.innerText = nowkeyword;
    next.innerText = nextkeyword;
}
change();