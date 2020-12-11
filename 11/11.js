const {readLines} = require('../common');
let lines = readLines().map(a => a.split("")); // we split, as strings are not editable

function adjacentOccupiedSeatsPart1(i, j, lines) {
    const seats = new Array(8).fill(null);
    getAdjacentSeats(i, j, j - 1, j + 1, i - 1, i + 1, lines, seats);
    return seats.reduce((a, b) => a + b);
}

function adjacentOccupiedSeatsPart2(i, j, lines) {
    const seats = new Array(8).fill(null);
    for (let left = j - 1, right = j + 1, top = i + 1, down = i - 1;
         down >= 0 || top < lines.length || left >= 0 || right < lines[0].length;
         down--, top++, left--, right++) {
        getAdjacentSeats(i, j, left, right, top, down, lines, seats);
    }
    return seats.reduce((a, b) => a + b);
}

function getAdjacentSeats(i, j, left, right, top, down, lines, seats) {
    const setNewSeatsVal = (ind, checkedSeat) => {
        if (seats[ind] === null) {
            if (checkedSeat === "#") {
                seats[ind] = 1;
            } else if (checkedSeat === "L") {
                seats[ind] = 0;
            }
        }
    }
    const row = lines[i];
    const topRow = lines[top];
    const bottomRow = lines[down];
    if (topRow) {
        setNewSeatsVal(0, topRow[left]);
        setNewSeatsVal(1, topRow[j]);
        setNewSeatsVal(2, topRow[right]);
    }
    if (bottomRow) {
        setNewSeatsVal(3, bottomRow[left]);
        setNewSeatsVal(4, bottomRow[j]);
        setNewSeatsVal(5, bottomRow[right]);
    }
    setNewSeatsVal(6, row[left]);
    setNewSeatsVal(7, row[right]);
}

const deepCopy2D = arr => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = [...arr[i]];
    }
    return newArr;
}

function getAmountOfRuns(lines, adjacentSeatsFunction, thresholdOccToEmpty) {
    let prev = "";
    while (prev.toString() !== lines.toString()) {
        prev = deepCopy2D(lines);
        lines = deepCopy2D(lines);
        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[0].length; j++) {
                const currSeat = lines[i][j];
                switch (currSeat) {
                    case ".":
                        continue;
                    case "#":
                        if (adjacentSeatsFunction(i, j, prev) >= thresholdOccToEmpty) {
                            lines[i][j] = "L";
                        }
                        break;
                    case "L":
                        if (adjacentSeatsFunction(i, j, prev) === 0) {
                            lines[i][j] = "#";
                        }
                }
            }
        }
    }
    return lines
        .join("")
        .split("")
        .filter(a => a === "#")
        .length;
}

console.log(`part 1 occupied seats: ${getAmountOfRuns(lines, adjacentOccupiedSeatsPart1, 4)}`);
console.log(`part 2 occupied seats: ${getAmountOfRuns(lines, adjacentOccupiedSeatsPart2, 5)}`);
