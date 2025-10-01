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
let currentMood = 'neutral';
 // Possible values: "happy", "sad", "neutral"
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

    if (mouseX < width/2) {
                currentMood = 'sad';
            } else if (mouseX > 2*width/3) {
                currentMood = 'happy';
            } else {
                currentMood = 'neutral';
            }

            // Eye following mouse
            eyeFollowX = lerp(eyeFollowX, mouseX, 0.5);
            eyeFollowY = lerp(eyeFollowY, mouseY, 0.5);

             if (time % 180 == 0) { 
                isBlinking = true;
                blinkTimer = 0;
            }
            if (isBlinking) {
                blinkTimer++;
                if (blinkTimer > 15) { 
                    isBlinking = false;
                }
            }

    let faceSize = 200 + breathingPhase * 20;
        push();
            translate(width/2, height/2); 
            stroke(30, 70, 20);
            strokeWeight(3);
            fill(35, 40, 85);
            ellipse(0, 0, faceSize, faceSize * 1.1);

    /* Custom Functions for face */
            drawEyes();
            drawMouth();
            drawHair();
            drawNose();
        pop();
    
}

function drawEyes() {
         fill(0, 0, 100);
         stroke(0, 0, 0);
         strokeWeight(2);
         ellipse(-40, -30, 60, 40);
         ellipse(40, -30, 60, 40);

         // conditional for blinking
         if (!isBlinking) {
                // Eye pupils follow mouse with constrain
                let eyeOffsetX = map(eyeFollowX, 0, width, -15, 15);
                let eyeOffsetY = map(eyeFollowY, 0, height, -10, 10);
                
                // Constrain eye movement
                eyeOffsetX = constrain(eyeOffsetX, -15, 15);
                eyeOffsetY = constrain(eyeOffsetY, -10, 10);
                

        // Eye pupils
        fill(220,80,20);
        noStroke();
        ellipse(-40 + eyeOffsetX,-30 + eyeOffsetY, 25, 25);
        ellipse(40 + eyeOffsetX,-30 + eyeOffsetY, 25, 25);
 }      
        else {
            // Closed blinking eyes 
            stroke(0, 0, 0);
            strokeWeight(3);
            line(-65, -30, -15, -30);
            line(15, -30, 65, -30);
            }
        
}

function drawMouth() {
           stroke(350, 70, 40);
           strokeWeight(3);
           noFill();
            
            // Mouth changes based on mood (conditional)
            if (currentMood === 'sad') {
            // Sad mouth
            arc(0, 50, 40, 20, radians(200), radians(260));
           } else if (currentMood === 'happy') {
            // Happy mouth
            arc(0, 45, 50, 30, 0, PI);
            // Add smile lines
            strokeWeight(1);
            line(-10, 35, -30, 30);
            line(10, 35, 30, 30);
            } else {
            // Neutral mouth
            line(-10, 50, 15, 50);
            }
        }
function drawNose() {
            fill(30, 70, 20);
            stroke(20, 80, 30);
            strokeWeight(2);
            triangle(0, -10, -10, 10, 10, 10);
}
function drawHair() {
    stroke(30, 70, 20);
    strokeWeight(2);
    noFill();
    for (let angle = 180; angle < 360; angle += 15) {
                let rad = radians(angle);
                let hairLength = 120 + noise(angle * 0.1, time * 0.01) * 80;
                let hairWave = sin(time * 0.02 + angle * 0.1) * 20;
                
                let x1 = cos(rad) * 100;
                let y1 = sin(rad) * 110;
                let x2 = cos(rad) * hairLength + hairWave;
                let y2 = sin(rad) * hairLength + hairWave;
                line(x1, y1, x2, y2);
    }
}