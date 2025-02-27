document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const box = 20;
    let snake = [{ x: 10 * box, y: 10 * box }];
    let direction = "RIGHT";
    let food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    let gameInterval;

    // Load images
    const snakeImg = new Image();
    snakeImg.src = "green.png";  

    const foodImg = new Image();
    foodImg.src = "food.png"; 

    function drawGame() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw food image
        ctx.drawImage(foodImg, food.x, food.y, box, box);

        // Draw snake image
        for (let part of snake) {
            ctx.drawImage(snakeImg, part.x, part.y, box, box); // ✅ Using snakeImg
        }

        let newX = snake[0].x;
        let newY = snake[0].y;

        if (direction === "LEFT") newX -= box;
        if (direction === "RIGHT") newX += box;
        if (direction === "UP") newY -= box;
        if (direction === "DOWN") newY += box;

        if (newX === food.x && newY === food.y) {
            food.x = Math.floor(Math.random() * 20) * box;
            food.y = Math.floor(Math.random() * 20) * box;
        } else {
            snake.pop();
        }

        let newHead = { x: newX, y: newY };

        if (newX < 0 || newX >= canvas.width || newY < 0 || newY >= canvas.height || collision(newHead, snake)) {
            clearInterval(gameInterval);
            alert("Game Over!");
            return;
        }

        snake.unshift(newHead);
    }

    function collision(head, snake) {
        return snake.some(part => part.x === head.x && part.y === head.y);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    });

    document.getElementById("startGame").addEventListener("click", () => {
        clearInterval(gameInterval);
        snake = [{ x: 10 * box, y: 10 * box }];
        direction = "RIGHT";
        gameInterval = setInterval(drawGame, 150);
    });

    document.getElementById("stopGame").addEventListener("click", () => {
        clearInterval(gameInterval);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let gameCanvas = document.querySelector(".game-widget canvas");
    if (gameCanvas) {
        gameCanvas.style.width = "150px"; 
        gameCanvas.style.height = "150px";
    }
});
