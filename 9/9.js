const {readLines} = require('../common');
const lines = readLines().map(Number);

const validNums = [];
const preambLength = 25;
const previousNumsConsidered = 25;

let firstInvalid = 0;

for (let i = preambLength; i < lines.length; i++) {
    const consideredNums = [];
    const currNum = lines[i];
    let valid = false;
    for (let j = i - previousNumsConsidered; j < i; j++) {
        consideredNums[lines[j]] = true;
    }
    for (let j = i - previousNumsConsidered; j < i; j++) {
        const num = lines[j];
        if (consideredNums[currNum - num]) {
            valid = true;
        }
    }
    if (!valid) {
        firstInvalid = currNum;
        console.log(`part 1 first invalid number: ${currNum}`);
        break;
    }
}

for (let i = 0; i < lines.length; i++) {
    let sum = 0;
    let j = i;
    for (; j < lines.length, sum < firstInvalid; j++) {
        sum += lines[j];
    }
    if (sum === firstInvalid && j - i !== 1) { // second condition is to avoid the number itself being a set
        const subArray = lines.slice(i, j);
        const min = subArray.reduce((a, b) => Math.min(a, b));
        const max = subArray.reduce((a, b) => Math.max(a, b));
        console.log(`part 2 solution: ${min + max}`);
    }
}
