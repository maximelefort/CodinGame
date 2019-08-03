/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const alphabetArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?".split('');

const L = parseInt(readline());
const H = parseInt(readline());
const T = readline();

var letters = T.toUpperCase().split('');

var alphabetMap = {};
for(let i = 0; i < alphabetArray.length; i++) {
    alphabetMap[alphabetArray[i]] = [];
}

for (let i = 0; i < H; i++) {
    const ROW = readline();
    for (let j = 0; j < alphabetArray.length; j++) {
        alphabetMap[alphabetArray[j]][i] = ROW.substr(j*L, L);
    }
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');

// write

var answer = "";
for (let k = 0; k < H; k++) {
    for (let c = 0; c < letters.length; c++) {
        var thisLetter = letters[c];
        if ((thisLetter < 'A') || ('Z' < thisLetter)) {
            thisLetter = '?';
        }
        answer += alphabetMap[thisLetter][k];
    }
    answer += '\n';
}



console.log(answer);