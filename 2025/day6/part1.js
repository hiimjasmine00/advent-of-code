// This reminds me of that one Yasiin Bey/Mos Def song about Mathematics.
// Except this puzzle doesn't pertain to human mathematics.
// https://genius.com/Yasiin-bey-mathematics-lyrics
// https://adventofcode.com/2025/day/6
// hiimjasmine00 December 6, 2025 1:22am (01:22-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(/ +/g).filter(x => x.length > 0));

const end = input.length - 1;
let output = 0;
for (let i = 0; i < input[0].length; i++) {
    const operation = input[end][i];
    if (operation == "+") {
        let result = 0;
        for (let j = 0; j < end; j++) {
            result += parseInt(input[j][i]);
        }
        output += result;
    }
    else if (operation == "*") {
        let result = 1;
        for (let j = 0; j < end; j++) {
            result *= parseInt(input[j][i]);
        }
        output += result;
    }
}

console.log(output);
