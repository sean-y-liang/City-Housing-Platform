<?php
  require 'init.php';

    $name = $_POST['username'];
    $password = $_POST['password'];
    $sql = "select * from manager where (phone_number='$name') and (password ='$password')";
    $result = $mysqli->query($sql);

    if($result->num_rows > 0){
         echo "<script>javascript:alert('success!');location.href='adm_dash.html';</script>";
    }else{
        echo "<script>javascript:alert('Incorrect username or password!');location.href='login.html';</script>";
    }
?>