const {readLines} = require('../common');
const lines = readLines();

// part 1
const start = Number(lines[0]);
const bussesPart1 = lines[1].split(",").filter(a => a !== "x").map(Number);

let part1Result;

for (let i = start, found = false; !found; i++) {
    for (let bus of bussesPart1) {
        if (i % bus === 0) {
            part1Result  = (i - start) * bus;
            found = true;
        }
    }
}

console.log(`part 1 timestamp: ${part1Result}`);


// part 2
const bussesPart2 = lines[1].split(",");

const getxi = (Ni, ni) => {
    for (let i = 1; i <= ni; i++) {
        if ((i * Ni) % ni === 1) return i;
    }
}

const N = bussesPart1.reduce((a, b) => a * b);

const getbiNiXi = (bi, ni, N) => {
    return BigInt(bi) * BigInt(N / ni) * BigInt(getxi(N / ni, ni));
}

const part2Result = bussesPart2
    .reverse()
    .map((a, ind) => a === "x" ? BigInt(0) : getbiNiXi(ind, Number(a), N))
    .reduce((a, b) => a + b) % BigInt(N);

console.log(`part 2 timestamp: ${part2Result - BigInt(bussesPart2.length - 1)}`);
