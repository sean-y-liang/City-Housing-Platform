<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>User Management</title>
</head>
<body>
    <div class="header">
        <button id="createBtn"><a href="create_user.html">Create</a></button>
    </div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php include 'init.php'; 
                  $sql = "SELECT * FROM users";
                  $result = $mysqli->query($sql);
                  
                  if ($result->num_rows > 0) {
                      while($row = $result->fetch_assoc()) { ?>
                        <tr>
                            <td><?php echo $row["id"]; ?></td>
                            <td><?php echo $row["first_name"]; ?></td>
                            <td><?php echo $row["last_name"]; ?></td>
                            <td><?php echo $row["username"]; ?></td>
                            <td>*****</td>
                            <td>
                                <button><a href="edit_users.php?id=<?php echo $row["id"]?>">Edit</a></button>
                                <button><a href="delete_users.php?id=<?php echo $row["id"]?>">Delete</a></button>
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