<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="/ckeditor/ckeditor.js"></script>
    <script src="/jquery-3.3.1.min.js"></script>
  </head>
  <body>

    <form class="" action="boardDetail.php" method="post">
      <textarea name="edit" id="edit" rows="8" cols="80"></textarea>
      <script type="text/javascript">
      // toolbar 커스텀
        CKEDITOR.replace('edit', {toolbar : [

		{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },

		{ name: 'document', items: [ 'Source' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
		{ name: 'colors' },
	]});
      </script>
      <input type="submit" value="저장" id="submit">
    </form>

  </body>
    <script type="text/javascript">
    // ajax 통신을 위한 이벤트 form 자체로 처리가능함
      let s = document.getElementById('submit');
      s.addEventListener('click', function(){
        // let edit = document.querySelector('textarea').value;
        // ckeditor 사용했을경우 데이터 넘기는 법
        let edit = CKEDITOR.instances.edit.getData();
        console.log(edit);
        $.ajax ({
            url: "/boardDetail.php",
            type: 'post',
            data: {edit: edit},
            success: function(data){
              // 리던으로 해당  php 확인
              console.log(data);
              // window.location.href='/boardDetail.php';
            }
        });
      });
    </script>
    <script type="text/javascript">


    </script>
</html>
