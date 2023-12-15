import { expect, test, describe } from 'bun:test';
import { numToStr } from '@lib';

describe('numToStr', () => {
    test('it converts a number to a string', () => {
        expect(numToStr(1)).toBe('1');
        expect(numToStr(2)).toBe('2');
        expect(numToStr(42)).toBe('42');
        expect(numToStr(NaN)).toBe('NaN');
    });
});
