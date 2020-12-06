const {readLines} = require('../common');
const lines = readLines();

const lineToId = line => {
    const bin = line.split("").map(a => (a === "B" || a === "R") ? "1" : "0").join("");
    const num = parseInt(bin, 2);
    const row = num >> 3;
    const col = num & 7;
    return row * 8 + col;
}

let maxId = 0;

for (let line of lines) {
    const id = lineToId(line);
    maxId = Math.max(maxId, id);
}

console.log(`part 1 highest id: ${maxId}`);

const mappedLines = lines.map(lineToId).sort((a, b) => a - b);
for (let i = 0; i < mappedLines.length - 1; i++) {
    if (mappedLines[i + 1] - mappedLines[i] === 2) {
        console.log(`part 2 seat: ${mappedLines[i] + 1}`);
    }
}
