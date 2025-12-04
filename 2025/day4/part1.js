// I like these ones.
// This utilizes an algorithm I developed at the young age of eight years old.
// That was nine years ago, can you believe it?
// hiimjasmine00 December 4, 2025 4:23am (04:23-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(""));

let count = 0;
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
            if (rolls < 4) count++;
        }
    }
}

console.log(count);
