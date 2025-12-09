// Very quick part 2 completion!
// Probably my fastest yet, and the only one that took less than 60 minutes, let alone 5.
// https://adventofcode.com/2025/day/8#part2
// hiimjasmine00 December 9, 2025 2:56pm (14:56-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(",").map(x => parseInt(x)));

const circuits = [];
const circuitIndices = {};

const visited = {};

for (let i = 0; i < input.length; i++) {
    visited[input[i].join(",")] = new Set();
    circuitIndices[i] = circuits.length;
    circuits.push([i]);
}

const distances = [];
for (let i = 0; i < input.length; i++) {
    const first = input[i];
    const firstKey = first.join(",");
    const firstVisited = visited[firstKey];
    for (let j = 0; j < input.length; j++) {
        if (i == j) continue;
        const second = input[j];
        const secondKey = second.join(",");
        const secondVisited = visited[secondKey];
        if (firstVisited.has(secondKey) || secondVisited.has(firstKey)) continue;
        firstVisited.add(secondKey);
        secondVisited.add(firstKey);
        distances.push([i, j]);
    }
}

function getDistance(pair) {
    const first = input[pair[0]];
    const second = input[pair[1]];
    return Math.sqrt((second[0] - first[0]) ** 2 + (second[1] - first[1]) ** 2 + (second[2] - first[2]) ** 2);
}

distances.sort((a, b) => getDistance(a) - getDistance(b));

let circuitsLeft = circuits.length;
let result = 0;
for (const [a, b] of distances) {
    const indexA = circuitIndices[a];
    const indexB = circuitIndices[b];
    if (indexA != indexB) {
        if (circuitsLeft == 2) {
            result = input[a][0] * input[b][0];
        }
        const circuitA = circuits[indexA];
        const circuitB = circuits[indexB];
        while (circuitB.length != 0) {
            circuitA.push(circuitB[0]);
            circuitIndices[circuitB[0]] = indexA;
            circuitB.splice(0, 1);
        }
        circuitsLeft--;
    }
}

console.log(result);
