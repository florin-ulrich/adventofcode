const {readLines} = require('../common');
const lines = readLines()
    .map(Number)
    .sort((a, b) => a - b);

const deviceJolts = lines.reduce((a, b) => Math.max(a, b)) + 3
lines.unshift(0);
lines.push(deviceJolts);
let oneJoltDifferences = 0;
let threeJoltDifferences = 0;

for (let i = 0; i < lines.length - 1; i++) {
    const currAdapter = lines[i];
    const nextAdapter = lines[i + 1];
    const diff = nextAdapter - currAdapter;
    if (diff === 1) {
        oneJoltDifferences++;
    } else if (diff === 3) {
        threeJoltDifferences++;
    }
}

console.log(`part 1 solution: ${oneJoltDifferences * threeJoltDifferences}`);

const numWays = new Array(lines.length).fill(0);
numWays[0] = 1;

for (let i = 1; i < lines.length; i++) {
    const currAdapter = lines[i];
    for (let j = Math.max(0, i - 3); j < i; j++) {
        const potentialAdapter = lines[j];
        if (currAdapter - potentialAdapter <= 3) {
            numWays[i] += numWays[j];
        }
    }
}

console.log(`part 2 solution: ${numWays[lines.length - 1]}`);
