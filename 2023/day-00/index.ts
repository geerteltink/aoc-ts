import input from './input.txt';
import testInput from './input.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = null;
const EXPECTED_PART_TWO = null;

const part1 = async (_data: string): Promise<Solution> => {
    return '';
};

const part2 = async (_data: string): Promise<Solution> => {
    return '';
};

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
