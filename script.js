console.log("script.js is loaded correctly.");
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!");

    let themeLink = document.getElementById("themeStylesheet");
    let modeBtn = document.getElementById("darkModeToggle");

    if (!themeLink) {
        console.error("Theme stylesheet not found!");
        return;
    }
    if (!modeBtn) {
        console.error("Dark mode button not found!");
        return;
    }

    let savedTheme = localStorage.getItem("theme") || "light";
    themeLink.setAttribute("href", savedTheme === "dark" ? "dark.css" : "style.css");
    modeBtn.innerText = savedTheme === "dark" ? "☀️" : "🌙";

    function toggleDarkMode() {
        let isDark = themeLink.getAttribute("href") === "style.css";
        themeLink.setAttribute("href", isDark ? "dark.css" : "style.css");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        modeBtn.innerText = isDark ? "☀️" : "🌙";
    }

    modeBtn.addEventListener("click", toggleDarkMode);
});

/* 🌟 Toggle Widgets */
function toggleWidget(widgetId) {
    document.querySelectorAll('.widget').forEach(widget => {
        widget.style.display = widget.id === widgetId && widget.style.display !== "block" ? "block" : "none";
    });
}
window.toggleWidget = toggleWidget;

/* 🌟 Timer */
let timerInterval;
let timeLeft = 1500;

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer-display").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    clearInterval(timerInterval);
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
    if (timeLeft >= 60) timeLeft -= 60;
    updateTimerDisplay();
}

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
    li.textContent = taskInput.value;

    let checkBtn = document.createElement("button");
    checkBtn.textContent = "✔";
    checkBtn.onclick = () => li.style.textDecoration = "line-through";

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => taskList.removeChild(li);

    li.appendChild(checkBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = "";
}
window.addTask = addTask;

/* 🌟 Draggable & Resizable Widgets */
document.addEventListener("DOMContentLoaded", function () {
    const widgets = document.querySelectorAll(".widget");

    widgets.forEach(widget => {
        ensureDragButton(widget); // Adds drag button if missing
        makeDraggable(widget);
        makeResizable(widget);
        restoreWidgetState(widget);
    });

    let isDragging = false;
    let isResizing = false;

    function ensureDragButton(widget) {
        if (!widget.querySelector(".drag-btn")) {
            const dragBtn = document.createElement("div");
            dragBtn.classList.add("drag-btn");
            dragBtn.innerHTML = "⬍"; // Better-looking drag icon
            widget.prepend(dragBtn);
        }
    }

    function makeDraggable(widget) {
        const dragButton = widget.querySelector(".drag-btn");
        if (!dragButton) {
            console.error("Drag button not found in", widget.id);
            return;
        }

        let offsetX, offsetY;

        dragButton.addEventListener("mousedown", function (e) {
            e.preventDefault();
            isDragging = true;
            offsetX = e.clientX - widget.getBoundingClientRect().left;
            offsetY = e.clientY - widget.getBoundingClientRect().top;

            widget.style.position = "absolute";
            widget.style.zIndex = "1000";

            document.addEventListener("mousemove", moveWidget);
            document.addEventListener("mouseup", stopDragging);
        });

        function moveWidget(e) {
            if (!isDragging) return;

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            const maxX = window.innerWidth - widget.offsetWidth;
            const maxY = window.innerHeight - widget.offsetHeight;

            widget.style.left = Math.max(50, Math.min(newX, maxX)) + "px";
            widget.style.top = Math.max(50, Math.min(newY, maxY)) + "px";
        }

        function stopDragging() {
            if (isDragging) {
                saveWidgetState(widget);
                isDragging = false;
            }
            document.removeEventListener("mousemove", moveWidget);
            document.removeEventListener("mouseup", stopDragging);
        }
    }

    function makeResizable(widget) {
        const resizer = document.createElement("div");
        resizer.classList.add("resizer");
        widget.appendChild(resizer);

        resizer.addEventListener("mousedown", function (e) {
            e.preventDefault();
            isResizing = true;
            document.addEventListener("mousemove", resizeWidget);
            document.addEventListener("mouseup", stopResizing);
        });

        function resizeWidget(e) {
            if (!isResizing) return;

            let newWidth = e.clientX - widget.getBoundingClientRect().left;
            let newHeight = e.clientY - widget.getBoundingClientRect().top;

            widget.style.width = Math.max(150, Math.min(newWidth, window.innerWidth - widget.offsetLeft)) + "px";
            widget.style.height = Math.max(100, Math.min(newHeight, window.innerHeight - widget.offsetTop)) + "px";
        }

        function stopResizing() {
            if (isResizing) {
                saveWidgetState(widget);
                isResizing = false;
            }
            document.removeEventListener("mousemove", resizeWidget);
            document.removeEventListener("mouseup", stopResizing);
        }
    }

    function saveWidgetState(widget) {
        const widgetData = {
            left: widget.style.left || "100px",
            top: widget.style.top || "100px",
            width: widget.style.width || "200px",
            height: widget.style.height || "150px"
        };
        localStorage.setItem(widget.id, JSON.stringify(widgetData));
    }

    function restoreWidgetState(widget) {
        const savedData = localStorage.getItem(widget.id);
        if (savedData) {
            const { left, top, width, height } = JSON.parse(savedData);

            widget.style.left = left ? Math.max(50, parseInt(left)) + "px" : "100px";
            widget.style.top = top ? Math.max(50, parseInt(top)) + "px" : "100px";
            widget.style.width = width || "200px";
            widget.style.height = height || "150px";
        } else {
            widget.style.left = "100px";
            widget.style.top = "100px";
            widget.style.width = "200px";
            widget.style.height = "150px";
        }
    }

    function toggleWidget(widgetId) {
        let widget = document.getElementById(widgetId);
        widget.classList.toggle("show");
    }
    
    window.toggleWidget = toggleWidget;

    document.addEventListener("keydown", function (e) {
        if (e.key === " " && (isDragging || isResizing)) {
            e.preventDefault();
            isDragging = false;
            isResizing = false;
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const wallpaperInput = document.getElementById("wallpaper-input");
    const gallery = document.getElementById("wallpaper-gallery");

    const lightWallpaper = "light.jpg";
    const darkWallpaper = "dark.jpg"; 

    function getDefaultWallpaper() {
        const theme = localStorage.getItem("theme") || "light";
        return theme === "dark" ? darkWallpaper : lightWallpaper;
    }

    function setWallpaper(url) {
        console.log("Applying wallpaper:", url); // Debugging
        document.body.style.backgroundImage = `url('${url}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        localStorage.setItem("wallpaper", url);
    }

    function restoreWallpaper() {
        const savedWallpaper = localStorage.getItem("wallpaper");
        if (savedWallpaper) {
            setWallpaper(savedWallpaper);
        } else {
            setWallpaper(getDefaultWallpaper()); // Use light/dark default
        }
    }

    window.toggleWallpaperGallery = function () {
        loadWallpaperGallery(); // Load wallpapers dynamically
        const gallery = document.getElementById("wallpaper-gallery");
        gallery.style.display = gallery.style.display === "none" ? "flex" : "none";
    };
    

    window.setWallpaperFromGallery = function (wallpaper) {
        console.log("Setting wallpaper from gallery:", wallpaper); // Debugging
        setWallpaper(wallpaper);
        toggleWallpaperGallery();
    };

    if (wallpaperInput) {
        wallpaperInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    setWallpaper(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }



    restoreWallpaper();

    if (modeBtn) {
        modeBtn.addEventListener("click", function () {
            setTimeout(() => {
                const theme = themeLink.getAttribute("href").includes("dark.css") ? "dark" : "light";
                localStorage.setItem("theme", theme);
                
                if (!localStorage.getItem("wallpaper")) {
                    setWallpaper(getDefaultWallpaper());
                }
            }, 100);
        });
    }
});

const wallpapers = [
    "wallpaper1.jpg", "wallpaper2.jpg", "wallpaper3.jpg",
    "wallpaper4.jpg", "wallpaper5.jpg", "wallpaper6.jpg",
    "wallpaper7.jpg", "wallpaper8.jpg", "wallpaper9.jpg"
];

function loadWallpaperGallery() {
    const gallery = document.getElementById("wallpaper-options");
    gallery.innerHTML = ""; // Clear previous wallpapers

    wallpapers.forEach(wallpaper => {
        const div = document.createElement("div");
        div.classList.add("wallpaper-option");
        div.onclick = () => setWallpaperFromGallery(wallpaper);

        const img = document.createElement("img");
        img.src = wallpaper; // Use actual wallpaper as preview
        img.alt = "Wallpaper";
        img.classList.add("wallpaper-preview"); // Add CSS class for styling

        div.appendChild(img);
        gallery.appendChild(div);
    });
}


// Load wallpapers when the gallery is opened
window.toggleWallpaperGallery = function () {
    loadWallpaperGallery();
    const gallery = document.getElementById("wallpaper-gallery");
    gallery.style.display = gallery.style.display === "none" ? "flex" : "none";
};

function addStickyNote() {
    let note = document.createElement("div");
    note.className = "sticky-note";
    note.contentEditable = true;
    note.style.background = "#ffeb3b"; // Yellow by default
    note.onblur = saveNotes;
    document.getElementById("notes-container").appendChild(note);
}

function saveNotes() {
    localStorage.setItem("notes", document.getElementById("notes-container").innerHTML);
}

const files = [
    "book1.pdf", "book2.pdf", "book3.pdf",
    "book4.pdf", "book5.pdf", "book6.pdf"
];

function openFile(url) {
    console.log("Opening file:", url);
    window.open(url, "_blank"); // Open PDF in new tab
}

function loadFileGallery() {
    const gallery = document.getElementById("file-options");
    gallery.innerHTML = ""; // Clear previous entries

    files.forEach(file => {
        const div = document.createElement("div");
        div.classList.add("file-option");
        div.onclick = () => openFile(file);

        const embed = document.createElement("embed");
        embed.src = file;
        embed.type = "application/pdf";
        embed.width = "100";
        embed.height = "140";

        div.appendChild(embed);
        gallery.appendChild(div);
    });
}

// Toggle visibility of the gallery
window.toggleFileGallery = function () {
    loadFileGallery();
    const gallery = document.getElementById("file-gallery");
    gallery.style.display = gallery.style.display === "none" ? "flex" : "none";
};

// Handle file uploads
const fileInput = document.getElementById("fileInput");
if (fileInput) {
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                files.push(e.target.result); // Add new file
                loadFileGallery(); // Reload gallery
            };
            reader.readAsDataURL(file);
        }
    });
}













