import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 18;
const EXPECTED_PART_TWO = 9;

const part1 = async (data: string): Promise<Solution> => {
    const grid: string[][] = data.split('\n').map((line) => line.split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    const word = 'XMAS';
    const wordLength = word.length;

    const directions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: -1 },
        { x: -1, y: 1 },
    ];

    let occurrences = 0;

    const isValid = (x: number, y: number) => x >= 0 && x < rows && y >= 0 && y < cols;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            for (const { x, y } of directions) {
                let length = 0;
                for (length = 0; length < wordLength; length++) {
                    const nr = row + length * x;
                    const nc = col + length * y;

                    if (!isValid(nr, nc) || grid[nr][nc] !== word[length]) {
                        break;
                    }
                }
                if (length === wordLength) {
                    occurrences++;
                }
            }
        }
    }

    return occurrences;
};

const checkXmasPattern = (grid: string[][], x: number, y: number): boolean => {
    // Check if it could be the center of MAS
    if (grid[x][y] !== 'A') {
        return false;
    }

    // Get the surrounding letters on the left and right side
    const left = grid[x - 1][y - 1] + grid[x + 1][y + 1];
    const right = grid[x - 1][y + 1] + grid[x + 1][y - 1];

    // Check if the left and right side are either M and S
    return (left === 'MS' || left === 'SM') && (right === 'MS' || right === 'SM');
};

const part2 = async (data: string): Promise<Solution> => {
    const grid: string[][] = data.split('\n').map((line) => line.split(''));
    const rows = grid.length;
    const cols = grid[0].length;

    let occurrences = 0;

    // Start with the row and col +1 and -1 to make sure it doesn't go out of bounds
    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            if (checkXmasPattern(grid, row, col)) {
                occurrences++;
            }
        }
    }

    return occurrences;
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
