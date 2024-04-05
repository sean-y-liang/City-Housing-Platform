<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>User Management</title>
</head>
<body>
    <button><a href="adm_dash.html">Return</a></button>
    <table>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Password</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php include 'init.php'; 
                  $sql = "SELECT * FROM manager";
                  $result = $mysqli->query($sql);
                  
                  if ($result->num_rows > 0) {
                      while($row = $result->fetch_assoc()) { ?>
                        <tr>
                            <td><?php echo $row["first_name"]; ?></td>
                            <td><?php echo $row["last_name"]; ?></td>
                            <td><?php echo $row["phone_number"]; ?></td>
                            <td>*****</td>
                            <td>
                                <button><a href="edit_users.php?id=<?php echo $row["phone_number"]?>">Edit</a></button>
                                <button><a href="delete_users.php?id=<?php echo $row["phone_number"]?>">Delete</a></button>
                            </td>
                        </tr>
                      <?php }
                  }
                  $mysqli->close();
            ?>
        </tbody>
    </table>
    <div class="header">
        <button id="createBtn"><a href="create_user.html">Create A New User Here</a></button>
    </div>
</body>
</html>