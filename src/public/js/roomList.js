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

function Aboutversion(idx){
  if(idx == 1){
    return "사칙연산 - JAVA";
  }else if(idx == 2){
    return "역참조 배제하기 - JS";
  }else if(idx == 3){
    return "양의 정수 - JS";
  }else if(idx == 4){
    return "스크롤 만들기 - Android";
  }else if(idx == 5){
    return "파일 업로드 - PHP";
  }
}
// 기존 방 그리기
async function roomList() {
    let inputdata = {test:1};
    let data = await sendAjax('http://localhost:3002/list', inputdata)

    let wprtbody = document.querySelector('.wprtbody')

    data.map((item, idx) => {
      let vsname = Aboutversion(item.language);
      const tr = document.createElement("tr");
  
      const td1 = document.createElement("td");
      td1.innerHTML = `<td class="number">${idx+1}</td>`;
  
      const td2 = document.createElement("td");
      td2.innerHTML = `<td class="Language">${vsname}</td>`;
  
      const td3 = document.createElement("td");
      td3.innerHTML = `<td class="NickName">${item.nickname}</td>`;
  
      const td4 = document.createElement("td");
      td4.innerHTML = `<td class="Startbtn" id=${idx}><button class="Clickbtn"  onClick="roomDataSet(${item.language})">CLICK</button></td>`;
  
      tr.append(td1)
      tr.append(td2)
      tr.append(td3)
      tr.append(td4)
  
      wprtbody.append(tr)
    })
 }