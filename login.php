<?php
include 'db.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id']; // Store user ID
            $_SESSION['username'] = $row['username']; // Store username

            // Redirect to dashboard after successful login
            header("Location: dashboard.php");
            exit(); // Make sure script stops execution after redirect
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No user found with this email!";
    }
}
?>

<form method="POST">
   <h1>Login</h1>
   <h2>Please enter your informations</h2>
    <label>Email:</label>
    <input type="email" name="email" required><br>

    <label>Password:</label>
    <input type="password" name="password" required><br>

    <button type="submit">Login</button>
    <p>Not Registered? <button onclick="location.href='register.php'">Sign Up</button></p>
    
</form>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Login Form</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <style>
        * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Work Sans', sans-serif;
}

body {
    background: url('sky.jpg') no-repeat center center fixed;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

form {
    width: 350px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.7); /* Dark transparent background */
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    text-align: center;
}

h1, h2 {
    color: white;
    margin-bottom: 10px;
}

h2 {
    font-size: 16px;
    font-weight: normal;
}

label {
    display: block;
    color: white;
    text-align: left;
    margin-top: 10px;
}

input[type="email"], 
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #555;
    border-radius: 5px;
    background: #222;
    color: white;
    font-size: 16px;
}

button {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    border: none;
    background:rgb(46, 1, 1);
    color: white;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background:rgb(112, 46, 46);
}

p {
    color: white;
    margin-top: 10px;
}

p button {
    background: transparent;
    border: none;
    color:rgb(46, 0, 0);
    font-size: 16px;
    cursor: pointer;
    text-decoration: underline;
}

p button:hover {
    color:rgb(129, 64, 64);
    text-decoration: none;
}

    </style>
    </head>
  