<?php
  require 'init.php';

  $name = $_POST['username'];
  $password = $_POST['password'];
  $confirm_password = $_POST['confirm_password'];
  if ($password != $confirm_password) {
    echo "<script>javascript:alert('Two passwords do not match!');location.href='register.html';</script>";
    exit();
  }
  $sql = "SELECT * FROM `manager` WHERE `phone_number` = '$name' limit 1";


  $result = $mysqli->query($sql);

  if($result->num_rows > 0){
    echo "<script>javascript:alert('The username has been registered!');location.href='register.html';</script>";
    exit();
  }
  header('Content-type:text/html;charset=utf-8');
  $sql = "INSERT INTO `manager` (`phone_number`, `password`) VALUES ('$name', '$password');";
  $rs = $mysqli->query($sql);
  echo "<script>javascript:alert('register successful!');location.href='login.html';</script>";
?>