import input from './input.txt';
import testInput from './input.test.txt';

import { Coordinate, Grid, Value, type Solution, createGrid, printGrid } from '@lib';
import objectHash from 'object-hash';

const EXPECTED_PART_ONE = 136;
const EXPECTED_PART_TWO = 64;

export function add(a: number, b: number) {
    return a + b;
}

const part1 = async (data: string): Promise<Solution> => {
    const grid = createGrid(data, '.');

    tilt(grid, 0, -1);

    let sum = 0;
    grid.forEach((coordinate, value) => {
        sum += value === 'O' ? grid.maxY - coordinate.y + 1 : 0;
    });

    return sum;
};

const part2 = async (data: string): Promise<Solution> => {
    let grid = createGrid(data, '.');
    const cycleCache = new Map<string, Grid<Coordinate, Value>>();

    let cycle = 0;
    const maxCycles = 1000000000;
    while (cycle++ < maxCycles) {
        if (cycle % 1000000 === 0) console.log(`${(cycle / 1000000000) * 100}%`);

        const newCycle = [];
        tilt(grid, 0, -1);
        newCycle.push(objectHash(grid));
        tilt(grid, -1, 0);
        newCycle.push(objectHash(grid));
        tilt(grid, 0, 1);
        newCycle.push(objectHash(grid));
        tilt(grid, 1, 0);
        newCycle.push(objectHash(grid));

        const key = objectHash(newCycle);
        if (cycle < maxCycles - 1000 && cycleCache.has(key)) {
            cycle += maxCycles - cycle - 2;
        }

        cycleCache.set(key, grid);
    }

    printGrid(grid);

    let sum = 0;
    grid.forEach((coordinate, value) => {
        sum += value === 'O' ? grid.maxY - coordinate.y + 1 : 0;
    });

    // wrong too low
    // 94535

    return sum;
};

function tilt(grid: Grid<Coordinate, Value>, directionX: number, directionY: number) {
    let hasMoved = true;
    while (hasMoved) {
        hasMoved = false;
        grid.map((coordinate, value) => {
            if (value !== 'O') {
                return;
            }

            const target: Coordinate = { x: coordinate.x + directionX, y: coordinate.y + directionY };
            if (
                grid.get(target) === '.' &&
                target.y >= grid.minY &&
                target.y <= grid.maxY &&
                target.x >= grid.minX &&
                target.x <= grid.maxX
            ) {
                hasMoved = true;
                grid.delete(coordinate);
                grid.set(target, value);
            }
        });
    }
}

export const run = async (year: string, day: string) => {
    console.log(`Solving year ${year} day ${day} part 1...`);
    const testSolutionPart1 = await part1(testInput);
    if (testSolutionPart1 != EXPECTED_PART_ONE) {
        const msg = `Test day ${day} part 1 failed!\nExpected: ${EXPECTED_PART_ONE} - Received: ${testSolutionPart1}`;
        console.error(msg);
        return;
    }
    console.log(`SOLUTION DAY ${day} PART 1: `, await part1(input));

    console.log(`Solving year ${year} day ${day} part 2...`);
    const testSolutionPart2 = await part2(testInput);
    if (testSolutionPart2 != EXPECTED_PART_TWO) {
        const msg = `Test ${year}/${day} part 2 failed!\nExpected: ${EXPECTED_PART_TWO} - Received: ${testSolutionPart2}`;
        console.error(msg);
        return;
    }
    console.log(`SOLUTION DAY ${day} PART 2: `, await part2(input));

    console.log(`DONE: 🎉`);
    process.exit(0);
};
