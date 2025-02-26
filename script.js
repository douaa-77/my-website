console.log("script.js is loaded correctly.");
document.addEventListener("DOMContentLoaded", function () { 
    console.log("Script loaded!"); // Debugging

    /* 🌟 Toggle Widgets */
    function toggleWidget(widgetId) {
        let widget = document.getElementById(widgetId);
        widget.style.display = widget.style.display === "none" ? "block" : "none";
    }
    
    
    
    window.toggleWidget = toggleWidget;

    /* 🌟 Change Wallpaper */
    function changeWallpaper(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.body.style.backgroundImage = `url('${e.target.result}')`;
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
            };
            reader.readAsDataURL(file);
        }
    }
    
    window.changeWallpaper = changeWallpaper;

    /* 🌟 Timer */
    let timerInterval;
let timeLeft = 1500; // Default 25 min in seconds

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer-display").textContent = 
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    clearInterval(timerInterval); // Avoid multiple intervals
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function addMinutes() {
    timeLeft += 60;
    updateTimerDisplay();
}

function subtractMinutes() {
    if (timeLeft >= 60) {
        timeLeft -= 60;
    }
    updateTimerDisplay();
}

// Initialize display when page loads
updateTimerDisplay();


    window.startTimer = startTimer;
    window.pauseTimer = pauseTimer;
    window.addMinutes = addMinutes;
    window.subtractMinutes = subtractMinutes;

    /* 🌟 To-Do List */
    function addTask() {
        let taskInput = document.getElementById("taskInput");
        let taskList = document.getElementById("taskList");

        if (taskInput.value.trim() === "") return;

        let li = document.createElement("li");
        li.classList.add("todo-item");

        let checkBtn = document.createElement("button");
        checkBtn.textContent = "✔";
        checkBtn.classList.add("check-btn");
        checkBtn.onclick = function () {
            li.style.textDecoration = "line-through";
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            taskList.removeChild(li);
        };

        li.textContent = taskInput.value;
        li.appendChild(checkBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = "";
    }
    window.addTask = addTask;

    /* 🌟 Playlist */
    function addPlaylist() {
        let playlistInput = document.getElementById("playlistInput");
        let playlistContainer = document.getElementById("playlistContainer");

        if (playlistInput.value.trim() === "") return;

        let link = document.createElement("a");
        link.href = playlistInput.value;
        link.target = "_blank";
        link.textContent = "🎶 Open Music";

        let div = document.createElement("div");
        div.appendChild(link);
        playlistContainer.appendChild(div);

        playlistInput.value = "";
    }
    window.addPlaylist = addPlaylist;

});





