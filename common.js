const fs = require('fs');

const readLines = () => {
    const lines = fs.readFileSync('./in').toString('utf-8').split('\n');
    lines.pop();
    return lines;
}

module.exports = {readLines}
