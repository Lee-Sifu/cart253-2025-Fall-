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
    x: 500,
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

function movePaddle(paddle) {
    // Move the paddle with the mouse
    paddle.x = mouseX - paddle.width / 2;

    // Constrain the paddle to the canvas
    paddle.x = constrain(paddle.x, 0, width - paddle.width);
}

function moveBall(ball) {
    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    ball2.y -= ball2.speedY;

    // Check for collision with walls
    if (ball.x <= 0 || ball.x + ball.size >= width) {
        ball.speedX *= -1; // Reverse X direction
    }
    if (ball.y <= 0) {
        ball.speedY *= -1; // Reverse Y direction
    }

    // Check for collision with paddle
    if (ball.y + ball.size >= paddle.y &&
        ball.x + ball.size >= paddle.x &&
        ball.x <= paddle.x + paddle.width) {
        ball.speedY *= -1; // Reverse Y direction
        ball.y = paddle.y - ball.size; // Position ball above paddle
    }

    // Check for ball falling below the canvas
    if (ball.y > height) {
        // Reset ball position
        ball.x = width / 2;
        ball.y = height / 2;
        ball.speedY = -4; // Reset speed
    }
    if (ball2.y > height) {
        // Reset ball2 position
        ball2.x = width / 2;
        ball2.y = height / 2;
        ball2.speedY = -3; // Reset speed
    }
}

function drawPaddle(paddle) {
    // Draw the paddle
    fill(255);
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall(ball) {
    // Draw the ball
    fill(255, 0, 0);
    ellipse(ball.x, ball.y, ball.size);
}