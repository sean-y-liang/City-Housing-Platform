<?php
require 'init.php';

$name = $_POST['username'];
$old_password = $_POST['old_password'];
$new_password = $_POST['new_password'];
$sql = "select * from users where (username='{$name}') and (password ='{$old_password}')";
$result = $mysqli->query($sql);

if($result->num_rows > 0){
    // reset password
    $sql = "update users set password='$new_password' where username='{$name}'";
    $rs  = $mysqli->query($sql);
    if ($rs) {
        echo "<script>javascript:alert('success!');location.href='login.html';</script>";
    }else{
        echo "<script>javascript:alert('fail!');location.href='alter_pwd.html';</script>";
    }
}else{
    echo "<script>javascript:alert('Incorrect username or password!');location.href='alter_pwd.html';</script>";
}
?>