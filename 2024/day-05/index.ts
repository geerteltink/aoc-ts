import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve, dfs, type Graph } from '@lib';

const EXPECTED_PART_ONE = 143;
const EXPECTED_PART_TWO = 123;

const parseInput = (data: string) => {
    const [pageOrderingRules, updatesPageNumbers] = data.split('\n\n');
    const rules = pageOrderingRules.split('\n').map((rule) => {
        const [before, after] = rule.split('|').map(Number);
        return [before, after] as [number, number];
    });
    const updates = updatesPageNumbers.split('\n').map((update) => update.split(',').map(Number));

    return { rules, updates };
};

const isUpdateValid = (update: number[], rules: [number, number][]): boolean => {
    const position = new Map<number, number>();
    update.forEach((page, index) => position.set(page, index));

    for (const [before, after] of rules) {
        if (position.has(before) && position.has(after)) {
            if (position.get(before)! > position.get(after)!) {
                return false;
            }
        }
    }

    return true;
};

const findMiddlePage = (update: number[]): number => {
    const middleIndex = Math.floor(update.length / 2);

    return update[middleIndex];
};

const part1 = async (data: string): Promise<Solution> => {
    const { rules, updates } = parseInput(data);

    let result = 0;

    for (const update of updates) {
        if (isUpdateValid(update, rules)) {
            result += findMiddlePage(update);
        }
    }

    return result;
};

const sortUpdate = (update: number[], rules: [number, number][]): number[] => {
    const dependencies: Graph<number> = {};
    update.forEach((page) => (dependencies[page] = []));

    rules.forEach(([a, b]) => {
        if (dependencies[a] !== undefined && dependencies[b] !== undefined) {
            dependencies[b].push(a);
        }
    });

    const sortedUpdate: number[] = [];
    const visited: Set<number> = new Set();

    update.forEach((page) => dfs(dependencies, page, visited, sortedUpdate));

    return sortedUpdate;
};

const part2 = async (data: string): Promise<Solution> => {
    const { rules, updates } = parseInput(data);

    let result = 0;

    for (const update of updates) {
        if (!isUpdateValid(update, rules)) {
            const orderedUpdate = sortUpdate(update, rules);
            result += findMiddlePage(orderedUpdate);
        }
    }

    return result;
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
