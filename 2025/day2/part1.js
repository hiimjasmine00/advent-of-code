// Working with ranges, I see? This should be simple enough.
// https://adventofcode.com/2025/day/2
// hiimjasmine00 December 3, 2025 9:07pm (21:07-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")[0]
    .split(",")
    .map(x => {
        const parts = x.split("-");
        const minimum = parseInt(parts[0]);
        const maximum = parseInt(parts[1]);
        return Array(maximum - minimum + 1).fill(0).map((_, i) => i + minimum);
    })
    .flat();

let count = 0;
for (const num of input) {
    const str = num.toString();
    if (str.length % 2 == 0 && str.slice(0, str.length / 2) == str.slice(str.length / 2)) count += num;
}

console.log(count);
