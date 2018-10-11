<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <textarea name="" id="a" rows="8" cols="80">

    </textarea>
    <?php // php로 form post data전송 받음
       $data = $_POST['edit'];

       echo htmlspecialchars($_POST['edit']);
      // ckeditor 에 의해 태그 형태로 데이터가 전송됨 따라서 html형식에 맞춰 출력해주면 됨!!
       echo "<div>".$data."</div>"

    ?>
    <div class="" id="test">

    </div>

    <script type="text/javascript">
    // 데이터를 요소에 string 추가
      // document.getElementById('a').value = '<//$data ?>';
      document.getElementById('test').innerText = <?= $data ?>;
    </script>


  </body>
</html>
