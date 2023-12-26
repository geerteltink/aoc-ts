import { describe, expect, test } from 'bun:test';
import { equals, swap, lastElementOfList } from './array';

describe('Array library', () => {
    test('Equals', () => {
        expect(equals([0, 0], [0, 0])).toBeTrue();
        expect(equals([1, 2], [3, 4])).toBeFalse();
    });

    test('Swap', () => {
        const array = [1, 2, 3, 4];
        expect(
            (() => {
                swap(array, 0, -1);
                return array;
            })()
        ).toEqual([4, 2, 3, 1]);
        expect(
            (() => {
                swap(array, 1, -2);
                return array;
            })()
        ).toEqual([4, 3, 2, 1]);
    });

    test('it handles an empty list', () => {
        expect(lastElementOfList<undefined>([])).toBe(undefined);
    });

    test('it returns the last element of the list', () => {
        expect(lastElementOfList(['hi', 'hello', 'world'])).toBe('world');
        expect(lastElementOfList([1, 2, 3, 10, -3])).toBe(-3);
        expect(
            lastElementOfList([
                [1, 2, 3],
                [4, 5, 6],
            ])
        ).toEqual([4, 5, 6]);
    });
});
