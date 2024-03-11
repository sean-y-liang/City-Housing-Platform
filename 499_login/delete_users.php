<?php
require 'init.php';

$userId = $_GET['id'];

$sql = "DELETE FROM users WHERE id = {$userId}";
$result = $mysqli->query($sql);
echo "<script>javascript:alert('delete successful!');location.href='manage_users.php';</script>";
exit();
