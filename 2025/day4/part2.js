// It's good to take a breather every once in a while.
// I really thought this solution was going to take a long while, but I guess it didn't.
// Anyway, that's it for now. See you all tomorrow.
// https://adventofcode.com/2025/day/4#part2
// hiimjasmine00 December 4, 2025 4:34am (04:34-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(""));

let count = 0;
while (true) {
    const removed = [];
    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        const top = y > 0 ? input[y - 1] : [];
        const bottom = y < input.length - 1 ? input[y + 1] : [];
        for (let x = 0; x < row.length; x++) {
            if (row[x] == "@") {
                let rolls = 0;
                const left = x - 1;
                const right = x + 1;
                if (top[left] == "@") rolls++;
                if (top[x] == "@") rolls++;
                if (top[right] == "@") rolls++;
                if (row[left] == "@") rolls++;
                if (row[right] == "@") rolls++;
                if (bottom[left] == "@") rolls++;
                if (bottom[x] == "@") rolls++;
                if (bottom[right] == "@") rolls++;
                if (rolls < 4) removed.push([x, y]);
            }
        }
    }
    for (const coordinate of removed) {
        input[coordinate[1]][coordinate[0]] = ".";
    }
    count += removed.length;
    if (removed.length == 0) break;
}

console.log(count);
