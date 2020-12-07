const fs = require('fs');

const groupAnswers = fs.readFileSync('./in').toString('utf-8')
    .split(/^\n/m)
    .map(e => e.split("\n"));

const part1Answers = groupAnswers
    .map(e => e
        .join("")
        .split("")
    ).map(arr => new Set(arr))
    .map(set => set.size)
    .reduce((a, b) => a + b);

console.log(`part 1 answers: ${part1Answers}`);

let part2Answers = 0;

for (let answers of groupAnswers) {
    answers = answers.map(a => a.split(""));
    answers.pop();
    part2Answers += answers
        .reduce((commonAnswers, nextAnswers) =>
            commonAnswers.filter(a => nextAnswers.includes(a))
        ).length
}

console.log(`part 2 answers: ${part2Answers}`);
