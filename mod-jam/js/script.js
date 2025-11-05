/**
 * Mod Jam Frog Game
 * Jason Lee
 * 
 * This my frog game where you need to eat flies to score points and advance levels.
 * 
 */

"use strict";

/**
 Here is all my objects
*/
const frog = {
    x: 250,
    y: 500,
    size: 50,
    color: 'green'
    
}

const tongue = {
            x: 250,
            y: 500,
            length: 0,
            maxLength: 500,
            speed: 20,
            state: 'idle', // idle, extending, retracting
        } 

const fly = {
    x: 100,
    y: 100,
    size: 25,
    speed: 3,
    color: 'black',
    angle: 0,
}

const fly2 = {
    x: 100,
    y: 100,
    size: 25,
    speed: 5,
    color: 'red',
    angle: 0,
}
// Here is all my variables
let score = 0;
let targetScore = 5;
let timeLimit = 15;
let timeRemaining;
let gameState = 'instructions'; // playing, gameOver, won, instructions
let level = 1;
let obstacles = [];
let numObstacles = 0;
let loseMessage = '';
let winMessage = '';
let fly2Active = false;
let gameOverTimer = 0;
let showRestartMessage = false;
let tongueSound;
let eatSound;
let flySound;
let fly2Sound;

// Here is my preload function
function preload() {
    flySound = loadSound('assets/sounds/flySound.mp3');
    fly2Sound = loadSound('assets/sounds/fly2Sound.mp3');
    eatSound = loadSound('assets/sounds/eatSound.mp3');
    tongueSound = loadSound('assets/sounds/tongueSound.mp3');
}

// Here is my setup function
function setup() {
createCanvas(500, 500);
timeRemaining = timeLimit;
resetFly();
resetFly2();
}


/**
 * Here is all my functions in draw
*/
function draw() {
    background(255, 225, 255);

     if (gameState === 'instructions') {
     if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(65) || keyIsDown(68)) {
        gameState = 'playing';
        }
     }
    if (gameState === 'instructions') {
        displayInstructions();
    } else if (gameState === 'playing') {
        moveFrog();
        moveFly();
        moveFly2();
        drawFrog();
        drawFly();
        drawFly2();
        drawObstacles();
        checkTongueObstacleCollision(); 
        updateTongue();
        updateTimer();
        drawTongue();
        checkEat();
        displayScore();
    } else {
        drawFrog();
        drawFly();
        drawObstacles();
        displayScore();
        updateTimer();
    }
    
    if (gameState !== 'instructions') {
        displayScore();
    }
    displayGameStatus();
 }

// Here is my instruction display function
function displayInstructions() {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Frog Frog Go', width / 2, 80);
    
    textSize(20);
    text('CONTROLS:', width / 2, 150);
    
    textSize(16);
    textAlign(LEFT, TOP);
    text('• Move Frog: LEFT/RIGHT Arrow or A/D keys', 50, 190);
    text('• Shoot Tongue: Click Mouse', 50, 220);
    
    textAlign(CENTER, CENTER);
    textSize(18);
    text('GOAL: Eat flies to reach your daily meal target!', width / 2, 280);
    text('Black flies = 1 point', width / 2, 310);
    text('Red flies = 5 points', width / 2, 340);
    text('Avoid obstacles - they block your tongue!', width / 2, 380);
    
    textSize(22);
    fill(0, 150, 0);
    text('Use the Frogs control input to start!', width / 2, 440);
 }

// Here is my next level function
function nextLevel() {
   
        level++;
        targetScore += 5;
        timeLimit += 15;
        timeRemaining = timeLimit;
        score = 0;
        createObstacles();
        gameState = 'playing';
        resetFly();
        resetFly2();  
}

// here is my obstacle functions
function createObstacles() {
     obstacles = []; 
    numObstacles = (level - 1) * 2; 
    
    for (let i = 0; i < numObstacles; i++) {
        obstacles.push({
            x: random(50, width - 50),
            y: random(100, 400),
            width: random(40, 80),
            height: random(40, 80),
            color: 'blue'
        });
    }
}

// Draw obstacles
function drawObstacles() {
   for (let obstacle of obstacles) {
        fill(obstacle.color);
        rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// check tongue colliosion with obstacles
function checkTongueObstacleCollision() {
    for (let obstacle of obstacles) {
        if (tongue.x > obstacle.x && 
            tongue.x < obstacle.x + obstacle.width &&
            tongue.y > obstacle.y && 
            tongue.y < obstacle.y + obstacle.height) {
           
         if (tongue.state === 'extending') {
             tongue.state = 'retracting';
            }
        }
    }
}

// Here is my timer update function
function updateTimer() { 
    if (gameState === 'playing') {
        timeRemaining -= 1/60;
  
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            gameState = 'lost';
            gameOverTimer = 0;
            showRestartMessage = false;
            let loseMessages = ['Git Gud', 'Skill Issue!!!', 'Try Harder!!!', 'Be Better', 'Stormtrooper Aim!!!','Go touch some grass', 'Put the frog down and take a break'];
            loseMessage = random(loseMessages);
        }
        
        if (score >= targetScore) {
            gameState = 'won';
            let winMessages = ['Good Job!', 'You deserve a treat', 'GG', 'Better get 100% next time!', 'OMG You Won!?!', 'Frog Champion!'];
            winMessage = random(winMessages);
        }
    }
    
    // Update game over timer for delay
    if (gameState === 'lost') {
        gameOverTimer++;
        if (gameOverTimer > 180) { 
            showRestartMessage = true;
        }
    }
}

// Here is my frog movement function
function moveFrog() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        frog.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        frog.x += 5;
    }
    // Keep frog inside canvas boundaries
    frog.x = constrain(frog.x, frog.size/2, width - frog.size/2);
}

// Here is my draw functions for my Frog
function drawFrog() {
    fill(frog.color);
    ellipse(frog.x, frog.y, frog.size);

    fill(255); 
    ellipse(frog.x - 10, frog.y - 5, 15, 15); 
    ellipse(frog.x + 10, frog.y - 5, 15, 15); 
    
    fill(0); 
    ellipse(frog.x - 10, frog.y - 5, 5, 5); 
    ellipse(frog.x + 10, frog.y - 5, 5, 5); 
}

// Here is my fly movement 
function moveFly() {
 fly.x += cos(fly.angle) * fly.speed;
 fly.y += sin(fly.angle) * fly.speed;
    
 if (fly.x > width || fly.x < 0 || fly.y > height || fly.y < 0) {
    resetFly();
    }
}

// Here is my second fly movement
function moveFly2() {
 if (fly2Active) {
    fly2.x += cos(fly2.angle) * fly2.speed;
    fly2.y += sin(fly2.angle) * fly2.speed;
        
 if (fly2.x > width || fly2.x < 0 || fly2.y > height || fly2.y < 0) {
    resetFly2();
    }
  }
}

// Here is my draw functions for my flies
function drawFly() {
   fill(fly.color);
   ellipse(fly.x, fly.y, fly.size); 
}

function drawFly2() {
if (fly2Active) {
   fill(fly2.color);
   ellipse(fly2.x, fly2.y, fly2.size);
 }
}

// Here is my tongue functions
function updateTongue() {
    if (tongue.state === 'extending') {
        tongue.length += tongue.speed;
        if (tongue.length >= tongue.maxLength) {
            tongue.state = 'retracting';
        }
    } else if (tongue.state === 'retracting') {
        tongue.length -= tongue.speed;
        if (tongue.length <= 0) {
            tongue.length = 0;
            tongue.state = 'idle';
        }
    }
    tongue.x = frog.x + cos(tongue.angle) * tongue.length;
    tongue.y = frog.y + sin(tongue.angle) * tongue.length;
}

// Draw tongue
function drawTongue() {
    if (tongue.state !== 'idle') {
        stroke('red');
        strokeWeight(5);
        line(frog.x, frog.y, tongue.x, tongue.y);
        noStroke();
    }
}

// Mouse pressed function to shoot tongue
function mousePressed() {
     if (gameState === 'instructions') {
        gameState = 'playing';
    }
    if (tongue.state === 'idle') {
        tongue.state = 'extending';
        tongue.angle = atan2(mouseY - frog.y, mouseX - frog.x);
        tongueSound.play();
    }
}

// Check if tongue eats fly
function checkEat() {
    let d = dist(tongue.x, tongue.y, fly.x, fly.y);
    if (d < fly.size / 2 && tongue.state === 'extending') {
        score++;
        tongue.state = 'retracting';
        eatSound.play();
        resetFly();
    } 
    if (fly2Active) {
    let d2 = dist(tongue.x, tongue.y, fly2.x, fly2.y);
    if (d2 < fly2.size / 2 && tongue.state === 'extending') {
        score+= 5;
        tongue.state = 'retracting';
        eatSound.play();
        resetFly2();
    }
 }
}

// Reset fly position and angle
function resetFly() {
  let edge = floor(random(4)); 
    
    if (edge === 0) { 
        fly.x = random(width);
        fly.y = 0;
        fly.angle = random(PI/4, 3*PI/4); 
    } else if (edge === 1) { 
        fly.x = width;
        fly.y = random(height);
        fly.angle = random(3*PI/4, 5*PI/4); 
    } else if (edge === 2) { 
        fly.x = random(width);
        fly.y = height;
        fly.angle = random(-3*PI/4, -PI/4); 
    } else { 
        fly.x = 0;
        fly.y = random(height);
        fly.angle = random(-PI/4, PI/4); 
    }
}

// Reset second fly position and angle
function resetFly2() {
  if (random() < 0.7) {
        fly2Active = true;
        
        let edge = floor(random(4));
        
    if (edge === 0) { 
        fly2.x = random(width);
        fly2.y = 0;
        fly2.angle = random(PI/4, 3*PI/4);
    } else if (edge === 1) { 
        fly2.x = width;
        fly2.y = random(height);
        fly2.angle = random(3*PI/4, 5*PI/4);
    } else if (edge === 2) {
        fly2.x = random(width);
        fly2.y = height;
        fly2.angle = random(-3*PI/4, -PI/4);
    } else { 
        fly2.x = 0;
        fly2.y = random(height);
        fly2.angle = random(-PI/4, PI/4);
    }
    if (gameState === 'playing') {
        fly2Sound.play();
    } else {
        fly2Active = false;
        fly2.x = -100; 
    }
}

// Display score and timer
function displayScore() {
    fill(0);
    textSize(24);
    textAlign(LEFT, TOP);
    text('Level: ' + level, 10, 70);
    text('Daily meals: ' + score + ' / ' + targetScore, 10, 10);
    text('Time: ' + Math.ceil(timeRemaining) + 's', 10, 40);
}

// Function to draw speech bubble
function drawSpeechBubble(message, x, y) {
    // Measure text to size bubble
    textSize(24);
    let textW = textWidth(message);
    let bubbleW = textW + 40;
    let bubbleH = 60;
    let bubbleX = x - bubbleW / 2;
    let bubbleY = y - 120;
    
    // Draw bubble
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(bubbleX, bubbleY, bubbleW, bubbleH, 10);
    
    // Draw tail
    triangle(x - 10, bubbleY + bubbleH, 
             x + 10, bubbleY + bubbleH, 
             x, bubbleY + bubbleH + 20);
    
    noStroke();
    
    // Draw text
    fill(0);
    textAlign(CENTER, CENTER);
    text(message, x, bubbleY + bubbleH / 2);
}

// Display game status messages
function displayGameStatus() {
    fill(0);
    textSize(24);
    textAlign(RIGHT, TOP);
    if (gameState === 'won') {
        textAlign(CENTER, CENTER);
        drawSpeechBubble(winMessage, frog.x, frog.y);
        text('Score: ' + score + ' / ' + targetScore, width/2, height/2 + 50);
        text('Press Spacebar to continue', width/2, height/2 + 80);
    } else if (gameState === 'lost') {
 
        // Show score and restart after delay
        drawSpeechBubble(loseMessage, frog.x, frog.y);
        textAlign(CENTER, CENTER);
        text('Score: ' + score + ' / ' + targetScore, width/2, height/2 + 50);
        
        if (showRestartMessage) {
            text('Press R to restart', width/2, height/2 + 80);
        }
    }
}

// Key pressed function for restarting and next level
function keyPressed() {
    if ((key === 'r' || key === 'R') && gameState === 'lost' && showRestartMessage) {
    score = 0;
    level = 1;
    targetScore = 5;
    timeLimit = 15;
    timeRemaining = timeLimit;
    gameState = 'instructions';
    tongue.state = 'idle';
    tongue.length = 0;
    obstacles = [];
    gameOverTimer = 0;
    showRestartMessage = false;
    resetFly();
    resetFly2();
    }
     if (key === ' ' && gameState === 'won') {
        nextLevel();
    }
 }
}