<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password

    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "<div class='message success'>Registration successful! <a href='login.php'>Login here</a></div>";
    } else {
        echo "<div class='message error'>Error: " . $conn->error . "</div>";
    }
}
?>

<form method="POST">
    <label>Username:</label>
    <input type="text" name="username" required><br>

    <label>Email:</label>
    <input type="email" name="email" required><br>

    <label>Password:</label>
    <input type="password" name="password" required><br>

    <button type="submit">Register</button>
</form>
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

input[type="text"], 
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
    outline: none;
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

.message {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    border-radius: 5px;
    text-align: center;
    font-size: 16px;
}

.success {
    background-color: #4CAF50;
    color: white;
}

.error {
    background-color: #D32F2F;
    color: white;
}

    </style>