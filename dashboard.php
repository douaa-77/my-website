<?php
session_start();
require 'db.php'; // Move this above, so it's included properly

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Get user details from database
$user_id = $_SESSION['user_id'];
$query = $conn->prepare("SELECT username, bio, profile_pic FROM users WHERE id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();

// Set defaults if data is missing
$username = htmlspecialchars($user['username'] ?? 'Unknown User');
$bio = nl2br(html_entity_decode($user['bio'] ?? 'No bio set.'));
$profile_pic = !empty($user['profile_pic']) ? htmlspecialchars($user['profile_pic']) : 'default.jpg';

// Close the statement
$query->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link id="themeStylesheet" rel="stylesheet" href="dashboard.css">
    <title>Dashboard</title>
</head>
<body>

<button id="themeToggle">Switch Theme</button>

    <div class="profile-container">
        <h2>Welcome, <?php echo $username; ?></h2>
        <p><?php echo $bio; ?></p>
        <img src="<?php echo htmlspecialchars($user['profile_pic'] ?: 'default.jpg'); ?>" 
     alt="Profile Picture" 
     style="width: 200px; height: 200px; object-fit: cover; border: 2px solid #ccc;">
        
        <h3>Edit Profile</h3>
        <form action="update_profile.php" method="POST" enctype="multipart/form-data">
    <input type="text" name="newBio" placeholder="Enter new bio">
    <input type="file" name="newProfilePic">
    <button type="submit">Save Changes</button>
</form>

        <!-- Navigation Buttons -->
        <div class="nav-buttons">
            <button onclick="location.href='index.php'">Home</button>
            <button onclick="location.href='logout.php'">Logout</button>
        </div>
    </div>

</body>
<script src="dashboard.js"></script>

</html>



