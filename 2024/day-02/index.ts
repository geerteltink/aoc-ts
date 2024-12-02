import input from './input.txt';
import testInput from './input.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 2;
const EXPECTED_PART_TWO = 4;

function isDecreasing(numbers: number[]): boolean {
    return numbers.every((num, i, arr) => i === 0 || [1, 2, 3].includes(arr[i - 1] - num));
}

function isIncreasing(numbers: number[]): boolean {
    return numbers.every((num, i, arr) => i === 0 || [1, 2, 3].includes(num - arr[i - 1]));
}

function isSafe(numbers: number[]): boolean {
    if (isDecreasing(numbers)) {
        return true;
    }

    if (isIncreasing(numbers)) {
        return true;
    }

    // Try de/increasing for the numbers and take a different one out in each try
    for (let i = 0; i < numbers.length; i++) {
        const newNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));
        if (isDecreasing(newNumbers)) {
            return true;
        }
        if (isIncreasing(newNumbers)) {
            return true;
        }
    }

    return false;
}

const part1 = async (data: string): Promise<Solution> => {
    let safeReports = 0;

    for (const line of data.split('\n')) {
        if (line !== '') {
            const numbers = line
                .trim()
                .split(/\s+/)
                .map((n) => parseInt(n));

            if (isDecreasing(numbers) || isIncreasing(numbers)) {
                safeReports++;
            }
        }
    }

    return safeReports;
};

const part2 = async (data: string): Promise<Solution> => {
    let safeReports = 0;

    for (const line of data.split('\n')) {
        if (line !== '') {
            const numbers = line
                .trim()
                .split(/\s+/)
                .map((n) => parseInt(n));

            if (isSafe(numbers)) {
                safeReports++;
            }
        }
    }

    return safeReports;
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
