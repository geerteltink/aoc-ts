import input from './input.txt';
import testInput from './input.test.txt';
import type { Solution } from '@lib';

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
            const [label, focalStr] = step.split(/[\-=]/);
            const focalLength = parseInt(focalStr);
            const boxId = hash(label);

            if (operator == '=') {
                const lenses = boxes.has(boxId) ? boxes.get(boxId) : new Map<string, number>().set(label, focalLength);
                // @ts-ignore: Type 'undefined' is not assignable
                lenses.set(label, focalLength);
                // @ts-ignore: Type 'undefined' is not assignable
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

export const run = async (year: string, day: string) => {
    // Part 1
    console.log(`Solving year ${year} day ${day} part 1...`);
    const testSolutionPart1 = await part1(testInput);
    if (testSolutionPart1 != EXPECTED_PART_ONE) {
        const msg = `Test day ${day} part 1 failed!\nExpected: ${EXPECTED_PART_ONE} - Received: ${testSolutionPart1}`;
        console.error(msg);
        return;
    }
    console.log(`SOLUTION DAY ${day} PART 1: `, await part1(input));

    // part 2
    console.log(`Solving year ${year} day ${day} part 2...`);
    const testSolutionPart2 = await part2(testInput);
    if (testSolutionPart2 != EXPECTED_PART_TWO) {
        const msg = `Test ${year}/${day} part 2 failed!\nExpected: ${EXPECTED_PART_TWO} - Received: ${testSolutionPart2}`;
        console.error(msg);
        return;
    }
    console.log(`SOLUTION DAY ${day} PART 2: `, await part2(input));

    console.log(`DONE: 🎉`);
    process.exit(0);
};
