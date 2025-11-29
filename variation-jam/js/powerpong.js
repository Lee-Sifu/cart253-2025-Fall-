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
    // UI
    displayUI();
    // Draw power-ups and obstacles
    drawPowerUps();
    drawObstacles();
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

function drawPowerUps() {
    for (let powerUp of powerUps) {
        push();
        // Glow effect
        fill(255, 255, 0, 100);
        ellipse(powerUp.x, powerUp.y, powerUp.size + 10);
        // Main power-up
        fill(255, 255, 0);
        ellipse(powerUp.x, powerUp.y, powerUp.size);
        pop();
    }
}


function drawObstacles() {
    for (let obstacle of obstacles) {
        push();
        fill(255, 0, 0);
        // Draw as a spiky circle
        ellipse(obstacle.x, obstacle.y, obstacle.size);
        // Add spikes
        stroke(200, 0, 0);
        strokeWeight(2);
        for (let angle = 0; angle < 360; angle += 45) {
            let x1 = obstacle.x + cos(angle) * (obstacle.size / 2);
            let y1 = obstacle.y + sin(angle) * (obstacle.size / 2);
            let x2 = obstacle.x + cos(angle) * (obstacle.size / 2 + 5);
            let y2 = obstacle.y + sin(angle) * (obstacle.size / 2 + 5);
            line(x1, y1, x2, y2);
        }
        pop();
    }
}

function spawnObjects() {
    spawnTimer++;
    
    if (spawnTimer >= spawnInterval) {
        spawnTimer = 0;
        
        // Randomly spawn either a power-up or obstacle
        if (random() > 0.4) {
            // Spawn power-up (60% chance)
            powerUps.push({
                x: random(20, width - 20),
                y: -20,
                size: 20,
                speed: 2 * gameSpeed
            });
        } else {
            // Spawn obstacle (40% chance)
            obstacles.push({
                x: random(20, width - 20),
                y: -20,
                size: 18,
                speed: 2.5 * gameSpeed
            });
        }
    }
}

function updatePowerUps() {
    for (let i = powerUps.length - 1; i >= 0; i--) {
        let powerUp = powerUps[i];
        powerUp.y += powerUp.speed;
        
        // Check collision with paddle
        if (checkCollision(powerUp, paddle)) {
            score += 10;
            powerUps.splice(i, 1);
            continue;
        }
        
        // Remove if off screen
        if (powerUp.y > height + 20) {
            powerUps.splice(i, 1);
        }
    }
}
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obstacle = obstacles[i];
        obstacle.y += obstacle.speed;
        // Check collision with paddle
        if (checkCollision(obstacle, paddle)) {
            lives -= 1; 
            obstacles.splice(i, 1);
            if (lives <= 0) {
                gameOver = true;
            }
            continue;
        }
        // Remove if off screen
        if (obstacle.y > height + 20) {
            obstacles.splice(i, 1);
        }
    }
}
function checkCollision(obj, paddle) {
    return obj.y + obj.size >= paddle.y &&
           obj.x + obj.size >= paddle.x &&
           obj.x <= paddle.x + paddle.width &&
           obj.y <= paddle.y + paddle.height;
}

function displayUI() {
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Score: " + score, 10, 30);
    text("Lives: " + lives, 10, 55);
    text("Speed: " + nf(gameSpeed, 1, 1) + "x", 10, 80);
}

function displayGameOver() {
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize(24);
    text("Final Score: " + score, width / 2, height / 2 + 20);
    textSize(16);
    text("Click to restart", width / 2, height / 2 + 60);
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
        // Reset game state
        resetGame();
        
    }
}

function resetGame() {
    score = 0;
    lives = 3;
    gameOver = false;
    gameSpeed = 1;
    spawnTimer = 0;
    spawnInterval = 60;
    powerUps = [];
    obstacles = [];
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