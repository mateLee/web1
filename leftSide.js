function leftSide(dimLay, width, height){
  let side = document.createElement('div');

  side.setAttribute('id', 'leftSide');
  side.setAttribute('style', 'position: fixed; top:0; left:0; width:75%; height:100%; background-color: rgba(0,0,0,.5); border:1px solid red;')

  dimLay.appendChild(side);
}
