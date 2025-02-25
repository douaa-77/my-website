
// Load tasks when the page loads
window.onload = function () {
    loadTasks();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;
    if (task === "") return;

    let list = document.getElementById("taskList");
    let li = document.createElement("li");
    li.textContent = task;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.onclick = function () {
        list.removeChild(li);
        saveTasks(); // Update localStorage after deletion
    };

    li.appendChild(removeBtn);
    list.appendChild(li);
    input.value = "";

    saveTasks(); // Save tasks after adding
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push(li.textContent.replace("❌", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let list = document.getElementById("taskList");
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        let li = document.createElement("li");
        li.textContent = task;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.onclick = function () {
            list.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}
let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;

function startTimer() {
    if (isRunning) return; // Prevent multiple starts

    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Time's up! 🎉");
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 1500; // Reset to 25 minutes
    updateTimerDisplay();
}

function increaseTime() {
    timeLeft += 60; // Add 1 minute
    updateTimerDisplay();
}

function decreaseTime() {
    if (timeLeft > 60) {
        timeLeft -= 60; // Remove 1 minute (if possible)
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("time").textContent = 
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function addMedia() {
    let input = document.getElementById("mediaInput").value;
    let container = document.getElementById("mediaContainer");

    if (input.includes("youtube.com") || input.includes("youtu.be")) {
        let videoId = input.split("v=")[1] || input.split("/").pop();
        let embedUrl = `https://www.youtube.com/embed/${videoId}`;
        container.innerHTML = `<iframe width="300" height="170" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
    } 
    else if (input.includes("spotify.com")) {
        let embedUrl = input.replace("spotify.com", "spotify.com/embed");
        container.innerHTML = `<iframe width="300" height="80" src="${embedUrl}" frameborder="0" allow="encrypted-media"></iframe>`;
    } 
    else {
        alert("Invalid link! Please enter a valid YouTube or Spotify URL.");
    }
}

function loadVideo(event) {
    let file = event.target.files[0];
    let video = document.getElementById("uploadedVideo");

    if (file) {
        let url = URL.createObjectURL(file);
        video.src = url;
        video.style.display = "block";
    }
}

// Load saved wallpaper when the page loads
window.onload = function () {
    let savedWallpaper = localStorage.getItem("wallpaper");
    if (savedWallpaper) {
        document.body.style.backgroundImage = `url('${savedWallpaper}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }
};

function Wallpaper(event) {
    let file = event.target.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let imageUrl = e.target.result;
            document.body.style.backgroundImage = `url('${imageUrl}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";

            // Save the image in local storage
            localStorage.setItem("wallpaper", imageUrl);
        };
        reader.readAsDataURL(file);
    }
}

