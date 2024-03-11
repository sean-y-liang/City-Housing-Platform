<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Property Management</title>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>PID</th>
                <th>Listing_name</th>
                <th>Address</th>
                <th>House_type</th>
                <th>Monthly_rent</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Parking</th>
                <th>Laundry</th>
                <th>Fenced_yard</th>
                <th>Detached_or_semi</th>
                <th>Floor_number</th>
                <th>Elevator</th>
                <th>Number_of_offered_rooms</th>
                <th>Private_kitchen</th>
                <th>Furniture</th>
                <th>Date_listed</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php include 'init.php'; 
                  $sql = "SELECT * FROM property";
                  $result = $mysqli->query($sql);
                  
                  if ($result->num_rows > 0) {
                      while($row = $result->fetch_assoc()) { ?>
                        <tr>
                            <td><?php echo $row["PID"]; ?></td>
                            <td><?php echo $row["listing_name"]; ?></td>
                            <td><?php echo $row["address"]; ?></td>
                            <td><?php echo $row["house_type"]; ?></td>
                            <td><?php echo $row["monthly_rent"]; ?></td>
                            <td><?php echo $row["bedrooms"]; ?></td>
                            <td><?php echo $row["bathrooms"]; ?></td>
                            <td><?php echo $row["parking"]; ?></td>
                            <td><?php echo $row["laundry"]; ?></td>
                            <td><?php echo $row["fenced_yard"]; ?></td>
                            <td><?php echo $row["detached_or_semi"]; ?></td>
                            <td><?php echo $row["floor_number"]; ?></td>
                            <td><?php echo $row["elevator"]; ?></td>
                            <td><?php echo $row["number_of_offered_rooms"]; ?></td>
                            <td><?php echo $row["private_kitchen"]; ?></td>
                            <td><?php echo $row["furniture"]; ?></td>
                            <td><?php echo $row["date_listed"]; ?></td>
                            <td><?php echo $row["status"]; ?></td>
                            <td>
                                <button><a href="delete_properties.php?id=<?php echo $row["PID"]?>">Delete</a></button>
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