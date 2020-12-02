const {readLines} = require('../common');
lines = readLines();

for (let i = 0; i < lines.length; i++) {
    const num = Number(lines[i]);
    for (let j = 0; j < lines.length, j !== i; j++) {
        const otherNum = Number(lines[j]);
        if (num + otherNum === 2020) {
            console.log("part 1: " + (num * otherNum));
        }
    }
}

for (let i = 0; i < lines.length; i++) {
    const num = Number(lines[i]);
    for (let j = 0; j < lines.length, j !== i; j++) {
        const otherNum = Number(lines[j]);
        for (let k = 0; j < lines.length, k !== i, k !== j; k++) {
            const otherOtherNum = Number(lines[k]);
            if (num + otherNum + otherOtherNum === 2020) {
                console.log("part 2: " + (num * otherNum * otherOtherNum));
            }
        }
    }
}
