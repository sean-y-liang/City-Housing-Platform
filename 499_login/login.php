<?php
  require 'init.php';

    $name = $_POST['username'];
    $password = $_POST['password'];
    $sql = "select * from users where (username='$name') and (password ='$password')";
    $result = $mysqli->query($sql);

    if($result->num_rows > 0){

        while($row = $result->fetch_assoc()){
            $user_type = $row['user_type'];
            $user_id = $row['id'];
        }
        // 保存session
        session_start();
        $_SESSION['user_id'] = $user_id;
        if ($user_type == 1){// student
            echo "<script>javascript:alert('success!');location.href='student_index.html';</script>";
        }else{
            echo "<script>javascript:alert('success!');location.href='owner_index.php';</script>";
        }
    }else{
        echo "<script>javascript:alert('Incorrect username or password!');location.href='login.html';</script>";
    }
?>