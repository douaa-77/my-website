<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "chat_db"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch messages, ordered by created_at timestamp
$sql = "SELECT username, message, created_at FROM messages ORDER BY created_at DESC LIMIT 50"; // Limit added for performance

$result = $conn->query($sql);

// Initialize array to store messages
$messages = [];

// Fetch and store each message
while ($row = $result->fetch_assoc()) {
    // Format the timestamp to a readable format
    $row['created_at'] = date("Y-m-d H:i:s", strtotime($row['created_at'])); // Optional: format the date
    $messages[] = $row;
}

// Return messages as JSON
echo json_encode($messages);

// Close the database connection
$conn->close();
?>
