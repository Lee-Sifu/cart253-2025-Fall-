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
            maxLength: 420,
            speed: 20,
            state: 'idle', // idle, extending, retracting
            targetX: 0,
            targetY: 0
        } 

const fly = {
    x: 100,
    y: 100,
    size: 25,
    speed: 3,
    color: 'black'  
}

let score = 0;
function setup() {
createCanvas(500, 500);

resetFly();
}


/**
 * Here is all my functions in draw
*/
function draw() {
    background(200, 225, 255);
    moveFrog();
    moveFly();
    drawFrog();
    drawFly();
    updateTongue();
    drawTongue();
    checkEat();
    displayScore();
}

function moveFrog() {
    if (keyIsDown(LEFT_ARROW)) {
        frog.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
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
    tongue.x = frog.x;
    tongue.y = frog.y - tongue.length;
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
    }
}

function checkEat() {

}

function resetFly() {
fly.x = 0;
fly.y = random(50, 150);
}

function displayScore() {

}

    