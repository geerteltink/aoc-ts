import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 161;
const EXPECTED_PART_TWO = 48;

const part1 = async (data: string): Promise<Solution> => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = [...data.matchAll(regex)];
    const extractedNumbers = matches.map((match) => ({
        firstNumber: parseInt(match[1], 10),
        secondNumber: parseInt(match[2], 10),
    }));

    let result = 0;
    for (const { firstNumber, secondNumber } of extractedNumbers) {
        result += firstNumber * secondNumber;
    }

    return result;
};

const part2 = async (data: string): Promise<Solution> => {
    // I tried in one regex but didn't get it working.
    // Stripping out the disabled code first worked.
    data = data.replace(/don't\(\).+?(do\(\)|$)/gs, '');

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = [...data.matchAll(regex)];
    const extractedNumbers = matches.map((match) => ({
        firstNumber: parseInt(match[1], 10),
        secondNumber: parseInt(match[2], 10),
    }));

    let result = 0;
    for (const { firstNumber, secondNumber } of extractedNumbers) {
        result += firstNumber * secondNumber;
    }

    return result;
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
