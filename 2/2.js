const {readLines} = require('../common');
lines = readLines();

let correctPasswordsPart1 = 0;
let correctPasswordsPart2 = 0;

for (let line of lines) {
    // part 1
    let charCount = 0;
    const [head, body] = line.split(':');
    const [nums, char] = head.split(' ');
    const [min, max] = nums.split('-');
    for (let i = 0; i < body?.length; i++) {
        if(body.charAt(i) === char) charCount++;
    }
    if(charCount >= min && charCount <= max) {
        correctPasswordsPart1++;
    }
    // part 2
    let occurences = 0;
    let num1 = min;
    let num2 = max;
    if (body.charAt(Number(num1)) === char) occurences++;
    if (body.charAt(Number(num2)) === char) occurences++;
    if (occurences === 1) correctPasswordsPart2++;
}

console.log(`part 1: ${correctPasswordsPart1} correct passwords`);
console.log(`part 2: ${correctPasswordsPart2} correct passwords`);
