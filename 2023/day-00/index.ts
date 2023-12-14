import input from './input.txt';
import testInput from './input.test.txt';
import { Solution } from '@lib';

const EXPECTED_PART_ONE = 0;
const EXPECTED_PART_TWO = 0;

const part1 = async (data: string): Promise<Solution> => {
    return '';
};

const part2 = async (data: string): Promise<Solution> => {
    return '';
};

export const run = async (year: string, day: string) => {
    console.log(`Solving year ${year} day ${day} part 1...`);
    const testSolutionPart1 = await part1(testInput);
    if (testSolutionPart1 != EXPECTED_PART_ONE) {
        const msg = `Test day ${day} part 1 failed!\nExpected: ${EXPECTED_PART_ONE} - Received: ${testSolutionPart1}`;
        console.error(msg);
        return;
    }
    console.log(`SOLUTION DAY ${day} PART 1: `, await part1(input));

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
