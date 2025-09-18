/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 0,
        b: 0,
    }
};
let skyChange = 0;
let skyFill = {
    r: 0,
    g: 0,
    b: 255,
};


/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    // background(160, 180, 200);

    skyChange = skyChange + 0.1;
    background(skyFill.r, skyFill.g, skyFill.b, skyChange);
    skyFill.r = skyFill.r + 0.3;
    skyFill.g = skyFill.g + 0.3;
    skyFill.b = skyFill.b + 0.3;

    // Update Mr. Furious's size



    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
    pop();
}