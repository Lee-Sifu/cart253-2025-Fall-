/**
 * Pong Variation
 * Two ball pong - keep the yellow ball alive!
 */

"use strict";

// Pong variation specific variables
const pongPaddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

let pongBalls = [];

/**
 * Setup/reset the pong variation
 */
function pongSetup() {
    // Reset paddle position
    pongPaddle.x = 300;
    pongPaddle.y = 280;
    
    pongBalls = [];

     // Ball 1 (red)
    pongBalls.push({
        x: width / 2,
        y: height / 2,
        size: 15,
        speedX: 4,
        speedY: -4,
        color: [255, 0, 0], // Red
    });
    
    // Ball 2 (yellow)
    pongBalls.push({
        x: width / 2,
        y: 50,
        size: 20,
        speedX: 3,
        speedY: 3,
        color: [255, 255, 0], // Yellow
    });
}
    gameOver = false;
    
/**
 * Draw function for pong variation
 */
function pongDraw() {
    // Update state
    movePongPaddle();
    movePongBall();
    movePongBall2();
    
    // Check collisions
    checkPongPaddleCollision(pongBall);
    checkPongPaddleCollision(pongBall2);

    // Draw current state
    drawPongPaddle();
    drawPongBall();
    drawPongBall2();
    
    // Draw instructions
    drawPongInstructions();
}

function movePongPaddle() {
    // Move the paddle with the mouse
    pongPaddle.x = mouseX - pongPaddle.width / 2;
    // Constrain the paddle to the canvas
    pongPaddle.x = constrain(pongPaddle.x, 0, width - pongPaddle.width);
}

function movePongBall() {
    // Move ball 1 (the one that respawns)
    pongBall.x += pongBall.speedX;
    pongBall.y += pongBall.speedY;

    // Check for collision with walls
    if (pongBall.x <= 0 || pongBall.x + pongBall.size >= width) {
        pongBall.speedX *= -1;
    }
    if (pongBall.y <= 0) {
        pongBall.speedY *= -1;
    }

    // Check for ball falling below the canvas - respawn it
    if (pongBall.y > height) {
        pongBall.x = width / 2;
        pongBall.y = height / 2;
        pongBall.speedY = -4;
    }
}

function movePongBall2() {
    // Move ball 2 (the survival ball - must not fall!)
    pongBall2.x += pongBall2.speedX;
    pongBall2.y += pongBall2.speedY;

    // Check for collision with walls
    if (pongBall2.x <= 0 || pongBall2.x + pongBall2.size >= width) {
        pongBall2.speedX *= -1;
    }
    if (pongBall2.y <= 0) {
        pongBall2.speedY *= -1;
    }
    
    // Check if ball2 falls - GAME OVER!
    if (pongBall2.y > height) {
        gameOver = true;
    }
}

function checkPongPaddleCollision(ball) {
    // Check for collision with paddle
    if (ball.y + ball.size >= pongPaddle.y &&
        ball.x + ball.size >= pongPaddle.x &&
        ball.x <= pongPaddle.x + pongPaddle.width &&
        ball.y <= pongPaddle.y + pongPaddle.height) {
        ball.speedY *= -1;
        ball.y = pongPaddle.y - ball.size;
    }
}

function drawPongPaddle() {
    fill(255);
    rect(pongPaddle.x, pongPaddle.y, pongPaddle.width, pongPaddle.height);
}

function drawPongBall() {
    push();
    fill(255, 0, 0);
    ellipse(pongBall.x, pongBall.y, pongBall.size);
    pop();
}

function drawPongBall2() {
    push();
    fill(255, 255, 0);
    ellipse(pongBall2.x, pongBall2.y, pongBall2.size);
    pop();
}

function drawPongInstructions() {
    push();
    fill(255);
    textSize(14);
    textAlign(LEFT);
    text("Keep the YELLOW ball alive!", 10, 20);
    pop();
}

/**
 * Handle key presses for pong variation
 */
function pongKeyPressed(event) {
    if (event.keyCode === 27) {// 'ESC' key to return to munu
        gameOver = true;
    }
}

