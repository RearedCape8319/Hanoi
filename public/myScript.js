/**
 * DECLARE GLOBAL VARIABLES FOR USE IN THE PROGRAM
 * - The hanoi puzzle
 * - Variables for drawing the puzzle
 */
let puzzle;
let viewRatioX, viewRatioY;
let pegWidthRatio, pegHeightRatio;

let viewWidth, viewHeight;
let pegWidth, pegHeight, pegDistance;
let discHeightRatio;
let discMaxWidth, discMinWidth, discHeight;



/**
 * SETUP FUNCTION RUNS ONCE AT PROGRAM START
 * - Setup graphics
 * - Initialise global variables
 * - Calculate other global variables
 */
function setup() {

    // Setup graphics
    createCanvas(405, 720);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);

    // Initialise global variables
    puzzle = new Hanoi(3, 3);
    viewRatioX = 0.95;
    viewRatioY = 0.6;
    pegWidthRatio = 0.2;
    pegHeightRatio = 0.8;
    discHeightRatio = 0.3;
    

    // Calculate other global variables
    viewWidth = width * viewRatioX;
    viewHeight = height * viewRatioY;
    pegWidth = viewWidth * pegWidthRatio / puzzle.pegCount;
    pegHeight = viewHeight * pegHeightRatio;
    pegDistance = viewWidth / 3;
    discMaxWidth = viewWidth / 3;
    discMinWidth = pegWidth * 1.5;
    discHeight = (pegHeight*discHeightRatio) / puzzle.discCount;
    // discHeight = min(pegWidth, discHeight);

}



/**
 * DRAW FUNCTION RUNS CONTINUOUSLY AFTER SETUP
 * - Draw the pegs
 * - Draw the discs
 * - Draw the outline for debugging
 */
function draw() {
    
    background(20);

    // Draw the pegs
    stroke(0);
    strokeWeight(2);
    fill(30, 60, 78);
    for (let i = 0; i < puzzle.pegCount; i++) {
        let x = (width-viewWidth)*0.5 + pegDistance*0.5 + (i*pegDistance);
        let y = height*0.5 + (viewHeight-pegHeight)*0.5;
        rect(x, y, pegWidth, pegHeight)
    }

    // Draw the discs
    stroke(0);
    strokeWeight(2);
    for (let i = 0; i < puzzle.pegCount; i++) {
        let p = puzzle.pegs[i];
        let x = (width-viewWidth)*0.5 + pegDistance*0.5 + (i*pegDistance);
        let tmpDiscs = [...p.discs];
        for (let j = 0; j < tmpDiscs.length; j++) {
            let d = tmpDiscs[j];
            let h = 360 - d * (360/puzzle.discCount)
            let w = d * (discMaxWidth-discMinWidth)/puzzle.discCount + discMinWidth;
            let y = height - (height-viewHeight+discHeight)*0.5 - j*discHeight;
            fill(h, 100, 100);
            rect(x, y, w, discHeight);
        }
    }

    // Draw the outline for debugging
    if (true) {
        stroke(100);
        strokeWeight(2)
        noFill();
        rect(width/2, height/2, viewWidth, viewHeight);
    }

}



/**
 * FUNCTION TO HANDLE MOUSE PRESS EVENTS
 * - Endure the click is valid
 * - Tell the puzzle that a click occured and in what spot
 */
function mousePressed() {
    let xoff = (width - viewWidth) * 0.5;
    let yoff = (height - viewHeight) * 0.5;
    if (mouseX < xoff || mouseX > width-xoff || mouseY < yoff || mouseY > height-yoff) {
        return;
    } else {
        let spot = floor(3 * (mouseX-xoff) / viewWidth);
        puzzle.clicked(spot);
    }
}