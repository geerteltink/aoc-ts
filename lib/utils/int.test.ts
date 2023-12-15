import { expect, test, describe } from 'bun:test';
import { mapToInt } from '@lib';

describe('numToStr', () => {
    test('it converts a list of strings to numbers', () => {
        expect(mapToInt(['1', '2', '3', '4'])).toEqual([1, 2, 3, 4]);
        expect(mapToInt(['1', '2', '3', '4', 'a', 'Hallo'])).toEqual([1, 2, 3, 4, NaN, NaN]);
        expect(mapToInt([])).toEqual([]);
    });
});
