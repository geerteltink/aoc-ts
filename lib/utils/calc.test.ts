import { expect, test, describe } from 'bun:test';
import { sum } from '@lib';

describe('sum', () => {
    test('it calculates the sum', () => {
        expect(sum([1, 2, 2])).toBe(5);
        expect(sum([1])).toBe(1);
        expect(sum([])).toBe(0);
        expect(sum([1, 1, 1])).toBe(3);
        expect(sum([1, NaN, 1])).toBeNaN();
    });
});
