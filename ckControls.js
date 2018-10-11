var tex = document.getElementById('textarea');

// 텍스트공간 클릭시 에디터 적용
var c;
tex.addEventListener('click', ckEvent, false);
function ckEvent() {
  // tex.style.height = 30+'%';


  CKEDITOR.config.contentsCss = '/cknote.css';
  c = CKEDITOR.replace('textarea', {
    toolbar:[
      { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] }
    ],
    // uiColor: '#AADC6E',
    height: '100px',
    // width: '100px',
    // resize_enabled: false, //창크기 조절 막기
    toolbarLocation: 'bottom',
    removePlugins: 'resize'
  });

}
