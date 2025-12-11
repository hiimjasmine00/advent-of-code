// A penultimate quickie. I've got a bad feeling about part 2.
// https://adventofcode.com/2025/day/11
// hiimjasmine00 December 11, 2025 12:27am (00:27-05:00) EST

const fs = require("fs");
const path = require("path");
const input = Object.fromEntries(fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(": ").map((x, i) => i == 0 ? x : x.split(" "))));

let count = 0;

function parseDevices(device) {
    const entries = input[device];
    if (entries.length > 1) count += entries.length - (device == "you" ? 0 : 1);
    for (const entry of entries) {
        if (entry != "out") parseDevices(entry);
    }
}

parseDevices("you");

console.log(count);
