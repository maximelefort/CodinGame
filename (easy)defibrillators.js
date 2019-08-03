/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const longitudeA = readline().replace(",", ".");
const latitudeA = readline().replace(",", ".");
const N = parseInt(readline());
let defibrillators = [];
let minDistance = Infinity;
let nearestDefibrillatorId = null;

for (let i = 0; i < N; i++) {
    const DEFIB = readline().split(";");
    const defibrillator = {
        id: DEFIB[0],
        name: DEFIB[1],
        address: DEFIB[2],
        phoneNumber: DEFIB[3],
        longitude: DEFIB[4].replace(",", "."),
        latitude: DEFIB[5].replace(",", ".")
    };
    
    defibrillators[defibrillator.id] = defibrillator;
    

    let longitudeB = defibrillator.longitude;
    let latitudeB = defibrillator.latitude;
    
    //
    //let x = (LON - defibrillator.longitude) * Math.cos((defibrillator.latitude + LAT)/2);
    let x = (longitudeB - longitudeA);
    let y = latitudeB - latitudeA;
    let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 6371;
    
    if(distance < minDistance) {
        minDistance = distance;
        nearestDefibrillatorId = defibrillator.id;
    }
}


// Write an action using console.log()
// To debug: console.error('Debug messages...');
console.log(defibrillators[nearestDefibrillatorId].name);