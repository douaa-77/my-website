<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link id="themeStylesheet" rel="stylesheet" href="chat.css">
    <link id="themeStylesheet" rel="stylesheet" href="chat.css?v=1">
    <title>Chat</title>
</head>
<body>
<div class="chat-container">
    <div class="chat-header">
        Chat
    </div>
    <div id="chat-box"></div> <!-- Chat messages will be displayed here -->
    
    <!-- Username Input -->
    <div class="username-container">
        <input type="text" id="username" class="chat-input" placeholder="Enter your username">
    </div>

    <!-- Message input field -->
    <div class="chat-footer">
        <input type="text" id="messageInput" class="chat-input" placeholder="Type a message...">
        <!-- Send Button -->
        <button id="sendMessageBtn" class="chat-button">Send</button>
    </div>
    
    <button onclick="location.href='index.php'">Home</button>

</div>

<script src="chat.js"></script>

</body>
</html>
