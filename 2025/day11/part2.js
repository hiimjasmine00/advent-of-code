// JavaScript always has to be a consistent pain.
// An hour was spent on tweaking this problem, and it ended up being falsy 0.
// https://adventofcode.com/2025/day/11#part2
// hiimjasmine00 December 11, 2025 2:00am (02:00-05:00) EST

const fs = require("fs");
const path = require("path");
const input = Object.fromEntries(fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(": ").map((x, i) => i == 0 ? x : x.split(" "))));

const outputs = {};

function parseDevices(device, dac, fft) {
    const outputKey = `${device}_${dac}_${fft}`;
    if (outputs.hasOwnProperty(outputKey)) return outputs[outputKey];

    let count = 0;
    for (const entry of input[device]) {
        if (entry != "out") count += parseDevices(entry, dac || entry == "dac", fft || entry == "fft");
        else if (dac && fft) count++;
    }
    outputs[outputKey] = count;
    return count;
}

console.log(parseDevices("svr", false, false));
