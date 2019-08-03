/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const G = 3.711;
const surfaceN = parseInt(readline()); // the number of points used to draw the surface of Mars.
let land = [];
for (let i = 0; i < surfaceN; i++) {
    
    var inputs = readline().split(' ');
    const landX = parseInt(inputs[0]); // X coordinate of a surface point. (0 to 6999)
    const landY = parseInt(inputs[1]); // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
    
    land.push({landX:landX, landY:landY});
}


// search the landing spot

let landingSpotXmin = null;
let landingSpotXmax = null;
let landingSpotY = null;

for (let i = 1; i < land.length; i++) {
    
    if(land[i].landY === land[i-1].landY) {
        
        landingSpotY = land[i].landY;
        landingSpotXmin = Math.min(land[i-1].landX, land[i].landX);
        landingSpotXmax = Math.max(land[i-1].landX, land[i].landX);
        
        break; // we can break because we have only one landing zone per test cases
        
    }
}

if (landingSpotXmin === null || landingSpotXmax === null || landingSpotY === null) {
    console.error("landing config is unusable");
}


// apply a 10% inner margin for safety in landing spot
let margin = (landingSpotXmax - landingSpotXmin) * 0.1;
landingSpotXmin = landingSpotXmin + margin;
landingSpotXmax = landingSpotXmax - margin;


var config = { landingSpotY:landingSpotY, landingSpotXmin:landingSpotXmin, landingSpotXmax:landingSpotXmax};



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
    

    // Calculate the heighest peak between the Mars Lander and the landing spot
    let maxHeightToLandingSpot = landingSpotY;
    for (let i = 0; i < land.length; i++) {
        if((X <= landingSpotXmin) && (land[i].landX > X) && (land[i].landX <= landingSpotXmin)) {

            maxHeightToLandingSpot = Math.max(maxHeightToLandingSpot, land[i].landY);
            
        } else if ((landingSpotXmax <= X) && (land[i].landX < X) && (landingSpotXmax <= land[i].landX)) {
            
            maxHeightToLandingSpot = Math.max(maxHeightToLandingSpot, land[i].landY);
       
        }
    } // for land.length
    
    
    // Calculate the current distance to the ground
    let distanceToTheGround = null;
    let groundAltitude = null;
    for (let j = 1; j < land.length; j++) {
        
        if ((land[j-1].landX < X) && (X < land[j].landX)) {
            
            //we found the main triangle
            let width = land[j].landX - land[j-1].landX;
            let height = land[j].landY - land[j-1].landY;
            let angle = 0;
            
            if (width !== 0 && height !== 0) {
                
                angle = Math.atan(height/width);   
                
            }
            
            //calculate our triangle
            let width2 = X - land[j-1].landX;
            let height2 = Math.tan(angle) * width2;

            //calculate the altitude under the Mars Lander
            groundAltitude = land[j-1].landY + height2;
            if(groundAltitude > Math.max(land[j-1].landY, land[j].landY) || groundAltitude < Math.min(land[j-1].landY, land[j].landY)){
                console.error("WRONG GROUND ALTITUDE");
            }


            // calculate the distance to the ground
            distanceToTheGround = Y - groundAltitude;
            
            break; // break the loop
        } // if
    } // for
    
    
    console.error("distance to the ground : " + distanceToTheGround);
    console.error("ground altitude : " + groundAltitude);
    console.error("Mars Lander altitude : " + Y);
    console.error("max height to landing spot : " + maxHeightToLandingSpot);
    console.error("landing spot altitude : " + landingSpotY);

    
    let metrics = {X:X, Y:Y, hSpeed:hSpeed, vSpeed:vSpeed, fuel:fuel, rotate:rotate, power:power, distanceToTheGround:distanceToTheGround, groundAltitude:groundAltitude, maxHeightToLandingSpot:maxHeightToLandingSpot};
    
    let command = PhaseSelector(metrics, config);

    // rotate power. rotate is the desired rotation angle. power is the desired thrust power.
    console.log(command.rotation + ' ' + command.power);
}

function PhaseSelector (metrics, config) {

    let command = {rotation: 0, power: 0};
    
    if (isEmergencyLanding(metrics, config) || isImminentLanding(metrics, config)) {
        
        command = LandingPhase(metrics, config);
        
    } else {
        
        if(isUpperLandingSpot(metrics, config) && Math.abs(metrics.hSpeed) <= 20) {
            
            command = ApproachPhase (metrics, config);
            
        } else {
            
            command = AlignmentPhase (metrics, config);
            
        }
    }
    
    return command;
}

function AlignmentPhase (metrics, config) {
    console.error("ALIGNMENT PHASE");
    
    let command = {rotation: 0, power: 0};
        
    
    // Stay above max max Height To Landing Spot when going to landing spot
    if (metrics.Y < metrics.maxHeightToLandingSpot + 400 && !isUpperLandingSpot(metrics, config)) {
        
        console.error("Stay above max max Height To Landing Spot");
        command.power = 4;
        command.rotation = 0;
        
    } else {
        
        // hSpeed limitation
        if(Math.abs(metrics.hSpeed) > 23) { //23
            
            console.error("hSpeed limitation");
            if (metrics.vSpeed < 20 && metrics.Y > metrics.maxHeightToLandingSpot  && metrics.distanceToTheGround > 200) {
                command.rotation = Math.sign(metrics.hSpeed) * 30;
            } else {
                command.rotation = Math.sign(metrics.hSpeed) * 20; //30
            }
            command.power = 4;
            
        } else {
            
            if (!isUpperLandingSpot(metrics, config)) {
                
                console.error("Mars Lander is NOT uppper the landing spot");
                if ((Math.abs(metrics.hSpeed) < 20) || !isHorizontalDirectionGood(metrics, config)) {
                    
                    console.error("rotate to move to the landing spot");
                    command.rotation = (metrics.X < config.landingSpotXmin ? -1 : 1) * 20;
                    
                } else {
                    
                    console.error("move to the landing spot");
                    command.rotation = 0;
                    
                }
                
            } else {
                
                console.error("Mars Lander is upper the landing spot");
                if (Math.abs(metrics.hSpeed) >= 0) {
                    
                    console.error("stop hSpeed landing spot");
                    command.rotation = Math.sign(metrics.hSpeed) * 20;
                    
                } else {
                    
                    console.error("should never happen -> Approach phase");
                    command.rotation = 0;
                    
                }
            }
            
            // Go down slowly
            // can be optimize for fuel
            if(Math.abs(metrics.vSpeed) >= 20) {
                
                command.power = 4;
                
            } else {
                
                command.power = 3;
                
            }
        }
        
        
    }
    
    return command;
}

function ApproachPhase (metrics, config) {
    console.error("APPROACH PHASE");
    
    let command = {rotation: 0, power: 0};

    let vSpeedLandingTarget = 40; // default value
    // optimisation
    if(metrics.fuel / 4 > metrics.distanceToTheGround / 10 ) {
        vSpeedLandingTarget = 10;
    } else if(metrics.fuel / 4 > metrics.distanceToTheGround / 20 ) {
        vSpeedLandingTarget = 20;
    } else if(metrics.fuel / 4 > metrics.distanceToTheGround / 30 ) {
        vSpeedLandingTarget = 30;
    }
    
    // Go down slowly
    // can be optimize for fuel
    if(Math.abs(metrics.vSpeed) >= vSpeedLandingTarget) {
        
        command.power = 4;
        
    } else {
        
        command.power = 3;
        
    }
    
    metrics.vSpeed
    metrics.fuel
    
    
    // mettre hSpeed à 0 si le LEM est au dessus de la zone d'atterissage
    if ( isUpperLandingSpot(metrics, config) ) {
        
        console.error("stabilize upper the landing zone");
        command.rotation = 0; // by default
        if (Math.abs(metrics.hSpeed) > 15) {
            
            command.rotation = 45 * Math.sign(metrics.hSpeed);
            
        } else if (Math.abs(metrics.hSpeed) > 10) {
            
            command.rotation = 30 * Math.sign(metrics.hSpeed);
            
        } else if (Math.abs(metrics.hSpeed) > 5 ) {
            
            command.rotation = 15 * Math.sign(metrics.hSpeed);
            
        } else if (Math.abs(metrics.hSpeed) > 0 ) {
            
            command.rotation = 5 * Math.sign(metrics.hSpeed);
            
        }
        
    }
    
    return command;
}

function LandingPhase (metrics, config) {
    console.error("LANDING PHASE");
    
    let command = {rotation: 0, power: 3};

    return command;
}


function isImminentLanding (metrics, config) {
    
    // time to rotate to 0 to land in a vertical position (tilt angle = 0°)
    let answer = false; //default value
    let timeToLandingGround = metrics.distanceToTheGround / Math.abs(metrics.vSpeed);
    let timeNeededToRotateToZero = (Math.abs(metrics.rotate) / 15) + 1;
    if(timeToLandingGround <= timeNeededToRotateToZero) {
        console.error("IMMINENT LANDING");
        answer = true;
        
    }
    return answer;
}


function isEmergencyLanding (metrics, config) {
    
    // Emergency landing : falling with rotate to zero
    let answer = false; // default value
    let fuelNecessaryToRotateToZero = ((Math.abs(metrics.rotate)/15)+1) * metrics.power;
    if (fuelNecessaryToRotateToZero >= metrics.fuel) {
        console.error("EMERGENCY LANDING");
        answer = true;
    }
    return answer;
}


function isUpperLandingSpot (metrics, config) {
    
    let answer = false; // default value
    if ( config.landingSpotXmin < metrics.X && metrics.X < config.landingSpotXmax) {
        
        answer = true;
        
    }
    return answer;
}

function isHorizontalDirectionGood(metrics, config) {
    
    let answer = false; // default value
    if ((metrics.X < config.landingSpotXmin && metrics.hSpeed >= 0) || ( config.landingSpotXmin < metrics.X && metrics.X < config.landingSpotXmax) || (config.landingSpotXmax < metrics.X && metrics.hSpeed <= 0)) {
        
        answer = true;
        
    }
    return answer;
}
