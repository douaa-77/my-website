<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "chat_db"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$message = $_POST['message'];

$stmt = $conn->prepare("INSERT INTO messages (username, message) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $message);
$stmt->execute();
$stmt->close();
$conn->close();
?>
