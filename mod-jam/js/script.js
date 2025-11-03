/**
 * Title of Project
 * Jason Lee
 * 
 * This my frog game where you need to eat flies to score points and be alive.
 * 
 */

"use strict";

/**
 * 
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
    color: 'black'  
}

let score = 0;
let targetScore = 5;
let timeLimit = 15;
let timeRemaining;
let gameState = 'playing'; // playing, gameOver, won
let level = 1;
let obstacles = [];
let numObstacles = 0;
let loseMessage = '';
let winMessage = '';

function setup() {
createCanvas(500, 500);
timeRemaining = timeLimit;
resetFly();
}


/**
 * Here is all my functions in draw
*/
function draw() {
    background(200, 225, 255);
    if (gameState === 'playing') {
    moveFrog();
    moveFly();
    drawFrog();
    drawFly();
    drawObstacles();
    checkTongueObstacleCollision(); 
    updateTongue();
    updateTimer();
    drawTongue();
    checkEat();
} else {
    drawFrog();
    drawFly();
    drawObstacles();
}
    displayScore();
    displayGameStatus();
}

function nextLevel() {
   
        level++;
        targetScore += 5;
        timeLimit += 15;
        timeRemaining = timeLimit;
        score = 0;
        createObstacles();
        gameState = 'playing';
        resetFly();
    
}

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

function drawObstacles() {
   for (let obstacle of obstacles) {
        fill(obstacle.color);
        rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

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

function updateTimer() { 
    if (gameState === 'playing') {
        timeRemaining -= 1/60;
  
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            gameState = 'lost';
            let loseMessages = ['Git Gud', 'Skill Issue!!!', 'Try Harder!!!', 'Be Better', 'Stormtrooper Aim!!!'];
            loseMessage = random(loseMessages);
        }
        
        if (score >= targetScore) {
            gameState = 'won';
            let winMessages = ['Good Job!', 'You deserve a treat', 'GG', 'Better get 100% next time!', 'You Win!'];
            winMessage = random(winMessages);
        }
    }
}

function moveFrog() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        frog.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        frog.x += 5;
    }
}

function drawFrog() {
    fill(frog.color);
    ellipse(frog.x, frog.y, frog.size);
}

function moveFly() {
fly.x += fly.speed;
if (fly.x > width) {
    resetFly();
}
    }

function drawFly() {
fill(fly.color);
ellipse(fly.x, fly.y, fly.size); 
}

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

function drawTongue() {
    if (tongue.state !== 'idle') {
        stroke('red');
        strokeWeight(5);
        line(frog.x, frog.y, tongue.x, tongue.y);
        noStroke();
    }
}

function mousePressed() {
    if (tongue.state === 'idle') {
        tongue.state = 'extending';
        tongue.angle = atan2(mouseY - frog.y, mouseX - frog.x);
    }
}

function checkEat() {
    let d = dist(tongue.x, tongue.y, fly.x, fly.y);
    if (d < fly.size / 2 && tongue.state === 'extending') {
        score++;
        tongue.state = 'retracting';
        resetFly();
    }

}

function resetFly() {
fly.x = 0;
fly.y = random(50, 150);
}

function displayScore() {
    fill(0);
    textSize(24);
    textAlign(LEFT, TOP);
    text('Level: ' + level, 10, 70);
    text('Score: ' + score + ' / ' + targetScore, 10, 10);
    text('Time: ' + Math.ceil(timeRemaining) + 's', 10, 40);
}

function displayGameStatus() {
    fill(0);
    textSize(24);
    textAlign(RIGHT, TOP);
    if (gameState === 'won') {
        textAlign(CENTER, CENTER);
        text(winMessage, width / 2, height / 2);
        textSize(24);
        text('Score: ' + score + ' / ' + targetScore, width/2, height/2 + 50);
        text('Press Spacebar to continue', width/2, height/2 + 80);
    } else if (gameState === 'lost') {
        textAlign(CENTER, CENTER);
        text(loseMessage, width / 2, height / 2);
        textSize(24);
        text('Score: ' + score + ' / ' + targetScore, width/2, height/2 + 50);
        text('Press R to restart', width/2, height/2 + 80);
    }
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
    score = 0;
    level = 1;
    targetScore = 5;
    timeLimit = 15;
    timeRemaining = timeLimit;
    gameState = 'playing';
    tongue.state = 'idle';
    tongue.length = 0;
    obstacles = [];
    resetFly();
    }
     if (key === ' ' && gameState === 'won') {
        nextLevel();
    }
}
    