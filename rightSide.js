
function rightSide(dimLay, width, height) {
  let side = document.createElement('div');
  let btn = document.createElement('div');
  let iBtn = document.createElement('button');
  let vBtn = document.createElement('button');
  let dataList = document.createElement('div');

  btn.setAttribute('id','btnLayer');
  btn.setAttribute('style', 'position: fixed; top:0; width:100%; height:5%; border:1px solid black; z-index:1; background-color: rgba(0,162,162,1');;

  side.setAttribute('id','rightSide');
  side.setAttribute('style', 'position: fixed; top:0; right:0; width:15%; height:100%; background-color: rgba(0,162,162,.5); overflow-y: auto; overflow-x: hidden;')

  iBtn.setAttribute('id', 'iBtn');
  iBtn.setAttribute('type', 'button');
  iBtn.setAttribute('style', 'position: relative; background-color: rgba(0,162,162,.5); margin-left:2%');
  iBtn.innerText = '이미지';

  vBtn.setAttribute('id', 'vBtn');
  vBtn.setAttribute('type', 'button');
  vBtn.setAttribute('style', 'position: relative; background-color: rgba(0,162,162,.5); margin-left:2%');
  vBtn.innerText = '동영상';

  dataList.setAttribute('id', 'dataList');
  dataList.setAttribute('style', 'position: absolute; top:6%; width:100%; border: 1px solid black;');

  btn.appendChild(iBtn);
  btn.appendChild(vBtn);
  side.appendChild(btn);
  side.appendChild(dataList);
  dimLay.appendChild(side);

  imageList();
  // videoList();
  document.getElementById('iBtn').addEventListener('click', imageList);
  document.getElementById('vBtn').addEventListener('click', videoList);

  //키보드 이벤트로 포커스 및 linkPop 실행
  dataList.addEventListener('keydown', function() {
    let k = event.keyCode;
    let focus;
    if (k == 40) {
              // 현재 포커스의 다음 포커스반환
      focus = document.activeElement.nextElementSibling;
      if (focus == null) {
        return;
      }
      focus.focus(linkPop(focus));
    } else if (k == 38) {
              // 현재 포커스의 이전 포커스반환
      focus = document.activeElement.previousElementSibling;
      if (focus == null) {
        return;
      }
      focus.focus(linkPop(focus));
    }


  });
}



function imageList() {
  let dataList = document.getElementById('dataList');
  if (dataList.childElementCount > 0) {
    let remove = dataList.children;
    for (var i = remove.length-1; i >= 0; i--) {
      console.log(i);
      dataList.removeChild(remove[i]);
    };
  }
  let imgList = document.querySelectorAll('img');

  for (var i = 0; i < imgList.length; i++) {
    let clone = imgList[i].cloneNode();
    let a = document.createElement('a');

    // a.setAttribute('id', 'img'+i);
    a.setAttribute('href', 'javascript:void(0)');
    a.setAttribute('onclick', 'linkPop(this);');
    clone.setAttribute('style', 'width:90%; height:20%; margin-left:5%;');
    a.appendChild(clone);
    dataList.appendChild(a);
  }
}

function videoList() {
  let dataList = document.getElementById('dataList');
  if (dataList.childElementCount > 0) {
    let remove = dataList.children;
    for (var i = remove.length-1; i >= 0; i--) {
      dataList.removeChild(remove[i]);
    };
  }

  let vList = document.querySelectorAll('video');

  for (var i = 0; i < vList.length; i++) {
    let clone = vList[i].cloneNode();
    let a = document.createElement('a');

    // a.setAttribute('id', 'video'+i);
    a.setAttribute('href', 'javascript:void(0)');
    a.setAttribute('onclick', 'linkPop(this);');
    clone.setAttribute('style', 'width:90%; height:20%; margin-left:5%;');
    a.appendChild(clone);
    dataList.appendChild(a);
  }
}



// document.getElementById('iBtn').addEventListener('click', imageList());
// document.getElementById('vBtn').addEventListener('click', videoList());
