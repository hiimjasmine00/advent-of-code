// This solution looks simple, but it took me a very long time to figure out.
// https://adventofcode.com/2025/day/2#part2
// hiimjasmine00 December 3, 2025 9:26pm (21:26-05:00) EST

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
    for (let i = 1; i <= str.length / 2; i++) {
        if (str.length % i == 0) {
            let j = i;
            for (; j < str.length; j += i) {
                if (str.slice(j - i, j) != str.slice(j, j + i)) break;
            }
            if (j >= str.length) {
                count += num;
                break;
            }
        }
    }
}

console.log(count);
