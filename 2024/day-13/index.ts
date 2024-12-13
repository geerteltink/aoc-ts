import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 480;
const EXPECTED_PART_TWO = 875318608908;

const parseInput = (data: string) => {
    const machines = data
        .trim()
        .split('\n\n')
        .map((block) => {
            const lines = block.split('\n');
            const buttonA =
                lines[0]
                    .match(/X\+(\d+), Y\+(\d+)/)
                    ?.slice(1)
                    .map(Number) || [];
            const buttonB =
                lines[1]
                    .match(/X\+(\d+), Y\+(\d+)/)
                    ?.slice(1)
                    .map(Number) || [];
            const prize =
                lines[2]
                    .match(/X=(\d+), Y=(\d+)/)
                    ?.slice(1)
                    .map(Number) || [];

            return {
                buttonA: { x: buttonA[0], y: buttonA[1] },
                buttonB: { x: buttonB[0], y: buttonB[1] },
                prize: { x: prize[0], y: prize[1] },
            };
        });

    return machines;
};

const part1 = async (data: string): Promise<Solution> => {
    // Parse input lines into machine configurations
    const machines = parseInput(data);

    let totalTokens = 0;

    // For each machine, try all combinations of button presses up to 100
    for (const machine of machines) {
        let minTokens = Infinity;

        // Try all combinations of A and B presses up to 100 each
        for (let a = 0; a <= 100; a++) {
            for (let b = 0; b <= 100; b++) {
                const x = a * machine.buttonA.x + b * machine.buttonB.x;
                const y = a * machine.buttonA.y + b * machine.buttonB.y;

                // Check if this combination reaches the prize
                if (x === machine.prize.x && y === machine.prize.y) {
                    // Calculate total tokens needed (A costs 3, B costs 1)
                    const tokens = a * 3 + b;
                    minTokens = Math.min(minTokens, tokens);
                }
            }
        }

        // If we found a solution for this machine, add it to total
        if (minTokens !== Infinity) {
            totalTokens += minTokens;
        }
    }

    return totalTokens;
};

const calcA = (
    buttonA: { x: number; y: number },
    buttonB: { x: number; y: number },
    prize: { x: number; y: number }
): number => {
    const { x: ax, y: ay } = buttonA;
    const { x: bx, y: by } = buttonB;
    const { x: px, y: py } = prize;
    return (by * px - bx * py) / (by * ax - bx * ay);
};

const calcB = (
    aPresses: number,
    buttonA: { x: number; y: number },
    buttonB: { x: number; y: number },
    prize: { x: number; y: number }
): number => {
    const { y: ay } = buttonA;
    const { y: by } = buttonB;
    const { y: py } = prize;
    return (py - ay * aPresses) / by;
};

const part2 = async (data: string): Promise<Solution> => {
    const OFFSET = 10000000000000;
    const machines = parseInput(data);

    let totalTokens = 0;

    for (const machine of machines) {
        const buttonA = machine.buttonA;
        const buttonB = machine.buttonB;
        const prize = machine.prize;

        const prizeWithOffset = { x: prize.x + OFFSET, y: prize.y + OFFSET };
        const aPressesWithOffset = calcA(buttonA, buttonB, prizeWithOffset);
        const bPressesWithOffset = calcB(aPressesWithOffset, buttonA, buttonB, prizeWithOffset);

        if (
            Number.isInteger(aPressesWithOffset) &&
            Number.isInteger(bPressesWithOffset) &&
            aPressesWithOffset >= 0 &&
            bPressesWithOffset >= 0
        ) {
            totalTokens += aPressesWithOffset * 3 + bPressesWithOffset;
        }
    }

    return Number(totalTokens);
};

export const main = async (year: string, day: string) => {
    return Promise.resolve()
        .then(function () {
            return testSolution(year, day, part1, testInput1, EXPECTED_PART_ONE);
        })
        .then(function () {
            return solve(year, day, part1, input);
        })
        .then(function () {
            return testSolution(year, day, part2, testInput2, EXPECTED_PART_TWO);
        })
        .then(function () {
            return solve(year, day, part2, input);
        })
        .then(function () {
            console.log(`DONE: 🎉`);
            process.exit(0);
        })
        .catch((error: Error) => {
            console.error(error.message);
        });
};
