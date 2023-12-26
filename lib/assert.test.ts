import { describe, expect, test } from 'bun:test';
import { AssertionError, assert } from './assert';

describe('Assertion library', () => {
    test('Assertion error', () => {
        expect(new AssertionError().name).toBe('AssertionError');
    });

    test('Assert', () => {
        expect(assert(true)).toBeEmpty();
        expect(() => assert(false)).toThrow();
    });
});
