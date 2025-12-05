/**
 * Power Pong Variation
 * Catch power-ups, avoid falling obstacles!
 */

"use strict";

// Power pong specific variables
const powerPongPaddle = {
    x: 300,
    y: 450,
    width: 90,
    height: 10
};

let powerPongScore = 0;
let powerPongLives = 3;
let powerPongGameSpeed = 1;
let powerPongSpawnTimer = 0;
let powerPongSpawnInterval = 60;
let powerUps = [];
let obstacles = [];

/**
 * Setup/reset the power pong variation
 */
function powerPongSetup() {
    powerPongPaddle.x = 300;
    powerPongPaddle.y = 450;
    powerPongScore = 0;
    powerPongLives = 3;
    gameOver = false;
    powerPongGameSpeed = 1;
    powerPongSpawnTimer = 0;
    powerPongSpawnInterval = 60;
    powerUps = [];
    obstacles = [];
}

/**
 * Draw function for power pong variation
 */
function powerPongDraw() {
    // Display UI
    displayPowerPongUI();
    
    // Update and draw power-ups and obstacles
    drawPowerUps();
    drawObstacles();
    
    // Update state
    movePowerPongPaddle();
    spawnPowerPongObjects();
    updatePowerUps();
    updateObstacles();
    
    // Draw paddle
    drawPowerPongPaddle();

    // draw instructions
    powerPongInstructions();
    
    // Increase difficulty over time
    if (frameCount % 600 === 0) {
        powerPongGameSpeed += 0.1;
        powerPongSpawnInterval = max(30, powerPongSpawnInterval - 5);
    }
}
// Move the power pong paddle with the mouse
function movePowerPongPaddle() {
    powerPongPaddle.x = mouseX - powerPongPaddle.width / 2;
    powerPongPaddle.x = constrain(powerPongPaddle.x, 0, width - powerPongPaddle.width);
}
// Draw the power pong paddle with color changing based on score
function drawPowerPongPaddle() {
    push();
     // Calculate hue based on score (changes every 100 points)
    const hue = (Math.floor(powerPongScore / 100) * 60) % 360;
    colorMode(HSB, 360, 100, 100);  // Set HSB color mode
    fill(hue, 80, 90);
    rect(powerPongPaddle.x, powerPongPaddle.y, powerPongPaddle.width, powerPongPaddle.height);
    pop();
}

// Draw all power-ups
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
// Draw all obstacles
function drawObstacles() {
    for (let obstacle of obstacles) {
        push();
        fill(255, 0, 0);
        ellipse(obstacle.x, obstacle.y, obstacle.size);
        // Add spikes
        stroke(200, 0, 0);
        strokeWeight(2);
        for (let angle = 0; angle < 360; angle += 45) {
            let x1 = obstacle.x + cos(radians(angle)) * (obstacle.size / 2);
            let y1 = obstacle.y + sin(radians(angle)) * (obstacle.size / 2);
            let x2 = obstacle.x + cos(radians(angle)) * (obstacle.size / 2 + 5);
            let y2 = obstacle.y + sin(radians(angle)) * (obstacle.size / 2 + 5);
            line(x1, y1, x2, y2);
        }
        pop();
    }
}
// Spawn power-ups and obstacles at intervals
function spawnPowerPongObjects() {
    powerPongSpawnTimer++;
    
    if (powerPongSpawnTimer >= powerPongSpawnInterval) {
        powerPongSpawnTimer = 0;
        
        // Randomly spawn either a power-up or obstacle
        if (random() > 0.4) {
            // Spawn power-up (60% chance)
            powerUps.push({
                x: random(20, width - 20),
                y: -20,
                size: 20,
                speed: 2 * powerPongGameSpeed
            });
        } else {
            // Spawn obstacle (40% chance)
            obstacles.push({
                x: random(20, width - 20),
                y: -20,
                size: 18,
                speed: 4 * powerPongGameSpeed
            });
        }
    }
}
// Update positions and check collisions for power-ups
function updatePowerUps() {
    for (let i = powerUps.length - 1; i >= 0; i--) {
        let powerUp = powerUps[i];
        powerUp.y += powerUp.speed;
        
        // Check collision with paddle
        if (checkPowerPongCollision(powerUp, powerPongPaddle)) {
            powerPongScore += 10;
            powerUps.splice(i, 1);
            continue;
        }
        
        // Remove if off screen
        if (powerUp.y > height + 20) {
            powerUps.splice(i, 1);
        }
    }
}
// Update positions and check collisions for obstacles
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obstacle = obstacles[i];
        obstacle.y += obstacle.speed;
        
        // Check collision with paddle
        if (checkPowerPongCollision(obstacle, powerPongPaddle)) {
            powerPongLives -= 1;
            obstacles.splice(i, 1);
            if (powerPongLives <= 0) {
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
// Check collision between object and paddle
function checkPowerPongCollision(obj, paddle) {
    return obj.y + obj.size / 2 >= paddle.y &&
           obj.x + obj.size / 2 >= paddle.x &&
           obj.x - obj.size / 2 <= paddle.x + paddle.width &&
           obj.y - obj.size / 2 <= paddle.y + paddle.height;
}
// Display power pong UI
function displayPowerPongUI() {
    push();
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Nutrients: " + powerPongScore, 10, 30);
    text("Lives: " + powerPongLives, 10, 55);
    text("Speed: " + nf(powerPongGameSpeed, 1, 1) + "x", 10, 80);
    pop();
}

// Draw power pong instructions
function powerPongInstructions() {
    push();
    fill(255);
    textSize(14);
    textAlign(LEFT);
    text("Catch yellow power-ups to feed the paddle!", 10, 100);
    text("Avoid red obstacles to keep your lives!", 10, 120);
    pop();
}

// Listen to keyboard for power pong
function powerPongKeyPressed(event) {
    if (event.keyCode === 27) {// 'ESC' key to return to munu
        gameOver = true;
    }
}