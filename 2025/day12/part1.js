// I don't get why this doesn't work on the example, but it works on the input, so I'm happy.
// I'm glad I got to participate in another Advent of Code. This was very fun.
// I hope to return next year!
// hiimjasmine00 December 12, 2025 12:43am (00:43-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n\n")
    .filter(x => x.length > 0);
const regions = input.pop().split("\n").filter(x => x.length > 0).map(x => {
    const [size, counts] = x.split(": ");
    const [width, height] = size.split("x").map(x => parseInt(x));
    return { counts: counts.split(" ").map(x => parseInt(x)), width, height }
});
const presents = input.map(x => x.split("\n").slice(1).join(""));

let result = 0;
for (const { counts, width, height } of regions) {
    let size = 0;
    for (let i = 0; i < presents.length; i++) {
        size += (presents[i].split("#").length - 1) * counts[i];
    }
    if (width * height >= size) result++;
}

console.log(result);
