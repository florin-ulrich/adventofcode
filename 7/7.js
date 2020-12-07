const {readLines} = require('../common');
const lines = readLines();

function makeRule(line) {
    const formatBagType = bagType => {
        bagType = bagType.split(" ");
        bagType.pop();
        return bagType.join(" ");
    }
    let [bagType, containedBagsString] = line.split(" contain ");
    bagType = formatBagType(bagType);
    if (containedBagsString.startsWith("no other")) {
        return {bagType, containedBags: []};
    }
    let containedBags = containedBagsString.split(", ");
    containedBags = containedBags
        .map(bags => {
            const num = bags.charAt(0);
            let bagType = bags.substr(2);
            bagType = formatBagType(bagType);
            return new Array(Number(num)).fill(bagType);
        })
        .flat();
    return {bagType, containedBags};
}

let rules = lines.map(makeRule);
const ruleMap = {};
rules.forEach(({bagType, containedBags}) => ruleMap[bagType] = containedBags);

const solutions = {};

function containsGold(bagType) {
    const containedBags = ruleMap[bagType];
    if (bagType in solutions) {
        return solutions[bagType];
    }
    if (containedBags.length === 0) {
        solutions[bagType] = false;
        return false;
    }
    if (containedBags.includes("shiny gold")) return true;
    const ret = containedBags.map(containsGold).some(a => a);
    solutions[bagType] = ret;
    return ret;
}

const part1Bags = rules.map(a => a.bagType).filter(containsGold).length;
console.log(`part 1 bags: ${part1Bags}`)

function numBags(bagType) {
    const containedBags = ruleMap[bagType];
    return containedBags.length === 0 ? 0 :
        containedBags.length + containedBags.map(numBags).reduce((a, b) => a + b);
}

console.log(`part 2 bags: ${numBags("shiny gold")}`)
