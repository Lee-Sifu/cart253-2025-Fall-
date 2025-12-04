/**
 * Final Jam - Pong Variations
 * Jason Lee
 * 
 * Third variant of pong game: Break Pong
 * 
 *///
"use strict";

// Break pong specific variables
const breakPongPaddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};
const breakBall = {
    x: 250,
    y: 250,
    size: 15,
    speedX: 4,
    speedY: -4,
    stuck: true,
}; 
// Additional variables for breakout mechanics
let breakBalls = [];
let bricks = [];
let breakPowerUps = [];
let breakScore = 0;
let breakLevel = 1;

// Setup/reset the break pong variation
function breakPongSetup() {
    // Reset paddle position
    breakPongPaddle.x = width / 2 - breakPongPaddle.width / 2;
    breakPongPaddle.y = 450;
    breakPongPaddle.width = 100;
    // Reset ball position
    breakBall.x = width / 2;
    breakBall.y = 400;
    breakBall.speedX = 3;
    breakBall.speedY = -3;
    breakBall.stuck = true;
    // Reset other variables
    breakBalls = [];
    breakScore = 0;
    breakLevel = 1;
    gameOver = false;
    
    createBricks();
}

// Create bricks for the current level
function createBricks() {
    bricks = [];
    // Add more rows as levels progress
    const rows = Math.min(5 + Math.floor(breakLevel / 2), 10); // Max 10 rows
    const cols = 8; // Fixed number of columns
    const brickWidth = 50; // Fixed brick width
    const brickHeight = 20; // Fixed brick height
    const offsetX = (width - cols * brickWidth) / 2; // Center bricks
    const offsetY = 50; // Start 50px from top
    for (let r = 0; r < rows; r++) { // For each row
        for (let c = 0; c < cols; c++) { // For each column
             // Randomly skip some bricks for variety
            const skipChance = breakLevel > 3 ? 0.5 : 0; // 50% of gaps on harder levels
            if (Math.random() > skipChance) {
            bricks.push({
                x: offsetX + c * brickWidth,
                y: offsetY + r * brickHeight,
                width: brickWidth - 2,
                height: brickHeight - 2,
                destroyed: false
            });
        }
    }
 }
}

// Draw function for break pong variation
function breakPongDraw() {
    // Update state
    moveBreakPaddle();
    moveBreakBall();
    updateBricks();
    drawBreakPong();
}

// Move the break pong paddle with the mouse
function moveBreakPaddle() {
    breakPongPaddle.x = mouseX - breakPongPaddle.width / 2;
    breakPongPaddle.x = constrain(breakPongPaddle.x, 0, width - breakPongPaddle.width);
}

// Draw current state of break pong
function drawBreakPong() {
    // Draw paddle
    fill(255);
    rect(breakPongPaddle.x, breakPongPaddle.y, breakPongPaddle.width, breakPongPaddle.height);
    // Draw ball
    fill(255, 0, 0);
    ellipse(breakBall.x, breakBall.y, breakBall.size);
    // Draw bricks
    for (let brick of bricks) {
        if (!brick.destroyed) {
             // Color bricks based on level for variety
            const hue = (breakLevel * 30) % 360;
            fill(hue, 80, 200); // HSB color mode, or use RGB
            rect(brick.x, brick.y, brick.width, brick.height);
        }
    }
    // Level and score display
    fill(255);
    textSize(16);
    textAlign(RIGHT, TOP);
    text(`Level: ${breakLevel}`, width - 10, 10);
    // Draw score
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text(`Score: ${breakScore}`, 10, 10);
    // Show "Level Complete" message briefly when ball is stuck
    if (breakBall.stuck && breakLevel > 1) {
        fill(255, 255, 0);
        textSize(24);
        textAlign(CENTER, CENTER);
        text(`Level ${breakLevel - 1} Complete!`, width / 2, height / 2 - 50);
        text(`Click to start Level ${breakLevel}`, width / 2, height / 2 - 20);
    }
}

// Move the break pong ball
function moveBreakBall() {
    if (breakBall.stuck) {
        breakBall.x = breakPongPaddle.x + breakPongPaddle.width / 2;
        breakBall.y = breakPongPaddle.y - breakBall.size / 2;
        return;
    }
    breakBall.x += breakBall.speedX;
    breakBall.y += breakBall.speedY;

    // Check for collision with walls
    if (breakBall.x <= 0 || breakBall.x + breakBall.size >= width) {
        breakBall.speedX *= -1;
    }
    if (breakBall.y <= 0) {
        breakBall.speedY *= -1;
    }
    // Check for collision with paddle
    if (breakBall.y + breakBall.size >= breakPongPaddle.y &&
        breakBall.x + breakBall.size >= breakPongPaddle.x &&
        breakBall.x <= breakPongPaddle.x + breakPongPaddle.width &&
        breakBall.y <= breakPongPaddle.y + breakPongPaddle.height) {
        breakBall.speedY *= -1;
        breakBall.y = breakPongPaddle.y - breakBall.size;
    }
    // Check if ball falls - GAME OVER!
    if (breakBall.y > height) {
        gameOver = true;
    }
}

// Proceed to next level
function nextLevel() {
        breakLevel++;
        createBricks();
        breakBall.stuck = true;
        breakBall.x = width / 2;
        breakBall.y = 400;
        breakBall.speedX += 1;
        breakBall.speedY = -Math.abs(breakBall.speedY) - 1;  
         // Gradually increase difficulty
    const speedIncrease = 0.5; // Adjust this for difficulty
    breakBall.speedX = (breakBall.speedX > 0 ? 1 : -1) * (Math.abs(breakBall.speedX) + speedIncrease);
    breakBall.speedY = -Math.abs(breakBall.speedY) - speedIncrease; 
}

// Check if all bricks are destroyed to complete level
function checkLevelComplete() {
    const allDestroyed = bricks.every(brick => brick.destroyed);
    if (allDestroyed) {
        nextLevel();
    }
}

// Update bricks and check for collisions
function updateBricks() {
    for (let brick of bricks) {
        if (!brick.destroyed &&
            breakBall.y + breakBall.size >= brick.y &&
            breakBall.x + breakBall.size >= brick.x &&
            breakBall.x <= brick.x + brick.width &&
            breakBall.y <= brick.y + brick.height) {
            brick.destroyed = true;
            breakBall.speedY *= -1;
            breakScore += 10;
        }
    }
    checkLevelComplete();
}

// Mouse pressed for break pong
function breakPongMousePressed() {
    if (breakBall.stuck) {
        breakBall.stuck = false;
    }
}

// Listen to keyboard for break pong
function breakPongKeyPressed(event) {
    if (event.keyCode === 32) { // Spacebar to launch ball
        if (breakBall.stuck) {
            breakBall.stuck = false;
        }
    }
    if (event.keyCode === 27) { // ESC to return to menu
        gameOver = true;
    }
}