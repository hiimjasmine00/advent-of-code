// Time to split some beams!
// This intimidated me at first, but I came up with the solution pretty quickly.
// https://adventofcode.com/2025/day/7
// hiimjasmine00 December 7, 2025 2:36am (02:36-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(""));

let split = 0;
function beginBeam(x, startY) {
    for (let y = startY; y < input.length; y++) {
        const cell = input[y][x];
        if (cell == "|") return;
        else if (cell == "^") {
            split++;
            beginBeam(x - 1, y);
            beginBeam(x + 1, y);
            break;
        }
        else {
            input[y][x] = "|";
        }
    }
}

startLoop:
for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
        if (row[x] == "S") {
            beginBeam(x, y);
            break startLoop;
        }
    }
}

console.log(split);
