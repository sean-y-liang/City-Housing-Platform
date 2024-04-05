<?php
require 'init.php';
if(isset($_GET['id'])) {
    $userId = $_GET['id'];
   $sql = "SELECT * FROM manager WHERE phone_number = {$userId}";
   $result = $mysqli->query($sql);
    $userData = $result->fetch_assoc();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
        }

        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }

        form {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            font-weight: bold;
            color: #666;
            margin-bottom: 5px;
        }

        input[type="text"],
        input[type="password"] {
            width: 100%;
            height: 40px;
            padding: 0 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 3px;
            transition: border-color 0.3s ease;
        }

        input[type="text"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: #4CAF50;
        }

        button {
            width: 100%;
            height: 40px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #4CAF50;
        }
    </style>
</head>
<body>

<h1>Edit User Account Information</h1>

<?php if(isset($userData)) { ?>

    <form action="update_user.php" method="post">
        <input type="hidden" name="userId" value="<?php echo htmlspecialchars($userId); ?>">

        <div class="form-group">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" name="firstName" required value="<?php echo htmlspecialchars($userData['first_name']); ?>" placeholder="Enter your first name">
        </div>

        <div class="form-group">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" name="lastName" required value="<?php echo htmlspecialchars($userData['last_name']); ?>" placeholder="Enter your last name">
        </div>


        <button type="submit">Update Account</button>
    </form>

<?php } else { ?>
    <p>No user data found. Please ensure a valid user ID is provided.</p>
<?php } ?>

</body>
</html>