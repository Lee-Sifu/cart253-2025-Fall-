// Third variant of pong game: Break Pong
"use strict";
console.log("breakpong.js loaded");
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

function breakPongSetup() {
    // Reset paddle position
    breakPongPaddle.x = width / 2 - breakPongPaddle.width / 2;
    breakPongPaddle.y = 450;
    breakPongPaddle.width = 100;
    
    breakBall.x = width / 2;
    breakBall.y = 400;
    breakBall.speedX = 3;
    breakBall.speedY = -3;
    breakBall.stuck = true;
    
    breakBalls = [];
    breakPowerUps = [];
    breakScore = 0;
    breakLevel = 1;
    gameOver = false;
    
    createBricks();
}

function createBricks() {
    bricks = [];
    // Add more rows as levels progress
    const rows = Math.min(5 + Math.floor(breakLevel / 2), 10); // Max 10 rows
    const cols = 8;
    const brickWidth = 50;
    const brickHeight = 20;
    const offsetX = (width - cols * brickWidth) / 2;
    const offsetY = 50;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
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

function breakPongDraw() {
    // Update state
    moveBreakPaddle();
    moveBreakBall();
    updateBricks();
    updateBreakPowerUps();
    drawBreakPong();
}

function moveBreakPaddle() {
    breakPongPaddle.x = mouseX - breakPongPaddle.width / 2;
    breakPongPaddle.x = constrain(breakPongPaddle.x, 0, width - breakPongPaddle.width);
}

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

function checkLevelComplete() {
    const allDestroyed = bricks.every(brick => brick.destroyed);
    if (allDestroyed) {
        nextLevel();
    }
}

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
function updateBreakPowerUps() {
    // Placeholder for power-up logic
}   

function breakPongMousePressed() {
    if (breakBall.stuck) {
        breakBall.stuck = false;
    }
}

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