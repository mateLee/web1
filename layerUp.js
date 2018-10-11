var layer = document.querySelector('.layerUp');

layer.addEventListener('click', layerPopUp);

function layerPopUp() {

  let winWidth = window.innerWidth;
  let winHeight = window.innerHeight;
  let body =  document.querySelector('body');
  let dimLay = document.createElement('div');

  dimLay.setAttribute('id','dimLay');
  dimLay.setAttribute('style', 'position: fixed; top:0; width:100%; height: 100%; background-color: rgba(0,0,0,.5); z-index: 9999;');

  body.appendChild(dimLay);

  leftSide(dimLay, winHeight, winHeight);

  let position = document.createElement('div');
  position.setAttribute('id', 'posi');
  position.setAttribute('style', 'position:absolute; top:0; height:100%; border:1px solid blue;');

  dimLay.appendChild(position);

  rightSide(dimLay, winHeight, winHeight);

  let remove = document.getElementById('leftSide');
  remove.addEventListener('click', function(){
    dimLay.remove();
  });
}

function linkPop(atr){
  let leftSide = document.getElementById('leftSide');
  let img = atr.children[0].cloneNode();
  img.setAttribute('style', 'position: fixed; transform:translate(50%, 35%); width:40%; height:60%;')

  if (leftSide.childElementCount > 0) {
    let remove = leftSide.children;
    leftSide.removeChild(remove[0]);
    leftSide.appendChild(img);
  } else {
    leftSide.appendChild(img);
  }
}
