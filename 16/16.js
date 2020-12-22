const fs = require('fs');

const [specs, yourTicket, nearbyTickets] = fs.readFileSync('./in').toString('utf-8').split(/^\n/m).map(a => {
    const arr = a.split("\n")
    arr.pop()
    return arr;
});


const ranges = specs.map(spec => {
    const [specName, ranges] = spec.split(": ");
    const [range1, range2] = ranges.split(" or ");
    return {specName, range: [range1.split("-").map(Number), range2.split("-").map(Number)].flat()};
}).flat()

nearbyTickets.shift();

const ticketFieldsList = nearbyTickets.map(a => a.split(",").map(Number));

let errorRate = 0;

let ind = 0;
const invalidIndexes = [];

for (const ticketFields of ticketFieldsList) {
    for (const ticketField of ticketFields) {
        let valid = false;
        for (const {range} of ranges) {
            if (ticketField >= range[0] && ticketField <= range[1] || ticketField >= range[2] && ticketField <= range[3]) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            errorRate += ticketField;
            invalidIndexes.push(ind);
        }
    }
    ind++;
}

const validTicketFieldsList = ticketFieldsList.filter((a, ind) => !invalidIndexes.includes(ind));

console.log(`part 1 error scanning rate: ${errorRate}`)

const validSpecsForFields = []

for (let i = 0; i < ticketFieldsList[0].length; i++) {
    const validSpecsForField = [];
    for (const {specName, range} of ranges) {
        let valid = true;
        for (const ticketFields of validTicketFieldsList) {
            const ticketField = ticketFields[i];
            if (!(ticketField >= range[0] && ticketField <= range[1] || ticketField >= range[2] && ticketField <= range[3])) {
                valid = false;
                break;
            }
        }
        if (valid) {
            validSpecsForField.push(specName);
        }
    }
    validSpecsForFields.push({fieldName: null, validSpecsForField});
}

let allFieldsFound = false;

while (!allFieldsFound) {
    allFieldsFound = true;
    const singleField = validSpecsForFields.find(a => a.validSpecsForField.length === 1);
    if (singleField) {
        allFieldsFound = false;
    }
    else {
        break;
    }
    const fieldName = singleField.validSpecsForField[0];
    singleField.fieldName = fieldName;
    singleField.validSpecsForField = [];
    validSpecsForFields.forEach(a => a.validSpecsForField = a.validSpecsForField.filter(b => b !== fieldName));
}

const departureIndices = [];

validSpecsForFields.forEach((a, ind) => {
    if (a.fieldName.startsWith("departure")) {
        departureIndices.push(ind);
    }
})

const yourTicketValues = yourTicket[1].split(",")

const product = yourTicketValues.filter((_, ind) => departureIndices.includes(ind)).reduce((a, b) => a * b);

console.log(`part 2 result: ${product}`)




