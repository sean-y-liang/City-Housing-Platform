<?php
require 'init.php';

// firstname、lastname、username、password
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM `users` WHERE `username` = '$username' limit 1";


$result = $mysqli->query($sql);

if($result->num_rows > 0){
    echo "<script>javascript:alert('The username has been created!');location.href='create_user.html';</script>";
    exit();
}
header('Content-type:text/html;charset=utf-8');
$sql = "INSERT INTO `users` (`first_name`, `last_name`,`username`,`password`) VALUES ('$firstname', '$lastname','$username','$password');";
$rs = $mysqli->query($sql);
echo "<script>javascript:alert('create successful!');location.href='manage_users.php';</script>";
?>