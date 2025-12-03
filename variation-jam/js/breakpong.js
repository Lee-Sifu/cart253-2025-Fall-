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
    const rows = 5;
    const cols = 8;
    const brickWidth = 50;
    const brickHeight = 20;
    const offsetX = (width - cols * brickWidth) / 2;
    const offsetY = 50;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
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
            fill(0, 0, 255);
            rect(brick.x, brick.y, brick.width, brick.height);
        }
    }
    // Draw score
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text(`Score: ${breakScore}`, 10, 10);
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