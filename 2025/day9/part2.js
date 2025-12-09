// Oh, nevermind. This isn't easy after all.
// I sacrified way too much of my sanity to complete this.
// https://adventofcode.com/2025/day/9#part2
// hiimjasmine00 December 9, 2025 6:17pm (18:17-05:00) EST

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(",").map(x => parseInt(x)));

const xCoords = [...new Set(input.map(x => x[0]))].sort((a, b) => a - b);
const coordsX = Object.fromEntries(xCoords.map((x, i) => [x, i]));
const yCoords = [...new Set(input.map(x => x[1]))].sort((a, b) => a - b);
const coordsY = Object.fromEntries(yCoords.map((x, i) => [x, i]));

const tilemap = Array(yCoords.length).fill(0).map(() => Array(xCoords.length).fill("."));

for (let i = 0, j = 1; i < input.length && j < input.length; i++, j++) {
    const point1 = input[i];
    const point2 = input[j];
    const x1 = coordsX[point1[0]];
    const y1 = coordsY[point1[1]];
    const x2 = coordsX[point2[0]];
    const y2 = coordsY[point2[1]];

    tilemap[y1][x1] = "X";
    tilemap[y2][x2] = "X";

    if (x1 == x2) {
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        for (let y = minY + 1; y < maxY; y++) {
            tilemap[y][x1] = "O";
        }
    }
    else {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        for (let x = minX + 1; x < maxX; x++) {
            tilemap[y1][x] = "O";
        }
    }
}

for (let y = 1; y < tilemap.length - 1; y++) {
    const row = tilemap[y];
    const above = tilemap[y - 1];
    let inSection = false;
    for (let x = 0; x < row.length; x++) {
        const top = above[x];
        const current = row[x];
        if (current == "X" || current == "O") {
            if (top == "X" || top == "O") inSection = !inSection;
        }
        else if (inSection) {
            if (row.slice(x + 1).filter(z => z == "X" || z == "O").length == 0) inSection = false;
            else row[x] = "Z";
        }
        else {
            if ((top == "X" || top == "O") && row.slice(x + 1).filter(z => z == "X" || z == "O").length == 1) {
                inSection = true;
                row[x] = "Z";
            }
        }
    }
}

let result = 0;
for (let i = 0; i < input.length; i++) {
    const first = input[i];
    const x1 = coordsX[first[0]];
    const y1 = coordsY[first[1]];
    mainLoop:
    for (let j = i + 1; j < input.length; j++) {
        const second = input[j];
        const x2 = coordsX[second[0]];
        const y2 = coordsY[second[1]];
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                if (tilemap[y][x] == ".") continue mainLoop;
            }
        }
        const product = (Math.abs(first[0] - second[0]) + 1) * (Math.abs(first[1] - second[1]) + 1);
        if (result < product) result = product;
    }
}

console.log(result);
