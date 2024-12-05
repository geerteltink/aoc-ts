import { describe, expect, test } from 'bun:test';
import { dfs } from './dfs';
import type { Graph } from './dfs';

describe('dfs', () => {
    test('it should traverse the graph in depth-first order', () => {
        const graph: Graph<number> = {
            1: [2, 3],
            2: [4],
            3: [],
            4: [],
        };
        const result: number[] = [];
        dfs(graph, 1, new Set(), result);
        expect(result).toEqual([4, 2, 3, 1]);
    });

    test('it should handle graphs with cycles', () => {
        const graph: Graph<number> = {
            1: [2],
            2: [3],
            3: [1],
        };
        const result: number[] = [];
        dfs(graph, 1, new Set(), result);
        expect(result).toEqual([3, 2, 1]);
    });

    test('it should handle disconnected graphs', () => {
        const graph: Graph<number> = {
            1: [2],
            2: [],
            3: [4],
            4: [],
        };
        const result: number[] = [];
        dfs(graph, 1, new Set(), result);
        expect(result).toEqual([2, 1]);

        const result2: number[] = [];
        dfs(graph, 3, new Set(), result2);
        expect(result2).toEqual([4, 3]);
    });

    test('it should sort the update according to the rules', () => {
        const rules: [number, number][] = [
            [47, 53],
            [97, 13],
            [97, 61],
            [97, 47],
            [75, 29],
            [61, 13],
            [75, 53],
            [29, 13],
            [97, 29],
            [53, 29],
            [61, 53],
            [97, 53],
            [61, 29],
            [47, 13],
            [75, 47],
            [97, 75],
            [47, 61],
            [75, 61],
            [47, 29],
            [75, 13],
            [53, 13],
        ];
        const update: number[] = [75, 47, 61, 53, 29];

        const dependencies: Graph<number> = {};
        update.forEach((page) => (dependencies[page] = []));

        rules.forEach(([a, b]) => {
            if (dependencies[a] !== undefined && dependencies[b] !== undefined) {
                dependencies[b].push(a);
            }
        });

        const result: number[] = [];
        const visited: Set<number> = new Set();
        update.forEach((page) => dfs(dependencies, page, visited, result));

        expect(result).toEqual([75, 47, 61, 53, 29]);
    });

    test('it should sort the update according to the rules', () => {
        const rules: [number, number][] = [
            [47, 53],
            [97, 13],
            [97, 61],
            [97, 47],
            [75, 29],
            [61, 13],
            [75, 53],
            [29, 13],
            [97, 29],
            [53, 29],
            [61, 53],
            [97, 53],
            [61, 29],
            [47, 13],
            [75, 47],
            [97, 75],
            [47, 61],
            [75, 61],
            [47, 29],
            [75, 13],
            [53, 13],
        ];
        const update: number[] = [75, 97, 47, 61, 53];

        const dependencies: Graph<number> = {};
        update.forEach((page) => (dependencies[page] = []));

        rules.forEach(([a, b]) => {
            if (dependencies[a] !== undefined && dependencies[b] !== undefined) {
                dependencies[b].push(a);
            }
        });

        const result: number[] = [];
        const visited: Set<number> = new Set();
        update.forEach((page) => dfs(dependencies, page, visited, result));

        expect(result).toEqual([97, 75, 47, 61, 53]);
    });
});
