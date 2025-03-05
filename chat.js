document.addEventListener("DOMContentLoaded", function () {
    // Ensure the elements are defined
    const usernameInput = document.getElementById("username");
    const messageInput = document.getElementById("messageInput");
    const sendMessageBtn = document.getElementById("sendMessageBtn");
    const chatBox = document.getElementById("chat-box");

    // Log elements to make sure they're loaded
    console.log(usernameInput, messageInput, sendMessageBtn, chatBox);

    // Ensure all required elements exist before running the chat script
    if (!usernameInput || !messageInput || !sendMessageBtn || !chatBox) {
        console.error("Chat elements are missing.");
        return;
    }

    // Function to fetch messages from the server
    function fetchMessages() {
        fetch('fetch_messages.php')
            .then(response => response.json())
            .then(data => {
                let chatBox = document.getElementById('chat-box');
                chatBox.innerHTML = "";
                data.forEach(msg => {
                    chatBox.innerHTML += `<div class="message"><strong>${msg.username}:</strong> ${msg.message}</div>`;
                });
                chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
            });
    }

    // Function to send a message to the server
    sendMessageBtn.addEventListener("click", function () {
        let username = usernameInput.value;
        let message = messageInput.value;
        if (!username || !message) return alert("Enter both username and message!");

        let formData = new FormData();
        formData.append('username', username);
        formData.append('message', message);

        fetch('send_message.php', { method: 'POST', body: formData })
            .then(() => {
                messageInput.value = ''; // Clear input
                fetchMessages(); // Refresh chat after sending
            });
    });

    // Auto-refresh chat every 2 seconds
    setInterval(fetchMessages, 2000); 
});
