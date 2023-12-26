import { describe, expect, test } from 'bun:test';
import { rotateClockwise, rotateCounterClockwise } from './matrix';

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

describe('Matrix library', () => {
    test('Rotate matrix clockwise', () => {
        expect(rotateClockwise(matrix)).toEqual([
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3],
        ]);
    });

    test('Rotate matrix counter-clockwise', () => {
        expect(rotateCounterClockwise(matrix)).toEqual([
            [3, 6, 9],
            [2, 5, 8],
            [1, 4, 7],
        ]);
    });
});
