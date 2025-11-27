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
    width: 90,
    height: 10
};
let score = 0;
let lives = 3;
let gameSpeed = 1;
let gameOver = false;
let spawnTimer = 0;
let spawnInterval = 60; // Frames between power-ups
let state = "menu";

if (frameCount % 600 === 0) {
    gameSpeed += 0.5; // Increase speed every 10 seconds
    spawnInterval = max(30, spawnInterval - 5); // Decrease spawn interval but not below 30 frames
}

// array to hold power-ups and obstacles
let powerUps = [];
let obstacles = [];

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
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "pong variation":
            pongDraw();
            break
        case "power pong variation":
            powerPongDraw();
            break;
        case "tennis pong variation":
            tennisPongDraw();
            break;
    }

     if (gameOver) {
        // Display game over screen
        fill(255,0,0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2);
        textSize(16);
        text("Click to restart", width / 2, height / 2 + 40);
        return;
    }
    
    // Update state
    movePaddle(paddle);
    // spawn obj
    spawnObjects();
    //update power pups
    updatePowerUps();
    //update obstacles
    updateObstacles();
    // Draw current state
    drawPaddle(paddle);
}

function movePaddle(paddle) {
    // Move the paddle with the mouse
    paddle.x = mouseX - paddle.width / 2;

    // Constrain the paddle to the canvas
    paddle.x = constrain(paddle.x, 0, width - paddle.width);
}

function drawPaddle(paddle) {
    // Draw the paddle
    fill(255);
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "pong variation":
            pongMousePressed();
            break
        case "power pong variation":
            powerPongMousePressed();
            break;
        case "tennis pong variation":
            tennisPongMousePressed();
            break;
    }
    // Restart game on click if game over
    if (gameOver) {
        gameOver = false;
        // Reset ball positions
        
    }
}

function keyPressed(event) {
     switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "pong variation":
            pongKeyPressed(event);
            break
        case "power pong variation":
            powerPongKeyPressed(event);
            break;
        case "tennis pong variation":
            tennisPongKeyPressed(event);
            break;
    }
}