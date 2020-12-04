const fs = require('fs');

const entries = fs.readFileSync('./in').toString('utf-8').split(/^\n/m);
const keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const entriesAsObjects = entries.map(e => e
    .split("\n")
    .join(" ")                              // get all fields on the same line
).map(line => {
    const kvPairs = line.split(" ");
    const obj = {};
    kvPairs.forEach(kv => obj[kv.substr(0, 3)] = kv.substr(4));
    return obj;
})

const part1Passports = entriesAsObjects.filter(
    e => {
        for (let key of keys) {
            if (!(key in e)) {
                return false;
            }
        }
        return true;
    }
);

console.log(`part 1: ${part1Passports.length} valid passports`);

const conditions = [
    e => e.match(/^\d{4}$/) && e >= 1920 && e <= 2002,
    e => e.match(/^\d{4}$/) && e >= 2010 && e <= 2020,
    e => e.match(/^\d{4}$/) && e >= 2020 && e <= 2030,
    e => ((e.match(/^\d{3}cm$/) && e.substr(0, 3) >= 150 && e.substr(0, 3) <= 193)) ||
        ((e.match(/^\d{2}in$/) && e.substr(0, 2) >= 59 && e.substr(0, 2) <= 76)),
    e => e.match(/^#[0-9a-f]{6}$/),
    e => e.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
    e => e.match(/^\d{9}$/),
]

const part2Passports = part1Passports.filter(
    e => {
        for (let i = 0; i < keys.length; i++) {
            const validator = conditions[i];
            const value = e[keys[i]];
            if (!validator(value)) return false;
        }
        return true;
    }
);

console.log(`part 1: ${part2Passports.length} valid passports`);
