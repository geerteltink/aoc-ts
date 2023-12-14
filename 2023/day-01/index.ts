import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { Solution, filterOutNaN, lastElementOfList, mapToInt, numToStr as numberToString, sum } from '@lib';

const EXPECTED_PART_ONE = 142;
const EXPECTED_PART_TWO = 281;

export type Res = string | number;

const part1 = async (data: string): Promise<Solution> => {
    const nums = filterOutNaN(
        data.split('\n').map((line) => {
            const numbers = filterOutNaN(mapToInt(line.split(''))).map(numberToString);

            const num = numbers[0] + lastElementOfList(numbers);
            return parseInt(num);
        }),
    );

    return sum(nums);
};

const part2 = async (data: string): Promise<Solution> => {
    const nums = filterOutNaN(
        data.split('\n').map((line) => {
            line = parser(line);
            const numbers = filterOutNaN(mapToInt(line.split(''))).map(numberToString);

            const num = numbers[0] + lastElementOfList(numbers);
            return parseInt(num);
        }),
    );

    return sum(nums);
};

const parser = (s: string): string => {
    return s
        .replaceAll("one", "o1e")
        .replaceAll("two", "t2o")
        .replaceAll("three", "t3e")
        .replaceAll("four", "f4r")
        .replaceAll("five", "f5e")
        .replaceAll("six", "s6x")
        .replaceAll("seven", "s7n")
        .replaceAll("eight", "e8t")
        .replaceAll("nine", "n9e");
};

export const run = async (year: string, day: string) => {
    console.log(`Solving year ${year} day ${day} part 1...`);
    const testSolutionPart1 = await part1(testInput1);
    if (testSolutionPart1 != EXPECTED_PART_ONE) {
        const msg = `Test day ${day} part 1 failed!\nExpected: ${EXPECTED_PART_ONE} - Received: ${testSolutionPart1}`;
        console.error(msg);
        return;
    }
    console.log(`SOLUTION DAY ${day} PART 1: `, await part1(input));

    console.log(`Solving year ${year} day ${day} part 2...`);
    const testSolutionPart2 = await part2(testInput2);
    if (testSolutionPart2 != EXPECTED_PART_TWO) {
        const msg = `Test ${year}/${day} part 2 failed!\nExpected: ${EXPECTED_PART_TWO} - Received: ${testSolutionPart2}`;
        console.error(msg);
        return;
    }
    console.log(`SOLUTION DAY ${day} PART 2: `, await part2(input));

    console.log(`DONE: 🎉`);
    process.exit(0);
};
