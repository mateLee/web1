// 재생이벤트
var pbtn = document.getElementById('pbtn');
var tf = document.getElementById('tf');
// var video = document.querySelector('video');
var fps = document.getElementById('fps');
var frame = VideoFrame({
  id: 'video',
  frameRate: 24,
  callback: function(frame) {
    fps.innerText = frame;
  }
});
video = frame.video;
if (video.autoplay) {
  frame.listen('frame');
}

var drawCheck = false;
var tfCheck = false;

pbtn.addEventListener('click', playEvent, false);
function playEvent() {
  console.log(event);
  document.activeElement.blur();
  if (video.paused) {
    if (video.style.display == 'none') {
      video.style.display = 'inline-block';
      canvas.style.display = 'none'
    }
    video.play();
    frame.listen('frame');
    pbtn.value = 'paused';

  } else {
    video.pause();
    frame.stopListen();
    pbtn.value = 'play';
  }
}

// 재생바
var see = document.getElementById('seekBar');
see.addEventListener('change', barEvent, false);
function barEvent() {
  let point = video.duration * (see.value/100);
  video.currentTime = point;
}

// 재생중 이벤트
var ctime = document.getElementById('curtime');
var dtime = document.getElementById('durtime');
video.addEventListener('timeupdate', timeEvent, false);
function timeEvent() {
  let time = video.currentTime * (100/video.duration);
  see.value = time;
// console.log(video.currentTime);
  let curtime = video.currentTime.toFixed(2).split('.');
  let durtime = video.duration.toFixed(2).split('.');
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
  ctime.innerText = csecs+':'+cmsecs;
  dtime.innerText = dsecs+':'+dmsecs;
}

// 캔버스 이벤트
var cbtn = document.getElementById('cbtn');
// var ctool = document.querySelector('.canvas_tool');
// video.addEventListener('timeupdate', canvasEvent, false);
cbtn.addEventListener('click', canvasEvent, false);
function canvasEvent() {
  // canvas clonNoed 고려해볼것
  video.pause();
  pbtn.value = 'paused';

  video.style.display = 'none';
  canvas.style.display = 'inline-block'

  // ctool.style.display = 'inline-block';

  // let c2d = canvas.getContext('2d');
  // c2d.drawImage(video,0,0,video.videoWidth,video.videoHeight);
  reCanvas();

}

function reCanvas() {
  // 캔버스 비율 생각해볼것
  let c2d = canvas.getContext('2d');
  c2d.drawImage(video,0,0,canvas.width,canvas.height);
  drawCheck = true;

}

tf.addEventListener('click', timeAndFps,false);
function timeAndFps() {
  var sub = document.getElementById('sub');
  if (tfCheck) {
    tfCheck = false;
    fps.style.display = 'inline';
    curtime.style.display = 'none';
    durtime.style.display = 'none';
    sub.style.display = 'none';
  } else {
    tfCheck = true;
    fps.style.display = 'none';
    curtime.style.display = 'inline';
    durtime.style.display = 'inline';
    sub.style.display = 'inline';
  }
}

document.addEventListener('keydown', keyEvent, true);
function keyEvent(event) {
  var divCheck = document.activeElement.className;
  console.log(divCheck);

  console.log(event);
  var code = event.code   ;
  console.log(code);

  if (code == 'ArrowRight') {
    frame.seekForward();
    console.log(frame.get());
    fps.innerText = frame.get();
  } else if (code == 'ArrowLeft') {
    frame.seekBackward();
    console.log(frame.get());
    fps.innerText = frame.get();
  } else if (code == 'Space') {
    if (video.paused) {
      console.log(frame.get());
      fps.innerText = frame.get();
      video.play();
    } else {
      video.pause();
      console.log(frame.get());
      fps.innerText = frame.get();
    }
  }

}

// x layer move
var xLayer = document.querySelector('.x-layer');
var target, moveX, moveY;
xLayer.addEventListener('mousedown', mousePoint, false);
function mousePoint() {
  console.log(event);
  console.log('layerX : '+event.layerY);
  target = event.toElement;
  let ylayer = event.layerY;
  // console.log('offset : '+target.offsetTop);
  let y = event.clientY;
  console.log('client : '+event.clientY);
  moveY = y + ylayer;
  console.log('move : '+moveY);

  if (document.addEventListener) {
    document.addEventListener('mousemove', mouseHandler, true);
    document.addEventListener('mouseup', upHandler, true);
  }
}

var yLayer = document.querySelector('.y-layer');
yLayer.addEventListener('mousedown', moveYlayer, false);
function moveYlayer() {
  console.log(event);
  target = event.toElement;
  let xlayer = event.layerX;
  // console.log('offset : '+target.offsetTop);
  let x = event.clientX;
  console.log('client : '+event.clientX);
  moveX = x - xlayer;
  console.log('move : '+moveX);
  if (document.addEventListener) {
    document.addEventListener('mousemove', mouseHandler, true);
    document.addEventListener('mouseup', upHandler, true);
  }
}

function mouseHandler(e){
  if (!e) {
    e = window.event;
  }
  if (target.className == 'y-layer') {
    // console.log(e.clientX);
    // rContainer.style.width = (e.clientX - moveX) + "px";
    console.log(parseInt(rContainer.style.left)+(moveX));
    var c = e.clientX-(e.clientX-moveX);
    rContainer.style.left = parseInt(rContainer.style.left)+e.layerX + "px";
    // fContainer.style.height = parseInt(fContainer.style.height) + (e.clientY-moveY)+'px';
    console.log(e.clientX - moveX);
    // console.log(e.layerX);
    e.stopPropagation();
  } else {
    console.log(e.clientY);
    fContainer.style.top = (e.clientY - moveY) + "px";
    // fContainer.style.height = parseInt(fContainer.style.height) + (e.clientY-moveY)+'px';
    console.log(e.clientY - moveY);
    e.stopPropagation();
  }

}

function upHandler(e){
  if (!e) {
    e = window.event;
  }

  document.removeEventListener('mouseup', upHandler,  true);
  document.removeEventListener('mousemove', mouseHandler,  true);

  e.stopPropagation();
}
