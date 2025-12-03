// Third variant of pong game: Tennis Pong
"use strict";

// Tennis pong specific variables
const breakPongPaddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};
const breakBall = {
    x: 250,
    y: 250,
    size: 15,
    speedX: 4,
    speedY: -4
}; 
// Additional variables for breakout mechanics
let breakoutBalls = [];
let bricks = [];
let breakoutPowerUps = [];
let breakoutScore = 0;
let breakoutLevel = 1;

function breakPongSetup() {
    // Reset paddle position
    breakoutPaddle.x = width / 2 - breakoutPaddle.width / 2;
    breakoutPaddle.y = 450;
    breakoutPaddle.width = 100;
    
    breakoutBall.x = width / 2;
    breakoutBall.y = 400;
    breakoutBall.speedX = 3;
    breakoutBall.speedY = -3;
    breakoutBall.stuck = true;
    
    breakoutBalls = [];
    breakoutPowerUps = [];
    breakoutScore = 0;
    breakoutLevel = 1;
    gameOver = false;
    
    createBricks();
}