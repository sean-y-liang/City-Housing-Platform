<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Students Management</title>
</head>
<body>
<table>
    <thead>
    <tr>

<!--        `UID` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,-->
<!--        `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,-->
<!--        `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,-->
<!--        `phone_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,-->
<!--        `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,-->
<!--        `student_id` bigint DEFAULT NULL,-->
<!--        `year_of_graduation` int DEFAULT NULL,-->
<!--        `program` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,-->
        <th>UID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th>Student Id</th>
        <th>Year Of Graduation</th>
        <th>Program</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <?php include 'init.php';
    $sql = "SELECT * FROM students";
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $row["UID"]; ?></td>
                <td><?php echo $row["first_name"]; ?></td>
                <td><?php echo $row["last_name"]; ?></td>
                <td><?php echo $row["phone_number"]; ?></td>
                <td><?php echo $row["address"]; ?></td>
                <td><?php echo $row["student_id"]; ?></td>
                <td><?php echo $row["year_of_graduation"]; ?></td>
                <td><?php echo $row["program"]; ?></td>
                <td>
                    <button><a href="delete_students.php?id=<?php echo $row["UID"]?>">Delete</a></button>
                </td>
            </tr>
        <?php }
    }
    $mysqli->close();
    ?>
    </tbody>
</table>
</body>
</html>