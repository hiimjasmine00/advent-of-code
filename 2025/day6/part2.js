// I guess Break of Dawn by Michael Jackson is my lucky song.
// I don't care that this took one and a half hours to solve, what matters is that I solved it.
// https://adventofcode.com/2025/day/6#part2
// hiimjasmine00 December 6, 2025 3:09am (03:09-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0);

const chars = [];
const end = input.length - 1;
const last = input[end];
for (let i = 0; i < last.length - 1;) {
    let index = last.slice(i + 1).split("").findIndex(x => x != " ");
    if (index < 0) index = last.length - i;
    chars.push(index);
    i += index + 1;
}

let output = 0;
for (let i = chars.length - 1, j = last.length - 1; i >= 0; j -= chars[i] + 1, i--) {
    const endChar = j - chars[i];
    const operation = last[endChar + 1];
    if (operation == "+") {
        let result = 0;
        for (let k = j; k > endChar; k--) {
            let num = "";
            for (let l = 0; l < end; l++) {
                num += input[l][k];
            }
            result += parseInt(num.trim());
        }
        output += result;
    }
    else if (operation == "*") {
        let result = 1;
        for (let k = j; k > endChar; k--) {
            let num = "";
            for (let l = 0; l < end; l++) {
                num += input[l][k];
            }
            result *= parseInt(num.trim());
        }
        output += result;
    }
}

console.log(output);
