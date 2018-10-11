var c2d = document.getElementById('canvas').getContext('2d');
var canvas = document.getElementById('canvas');
let point = {x:-1,y:-1,drawable:false};
// 메모
canvas.addEventListener('mousedown', drawing, false);
canvas.addEventListener('mousemove', drawing, false);
canvas.addEventListener('mouseup', drawing, false);
canvas.addEventListener('mouseout', drawing, false);
function drawing(event) {
  if (drawCheck) {
    let type = event.type;
    switch (type) {
      case "mousedown":
          startDraw(event);
        break;
      case "mousemove":
          moveDraw(event);
        break;
      case "mouseup":
          endDraw(event);
        break;
      case "mouseup":
          endDraw(event);
        break;
    }
  }
  console.log('drawCheck false!!');
  // c2d.beginPath();
  // c2d.moveTo(point.x,point.y);
  // c2d.lineTo(event.layerX,event.layerY);
  // c2d.stroke();
}
// 캔버스 선그리기 시작포인트 지정
function startDraw(e){
  point.drawable = true;
  c2d.beginPath();
  point.x = e.layerX;
  point.y = e.layerY;
  console.log('start point = '+point.x+" : "+point.y);
  c2d.moveTo(point.x,point.y);
}
// 캔버스 마우스 좌표에 따라 선그리기
function moveDraw(e) {
  if (point.drawable) {
    c2d.lineTo(e.layerX,e.layerY);
    c2d.strokeStyle = selectCol;
    c2d.lineWidth = lineValue;
    c2d.lineCap = 'round';
    c2d.lineJoin = 'round';
    c2d.stroke();
  }
}
// 캔버스 종료
function endDraw(e) {
  point.x=-1;
  point.y=-1;
  point.drawable = false;
}

// canvas color 변경
var col = document.getElementById('color');
var selectCol;
col.addEventListener('click', selectColor, false);
function selectColor() {
  let div = document.createElement('div');
  div.setAttribute('id', 'addColors');
  div.style = 'border:3px solid red; position:relative; width:170px; height:20px; left:300px;';
  controls.appendChild(div,cbtn);
  let colors = ['black','white','gray','red','yellow','blue','orange','green'];
  for (var i in colors) {
    var input = document.createElement('input');
    input.setAttribute('type', 'button');
    input.setAttribute('value', '  ');
    input.setAttribute('class', 'colors');
    input.style = 'border:none; background-color:'+colors[i]+';';
    input.setAttribute('onclick', 'changeLineColor(this)');

    div.appendChild(input);
  }
  controls.appendChild(div,cbtn);
}
// 색상변경
function changeLineColor(att) {
  console.log(att);
  selectCol = att.style.backgroundColor;
  color.style.background = selectCol;
  document.getElementById('addColors').remove();
}
// 라인 굵기변경
var lineWidth = document.getElementById('lineWidth');
var lineValue = 2;
lineWidth.addEventListener('change', lineWidthEvent, false);
function lineWidthEvent() {
  console.log(lineWidth.value);
  lineValue = lineWidth.value;

}
//canvas download
var down = document.getElementById('down');
down.addEventListener('click', canvasDownload, false);
function canvasDownload() {
  let url = canvas.toDataURL('image/png');
  url = url.replace(/^data:image\/[^;]*/, 'data:application/octe-stream');
  // url = url.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=/');
  var date = new Date();
  var name = video.src.substring(video.src.lastIndexOf('/')+1, video.src.lastIndexOf('.'));
  console.log(name);

  var a = document.createElement('a');
  a.download = name+date.getFullYear()+date.getMonth()+date.getDate()+'.png';
  console.log(a);
  a.href = url;
  a.click();
}
