// My sleep schedule is still a load of crap, unfortunately.
// I'm now using some more descriptive variable names for this one.
// This should be easy enough.
// https://adventofcode.com/2025/day/5
// hiimjasmine00 December 5, 2025 1:32am (01:32-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n\n")
    .filter(x => x.length > 0)
    .map(x => x.split("\n"));
const ranges = input[0].map(x => x.split("-").map(x => parseInt(x)));
const ingredients = input[1].map(x => parseInt(x));

let fresh = 0;
for (const ingredient of ingredients) {
    for (const range of ranges) {
        if (ingredient >= range[0] && ingredient <= range[1]) {
            fresh++;
            break;
        }
    }
}

console.log(fresh);
