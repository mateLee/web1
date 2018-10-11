var layer = document.getElementById('layer');
layer.addEventListener('click', imgsavepop,false);

function imgsavepop() {
  var div = document.createElement('div');

  div.setAttribute('id', 'layer-div');
  div.style = 'position: absolute; top:0; left:0; width:100%; height:100%; backgroud-color:rgba(45,45,45,0.5); border:1px solid red;';
  document.querySelector('body').appendChild(div);

  var div_ch = document.createElement('div');
  div_ch.setAttribute('id', 'div-ch');
  div_ch.style = 'position: absolute; top:25%; left:25%; width:50%; height:50%; border:1px solid pink;';
  div.appendChild(div_ch);

  var div_ch_div = document.createElement('div');
  div_ch_div.setAttribute('id', 'div-ch-div');
  div_ch_div.style = 'position: relative;width: 40%;height: 80%;border:1px solid black;';
  div_ch.appendChild(div_ch_div);

  var lay_input = document.createElement('input');
  lay_input.setAttribute('id', 'div-ch-img');
  lay_input.setAttribute('type', 'file');
  lay_input.setAttribute('value', '파일 선택');
  div_ch.appendChild(lay_input);

  lay_input.addEventListener('change', fileUpload2, false);
  div_ch_div.addEventListener('click', function(){lay_input.click()},false);
}

function fileUpload2() {
  var file = document.getElementById('div-ch-img');
  if (file.files.length == 0) {
    return;
  } else {
    var reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onloadend = function(event) {
      document.getElementById('div-ch-div').style.backgroundImage = 'url('+event.target.result+')';
    }
  }
}
