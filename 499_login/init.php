<?php
$host = '127.0.0.1';
$database = 'cisc_499';
$username = 'root';
$password = '';
$port = 33066;
$mysqli = new mysqli($host, $username, $password, $database,$port);
if (mysqli_connect_errno()) {
    // check conduction
    die("could not connect to the database.\n" . mysqli_connect_error());
}