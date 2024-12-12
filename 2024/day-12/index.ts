import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 1930;
const EXPECTED_PART_TWO = 1206;

// Garden
// - has plots which grow a single type of plant
// - multiple touching garden plots of the same type form a region
// - adjacent plots are touching horizontally or vertically
// - the perimeter of a region is the number of sides of garden plots in the region that do not touch another garden plot in the same region
const part1 = async (data: string): Promise<Solution> => {
    const map = data
        .trim()
        .split('\n')
        .map((line) => line.split(''));
    const rows = map.length;
    const cols = map[0].length;

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    const isValid = (x: number, y: number) => x >= 0 && x < rows && y >= 0 && y < cols;

    const visited = new Set<string>();

    const dfs = (x: number, y: number, plant: string): { area: number; perimeter: number } => {
        const stack = [[x, y]];
        let area = 0;
        let perimeter = 0;

        while (stack.length > 0) {
            const [cx, cy] = stack.pop()!;
            if (visited.has(`${cx},${cy}`)) continue;
            visited.add(`${cx},${cy}`);
            area++;

            for (const [dx, dy] of directions) {
                const nx = cx + dx;
                const ny = cy + dy;
                if (!isValid(nx, ny) || map[nx][ny] !== plant) {
                    perimeter++;
                } else if (!visited.has(`${nx},${ny}`)) {
                    stack.push([nx, ny]);
                }
            }
        }

        return { area, perimeter };
    };

    let totalPrice = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!visited.has(`${i},${j}`)) {
                const plant = map[i][j];
                const { area, perimeter } = dfs(i, j, plant);
                totalPrice += area * perimeter;
            }
        }
    }

    return totalPrice;
};

interface Perimeter {
    x: number;
    y: number;
    valid: boolean;
}

const UP = '0';
const RIGHT = '1';
const DOWN = '2';
const LEFT = '3';

// A flood fill algorithm is a method used to determine and fill a
// contiguous area of connected cells in a multi-dimensional array,
// such as a grid or matrix. It is commonly used in computer graphics,
// for example, to fill a bounded area with a specific color, similar
// to the "bucket fill" tool in paint programs. The algorithm can also
// be used in various other applications, such as maze solving, region
// detection, and image processing.
const floodFill = (
    grid: string[][],
    details: { area: number; perimeter: { [key: string]: Perimeter[] } },
    x: number,
    y: number,
    area: Set<string>
) => {
    if (area.has(`${x},${y}`)) return;
    area.add(`${x},${y}`);

    const width = grid[0].length;
    const height = grid.length;
    const plant = grid[y][x];

    details.area++;
    if (y === 0 || grid[y - 1][x] !== plant) details.perimeter[UP].push({ x, y, valid: true });
    if (y === height - 1 || grid[y + 1][x] !== plant) details.perimeter[DOWN].push({ x, y, valid: true });
    if (x === 0 || grid[y][x - 1] !== plant) details.perimeter[LEFT].push({ x, y, valid: true });
    if (x === width - 1 || grid[y][x + 1] !== plant) details.perimeter[RIGHT].push({ x, y, valid: true });

    if (y !== 0 && grid[y - 1][x] === plant) floodFill(grid, details, x, y - 1, area);
    if (y !== height - 1 && grid[y + 1][x] === plant) floodFill(grid, details, x, y + 1, area);
    if (x !== 0 && grid[y][x - 1] === plant) floodFill(grid, details, x - 1, y, area);
    if (x !== width - 1 && grid[y][x + 1] === plant) floodFill(grid, details, x + 1, y, area);
};

const filterPerimeters = (array: Perimeter[], primary: 'x' | 'y', secondary: 'x' | 'y') => {
    array.sort((a, b) => a[primary] - b[primary]);

    for (let i = 0; i < array.length; i++) {
        let check = array[i][primary];
        while (array.some((node) => node[primary] === check && node[secondary] === array[i][secondary])) {
            check++;
            const nextNode = array.find((node) => node[primary] === check && node[secondary] === array[i][secondary]);

            if (nextNode !== undefined) nextNode.valid = false;
        }
    }
};

// Copilot helped me out big time with this one.
// The flood fill algorithm is inspired by redit solutions.
// Same as part 1 except that all adjacent plots should be counted
// as a single side of the perimeter.
const part2 = async (data: string): Promise<Solution> => {
    const grid = data
        .trim()
        .split('\n')
        .map((line) => line.split(''));
    const width = grid[0].length;
    const height = grid.length;

    const alreadyFlooded = new Set<string>();
    let sum = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!alreadyFlooded.has(`${x},${y}`)) {
                const details: { area: number; perimeter: { [key: string]: Perimeter[] } } = {
                    area: 0,
                    perimeter: { [UP]: [], [DOWN]: [], [LEFT]: [], [RIGHT]: [] },
                };
                const visited = new Set<string>();
                floodFill(grid, details, x, y, visited);
                visited.forEach((v) => alreadyFlooded.add(v));

                Object.keys(details.perimeter).forEach((direction) => {
                    if (direction === UP || direction === DOWN)
                        filterPerimeters(details.perimeter[direction], 'x', 'y');
                    if (direction === LEFT || direction === RIGHT)
                        filterPerimeters(details.perimeter[direction], 'y', 'x');
                });

                sum +=
                    details.area *
                    Object.values(details.perimeter).reduce(
                        (sum, array) => sum + array.filter((perimeter) => perimeter.valid).length,
                        0
                    );
            }
        }
    }

    return sum;
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
