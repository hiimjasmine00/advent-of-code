// Hey, does anyone have one of those Staples Easy Buttons?
// https://adventofcode.com/2025/day/9
// hiimjasmine00 December 9, 2025 3:05pm (15:05-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(",").map(x => parseInt(x)));

let result = 0;
for (let i = 0; i < input.length; i++) {
    const first = input[i];
    for (let j = i + 1; j < input.length; j++) {
        const second = input[j];
        const product = Math.abs(first[0] - second[0] + 1) * Math.abs(first[1] - second[1] + 1);
        if (result < product) result = product;
    }
}

console.log(result);
