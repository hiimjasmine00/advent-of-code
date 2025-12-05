// I expected this to be a quick win, but BOY was I wrong.
// This was the first time in this Advent that I had to post to r/adventofcode to get some hints. 
// https://adventofcode.com/2025/day/5#part2
// hiimjasmine00 December 5, 2024 2:40am (02:40-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n\n")
    .filter(x => x.length > 0)
    .map(x => x.split("\n"));
const ranges = input[0].map(x => x.split("-").map(x => parseInt(x)));

for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    for (let j = 0; j < i; j++) {
        const child = ranges[j];
        if (child.length == 0) continue;
        if (range[0] <= child[0] && range[1] >= child[1]) child.splice(0, child.length);
    }
    for (let j = 0; j < i; j++) {
        const minimum = ranges[j];
        if (minimum.length == 0) continue;
        const value = minimum[1] + 1;
        if (range[0] >= minimum[0] && range[0] <= minimum[1] && range[1] >= value) range[0] = value;
    }
    for (let j = 0; j < i; j++) {
        const maximum = ranges[j];
        if (maximum.length == 0) continue;
        const value = maximum[0] - 1;
        if (range[1] >= maximum[0] && range[1] <= maximum[1] && range[0] <= value) range[1] = value;
    }
    for (let j = 0; j < i; j++) {
        const child = ranges[j];
        if (child.length == 0) continue;
        if (range[0] <= child[0] && range[1] >= child[1]) child.splice(0, child.length);
    }
}

let fresh = 0;
for (const range of ranges) {
    if (range.length == 0) continue;
    fresh += range[1] - range[0] + 1;
}

console.log(fresh);
