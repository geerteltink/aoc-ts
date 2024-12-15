import input from './input.txt';
import testInput1 from './input1.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 12;

interface Robot {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
}

const parseInput = (data: string): Robot[] => {
    return data
        .trim()
        .split('\n')
        .map((line) => {
            const [pos, vel] = line.split(' ');
            const [px, py] = pos.slice(2).split(',').map(Number);
            const [vx, vy] = vel.slice(2).split(',').map(Number);
            return {
                position: { x: px, y: py },
                velocity: { x: vx, y: vy },
            };
        });
};

const part1 = async (data: string): Promise<Solution> => {
    const robots = parseInput(data);

    const width = robots.length < 15 ? 11 : 101;
    const height = robots.length < 15 ? 7 : 103;

    // Simulate 100 seconds
    const quadrants: number[] = [0, 0, 0, 0];
    for (let i = 0; i < robots.length; i++) {
        robots[i].position.x = (robots[i].position.x + robots[i].velocity.x * 100 + width * 100) % width;
        robots[i].position.y = (robots[i].position.y + robots[i].velocity.y * 100 + height * 100) % height;

        // If in either axis, don't count
        if (robots[i].position.x === Math.floor(width / 2) || robots[i].position.y === Math.floor(height / 2)) continue;

        // Find the quadrant: 0 is top left, 1 is top right, 2 is bottom left, 3 is bottom right
        const quadrant =
            Math.floor(robots[i].position.x / Math.ceil(width / 2)) +
            Math.floor(robots[i].position.y / Math.ceil(height / 2)) * 2;
        quadrants[quadrant]++;
    }

    return quadrants.reduce((mul, num) => mul * num, 1);
};

const printTree = (robots: Robot[], width: number, height: number) => {
    const grid: string[][] = Array.from({ length: height }, () => Array(width).fill('.'));

    for (const robot of robots) {
        grid[robot.position.y][robot.position.x] = '#';
    }

    console.log(grid.map((row) => row.join('')).join('\n'));
};

const part2 = async (data: string): Promise<Solution> => {
    const robots = parseInput(data);

    const width = robots.length < 15 ? 11 : 101;
    const height = robots.length < 15 ? 7 : 103;

    let step = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        step++;

        // Simulate the robots
        for (let i = 0; i < robots.length; i++) {
            robots[i].position.x = (robots[i].position.x + robots[i].velocity.x + width) % width;
            robots[i].position.y = (robots[i].position.y + robots[i].velocity.y + height) % height;
        }

        // Find all unique positions
        const positions = new Set(robots.map((robot) => `${robot.position.x},${robot.position.y}`));

        // Check if there is a solid 5x5 area and some sort of a Christmas tree
        for (const position of positions) {
            const [x, y] = position.split(',').map((num) => parseInt(num));
            let hasGroup = true;

            for (let j = -2; j <= 2; j++) {
                for (let k = -2; k <= 2; k++) {
                    if (!positions.has(`${x + k},${y + j}`)) {
                        hasGroup = false;
                        break;
                    }
                }
                if (!hasGroup) break;
            }

            if (hasGroup) {
                printTree(robots, width, height);
                return step;
            }
        }
    }
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
