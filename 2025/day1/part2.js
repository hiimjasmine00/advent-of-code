// Continuing from where we left off before,
// I tried to use mathematics to determine these numbers,
// but nothing I tried worked, so I resorted to looping.
// https://adventofcode.com/2025/day/1#part2
// hiimjasmine00 December 3, 2025 8:37pm (20:37-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n");

let rotation = 50;
let count = 0;
for (const line of input) {
    const factor = parseInt(line.slice(1));
    if (line.startsWith("L")) {
        for (let i = 0; i < factor; i++) {
            rotation = (((rotation - 1) % 100) + 100) % 100;
            if (rotation == 0) count++;
        }
    }
    else if (line.startsWith("R")) {
        for (let i = 0; i < factor; i++) {
            rotation = (((rotation + 1) % 100) + 100) % 100;
            if (rotation == 0) count++;
        }
    }
}

console.log(count);
