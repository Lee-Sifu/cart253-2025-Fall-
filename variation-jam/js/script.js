/**
 * TBA
 * Jason Lee
 * 
 * This the final jam for Cart 253
 * 
 */

"use strict";

/**
 * Constants of both ball and paddle
*/
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

const ball = {
    x: 250,
    y: 250,
    size: 15,
    speedX: 4,
    speedY: -4
};

const ball2 = {
    x:200,
    y:200,
    size: 20,
    speedX: 3,
    speedY: -3
}

/**  
 * Setup function to create canvas
 */
function setup() {
createCanvas(500, 500);
}


/**
 * All my functions being drawn in the canvas
*/
function draw() {
    // Clear the canvas each frame so moving objects don't leave trails
    background(100, 150, 250);

    // Update state
    movePaddle(paddle);
    moveBall(ball);

    // Draw current state
    drawPaddle(paddle);
    drawBall(ball);
    drawBall(ball2);
}

function movePaddle(p) {
    // Move the paddle with the mouse
    p.x = mouseX - p.width / 2;

    // Constrain the paddle to the canvas
    p.x = constrain(p.x, 0, width - p.width);
}

function moveBall(b) {
    // Move the ball
    b.x += b.speedX;
    b.y += b.speedY;

    // Check for collision with walls
    if (b.x <= 0 || b.x + b.size >= width) {
        b.speedX *= -1; // Reverse X direction
    }
    if (b.y <= 0) {
        b.speedY *= -1; // Reverse Y direction
    }

    // Check for collision with paddle
    if (b.y + b.size >= paddle.y &&
        b.x + b.size >= paddle.x &&
        b.x <= paddle.x + paddle.width) {
        b.speedY *= -1; // Reverse Y direction
        b.y = paddle.y - b.size; // Position ball above paddle
    }

    // Check for ball falling below the canvas
    if (b.y > height) {
        // Reset ball position
        b.x = width / 2;
        b.y = height / 2;
        b.speedY = -4; // Reset speed
    }
}

function drawPaddle(p) {
    // Draw the paddle
    fill(255);
    rect(p.x, p.y, p.width, p.height);
}

function drawBall(b) {
    // Draw the ball
    fill(255, 0, 0);
    ellipse(b.x, b.y, b.size);
}