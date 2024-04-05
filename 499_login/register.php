<?php
require 'init.php';

$name             = $_POST['username'];
$password         = $_POST['password'];
$confirm_password = $_POST['confirm_password'];
$user_type        = $_POST['user_type'];
if ($password != $confirm_password) {
    echo "<script>javascript:alert('Two passwords do not match!');location.href='register.html';</script>";
    exit();
}
$sql = "SELECT * FROM `users` WHERE `username` = '$name' limit 1";


$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    echo "<script>javascript:alert('The username has been registered!');location.href='register.html';</script>";
    exit();
}
$sql = "INSERT INTO `users` (`username`, `password`,`user_type`) VALUES ('$name', '$password',$user_type);";

$rs  = $mysqli->query($sql);

// 获取自增的id
$id = $mysqli->insert_id;

if ($user_type == '1') {// student
    $sql = "INSERT INTO `students` (`UID`) VALUES ('$id');";
} else {
    $sql = "INSERT INTO `owner` (`OID`) VALUES ('$id');";
}
$rs  = $mysqli->query($sql);
header('Content-type:text/html;charset=utf-8');

echo "<script>javascript:alert('register successful!');location.href='login.html';</script>";
?>