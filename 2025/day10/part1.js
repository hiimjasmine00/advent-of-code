// I personally think the hardest part of this was coming up with the algorithm.
// It took me a while to figure out that I had to do recursion, but I didn't know how.
// After a few hours of fiddling, I came up with this solution.
// https://adventofcode.com/2025/day/10
// hiimjasmine00 December 10, 2025 7:03am (07:03-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0);

/**
 * @param {boolean[]} requirement
 * @param {number[][]} buttons
 * @param {boolean[]} lights
 * @param {number} index
 * @param {number} depth
 * @returns {number}
 */
function parseButtons(requirement, buttons, lights, index, depth) {
    for (let i = index; i < buttons.length; i++) {
        const lights2 = lights.slice();
        for (const light of buttons[i]) {
            lights2[light] = !lights2[light];
        }
        if (lights2.every((x, j) => x == requirement[j])) return depth;
    }

    let minimum = 0;
    for (let i = index; i < buttons.length; i++) {
        const lights2 = lights.slice();
        for (const light of buttons[i]) {
            lights2[light] = !lights2[light];
        }
        const result = parseButtons(requirement, buttons, lights2, i + 1, depth + 1);
        if (minimum == 0 || (result > 0 && result < minimum)) minimum = result;
    }

    return minimum;
}

let result = 0;
for (const line of input) {
    const parts = line.split(" ");
    const requirement = parts.shift().slice(1, -1).split("").map(x => x == "#");
    parts.pop();
    const buttons = parts.map(x => x.slice(1, -1).split(",").map(x => parseInt(x)));
    const lights = Array(requirement.length).fill(false);
    result += parseButtons(requirement, buttons, lights, 0, 1);
}

console.log(result);
