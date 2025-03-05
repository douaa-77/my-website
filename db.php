<?php
$host = "localhost";
$user = "root"; // Default MySQL user
$password = ""; // Default password is empty
$database = "user_login"; // Your database name

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
