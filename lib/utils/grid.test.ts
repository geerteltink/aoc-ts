import { expect, test, describe } from 'bun:test';
import { Grid, createGrid } from '@lib';

describe('grid', () => {
    test('it inherits Map functionality', () => {
        const grid = new Grid(' ');

        grid.set({ x: 1, y: 1 }, '1');
        grid.set({ x: 2, y: 2 }, '2');

        expect(grid.defaultValue).toBe(' ');
        expect(grid.size()).toBe(2);
        expect(grid.get({ x: 0, y: 0 })).toBe(' ');
        expect(grid.get({ x: 1, y: 1 })).toBe('1');
        expect(grid.get({ x: 2, y: 2 })).toBe('2');
    });

    test('it generates a new Grid from input', () => {
        const grid = createGrid('.x.x.', '.');

        expect(grid.defaultValue).toBe('.');
        expect(grid.size()).toBe(2);
        expect(grid.get({ x: 0, y: 0 })).toBe('.');
        expect(grid.get({ x: 1, y: 0 })).toBe('x');
        expect(grid.get({ x: 2, y: 0 })).toBe('.');
        expect(grid.get({ x: 3, y: 0 })).toBe('x');
    });
});
