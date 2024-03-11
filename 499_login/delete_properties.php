<?php
require 'init.php';

$PID = $_GET['id'];

$sql = "DELETE FROM pictures WHERE PID = {$PID}";
$sql1 = "DELETE FROM property WHERE PID = {$PID}";

$result = $mysqli->query($sql);
$result = $mysqli->query($sql1);
echo "<script>javascript:alert('delete successful!');location.href='manage_properties.php';</script>";
exit();
