/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var previousLandY = null;
var landingSiteY = null;
const surfaceN = parseInt(readline()); // the number of points used to draw the surface of Mars.
for (let i = 0; i < surfaceN; i++) {
    var inputs = readline().split(' ');
    const landX = parseInt(inputs[0]); // X coordinate of a surface point. (0 to 6999)
    const landY = parseInt(inputs[1]); // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
    if (previousLandY === landY) {
        landingSiteY = landY;
    }
    previousLandY = landY;
}

if (landingSiteY === null) {
    console.error("landingSiteY can't be null");
}

// game loop
while (true) {
    var inputs = readline().split(' ');
    const X = parseInt(inputs[0]);
    const Y = parseInt(inputs[1]);
    const hSpeed = parseInt(inputs[2]); // the horizontal speed (in m/s), can be negative.
    const vSpeed = parseInt(inputs[3]); // the vertical speed (in m/s), can be negative.
    const fuel = parseInt(inputs[4]); // the quantity of remaining fuel in liters.
    const rotate = parseInt(inputs[5]); // the rotation angle in degrees (-90 to 90).
    const power = parseInt(inputs[6]); // the thrust power (0 to 4).

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    
    const distanceToTheGround = Y - landingSiteY;

    let output = { rotation:0, power:0};
    
    if (distanceToTheGround < 25) {
        output.power = 0;
    } else if (distanceToTheGround < 200) {
        output.power = thrustPowerByVSpeed(vSpeed, -2, -3, -4, -5);
    } else if (distanceToTheGround < 600) {
        output.power = thrustPowerByVSpeed(vSpeed, -3, -5, -7, -9);
    } else if (distanceToTheGround >= 600) {
        output.power = thrustPowerByVSpeed(vSpeed, -5, -10, -15, -20);
    }

    // 2 integers: rotate power. rotate is the desired rotation angle (should be 0 for level 1), power is the desired thrust power (0 to 4).
    console.log(output.rotation + " " + output.power);
}

function thrustPowerByVSpeed (vSpeed, speed1, speed2, speed3, speed4) {
    let power = 0;
 
    if (vSpeed < speed4) {
        power = 4;
    } else if (vSpeed < speed3) {
        power = 3;
    } else if (vSpeed < speed2) {
        power = 2;
    } else if (vSpeed < speed1) {
        power = 1;
    } else if (vSpeed >= speed1) {
        power = 0;
    } 
 
    return power;
}