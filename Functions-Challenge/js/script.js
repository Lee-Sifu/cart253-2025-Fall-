/**
 * Bouncy Ball Ball Bonanza
 * Pippin Barr
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball
const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 2
    }
};
//Second ball
 const ball2 = {
    x: 200,
    y: 50,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 3
    }
};

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    movePaddle(paddle);
    moveBall(ball);

    handleBounce(ball, paddle);

    drawPaddle(paddle);
    drawBall(ball);
    drawBall(ball2);
}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
paddle.x = mouseX;
}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {
ball.x += ball.velocity.x;
ball.y += ball.velocity.y;

ball2.x += ball2.velocity.x;
ball2.y += ball2.velocity.y;
}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball, paddle) {
    if (checkOverlap(ball, paddle)) {
        ball.velocity.y *= -1;
    }
    else if (ball.y < 0 || ball.y > width) {
        ball.velocity.y *= -1;
    }
    if (checkOverlap(ball2, paddle)) {
        ball2.velocity.y *= -1;
    }
    else if (ball2.y < 0 || ball2.y > width) {
        ball2.velocity.y *= -1;
    }
}

/**
 * Draws the specified paddle on the canvas
 */
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

/**
 * Draws the specified ball on the canvas
 */
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(ball.x, ball.y, ball.width, ball.height);
    pop();
}
function drawBall2(ball2) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("purple");
    rect(ball2.x, ball2.y, ball2.width, ball2.height);
    pop();
}

/**
 * Returns true if rectA and rectB overlap, and false otherwise
 * Assumes rectA and rectB have properties x, y, width and height to describe
 * their rectangles, and that rectA and rectB are displayed CENTERED on their
 * x,y coordinates.
 */
function checkOverlap(rectA, rectB) {
  return (rectA.x + rectA.width/2 > rectB.x - rectB.width/2 &&
          rectA.x - rectA.width/2 < rectB.x + rectB.width/2 &&
          rectA.y + rectA.height/2 > rectB.y - rectB.height/2 &&
          rectA.y - rectA.height/2 < rectB.y + rectB.height/2);
}