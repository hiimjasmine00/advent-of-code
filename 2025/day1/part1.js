// Welcome back to Advent of Code!
// I'm glad to see you all again. This Advent is shorter than I expected,
// but I couldn't care less about the amount of days it has.
// I'm completely renouncing the use of artificial intelligence in these, so this code will be 100% man-made :)
// (Or woman-made, since I'm a trans girl now)
// Oh, and I'm using macOS instead of Windows. Expect some less-than-ideal code,
// since my MacBook (Air 13-inch, M3, 2024) is way faster than my gaming laptop.
// https://adventofcode.com/2025/day/1
// hiimjasmine00 December 3, 2025 8:16pm (20:16-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n");

let rotation = 50;
let count = 0;
for (const line of input) {
    const factor = parseInt(line.slice(1));
    if (line.startsWith("L")) rotation -= factor;
    else if (line.startsWith("R")) rotation += factor;
    rotation = ((rotation % 100) + 100) % 100;
    if (rotation == 0) count++;
}

console.log(count);
