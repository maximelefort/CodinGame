/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const n = parseInt(readline()); // the number of temperatures to analyse
var inputs = readline().split(' ');

var lastClosestZeroValueKnown = null;

if(n>0) {
    lastClosestZeroValueKnown = parseInt(inputs[0]);    
    for (let i = 1; i < n; i++) {
        const t = parseInt(inputs[i]); // a temperature expressed as an integer ranging from -273 to 5526
        
        if(Math.abs(t) > Math.abs(lastClosestZeroValueKnown)) {
            continue;
        } else if(Math.abs(t) < Math.abs(lastClosestZeroValueKnown)) {
            lastClosestZeroValueKnown = t;
        } else if((Math.abs(t) == Math.abs(lastClosestZeroValueKnown)) && (t > 0)) {
            lastClosestZeroValueKnown = t;
        }        
    }
} else {
    lastClosestZeroValueKnown = 0;
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');

console.log(lastClosestZeroValueKnown);