// Third variant of pong game: Break Pong
"use strict";

// Break pong specific variables
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
let breakBalls = [];
let bricks = [];
let breakPowerUps = [];
let breakScore = 0;
let breakLevel = 1;

function breakPongSetup() {
    // Reset paddle position
    breakPaddle.x = width / 2 - breakPaddle.width / 2;
    breakPaddle.y = 450;
    breakPaddle.width = 100;
    
    breakBall.x = width / 2;
    breakBall.y = 400;
    breakBall.speedX = 3;
    breakBall.speedY = -3;
    breakBall.stuck = true;
    
    breakBalls = [];
    breakPowerUps = [];
    breakScore = 0;
    breakLevel = 1;
    gameOver = false;
    
    createBricks();
}