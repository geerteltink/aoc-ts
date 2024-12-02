import input from './input.txt';
import testInput from './input.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 1320;
const EXPECTED_PART_TWO = 145;

const part1 = async (data: string): Promise<Solution> => {
    let sum = 0;
    data.trim()
        .split(',')
        .forEach((step) => {
            sum += hash(step);
        });

    return sum;
};

const part2 = async (data: string): Promise<Solution> => {
    const boxes = new Map<number, Map<string, number>>();

    data.trim()
        .split(',')
        .forEach((step) => {
            const operator = step.includes('-') ? '-' : '=';
            const [label, focalStr] = step.split(/[-=]/);
            const focalLength = parseInt(focalStr);
            const boxId = hash(label);

            if (operator === '=') {
                let lenses = boxes.get(boxId);
                if (!lenses) {
                    lenses = new Map<string, number>();
                    boxes.set(boxId, lenses);
                }
                lenses.set(label, focalLength);
                boxes.set(boxId, lenses);
            } else {
                boxes.get(boxId)?.delete(label);
            }
        });

    let sum = 0;

    boxes.forEach((box, boxId) => {
        let i = 0;
        box.forEach((focal) => {
            i++;
            sum += (boxId + 1) * i * focal;
        });
    });

    return sum;
};

function hash(string: string): number {
    // Determine the ASCII code for the current character of the string.
    // Increase the current value by the ASCII code you just determined.
    // Set the current value to itself multiplied by 17.
    // Set the current value to the remainder of dividing itself by 256.
    return string
        .split('')
        .map((char) => char.charCodeAt(0))
        .reduce((a, b) => ((a + b) * 17) % 256, 0);
}

export const main = async (year: string, day: string) => {
    return Promise.resolve()
        .then(function () {
            return testSolution(year, day, part1, testInput, EXPECTED_PART_ONE);
        })
        .then(function () {
            return solve(year, day, part1, input);
        })
        .then(function () {
            return testSolution(year, day, part2, testInput, EXPECTED_PART_TWO);
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
