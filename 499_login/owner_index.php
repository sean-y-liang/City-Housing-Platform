<?php

session_start();

function check_login(){
    if(!isset($_SESSION['user_id'])){
        header('Location: login.html');
        exit();
    }else{
        $user_id = $_SESSION['user_id'];
    }
}
check_login();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Students Management</title>
</head>
<body>
<button><a class="blink" href="login.html">Return</a></button>
<table>
    <thead>
    <tr>
<!--        `GID` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,-->
<!--        `house_type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,-->
<!--        `bedrooms` int DEFAULT NULL,-->
<!--        `bathrooms` decimal(4,1) DEFAULT NULL,-->
<!--        `parking` tinyint(1) DEFAULT NULL,-->
<!--        `laundry` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,-->
<!--        `range_lower_bound` int DEFAULT NULL,-->
<!--        `range_upper_bound` int DEFAULT NULL,-->
<!--        `accessibility` tinyint(1) DEFAULT NULL,-->
        <th>GID</th>
        <th>House Type</th>
        <th>Bedrooms</th>
        <th>Bathrooms</th>
        <th>Parking</th>
        <th>Laundry</th>
        <th>Range Lower Bound</th>
        <th>Range Upper Bound</th>
        <th>Accessibility</th>
    </tr>
    </thead>
    <tbody>
    <?php include 'init.php';
    $user_id = $_SESSION['user_id'];
    $sql = "SELECT * from property WHERE user_id = {$user_id}";

    $result = $mysqli->query($sql);

    $sql1 = "SELECT * from rental_group";
    $result1 = $mysqli->query($sql1);

    foreach ($result as $row){
        $house_type = $row['house_type'];
        $bedrooms = $row['bedrooms'];
        $bathrooms = $row['bathrooms'];
        $parking = $row['parking'];
        $laundry = $row['laundry'];
        foreach ($result1 as $row1){
            // If more than 3 matched then listed
            $flag = ($house_type == $row1['house_type'] ? 1 : 0)
            + ($bedrooms == $row1['bedrooms'] ? 1 : 0) + ($bathrooms == $row1['bathrooms'] ? 1 : 0)
            + ($parking == $row1['parking'] ? 1 : 0) + ($laundry == $row1['laundry'] ? 1 : 0);
            if ($flag >= 3){
                echo "<tr>";
                echo "<td>" . $row1['GID'] . "</td>";
                echo "<td>" . $row1['house_type'] . "</td>";
                echo "<td>" . $row1['bedrooms'] . "</td>";
                echo "<td>" . $row1['bathrooms'] . "</td>";
                echo "<td>" . $row1['parking'] . "</td>";
                echo "<td>" . $row1['laundry'] . "</td>";
                echo "<td>" . $row1['range_lower_bound'] . "</td>";
                echo "<td>" . $row1['range_upper_bound'] . "</td>";
                echo "<td>" . $row1['accessibility'] . "</td>";
               echo "<tr>";
            }
        }

    }

    ?>
    </tbody>
</table>
</body>
</html>