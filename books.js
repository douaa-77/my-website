const books = [
    { title: "Book 1", cover: "cover1.jpg", file: "book1.pdf" },
    { title: "Book 2", cover: "cover2.jpg", file: "book2.pdf" },
    { title: "Book 3", cover: "cover3.jpg", file: "book3.pdf" }
];

const userBooks = JSON.parse(localStorage.getItem("userBooks")) || [];

function loadBookshelf() {
    const bookshelf = document.getElementById("bookshelf");
    bookshelf.innerHTML = "";

    books.forEach(book => addBookToShelf(book, bookshelf));

    // Load user books
    userBooks.forEach((book, index) => addBookToShelf(book, bookshelf, index, true));

    // Add the "Add Book" slot
    addAddBookSlot(bookshelf);
}

function addBookToShelf(book, shelf, index = null, isUserBook = false) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const img = document.createElement("img");
    img.src = book.cover || "default-cover.jpg";
    img.alt = book.title;

    const title = document.createElement("div");
    title.classList.add("book-title");
    title.innerText = book.title;

    const openBtn = document.createElement("button");
    openBtn.classList.add("open-btn");
    openBtn.innerText = "Read";
    openBtn.onclick = () => window.open(book.file, "_blank");

    bookDiv.appendChild(img);
    bookDiv.appendChild(title);
    bookDiv.appendChild(openBtn);

    if (isUserBook) {
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("delete-btn");
        removeBtn.innerHTML = "✘"; 
        removeBtn.onclick = () => removeUserBook(index);
        bookDiv.appendChild(removeBtn);
    }

    shelf.appendChild(bookDiv);
}

function addAddBookSlot(shelf) {
    const addBookDiv = document.createElement("div");
    addBookDiv.classList.add("book", "add-book");
    addBookDiv.innerHTML = `<span>➕ Add Book</span>`;
    addBookDiv.onclick = () => document.getElementById("uploadUserBook").click();
    shelf.appendChild(addBookDiv);
}

function addUserBook() {
    const fileInput = document.getElementById("uploadUserBook");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newBook = { title: file.name, cover: "default-cover.jpg", file: e.target.result };
            userBooks.push(newBook);
            saveUserBooks();
            loadBookshelf();
        };
        reader.readAsDataURL(file);
    }
}

// Save books to localStorage
function saveUserBooks() {
    localStorage.setItem("userBooks", JSON.stringify(userBooks));
}

// Remove book
function removeUserBook(index) {
    userBooks.splice(index, 1);
    saveUserBooks();
    loadBookshelf();
}

// Toggle Dark Mode
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");

    document.querySelector(".theme-toggle").innerText =
        body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Apply theme on load
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector(".theme-toggle").innerText = "☀️ Light Mode";
    }
    loadBookshelf();
};
