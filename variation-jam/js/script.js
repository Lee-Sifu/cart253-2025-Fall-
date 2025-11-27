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
let gameOver = false;
let state = "menu";

/**  
 * Setup function to create canvas
 */
function setup() {
    createCanvas(500, 500);
    // Place ball2 at the top of the canvas (centered horizontally)
    ball2.y = ball2.size / 2;
    ball2.x = width / 2;
    // Ensure ball2's vertical speed is positive so it moves downwards
    ball2.speedY = Math.abs(ball2.speedY);
}


/**
 * All my functions being drawn in the canvas
*/
function draw() {
    // Clear the canvas each frame so moving objects don't leave trails
    background(100, 150, 250);
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "red-variation":
            redDraw();
            break
        case "green-variation":
            greenDraw();
            break;
        case "blue-variation":
            blueDraw();
            break;
    }

     if (gameOver) {
        // Display game over screen
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2);
        textSize(16);
        text("Click to restart", width / 2, height / 2 + 40);
        return;
    }
    
    // Update state
    movePaddle(paddle);
    moveBall(ball);
    moveBall2(ball2);
    
    // Check collisions
    checkPaddleCollision(ball);
    checkPaddleCollision(ball2);

    // Draw current state
    drawPaddle(paddle);
    drawBall(ball);
    drawBall2(ball2);
}

function movePaddle(paddle) {
    // Move the paddle with the mouse
    paddle.x = mouseX - paddle.width / 2;

    // Constrain the paddle to the canvas
    paddle.x = constrain(paddle.x, 0, width - paddle.width);
}

function moveBall(ball) {
    // Move ball 1 (the one that respawns)
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Check for collision with walls
    if (ball.x <= 0 || ball.x + ball.size >= width) {
        ball.speedX *= -1; // Reverse X direction
    }
    if (ball.y <= 0) {
        ball.speedY *= -1; // Reverse Y direction
    }

    // Check for ball falling below the canvas
    if (ball.y > height) {
        // Reset ball position
        ball.x = width / 2;
        ball.y = height / 2;
        ball.speedY = -4; // Reset speed
    }
}

function moveBall2(ball2) {
    // Move ball 2 (the survival ball - must not fall!)
    ball2.x += ball2.speedX;
    ball2.y += ball2.speedY;  // ADD to move down

    // Check for collision with walls
    if (ball2.x <= 0 || ball2.x + ball2.size >= width) {
        ball2.speedX *= -1; // Reverse X direction
    }
    if (ball2.y <= 0) {
        ball2.speedY *= -1; // Reverse Y direction
    } 
     // Check if ball2 falls - GAME OVER!
    if (ball2.y > height) {
        gameOver = true;
    }
}

function checkPaddleCollision(ball) {
    // Check for collision with paddle
    if (ball.y + ball.size >= paddle.y &&
        ball.x + ball.size >= paddle.x &&
        ball.x <= paddle.x + paddle.width &&
        ball.y <= paddle.y + paddle.height) {
        ball.speedY *= -1; // Reverse Y direction
        ball.y = paddle.y - ball.size; // Position ball above paddle
    }
}

function drawPaddle(paddle) {
    // Draw the paddle
    fill(255);
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall(ball) {
    // Draw the ball
    push()
    fill(255, 0, 0);
    ellipse(ball.x, ball.y, ball.size);
    pop()
}

function drawBall2(ball2) {
    // Draw ball 2 (yellow - survival ball)
    push();
    fill(255, 255, 0);
    ellipse(ball2.x, ball2.y, ball2.size);
    pop();
}

function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "red-variation":
            redMousePressed();
            break
        case "green-variation":
            greenMousePressed();
            break;
        case "blue-variation":
            blueMousePressed();
            break;
    }
    // Restart game on click if game over
    if (gameOver) {
        gameOver = false;
        // Reset ball positions
        ball.x = width / 2;
        ball.y = height / 2;
        ball.speedY = -4;
        ball.speedX = 4;
        
        ball2.x = width / 2;
        ball2.y = ball2.size / 2;
        ball2.speedY = 3;
        ball2.speedX = 3;
    }
}

function keyPressed(event) {
     switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "red-variation":
            redKeyPressed(event);
            break
        case "green-variation":
            greenKeyPressed(event);
            break;
        case "blue-variation":
            blueKeyPressed(event);
            break;
    }
}