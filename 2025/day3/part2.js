// That was a good sleep. I think I had a bad dream, but I forgot already.
// Anyway, I decided to do what I came up with before I fell asleep.
// It's not ideal, but it works on my machine.
// hiimjasmine00 December 4, 2025 3:58am (03:58-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n");

let count = 0;
for (const line of input) {
    let maxes = Array(12).fill(0);
    for (let i = 0; i < line.length; i++) {
        const joltage = parseInt(line[i]);
        for (let j = 0; j < maxes.length; j++) {
            if (joltage > maxes[j] && i < line.length - maxes.length + j + 1) {
                maxes[j] = joltage;
                for (let k = j + 1; k < maxes.length; k++) {
                    maxes[k] = 0;
                }
                break;
            }
        }
    }
    count += maxes.reduce((a, x, i, r) => a + x * (10 ** (r.length - i - 1)), 0);
}

console.log(count);
