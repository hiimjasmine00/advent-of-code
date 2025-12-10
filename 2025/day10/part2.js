// I don't think there was any sort of way I could have come up with this myself.
// Credits to u/Mikey_Loboto for most of the logic.
// https://github.com/mikeyloboto/aoc2025/blob/d7cda9aa2f5cbcbd460f0ba51fba164f77ac71a9/10/parttwoz3.js
// https://adventofcode.com/2025/day/10#part2
// hiimjasmine00 December 10, 2025 8:02am (08:02-05:00) EST

const fs = require("fs");
const path = require("path");
const { init } = require("z3-solver");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0);

init().then(async ({ Context }) => {
    let result = 0;
    for (const line of input) {
        const parts = line.split(" ");
        parts.shift();
        const requirement = parts.pop().slice(1, -1).split(",").map(x => parseInt(x));
        const buttons = parts.map(x => x.slice(1, -1).split(",").map(x => parseInt(x)));

        const { Int, Optimize } = Context("main");
        const solver = new Optimize();
        const variables = [];

        for (let i = 0; i < buttons.length; i++) {
            const value = Int.const(String.fromCodePoint(i + 97));
            solver.add(value.ge(0));
            variables.push(value);
        }

        for (let i = 0; i < requirement.length; i++) {
            let condition = Int.val(0);
            for (let j = 0; j < buttons.length; j++) {
                if (buttons[j].includes(i)) condition = condition.add(variables[j]);
            }
            condition = condition.eq(Int.val(requirement[i]));
            solver.add(condition);
        }
        const sum = variables.reduce((a, x) => a.add(x), Int.val(0));
        solver.minimize(sum);
        if ((await solver.check()) == "sat") result += parseInt(solver.model().eval(sum).toString());
    }

    console.log(result);
});
