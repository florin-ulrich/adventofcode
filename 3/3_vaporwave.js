const {readLines} = require('../common');
lines = readLines();

const depth = lines.length;
const length = lines[0].length;

let chars = "";

for (let i = 0; i < depth; i++) {
    chars += lines[i].split("").filter((char, index) => (index * i) % le)
}
