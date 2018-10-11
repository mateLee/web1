window.onload = video_controls;
var v, pbtn, seekBar, ctime, dtime, fscreen, canvas, can, cbtn, cContents, lineColor, move, poleft, optop;

function video_controls() {
  v = document.getElementById('vContents');
  pbtn = document.getElementById('pbtn');
  seekBar = document.getElementById('seekBar');
  ctime = document.getElementById('curtime');
  dtime = document.getElementById('durtime');
  // fscreen = document.getElementById('full');
  canvas = document.getElementById('canvas');
  cbtn = document.getElementById('cbtn');
  cContents = document.getElementById('canvas_container');
  move = document.getElementById('move');

  lineColor = 'white';
  // play button event
  canvas.width = v.offsetWidth;
  canvas.height = v.offsetHeight;


  pbtn.addEventListener('click', playEvent, false);
  seekBar.addEventListener('change', changeEvent, false);
  v.addEventListener('timeupdate', timeEvent, false);
  // fscreen.addEventListener('click', fullEvent, false);
  cbtn.addEventListener('click', canvasEvent, false);

}

function playEvent() {
  if (v.paused) {
    if (cContents.style.display == 'inline') {
      cContents.style.display = 'none';
      document.getElementById('selectColor').style.display = 'none';
      document.getElementById('canvas_tool').style.display = 'none';
      vContents.style.display = 'inline';
    }
    v.play();
    pbtn.value = 'paused';
  } else {
    v.pause();
    pbtn.value = 'play';
  }
}

function changeEvent() {
  // duration 총 재생시간, currentTime 현재생시간
  let time = (seekBar.value  / 100) * v.duration;
  v.currentTime = time;
}

function timeEvent() {
  let point = v.currentTime * (100 / v.duration);
  seekBar.value = point;

  let curtime = v.currentTime.toFixed(2).split('.');
  let durtime = v.duration.toFixed(2).split('.');
  let csecs = curtime[0];
  let cmsecs = curtime[1];
  let dsecs = durtime[0];
  let dmsecs = durtime[1];

  if (csecs < 10) {
     csecs = "0" + csecs;
  }
  if (cmsecs < 10 && cmsecs.length < 2) {
     cmsecs = "0" + cmsecs;
  }
  if (dsecs < 10) {
     dsecs = "0" + dsecs;
  }
  // if (dmsecs < 10) {
  //    dmsecs = "0" + dmsecs;
  // }

  ctime.innerText = csecs+':'+cmsecs;
  dtime.innerText = dsecs+':'+dmsecs;
}

// function fullEvent() {
//   var fullScreen = document.getElementById('left_container');
//   var org = document.getElementById('left_container');
//   if (v.requestFullscreen) {
//     org.requestFullscreen();
//   } else if (v.mozRequestFullScreen) {
//     org.mozRequestFullscreen();
//   } else if (v.webkitRequestFullscreen) {
//     org.webkitRequestFullscreen();
//   }
//
//   org.style.width = '100%';
//   org.style.height = '100%';
// }
//
// document.addEventListener("webkitfullscreenchange", function(){
//     if(!document.webkitIsFullScreen){
//         org.remove;
//         document.getElementById('container').innerHTML = fullScreen;
//     }
// });

function canvasEvent() {


  v.pause();
  pbtn.value = 'play';
  vContents.style.display = 'none';
  cContents.style.display = 'inline';

  document.getElementById('selectColor').style.display = 'inline';
  document.getElementById('canvas_tool').style.display = 'inline';

  can = canvas.getContext('2d');
  can.drawImage(v,0,0,canvas.width,canvas.height);

  poleft = canvas.offsetLeft;
  potop = canvas.offsetTop;

  // if (move.value == 'stop') {
    canvas.addEventListener('mousedown', listener);
    canvas.addEventListener('mousemove', listener);
    canvas.addEventListener('mouseup', listener);
    canvas.addEventListener('mouseout', listener);
  // }

}
var pos = {
  drawable: false,
  x: -1,
  y: -1
};
function listener(event) {
  let et = event.type;
  switch (et) {
    case "mousedown":
        if (move.value=='stop') {
          initDraw(event);
        }

      break;
    case "mousemove":
      if(pos.drawable){
        draw(event);
      }
      break;
    case "mouseout":
    case "mouseup":
      finisDraw();
      break;
  }
}
function initDraw(event){
  can.beginPath();
  pos.drawable = true;
  var coors = getPosition(event);
  pos.X = coors.X;
  pos.Y = coors.Y;
  can.moveTo(pos.X, pos.Y);
}
function draw(event){

  var coors = getPosition(event);
  can.lineTo(coors.X, coors.Y);
  pos.X = coors.X;
  pos.Y = coors.Y;
  can.strokeStyle = lineColor; // 선색지정
  can.stroke();
}
function finisDraw(event) {
  pos.drawable = false;
  pos.X = -1;
  pos.Y = -1;
}
function getPosition(event) {
  var x = event.pageX - poleft;
  var y = event.pageY - potop;
  return {X:x,Y:y};
}
function changeLineColor(t) {
  lineColor = t.style.backgroundColor;
  document.getElementById('selectColor').style.backgroundColor = lineColor;
}


var a = document.getElementById('list');
a.addEventListener('click', function() {
  let diCheck = document.getElementById('file_list').style.display;
  let show = document.getElementById('show_list');
  if (diCheck == 'none') {
    document.getElementById('file_list').style.display = 'inline';
    show.style.width = 49+'%';
    // show.style.marginLeft = 30+'%';
  } else {
    document.getElementById('file_list').style.display = 'none';
    show.style.width = 60+'%';

  }

})

function getData(data) {
  let divin = document.getElementById('show_list');
  let name = data.innerText;
  let check = document.getElementById(name) ? true : false;

  if (check) {
    alert('Object is already loaded in timeline');
    return;
  } else {
    let img = document.createElement('img');
    img.setAttribute('id',name);

    img.setAttribute('src', "/video/"+name+'.png');
    img.style = 'width:60%; height:80%; margin-left:1%; margin-right:1%; margin-top:5%;';

    divin.appendChild(img);

    document.getElementById(name).addEventListener('dblclick', changeData, false);
  }
}

function changeData(event) {
  let el = event.toElement;
  name = el.id;
  v.src = '/video/'+name+'.mp4';
}

// zomm in and out test
var zin = document.getElementById('zoom_in');
var zout = document.getElementById('zoom_out');
var zreset = document.getElementById('z_reset');
var zValue = 1;

zin.addEventListener('click', zoomIn, false);
zout.addEventListener('click', zoomOut, false);
zreset.addEventListener('click', zoomReset, false);

function zoomIn() {
  // zValue = Math.max(1, zValue-0.25);
  zValue = Math.max(1, zValue-0.25);
  canvas.style.transform = 'scale(' + (1/zValue) + ')';
}
function zoomOut() {
  zValue = zValue+0.25;
  canvas.style.transform = 'scale(' + (1/zValue) + ')';
}
function zoomReset() {
  zValue = 1;
  canvas.style.transform = 'scale(' + zValue + ')';
}

// imge drag
var moveImge = document.getElementById('move');
moveImge.addEventListener('click', moveTo, false);
function moveTo(){
  move.value = 'move';
  canvas_container.addEventListener('mousedown', startMove, false);
}

let l, t, target;

function startMove() {

  if (move.value == 'move') {
    console.log(this);
    target = event.toElement;
    let e = event;
    l = target.offsetLeft - e.offsetX;
    t = target.offsetTop - e.offsetY;

    document.onmousemove = moveDrag;
    document.onmouseup = stopDrag;
    move.value = 'stop';
  }

}

function moveDrag() {
  e = event;
  poleft = parseInt(e.offsetX+l);
  potop = parseInt(e.offsetY+t);
  target.style.transform = 'translate3d('+poleft+'px,'+potop+'px,'+'0px)';

  // 아래방법으로 하면 해당 스타일에 포지션 절대위치에 왼쪽과 탑 값을 줘야 이동 됨 따라서 위방법으로 교체
  // target.style.top = dy+'px';
  //target.style.left = dx+'px';
  return false;
}

function stopDrag() {
  document.onmousemove = null;
  document.onmouseup = null;
}
