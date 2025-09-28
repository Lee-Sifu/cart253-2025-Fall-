/**
 * Self-Portrait Project
 * By Jason Lee
 * 
 * This is a description of my self-portrait project.
 * It is supposed to be a fun and creative representation of myself.
 * This will showcase some proceduralism in my self-portrait.
 */

"use strict";

/**
 * Variables for self-portrait animation
*/
let time =0;
let breathingPhase =0;
let blinkTimer =0;
let isBlinking  = false;

/** Variables for eyes movement */
let eyeFollowX = 0;
let eyeFollowY = 0;

/**Mood Variable for face expression*/
let moodTimer = 0;

function setup() {
    createCanvas(800, 800);
    background(220, 200, 150); 
    colorMode(HSB, 360, 100, 100, 100); 
}


/**
 * Create a dynamic background that changes color over time
*/
function draw() {
    
    let bgHue = (220 + sin(time * 0.01) * 20) % 360;
        background(bgHue, 200, 150);
        time++;
        breathingPhase = sin(time * 0.05) * 0.3; // Breathing animation
        moodTimer++;


    let faceSize = 200 + breathingPhase * 20;
       // push();
            translate(width/2, height/2); 
            stroke(30, 70, 20);
            strokeWeight(3);
            fill(35, 40, 85);
            ellipse(0, 0, faceSize, faceSize * 1.1);

    /* Custom Functions for face */
            drawEyes();
           // drawMouth();
           // drawHair();
           // drawNose();
       // pop();
    
}

function drawEyes() {
         fill(0, 0, 100);
         stroke(0, 0, 0);
         strokeWeight(2);
         ellipse(-40, -30, 60, 40);
         ellipse(40, -30, 60, 40);
}
