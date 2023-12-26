import { describe, expect, test } from 'bun:test';
import {
    divide,
    divideAll,
    gcd,
    inRange,
    lcm,
    multiply,
    multiplyAll,
    quadratic,
    subtract,
    subtractAll,
    sum,
    sumAll,
} from './math';

describe('Math library', () => {
    test('Sum 2 numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('Sum an array of numbers', () => {
        expect(sumAll([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(45);
    });

    test('Subtract 2 numbers', () => {
        expect(subtract(4, 3)).toBe(1);
    });

    test('Subtract an array of numbers', () => {
        expect(subtractAll([9, 3, 4, 1])).toBe(1);
    });

    test('Multiply 2 numbers', () => {
        expect(multiply(2, 3)).toBe(6);
    });

    test('Multiply an array of numbers', () => {
        expect(multiplyAll([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(362880);
    });

    test('Divide 2 numbers', () => {
        expect(divide(4, 2)).toBe(2);
    });

    test('Divide an array of numbers', () => {
        expect(divideAll([6, 3, 2])).toBe(1);
    });

    test('Number is within a range', () => {
        expect(inRange(4, [3, 5])).toBe(true);
        expect(inRange(2, [3, 5])).toBe(false);
        expect(inRange(2, [3, 5], 1)).toBe(true);
    });

    test('Quadratic formula', () => {
        expect(quadratic(1, 5, -14)).toEqual([2, -7]);
        expect(quadratic(1, 4, -21)).toEqual([3, -7]);
        expect(quadratic(3, -1, -2)).toEqual([1, -2 / 3]);
    });

    test('Greatest common denominator', () => {
        expect(gcd(12, 9, 6)).toBe(3);
        expect(gcd(1920, 1080)).toBe(120);
    });

    test('Least common multiple', () => {
        expect(lcm(12, 15, 75)).toBe(300);
        expect(lcm(6, 7)).toBe(42);
    });
});
