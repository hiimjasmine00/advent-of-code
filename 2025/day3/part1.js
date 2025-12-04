// This puzzle reminds me of a Michael Jackson song.
// "Two thousand watts, eight ohms, two hundred volts, real strong"
// https://genius.com/Michael-jackson-2000-watts-lyrics
// https://adventofcode.com/2025/day/3
// hiimjasmine00 December 3, 2025 9:52pm (21:52-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n");

let count = 0;
for (const line of input) {
    let max1 = 0;
    let max2 = 0;
    for (let i = 0; i < line.length; i++) {
        const joltage = parseInt(line[i]);
        if (joltage > max1 && i != line.length - 1) {
            max1 = joltage;
            max2 = 0;
        }
        else if (joltage > max2) max2 = joltage;
    }
    count += max1 * 10 + max2;
}

console.log(count);
