/**
 * This menu file contains the code to run *only* the menu part of the program.
 * It has its own draw, menuDraw(), and its own menuKeyPressed().
 * This keeps the stuff in the menu to be *separate* from the rest of the program.
 */

// Menu text to display
const menuText = `
(1) pong variation
(2) power pong variation
(3) break pong variation
 "ESC" to quit to menu at any time`

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
 * Handle key presses in the menu
 */
function menuKeyPressed(event) {
    switch (event.keyCode) {
        // Listen for numeric keys 1, 2, 3 to match the menu text
        case 49: // '1'
            state = "pong variation";
            pongSetup();
            break;

        case 50: // '2'
            state = "power pong variation";
            powerPongSetup();
            break;

        case 51: // '3'
            state = "break pong variation";
            breakPongSetup();
            break;
    }
}

