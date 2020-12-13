const {readLines} = require('../common');
const lines = readLines()
    .map(a => {
        return {dir: a[0], val: Number(a.substr(1))}
    });

const instructions = {
    "N": (boat, val) => boat.position.add(new Vector(0, val)),
    "S": (boat, val) => boat.position.add(new Vector(0, -val)),
    "E": (boat, val) => boat.position.add(new Vector(val, 0)),
    "W": (boat, val) => boat.position.add(new Vector(-val, 0)),
    "F": (boat, val) => boat.position.add(boat.direction.multiply(val)),
    "R": (boat, val, origin) => {
        boat.direction.rotate(val, origin)
    },
    "L": (boat, val, origin) => {
        boat.direction.rotate(-val, origin)
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    rotate(angle) {
        const radians = (Math.PI / 180) * angle;
        const cos = Math.round(Math.cos(radians));
        const sin = Math.round(Math.sin(radians));
        const nx = cos * this.x + sin * this.y;
        const ny = cos * this.y - sin * this.x;
        this.x = nx;
        this.y = ny;
    }

    multiply(val) {
        return new Vector(this.x * val, this.y * val);
    }
}

class Boat {
    constructor(x = 0, y = 0, dx = 1, dy = 0) {
        this.position = new Vector(x, y);
        this.direction = new Vector(dx, dy);
    }
}

let boat = new Boat();

for (let {dir, val} of lines) {
    instructions[dir](boat, val);
}

console.log(`part 1 solution: ${Math.abs(boat.position.x) + Math.abs(boat.position.y)}`)

boat = new Boat(0, 0, 10, 1);

for (let {dir, val} of lines) {
    const instruction = instructions[dir];
    if (dir.match(/[FRL]/)) {
        instruction(boat, val);
    }
    else {
        const tmp = boat.position.copy();
        boat.position = boat.direction;
        instruction(boat, val);
        boat.position = tmp;
    }
}

console.log(`part 2 solution: ${Math.abs(boat.position.x) + Math.abs(boat.position.y)}`)

