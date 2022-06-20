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

// 기존 방 그리기
async function roomList() {
    let inputdata = {test:1};
    let data = await sendAjax('http://localhost:3002/list', inputdata)

    let wprtbody = document.querySelector('.wprtbody')

    data.map((item, idx) => {
      const tr = document.createElement("tr");
  
      const td1 = document.createElement("td");
      td1.innerHTML = `<td class="number">${idx}</td>`;
  
      const td2 = document.createElement("td");
      td2.innerHTML = `<td class="Language">${item.language}</td>`;
  
      const td3 = document.createElement("td");
      td3.innerHTML = `<td class="NickName">${item.ninkname}</td>`;
  
      const td4 = document.createElement("td");
      td4.innerHTML = `<td class="Startbtn" id=${idx}><button class="Clickbtn"  onClick="roomDataSet(${item.language})">CLICK</button></td>`;
  
      tr.append(td1)
      tr.append(td2)
      tr.append(td3)
      tr.append(td4)
  
      wprtbody.append(tr)
    })
 }