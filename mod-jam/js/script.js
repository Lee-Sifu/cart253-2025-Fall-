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
    y: 250,
    size: 50,
    color: 'green'
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
    if (keyIsDown(UP_ARROW)) {
        frog.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        frog.y += 5;
    }
}

function drawFrog() {
    fill(frog.color);
    ellipse(frog.x, frog.y, frog.size);
}
function moveFly() {

}

function drawFly() {

}

function checkEat() {

}

function resetFly() {

}

function displayScore() {

}