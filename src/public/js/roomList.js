// 기존 방 그리기
function roomList() {
    let data = [
      {
        'language':'Android',
        'ninkname':'쭈꾸',
      }, {
        'language':'JAVA',
        'ninkname':'뿌꾸',
      }, {
        'language':'Spring',
        'ninkname':'앵그리꾸꾸',
      }, {
        'language':'JavaScript',
        'ninkname':'어피치',
      }, {
        'language':'C',
        'ninkname':'우아해',
      }, {
        'language':'Spring',
        'ninkname':'하니해',
      }, {
        'language':'Android',
        'ninkname':'신기방기뿡뿡방기',
      }
    ]
  
    data.map((item, idx) => {
      document.write("<tr>");
      document.write(`<td class="number">${idx}</td>`);
      document.write(`<td class="Language">${item.language}</td>`);
      document.write(`<td class="NickName">${item.ninkname}</td>`);
      document.write(`<td class="Startbtn" id=${idx}><button class="Clickbtn" onClick="roomDataSet(${item.language})">CLICK</button></td>`);
      document.write("</tr>");
    })
  }