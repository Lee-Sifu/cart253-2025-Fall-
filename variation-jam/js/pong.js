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
    let ballRespawn = random() > 0.5; // Randomly decide which ball can respawn
     // Ball 1 (red)
    pongBalls.push({
        x: width / 2,
        y: height / 2,
        size: 15,
        speedX: 4,
        speedY: -4,
        color: [255, 0, 0], // Red
        canRespawn: ballRespawn,
    });
    
    // Ball 2 (yellow)
    pongBalls.push({
        x: width / 2,
        y: 50,
        size: 20,
        speedX: 3,
        speedY: 3,
        color: [255, 255, 0], // Yellow
        canRespawn: !ballRespawn,
    });
     gameOver = false;
}


/**
 * Draw function for pong variation
 */
function pongDraw() {
    // Update state
    movePongPaddle();
    updatePongBalls();
    
    // Draw current state
    drawPongPaddle();
    drawPongBalls();
    
    // Draw instructions
    drawPongInstructions();
}

function movePongPaddle() {
    // Move the paddle with the mouse
    pongPaddle.x = mouseX - pongPaddle.width / 2;
    // Constrain the paddle to the canvas
    pongPaddle.x = constrain(pongPaddle.x, 0, width - pongPaddle.width);
}

function updatePongBalls() {
    for (let i = pongBalls.length - 1; i >= 0; i--) {
        let ball = pongBalls[i];
        
        // Move ball
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Check for collision with walls
        if (ball.x <= 0 || ball.x + ball.size >= width) {
            ball.speedX *= -1;
        }
        if (ball.y <= 0) {
            ball.speedY *= -1;
        }
        // Check for collision with paddle
        checkPongPaddleCollision(ball);
          // Check if ball falls below canvas
        if (ball.y > height) {
            if (ball.canRespawn) {
                // Respawn the ball
                ball.x = width / 2;
                ball.y = height / 2;
                ball.speedY = -4;
            } else {
                // Game over for non-respawning balls
                gameOver = true;
            }
        }
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

function drawPongBalls() {
    for (let ball of pongBalls) {
        push();
        fill(ball.color);
        ellipse(ball.x, ball.y, ball.size);
        pop(); 
    }
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

