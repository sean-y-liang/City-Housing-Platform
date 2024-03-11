<?php
require 'init.php';

$UID = $_GET['id'];

$sql = "DELETE FROM make_group WHERE UID = '{$UID}'";
$sql1 = "DELETE FROM students WHERE UID = '{$UID}'";

$result = $mysqli->query($sql);
$result = $mysqli->query($sql1);
echo "<script>javascript:alert('delete successful!');location.href='manage_students.php';</script>";
exit();
