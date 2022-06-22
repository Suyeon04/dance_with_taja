//ajax 보내는 부분 : async api
async function sendAjax(url, data){

    var dataInfo = {
        method : "POST",  //메소드 반드시 지정해줘야 app.js 파일에서 찾을수 있음.
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
    };
  
    const reqURL = await fetch(url,dataInfo);  
    const result = await reqURL.json(); //JSON값 받아오기
  
    return result.data;
}

async function rankList() {
    let inputdata = {test:1};
    let data = await sendAjax('http://localhost:3002/ranking', inputdata)

    console.log(data)

    let rankbody = document.querySelector('.ranklist')

    data.map((item, idx) => {
      const li = document.createElement("li");
  
      const td1 = document.createElement("span");
      td1.innerHTML = `<span>${idx+1}</span>`;
      td1.className ='number'
  
      const td2 = document.createElement("span");
      td2.innerHTML = `<span>${item.nickname}</span>`;
      td2.id = `name${idx+1}`
      td2.className ='name'
  
      const td3 = document.createElement("span");
      td3.innerHTML = `<span>${item.typing}</span>`;
      td3.id = `num${idx+1}`
      td3.className ='points'
  
      const td4 = document.createElement("span");
      if(idx <  3) {
        td4.innerHTML = `<span id=${idx}><i class="fas fa-trophy"></i></span>`;
      } else if(idx < 6){
        td4.innerHTML = `<span id=${idx}><i class="fas fa-medal"></i></span>`;
      } else {
        td4.innerHTML = `<span id=${idx}><i class="fas fa-award"></i></span>`;
      }
      td4.className ='badge'
  
      li.append(td1)
      li.append(td2)
      li.append(td3)
      li.append(td4)
  
      rankbody.append(li)
    })
}

function home(){
    location.replace("http://localhost:3002/");
}