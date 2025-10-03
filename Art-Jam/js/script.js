/**
 * Self-Portrait Project
 * By Jason Lee
 * 
 * This is a description of my self-portrait project.
 * It is supposed to be a fun and creative version of myself.
 * This will showcase some proceduralism in my self-portrait. 
 * Such as a dynamic background, breathing animation, and hair movement.
 * Mouse interaction will also be implemented to make the eyes follow the mouse
 * and change the facial expression based on mouse position.
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
    background(220, 20, 100); 
    colorMode(HSB, 360, 100, 100, 100); 
}


/**
 * Create a dynamic background that changes color over time
*/
function draw() {
    
    let bgHue = (220 + sin(time * 0.01) * 50) % 360;
        background(bgHue, 20, 150);
        time++;
        breathingPhase = sin(time * 0.06) * 0.2; // Breathing animation
        moodTimer++;

        // Text instructions
        fill(0, 0, 100);
        noStroke();
        textAlign(CENTER);
        textSize(25);
        text("Move the mouse left, center, or right to change my mood!", width/2, 20);

    // Change mood based on mouseX position
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
    // Face size changes with breathing
    let faceSize = 200 + breathingPhase * 10;
        push();
            translate(width/2, height/2); 
            stroke(30, 70, 20);
            strokeWeight(3);
            fill(35, 40, 85);
            ellipse(0, 0, faceSize, faceSize * 1.1);

    /* Custom Functions for face */
            drawBody();
            drawEyes();
            drawMouth();
            drawHair();
            drawNose();
        pop();
    
}
function drawBody() {
            // Draw neck
            fill(35, 40, 85);
            stroke(30, 50, 60);
            strokeWeight(2);

            // Neck
            let neckWidth = 40 + breathingPhase * 5;
            rect(-neckWidth/2, 110, neckWidth, 50);
            // Draw shoulders and torso
            fill(200, 60, 50);  // Shirt color (blue)
            stroke(200, 80, 30);
            strokeWeight(2);

            // Torso - trapezoid shape
            beginShape();
            vertex(-60, 160);   // Left shoulder
            vertex(60, 160);    // Right shoulder
            vertex(80, 350);    // Right bottom
            vertex(-80, 350);   // Left bottom
            endShape(CLOSE);

            // Draw arms
            fill(200, 60, 50);
            stroke(200, 80, 30);
            strokeWeight(2);

            // left arm
             let leftArmWave = sin(time * 0.03) * 5;
            beginShape();
            vertex(-60, 160); 
            vertex(-90, 200 + leftArmWave);
            vertex(-95, 300 + leftArmWave);
            vertex(-80, 310 + leftArmWave);
            vertex(-55, 240);
            endShape(CLOSE);

            // right arm
            let rightArmWave = sin(time * 0.03 + PI) * 5;
            beginShape();
            vertex(60, 160); 
            vertex(90, 200 + rightArmWave);
            vertex(95, 300 + rightArmWave);
            vertex(80, 310 + rightArmWave);
            vertex(55, 240);
            endShape(CLOSE);

            // Add hands
            fill(35, 40, 80);
            stroke(20, 80, 30);
            strokeWeight(2);
            ellipse(-95, 320 + leftArmWave, 30, 20);
            ellipse(95, 320 + rightArmWave, 30, 20);
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
           } else if (currentMood === 'happy') 
            {
            // Happy mouth
            arc(0, 45, 50, 30, 0, PI);
            // Add smile lines
            //strokeWeight(1);
           // line(-10, 35, -30, 30);
           // line(10, 35, 30, 30);
            } else {
            // Neutral mouth
            line(-10, 50, 15, 50);
            }
        }
function drawNose() {
            fill(30, 70, 20);
            stroke(20, 80, 30);
            strokeWeight(2);
            beginShape();
            vertex(0, -10);
            vertex(-5, 10);
            vertex(5, 10);
            vertex(0, -10);
            endShape(CLOSE);
}   
function drawHair() {
    stroke(30, 70, 20);
    strokeWeight(2);
    noFill();

    // Hair strands with noise for movement
    for (let angle = 180; angle < 360; angle += 0.1) {
                let rad = radians(angle);
                let hairLength = 120 + noise(angle * 0.1, time * 0.01) * 50;
                let hairWave = sin(time * 0.02 + angle * 0.1) * 20;
                
                let x1 = cos(rad) * 100;
                let y1 = sin(rad) * 110;
                let x2 = cos(rad) * hairLength + hairWave;
                let y2 = sin(rad) * hairLength + hairWave;
                line(x1, y1, x2, y2);
    }
}