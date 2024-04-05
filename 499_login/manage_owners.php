<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Owner Management</title>
</head>
<body>
    <button><a href="adm_dash.html">Return</a></button>
    <table>
        <thead>
        <tr>
            <th>OID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Action</th>
        </tr>
        </thead>
    <tbody>
    <?php include 'init.php';
    $sql = "SELECT * FROM owner";
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $row["OID"]; ?></td>
                <td><?php echo $row["first_name"]; ?></td>
                <td><?php echo $row["last_name"]; ?></td>
                <td><?php echo $row["phone_number"]; ?></td>
                <td><?php echo $row["address"]; ?></td>
                <td>
                    <button><a href="delete_owners.php?id=<?php echo $row["OID"]?>">Delete</a></button>
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