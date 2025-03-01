document.addEventListener("DOMContentLoaded", function () {
    const editor = document.getElementById("editor");
    const exportBtn = document.getElementById("exportBtn");
    const boldBtn = document.getElementById("boldBtn");
    const italicBtn = document.getElementById("italicBtn");
    const underlineBtn = document.getElementById("underlineBtn");
    const headingBtn = document.getElementById("headingBtn");
    const linkBtn = document.getElementById("linkBtn");
    const imageInput = document.getElementById("imageInput");
    const commentSection = document.getElementById("commentSection");
    const commentInput = document.getElementById("commentInput");
    const commentBtn = document.getElementById("commentBtn");
    const fontSelect = document.getElementById("fontSelect");
    const themeSelect = document.getElementById("themeSelect");
    const coverInput = document.getElementById("coverInput");
    const wordCount = document.getElementById("wordCount");
    const privacyToggle = document.getElementById("privacyToggle");
    const likeBtn = document.getElementById("likeBtn");
    const shareBtn = document.getElementById("shareBtn");
    const roleSelect = document.getElementById("roleSelect");

    let history = JSON.parse(localStorage.getItem("bookHistory")) || [];
    let role = "Editor"; // Can be "Editor" or "Reader"

    // Load saved content instantly
    editor.innerHTML = localStorage.getItem("bookContent") || "";
    updateWordCount();

    // Auto-save content while typing
    editor.addEventListener("input", function () {
        if (role === "Editor") {
            localStorage.setItem("bookContent", editor.innerHTML);
            saveVersion();
            updateWordCount();
        }
    });

    function saveVersion() {
        history.push({ timestamp: new Date().toLocaleString(), content: editor.innerHTML });
        localStorage.setItem("bookHistory", JSON.stringify(history));
    }

    function updateWordCount() {
        wordCount.innerText = `Word Count: ${editor.innerText.trim().split(/\s+/).filter(word => word).length}`;
    }

    function loadVersion(index) {
        editor.innerHTML = history[index].content;
        localStorage.setItem("bookContent", editor.innerHTML);
    }

    // Export content as text file
    exportBtn.addEventListener("click", function () {
        const text = editor.innerHTML;
        const blob = new Blob([text], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MyBook.html";
        link.click();
    });

    // Rich Text Formatting (Modern Approach)
    function toggleStyle(style) {
        document.execCommand(style, false, null);
    }

    boldBtn.addEventListener("click", () => toggleStyle("bold"));
    italicBtn.addEventListener("click", () => toggleStyle("italic"));
    underlineBtn.addEventListener("click", () => toggleStyle("underline"));
    headingBtn.addEventListener("click", () => toggleStyle("formatBlock", "<h2>"));

    linkBtn.addEventListener("click", () => {
        const url = prompt("Enter the link URL:");
        if (url) document.execCommand("createLink", false, url);
    });

    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.execCommand("insertImage", false, e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Custom Fonts & Themes
    if (fontSelect) {
        fontSelect.addEventListener("change", function () {
            editor.style.fontFamily = fontSelect.value;
        });
    }

    if (themeSelect) {
        themeSelect.addEventListener("change", function () {
            editor.style.backgroundColor = themeSelect.value;
        });
    }

    // Upload Book Cover
    if (coverInput) {
        coverInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById("bookCover").src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Public & Private Books Toggle
    if (privacyToggle) {
        privacyToggle.addEventListener("change", function () {
            localStorage.setItem("bookPrivacy", this.checked ? "Public" : "Private");
        });
    }

    // Like & Share
    if (likeBtn) {
        likeBtn.addEventListener("click", function () {
            let likes = parseInt(localStorage.getItem("bookLikes")) || 0;
            likes++;
            localStorage.setItem("bookLikes", likes);
            this.innerText = `Likes: ${likes}`;
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(window.location.href);
            alert("Book link copied!");
        });
    }

    // Role Management
    if (roleSelect) {
        roleSelect.addEventListener("change", function () {
            role = this.value;
            editor.contentEditable = role === "Editor";
        });
    }
});
