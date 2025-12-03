/**
 * Final Jam - Pong Variations
 * Jason Lee
 * 
 * Main file for Cart 253 Final Jam
 * 
 */

"use strict";

// SHARED GLOBAL VARIABLES (declared once here, used by all files)
let state = "menu";
let gameOver = false;

/**  
 * Setup function to create canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Main draw loop - routes to appropriate variation
 */
function draw() {
    background(100, 150, 250);
    
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "pong variation":
            if (gameOver) {
                displayGameOver("Pong Variation");
            } else {
                pongDraw();
            }
            break;
        case "power pong variation":
            if (gameOver) {
                displayGameOver("Power Pong");
            } else {
                powerPongDraw();
            }
            break;
        case "break pong variation":
            if (gameOver) {
                displayGameOver("Break Pong");
            } else {
                breakPongDraw();
            }
            break;
    }
}

/**
 * Display game over screen with option to return to menu
 */
function displayGameOver(gameName) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 20);
    textSize(16);
    text(gameName, width / 2, height / 2 + 10);
    text("Click to return to menu", width / 2, height / 2 + 40);
}

/**
 * Mouse pressed
 */
function mousePressed() {
    if (gameOver) {
        gameOver = false;
        state = "menu";
        return;
    }
    
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "pong variation":
            pongMousePressed();
            break;
        case "power pong variation":
            powerPongMousePressed();
            break;
        case "break pong variation":
            breakPongMousePressed();
            break;
    }
}

/**
 * Key pressed 
 */
function keyPressed(event) {
    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "pong variation":
            pongKeyPressed(event);
            break;
        case "power pong variation":
            powerPongKeyPressed(event);
            break;
        case "break pong variation":
            breakPongKeyPressed(event);
            break;
    }
}