<?php
require 'init.php';

$OID = $_GET['id'];

$sql = "DELETE FROM owner WHERE OID = {$OID}";
$result = $mysqli->query($sql);
echo "<script>javascript:alert('delete successful!');location.href='manage_owners.php';</script>";
exit();
