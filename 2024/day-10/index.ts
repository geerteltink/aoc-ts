import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 36;
const EXPECTED_PART_TWO = 81;

// Hiking trails
// - is any path that starts at height 0, ends at height 9
// - always increases by a height of exactly 1 at each step
// - never include diagonal steps - only up, down, left, or right
const part1 = async (data: string): Promise<Solution> => {
    // Parse the input to create a 2D array representing the topographic map.
    const map = data
        .trim()
        .split('\n')
        .map((line) => line.split('').map(Number));
    const rows = map.length;
    const cols = map[0].length;

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    const isValid = (x: number, y: number) => x >= 0 && x < rows && y >= 0 && y < cols;

    const bfs = (startX: number, startY: number): number => {
        const queue: [number, number, number][] = [[startX, startY, 0]];
        const visited = new Set<string>();
        visited.add(`${startX},${startY}`);
        let score = 0;

        while (queue.length > 0) {
            const [x, y, height] = queue.shift()!;

            // Calculate the score for each trailhead by counting the number of reachable 9-height positions.
            if (map[x][y] === 9) {
                score++;
                continue;
            }

            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;
                if (isValid(newX, newY) && !visited.has(`${newX},${newY}`) && map[newX][newY] === height + 1) {
                    queue.push([newX, newY, height + 1]);
                    visited.add(`${newX},${newY}`);
                }
            }
        }

        return score;
    };

    // a trailhead's score is the number of 9-height positions reachable from
    // that trailhead via a hiking trail
    let totalScore = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Identify all trailheads (positions with height 0).
            if (map[i][j] === 0) {
                // For each trailhead, perform a breadth-first search (BFS)
                // to find all reachable positions with height 9,
                // ensuring the path always increases by 1 at each step.
                // Get the sum of the scores of all trailheads.
                totalScore += bfs(i, j);
            }
        }
    }

    return totalScore;
};

const part2 = async (data: string): Promise<Solution> => {
    const map = data
        .trim()
        .split('\n')
        .map((line) => line.split('').map(Number));
    const rows = map.length;
    const cols = map[0].length;

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    const isValid = (x: number, y: number) => x >= 0 && x < rows && y >= 0 && y < cols;

    // Get the number of distinct hiking trails that begin at that trailhead.
    const dfs = (x: number, y: number, height: number, visited: Set<string>): number => {
        if (map[x][y] === 9) {
            return 1;
        }

        let trails = 0;
        visited.add(`${x},${y}`);

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (isValid(newX, newY) && !visited.has(`${newX},${newY}`) && map[newX][newY] === height + 1) {
                trails += dfs(newX, newY, height + 1, new Set(visited));
            }
        }

        return trails;
    };

    // A trailhead's rating is the number of distinct hiking trails
    // which begin at that trailhead.
    let totalRating = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] === 0) {
                totalRating += dfs(i, j, 0, new Set());
            }
        }
    }

    return totalRating;
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
