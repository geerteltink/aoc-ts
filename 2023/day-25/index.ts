import input from './input.txt';
import testInput from './input.test.txt';
import { testSolution, type Solution, solve, multiply, TupleSet } from '@lib';
import { mincut } from '@graph-algorithm/minimum-cut';

const EXPECTED_PART_ONE = 54;
const EXPECTED_PART_TWO = null;

type Connection = [from: string, to: string];

function parseInput(data: string) {
    const connections = new TupleSet<Connection>();

    for (const line of data.split('\n')) {
        if (line !== '') {
            const [from, tos] = line.split(': ');
            for (const to of tos.split(' ')) connections.add([from, to]);
        }
    }

    return connections;
}

function getProductOfGroupSizes(connections: TupleSet<Connection>) {
    for (const [from, to] of mincut([...connections])) {
        connections.delete([from, to]);
        connections.delete([to, from]);
    }

    const groups: string[][] = [];
    const components = new Set<string>([...connections].flat());
    const visited = new Set<string>();

    for (const component of components) {
        if (visited.has(component)) continue;

        const group: string[] = [];
        const queue = [component];

        while (queue.length) {
            const component = queue.shift()!;

            if (visited.has(component)) continue;

            visited.add(component);

            group.push(component);

            const links = [...connections].filter(([from, to]) => from === component || to === component).flat();

            queue.push(...links);
        }

        groups.push(group);
    }

    return groups.map((group) => group.length).reduce(multiply);
}

const part1 = async (data: string): Promise<Solution> => {
    const connections = parseInput(data);
    const productOfGroupSizes = getProductOfGroupSizes(connections);

    return productOfGroupSizes;
};

const part2 = async (_data: string): Promise<Solution> => {
    return '';
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
