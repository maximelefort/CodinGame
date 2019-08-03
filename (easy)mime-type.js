/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline()); // Number of elements which make up the association table.
const Q = parseInt(readline()); // Number Q of file names to be analyzed.

let mimeMap = {};
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const EXT = inputs[0].toLowerCase(); // file extension
    const MT = inputs[1]; // MIME type.
    mimeMap[EXT] = MT;
}

for (let i = 0; i < Q; i++) {
    const FNAME= readline(); // One file name per line.
    const group = FNAME.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    const ext = group && group[1].toLowerCase();
    ext && mimeMap[ext] ? console.log(mimeMap[ext]) : console.log('UNKNOWN');
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');


// For each of the Q filenames, display on a line the corresponding MIME type. If there is no corresponding type, then display UNKNOWN.
//console.log('UNKNOWN');