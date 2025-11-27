/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuText = `
(1) pong variation
(2) power pong variation
(3) tennis pong variation`

/**
 * Display the main menu
 */
function menuDraw() {
    background(0);

    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(menuText, width / 2, height / 2);
    pop();
}

/**
 * Listen to the keyboard
 */
function menuKeyPressed(event) {
    switch (event.keyCode) {
        case 82:
            state = "1st variation";
            pongSetup();
            break;

        case 71:
            state = "2nd variation";
            powerPongSetup();
            break;

        case 66:
            state = "3rd variation";
            tennisPongSetup();
            break;
    }
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {
    // For now, clicking the mouse starts the 1st variation
    state = "1st variation";
    pongSetup();
}