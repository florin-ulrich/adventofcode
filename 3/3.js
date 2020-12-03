const {readLines} = require('../common');
lines = readLines();

const length = lines[0].length;
const depth = lines.length;

// part 1
let treesPart1 = 0;

for (let i = 0, j = 0; i < depth; i++, j = (j + 3) % length) {
    if (lines[i].charAt(j) === "#") {
        treesPart1++;
    }
}
console.log(`part 1 trees: ${treesPart1}`)

// part 2
let treesPart2 = 1;
const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

for (let currSlope = 0; currSlope < slopes.length; currSlope++) {
    let trees = 0;
    for (let i = 0, j = 0; i < depth; i += slopes[currSlope][1], j = (j + slopes[currSlope][0]) % length) {
        if (lines[i].charAt(j) === "#") {
            trees++;
        }
    }
    treesPart2 *= trees;
}

console.log(`part 2 trees: ${treesPart2}`)
