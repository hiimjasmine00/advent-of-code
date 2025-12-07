// Those 40 minutes passed by pretty quickly.
// This was very annoying to come up with, but a Reddit meme pointed me in the right direction.
// Thank you, u/waskerdu!
// https://www.reddit.com/r/adventofcode/comments/1pgcauz/2025_day_7_part_2_yes_im_reposting_this/
// https://adventofcode.com/2025/day/7#part2
// hiimjasmine00 December 7, 2025 3:17am (03:17-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(""));
const outputs = {};

let split = 0;
function beginBeam(x, startY) {
    const key = `${x},${startY}`;
    let output = 0;
    if (typeof outputs[key] != "undefined") {
        output = outputs[key];
    }
    else {
        for (let y = startY; y < input.length; y++) {
            if (input[y][x] == "^") {
                output += beginBeam(x - 1, y);
                output += beginBeam(x + 1, y);
                break;
            }
        }
        if (output == 0) output = 1;
        outputs[key] = output;
    }
    return output;
}

startLoop:
for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
        if (row[x] == "S") {
            split = beginBeam(x, y);
            break startLoop;
        }
    }
}

console.log(split);
