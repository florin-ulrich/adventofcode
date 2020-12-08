const {readLines} = require('../common');
const lines = readLines();

function terminates(lines) {
    let acc = 0;
    let curr = 0;
    const visited = new Array(lines.length).fill(false);
    while (curr < lines.length && visited[curr] === false) {
        const line = lines[curr];
        const [op, num] = line.split(" ");
        visited[curr] = true;
        switch (op) {
            case "nop":
                curr++;
                break;
            case "acc":
                curr++;
                acc += Number(num);
                break;
            case "jmp":
                curr += Number(num);
                break;
        }
    }
    return {terminates: curr >= lines.length, acc};
}

console.log(`part 1 loop entry acc value: ${terminates(lines).acc}`)

const changedOp = {
    jmp: "nop",
    nop: "jmp"
}

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [op, num] = line.split(" ");
    if (op.match(/(jmp|nop)/)) {
        const copiedLines = [...lines];
        const otherOp = changedOp[op];
        copiedLines[i] = `${otherOp} ${num}`;
        const prog = terminates(copiedLines);
        if (prog.terminates) {
            console.log(`part 2 loop terminates with acc value ${prog.acc} after changing op num ${i} to ${otherOp}`);
            break;
        }
    }
}
