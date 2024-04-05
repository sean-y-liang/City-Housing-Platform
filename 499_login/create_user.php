<?php
require 'init.php';


$username = $_POST['username'];
$password = $_POST['password'];
$user_type = $_POST['user_type'];

if ($user_type == 3){
    $sql = "SELECT * FROM `manager` WHERE `phone_number` = '$username' limit 1";
}else{
    $sql = "SELECT * FROM `users` WHERE `username` = '$username' limit 1";
}

$result = $mysqli->query($sql);

if($result->num_rows > 0){
    echo "<script>javascript:alert('The username has been created!');location.href='create_user.html';</script>";
    exit();
}
header('Content-type:text/html;charset=utf-8');
if ($user_type == 3){
    $sql = "INSERT INTO `manager` (`phone_number`,`password`) VALUES ('$username','$password');";
    $rs = $mysqli->query($sql);

}else{
    $sql = "INSERT INTO `users` (`username`, `password`,`user_type`) VALUES ('$username', '$password',$user_type);";
    var_dump($sql);exit();
    $rs  = $mysqli->query($sql);
    $id = $mysqli->insert_id;
    if ($user_type == '1') {// student
        $sql = "INSERT INTO `students` (`UID`) VALUES ('$id');";
    } else {
        $sql = "INSERT INTO `owner` (`OID`) VALUES ('$id');";
    }
    $rs  = $mysqli->query($sql);
}

echo "<script>javascript:alert('create successful!');location.href='manage_users.php';</script>";
?>