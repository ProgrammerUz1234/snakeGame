const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Game variables
let box = 20;
let score = 0;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};
let direction;

// Control the snake
document.addEventListener("keydown", directionControl);
function directionControl(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT")
    direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT")
    direction = "RIGHT";
}

// Draw the game on the canvas
function drawGame() {
  // Draw the canvas background and the food
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff00" : "#66ff66";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Snake movement
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // If snake eats food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    // Remove last part of snake
    snake.pop();
  }

  // New head position
  let newHead = { x: snakeX, y: snakeY };

  // Game over conditions
  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert(`Game Over! Final Score: ${score}`);
  }

  snake.unshift(newHead);

  // Update the score
  document.getElementById("score").innerText = score;
}

// Check for collisions with the snake
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Run the game
let game = setInterval(drawGame, 100);
