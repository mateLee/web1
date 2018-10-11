window.onload = browserOn;
window.onresize = resizeCheck;

var inWidth, inHeight, container, vContainer, fContainer, rContainer, video, controls, canvas, frame, fps,
    xLayer, yLayer;


function browserOn() {
  inWidth = window.innerWidth;
  inHeight = window.innerHeight;
  container = document.querySelector('.container');
  vContainer = document.querySelector('.video_container');
  fContainer = document.querySelector('.file_container');
  rContainer = document.querySelector('.right_container');
  xLayer = document.querySelector('.x-layer');
  yLayer = document.querySelector('.y-layer');

  video = document.querySelector('video');

  // video = VideoFrame({
  //   element : document.querySelector('video'),
  //   frameRate: 29.97,
  //   callback : function(frame) {
  //       currentFrame.html(frame);
  //   }
  // });

  // var currentFrame =document.getElementById('currentFrame');

  controls = document.querySelector('.video_controls');
  canvas = document.getElementById('canvas');

  video.muted = true;

  cSize(container,inWidth,inHeight);
  vSize(vContainer,inWidth,inHeight);
  fSize(fContainer,inWidth,inHeight);
  rSize(rContainer,inWidth,inHeight);
  xSize(xLayer,inWidth,inHeight);
  ySize(yLayer,inWidth,inHeight);
}

function resizeCheck() {
  inWidth = window.innerWidth;
  inHeight = window.innerHeight;
  cSize(container,inWidth,inHeight);
  vSize(vContainer,inWidth,inHeight);
  fSize(fContainer,inWidth,inHeight);
  rSize(rContainer,inWidth,inHeight);
  xSize(xLayer,inWidth,inHeight);
  ySize(yLayer,inWidth,inHeight);
  // videoSize(video,inWidth,inHeight);
}
function cSize(dom,width,height) {
  dom.style.width = width+'px';
  dom.style.height = height+'px';
}
function vSize(dom,width,height) {
  dom.style.width = width*0.7+'px';
  dom.style.height = height*0.7+'px';
  videoSize(video,width*0.7,height*0.65);
  conSize(controls,width*0.7,height*0.66);
  reCanvas();
}
function fSize(dom,width,height) {
  dom.style.width = width*0.7+'px';
  dom.style.height = height*0.3+'px';
  // dom.style.marginTop = height*0.03+'px';
}
function rSize(dom,width,height) {
  dom.style.left = width*0.7+'px';
  dom.style.width = width*0.3+'px';
  dom.style.height = height+'px';
  // dom.style.top = -top+'px';

}
function videoSize(dom, width, height) {
  console.log(width+' : '+height);
  var check = width*9/16;
  console.log(check +' : '+height);
  if (height > check) {
    video.width = width;
    video.height = check;
    canvas.width = width;
    canvas.height = check;
  } else {
    video.width = height*16/9;
    video.height = height;
    canvas.width = height*16/9;
    canvas.height = height;
  }

  // video.width = width;
  // video.height = height;
  // canvas.width = width;
  // canvas.height = height;
}
function conSize(dom, width, height) {
  dom.style.width = width+'px';
  dom.style.marginTop = height+'px';
  // dom.style.height = height+'px';
}
function xSize(dom, width, height) {
  dom.style.width = width*0.7+'px';
  // dom.style.marginTop = height*0.7+'px';
}
function ySize(dom, width, height) {
  // dom.style.width = width+'px';
  // dom.style.marginTop = height+'px';
}
