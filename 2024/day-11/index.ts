import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 55312;
const EXPECTED_PART_TWO = 65601038650482;

function applyTransformationRules(stones: number[]): number[] {
    const newStones: number[] = [];
    for (const stone of stones) {
        // If the stone is engraved with the number 0,
        // it is replaced by a stone engraved with the number 1
        if (stone === 0) {
            newStones.push(1);
        } else if (stone.toString().length % 2 === 0) {
            // If the stone is engraved with a number that has an even
            // number of digits, it is replaced by two stones.
            // The left half of the digits are engraved on the new left
            // stone, and the right half of the digits are engraved on
            // the new right stone.
            // The new numbers don't keep extra leading zeroes:
            // 1000 would become stones 10 and 0
            const engraving = stone.toString();
            const mid = engraving.length / 2;
            newStones.push(parseInt(engraving.slice(0, mid), 10));
            newStones.push(parseInt(engraving.slice(mid), 10));
        } else {
            // If none of the other rules apply, the stone is replaced by
            // a new stone; the old stone's number multiplied by 2024 is
            // engraved on the new stone.
            newStones.push(stone * 2024);
        }
    }

    return newStones;
}

const part1 = async (data: string): Promise<Solution> => {
    let stones = data.trim().split(' ').map(Number);

    for (let blink = 0; blink < 25; blink++) {
        stones = applyTransformationRules(stones);
    }

    return stones.length;
};

// Improve performance through memoization
const cache = new Map();

function calculateTotalStones(engraving: number, iteration: number): number {
    const key = `${engraving},${iteration}`;

    // Return the cached value, the outcome is already known
    if (cache.has(key)) {
        return cache.get(key);
    }

    // No further iterations are needed
    if (iteration === 0) {
        return 1;
    }

    // If the stone is engraved with the number 0,
    // it is replaced by a stone engraved with the number 1
    if (engraving === 0) {
        const result = calculateTotalStones(1, iteration - 1);
        cache.set(key, result);
        return result;
    }

    // If the stone is engraved with a number that has an even
    // number of digits, it is replaced by two stones.
    // The left half of the digits are engraved on the new left
    // stone, and the right half of the digits are engraved on
    // the new right stone.
    // The new numbers don't keep extra leading zeroes:
    // 1000 would become stones 10 and 0
    const n = engraving.toString().length;
    if (n % 2 === 0) {
        const a = parseInt(engraving.toString().slice(0, n / 2), 10);
        const b = parseInt(engraving.toString().slice(n / 2), 10);
        const result = calculateTotalStones(a, iteration - 1) + calculateTotalStones(b, iteration - 1);
        cache.set(key, result);
        return result;
    }

    // If none of the other rules apply, the stone is replaced by
    // a new stone; the old stone's number multiplied by 2024 is
    // engraved on the new stone.
    const result = calculateTotalStones(engraving * 2024, iteration - 1);
    cache.set(key, result);

    return result;
}

// The first try took a long time and eventually crashed WSL2.
// This is a more optimized solution for part 2, less memory intensive
// and ready within a second.
const part2 = async (data: string): Promise<number> => {
    const stones = data.trim().split(' ').map(Number);

    return stones.reduce((sum, x) => sum + calculateTotalStones(x, 75), 0);
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
