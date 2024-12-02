import input from './input.txt';
import testInput from './input.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 11;
const EXPECTED_PART_TWO = 31;

const part1 = async (data: string): Promise<Solution> => {
    const columns: number[][] = [];

    data.split('\n').forEach((line) => {
        const numbers = line
            .trim()
            .split(/\s+/)
            .map((n) => parseInt(n));

        numbers.forEach((num, index) => {
            if (!columns[index]) {
                columns[index] = [];
            }

            if (!isNaN(num)) {
                columns[index].push(num);
            }
        });
    });

    columns.forEach((col) => col.sort((a, b) => a - b));

    let totalDistance = 0;

    columns[0].forEach((num, index) => {
        totalDistance += Math.abs(num - columns[1][index]);
    });

    return totalDistance;
};

const part2 = async (data: string): Promise<Solution> => {
    const columns: number[][] = [];

    data.split('\n').forEach((line) => {
        const numbers = line
            .trim()
            .split(/\s+/)
            .map((n) => parseInt(n));

        numbers.forEach((num, index) => {
            if (!columns[index]) {
                columns[index] = [];
            }

            if (!isNaN(num)) {
                columns[index].push(num);
            }
        });
    });

    const left = columns[0];
    const right = columns[1];

    let similarityScore = 0;

    left.forEach((number) => {
        const occurrences = right.filter((num) => num === number).length;
        similarityScore += number * occurrences;
    });

    console.log(similarityScore);

    return similarityScore;
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
