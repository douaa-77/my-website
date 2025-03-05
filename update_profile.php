<?php
session_start();
require 'db.php'; // Make sure this file exists and connects to your database

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

// Handle bio update
if (!empty($_POST['newBio'])) {
    $newBio = htmlentities($_POST['newBio'], ENT_QUOTES, 'UTF-8'); // Allows emojis & special chars
    $stmt = $conn->prepare("UPDATE users SET bio = ? WHERE id = ?");
    $stmt->bind_param("si", $newBio, $user_id);
    $stmt->execute();
}

// Handle profile picture upload
if (!empty($_FILES['newProfilePic']['name'])) {
    $target_dir = "uploads/"; // Folder to store images (create it if not exists)
    $file_name = basename($_FILES["newProfilePic"]["name"]);
    $target_file = $target_dir . uniqid() . "_" . $file_name;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if the file is an image
    $check = getimagesize($_FILES["newProfilePic"]["tmp_name"]);
    if ($check !== false) {
        if (move_uploaded_file($_FILES["newProfilePic"]["tmp_name"], $target_file)) {
            $stmt = $conn->prepare("UPDATE users SET profile_pic = ? WHERE id = ?");
            $stmt->bind_param("si", $target_file, $user_id);
            $stmt->execute();
        }
    }
}

// Redirect back to the dashboard
header("Location: dashboard.php");
exit();
?>
