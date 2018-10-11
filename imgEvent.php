<script type="text/javascript">
  // 1. 파일버튼 클릭시 파일 선택 및 해당 이미지 넣기
  // 2. 이미지 들어갈 영역 클릭시 파일선택 띄우기 및 해당 이미지 넣기
</script>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>image event</title>
    <script type="text/javascript" src="/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="/jquery-ui-1.12.1.custom/jquery-ui.css"></script>
    <script type="text/javascript" src="/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>

  </head>
  <body>
    <div class="" id="i-div" style="position: absolute;width: 40%;height: 20%;border:1px solid black;">
      <div class="" id="input-img" style="float: left;position: relative;width: 40%;height: 80%;border:1px solid black;"></div>
      <!-- input type이 file인 경우 파일 선택창이 뜬다. -->
      <div class="">
        <span>id :</span><input id="user_id"type="text" name="" value="eros" readonly><br>
        <span>email :</span><input id="email"type="text" name="" value="eros@cocoa.co.kr" readonly>
      </div>
      <div class="" style="clear:both;">

      </div>
      <form class="" enctype="multipart/form-data" action="imgUpload.php" method="post">
        <input id="select" style="position: relative;" type="file" name="upload" value="파일선택">
        <input id="submit" type="button" name="submit" value="저 장">
      </form>

    </div>
    <input id="layer" style="position: relative;top:21%;" type="button" name="" value="imglayerpop">
  </body>
  <script src="/layerImgPop.js"></script>
  <script type="text/javascript">
    var file = document.getElementById('select');
    var input = document.getElementById('input-img');

    file.addEventListener('change', fileUpload, false);
    input.addEventListener('click', select, false);

    // div 클릭시 파일선택 이벤트 실행
    function select() {
      // document.element의 type 실행
      file.click();
    }

    var imgData;
    function fileUpload() {

      if (file.files.length == 0) {
        return;
      } else {
        var reader = new FileReader();
        //파일읽기
        reader.readAsDataURL(file.files[0]);
        // 파일읽기 끝나면 이벤트 발생
        reader.onloadend = function(event) {
          // console.log(event.target.result);
          //백그라운드 이미지로 해당 파일을 url로 줌
          imgData = event.target.result;
          input.style.backgroundImage = 'url('+event.target.result+')';
        }
      }

    }

    var submit = document.getElementById('submit');
    submit.addEventListener('click', fileSave, false);
    function fileSave() {
      var c = file.files[0];
      var f = new FormData();
      console.log(c);
      f.append('edit',c);
      console.log(f.get('edit'));
      $.ajax ({
          url: "/imgUpload.php",
          type: 'POST',
          data: f,

          cache: false,
          processData: false,
          contentType: false,
          success: function(data){
            // 리던으로 해당  php 확인
            console.log(data);
            window.location.href='/imgUpload.php';
          }
      });
    }
  </script>
</html>
