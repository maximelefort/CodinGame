/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const MESSAGE = readline();

// Write an action using console.log()
// To debug: console.error('Debug messages...');

let binaryString = MESSAGE.split('').map((current, index, array) => {
    let binary = current.charCodeAt(0).toString(2);
    return (binary.length < 7 ? '0'.repeat(7-binary.length) : '') + binary; // force to have 7 bit 
})
.join('');

var regex = /(\d)\1*/g;
var answer = binaryString
    .match(regex)
    .reduce((acc, char) => acc + (char[0] == '0' ? '00 ' : '0 ') + '0'.repeat(char.length) + ' ', '');


console.log(answer.trim());