<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Safe Space</title>
    <link rel="stylesheet" href="style.css?v=2">
    <link rel="icon" href="favicon.png" type="image/png">
    <link id="themeStylesheet" rel="stylesheet" href="style.css">
    <link id="theme-link" rel="stylesheet" href="light.css">
</head>
<body>

    <!-- Header -->
    <div class="header">
        <h1 class="site-name">Safe Space</h1>
        <h2 class="welcome-text">Hello special people, Welcome to my world</h2>
    </div>

    <!-- Main Layout -->
    <div class="container">
    <?php
require 'db.php'; // No need to start session again, it's already handled

$profile_pic = 'default.jpg'; // Default profile picture
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $query = $conn->prepare("SELECT profile_pic FROM users WHERE id = ?");
    $query->bind_param("i", $user_id);
    $query->execute();
    $result = $query->get_result();
    $user = $result->fetch_assoc();
    if (!empty($user['profile_pic'])) {
        $profile_pic = htmlspecialchars($user['profile_pic']);
    }
    $query->close();
}
?>
        <!-- Right Sidebar (Navigation) -->
        <aside class="right-sidebar">
            
        <!-- Small Round Profile Icon in the Corner -->
<?php if (isset($_SESSION['user_id'])): ?>
    <a href="dashboard.php" class="profile-icon">
    <img src="<?php echo $profile_pic; ?>" alt="Profile" style="width: 45px; height: 45px; border-radius: 50%;">
    </a>
<?php endif; ?>

       <button onclick="location.href='writing/editor.php'">📜Writing</button>
       <button onclick="location.href='books/books.php'">☕Books</button>
       <button onclick="location.href='art/art.php'">💟Art</button>
       <button onclick="location.href='chat.php'">💌Chat</button>
       <button onclick="location.href='index.php'">💒Home</button>
        </aside>

        <!-- Main Content -->
        <div class="content">
            <div class="widgets">
                <!-- Snake Game Widget -->
                <div id="gameWidget" class="widget draggable resizable" style="display: none;">
                    <div class="widget-header">
                        🐍 Snake Game
                        <button class="drag-btn">⬍</button>
                    </div>
                    <canvas id="gameCanvas" width="400" height="400"></canvas>
                    <button id="startGame">Start</button>
                    <button id="stopGame">Stop</button>
                </div>

                <!-- Timer Widget -->
                <div id="timerWidget" class="widget draggable resizable" style="display: none;">
                    <div class="widget-header">
                        ⏳ Timer
                        <button class="drag-btn">⬍</button>
                    </div>
                    <p id="timer-display">25:00</p>
                    <button onclick="startTimer()">Start</button>
                    <button onclick="pauseTimer()">Pause</button>
                    <button onclick="addMinutes()">+1 Min</button>
                    <button onclick="subtractMinutes()">-1 Min</button>
                </div>

                <!-- To-Do List -->
                <div id="todoWidget" class="widget draggable resizable" style="display: none;">
                    <div class="widget-header">✅ To-Do List</div>
                    <input type="text" id="taskInput" placeholder="Add a task">
                    <button onclick="addTask()">➕ Add</button>
                    <ul id="taskList"></ul>
                </div>

                <!-- Playlist -->
                <div id="playlistWidget" class="widget draggable resizable" style="display: none;">
                    <div class="widget-header">🎵 Playlist</div>
                    <input type="text" id="musicLink" placeholder="Paste YouTube link">
                    <button onclick="addPlaylist()">🎶 Add</button>
                    <input type="file" id="fileUpload" accept="audio/*,video/mp4" onchange="uploadFile(event)">
                    <div id="playlistContent"></div>
                </div>

            
            </div>
        </div>

        <!-- Left Sidebar (Widgets Toggle) -->
        <aside class="left-sidebar">
        <?php if (!isset($_SESSION['user_id'])): ?>
    <button onclick="location.href='login.php'">🔑 Login</button>
<?php endif; ?>
            <button class="sidebar-btn" onclick="toggleWidget('gameWidget')">🐍</button>
            <button class="sidebar-btn" onclick="toggleWidget('timerWidget')">⏳</button>
            <button class="sidebar-btn" onclick="toggleWidget('todoWidget')">📋</button>
            <button class="sidebar-btn" onclick="toggleWidget('playlistWidget')">🎵</button>
            <div id="notes-container"></div>
            <button onclick="addStickyNote()">➕ Note</button>
            <input type="file" id="wallpaper-input" accept="image/*" style="display: none;">
            <button onclick="document.getElementById('wallpaper-input').click();">🖼</button>
            <div id="wallpaper-gallery" style="display: none;">
                <p>Select:</p>
                <div id="wallpaper-options"></div>
            </div>
            <button onclick="toggleWallpaperGallery()">🖼 Gallery</button>
            <button id="darkModeToggle">🌙</button>
            <div class="content">
                <?php if (isset($_SESSION['user_id'])): ?>
                    <p>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</p>
                    <a href="logout.php">Logout</a>
                <?php else: ?>
                    <a href="login.php">Login / Sign Up</a>
                <?php endif; ?>
            </div>
        </aside>

    </div>

    <!-- Music Player -->
    <div id="musicPlayer" class="widget draggable resizable" style="display: none;">
        <div class="widget-header">🎵 Music Player</div>
        <input type="text" id="musicInput" placeholder="Paste YouTube or MP3 link">
        <button onclick="playMusic()">▶ Play</button>
        <input type="file" id="musicFileUpload" accept="audio/*,video/mp4" onchange="uploadMusic(event)">
        <div id="nowPlaying"></div>
        <div id="playlist">
            <h2>📜 Playlist</h2>
            <ul id="playlistContainer"></ul>
        </div>
    </div>

    <script src="script.js"></script>
    <script src="snake.js"></script>

</body>
</html>


