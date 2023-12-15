import { expect, test, describe } from 'bun:test';
import { lastElementOfList } from '@lib';

describe('lastElementOfList', () => {
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
