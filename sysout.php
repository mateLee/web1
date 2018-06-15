<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <?php
    $servername = "192.168.1.10";
    $username = "pipeline";
    $password = "C@coaPipeLine2018";
    $dbname = "pipeline_lab";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM pipeline_lab";
    $result = $conn->query($sql);

    if ($result->num_row() > 0) {
      while ($row = $result->fetch_assoc()) {
        echo $row["ID"]. '<br>';
      }
    } else{
      echo "0 result";
    }

     ?>


  </body>
</html>
