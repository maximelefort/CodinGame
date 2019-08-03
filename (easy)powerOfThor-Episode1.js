/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

var inputs = readline().split(' ');
const lightX = parseInt(inputs[0]); // the X position of the light of power
const lightY = parseInt(inputs[1]); // the Y position of the light of power
const initialTX = parseInt(inputs[2]); // Thor's starting X position
const initialTY = parseInt(inputs[3]); // Thor's starting Y position


let currentTX = initialTX;
let currentTY = initialTY;

let dirY = dirX = "";

// game loop
while (true) {
    const remainingTurns = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    
    //reset axes direction
    dirX = dirY = "";
    
    if(lightY < currentTY){
        dirY = "N";
        currentTY--;
    } 
    if(lightY > currentTY){
        dirY = "S";
        currentTY++;
    }
    
    
    if(lightX < currentTX){
        dirX = "W";
        currentTX--;
    } 
    if(lightX > currentTX){
        dirX = "E";
        currentTX++;
    }

    // A single line providing the move to be made: N NE E SE S SW W or NW
    console.log(dirY + dirX);
}