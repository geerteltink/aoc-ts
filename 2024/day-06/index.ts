import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve, printGrid, type Coordinate, type Grid, type Value } from '@lib';
import { createGrid } from '@lib';

const EXPECTED_PART_ONE = 41;
const EXPECTED_PART_TWO = 6;

type Direction = '^' | '>' | 'v' | '<';
const directions: Direction[] = ['^', '>', 'v', '<'];

const moves: Record<Direction, Coordinate> = {
    '^': { x: 0, y: -1 },
    '>': { x: 1, y: 0 },
    'v': { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
};

const nextPosition = (pos: Coordinate, dir: Direction): Coordinate => ({
    x: pos.x + moves[dir].x,
    y: pos.y + moves[dir].y,
});

const turnRight = (dir: Direction): Direction => directions[(directions.indexOf(dir) + 1) % 4];

const isInBounds = (pos: Coordinate, grid: Grid<Coordinate, Value>): boolean =>
    pos.y >= grid.minY && pos.y <= grid.maxY && pos.x >= grid.minX && pos.x <= grid.maxX;

const findGuardStart = (grid: Grid<Coordinate, Value>): Coordinate | undefined => {
    let guardStart: Coordinate | undefined;
    grid.forEach((coord, value) => {
        if (value === '^') {
            guardStart = coord;
        }
    });
    return guardStart;
};

const part1 = async (data: string): Promise<Solution> => {
    const grid = createGrid(data, '.');
    const start = findGuardStart(grid);
    if (!start) {
        throw new Error('No guard start position found');
    }

    //printGrid(grid);

    const visited = new Set<string>();
    let dir: Direction = '^';
    let pos = start;

    while (isInBounds(pos, grid)) {
        visited.add(`${pos.x},${pos.y}`);
        const next = nextPosition(pos, dir);

        if (!isInBounds(next, grid)) {
            break;
        }

        if (isInBounds(next, grid) && grid.get(next).toString() !== '#') {
            pos = next;
        } else if (grid.get(next).toString() === '#') {
            dir = turnRight(dir);
        }
    }

    return visited.size;
};

const simulateWithObstacle = (
    originalGrid: Grid<Coordinate, Value>,
    start: Coordinate,
    obstaclePos: Coordinate
): boolean => {
    // Skip if obstacle would be at start position
    if (obstaclePos.x === start.x && obstaclePos.y === start.y) {
        return false;
    }

    // Create copy of grid and add obstacle
    const grid = createGrid(originalGrid.toString(), '.');
    grid.set(obstaclePos, '#');

    const visited = new Set<string>();
    let pos = start;
    let dir: Direction = '^';
    let steps = 0;
    const maxSteps = 1000; // Prevent infinite loops

    while (isInBounds(pos, grid)) {
        // Check for loop
        const stateKey = `${pos.x},${pos.y},${dir}`;
        if (visited.has(stateKey) && steps > 0) {
            return true; // Found a loop
        }

        visited.add(stateKey);
        const next = nextPosition(pos, dir);

        if (!isInBounds(next, grid)) {
            return false; // Guard leaves grid
        }

        if (grid.get(next).toString() === '#') {
            dir = turnRight(dir);
        } else {
            pos = next;
        }

        steps++;
        if (steps > maxSteps) {
            return false; // Safety limit
        }
    }

    return false; // No loop found
};

const part2 = async (data: string): Promise<Solution> => {
    const grid = createGrid(data, '.');
    const start = findGuardStart(grid);
    if (!start) {
        throw new Error('No guard start position found');
    }

    let loopPositions = 0;

    // Try each empty position as an obstacle
    for (let y = grid.minY; y <= grid.maxY; y++) {
        for (let x = grid.minX; x <= grid.maxX; x++) {
            const pos = { x, y };
            // Skip existing obstacles and empty spaces
            if (grid.get(pos).toString() === '#') {
                continue;
            }

            if (simulateWithObstacle(grid, start, pos)) {
                loopPositions++;
            }
        }
    }

    return loopPositions;
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
