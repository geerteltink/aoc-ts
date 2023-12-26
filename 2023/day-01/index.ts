import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { filterOutNaN, lastElementOfList, mapToInt, numToStr as numberToString, sumAll } from '@lib';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 142;
const EXPECTED_PART_TWO = 281;

export type Res = string | number;

const part1 = async (data: string): Promise<Solution> => {
    const nums = filterOutNaN(
        data.split('\n').map((line) => {
            const numbers = filterOutNaN(mapToInt(line.split(''))).map(numberToString);

            const num = numbers[0] + lastElementOfList(numbers);
            return parseInt(num);
        })
    );

    return sumAll(nums);
};

const part2 = async (data: string): Promise<Solution> => {
    const nums = filterOutNaN(
        data.split('\n').map((line) => {
            line = parser(line);
            const numbers = filterOutNaN(mapToInt(line.split(''))).map(numberToString);

            const num = numbers[0] + lastElementOfList(numbers);
            return parseInt(num);
        })
    );

    return sumAll(nums);
};

const parser = (s: string): string => {
    return s
        .replaceAll('one', 'o1e')
        .replaceAll('two', 't2o')
        .replaceAll('three', 't3e')
        .replaceAll('four', 'f4r')
        .replaceAll('five', 'f5e')
        .replaceAll('six', 's6x')
        .replaceAll('seven', 's7n')
        .replaceAll('eight', 'e8t')
        .replaceAll('nine', 'n9e');
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
