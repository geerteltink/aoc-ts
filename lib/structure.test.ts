import { describe, expect, test } from 'bun:test';
import { PriorityQueue, type PriorityQueueComparator } from './structure';

const compareFunction: PriorityQueueComparator<number> = (a: number, b: number) => b - a;

describe('Data structure library', () => {
    test('Priority queue', () => {
        expect(new PriorityQueue(compareFunction)).toEqual(new PriorityQueue(compareFunction));
        expect(new PriorityQueue(compareFunction, [0, 10, 2, 5])).toEqual(
            new PriorityQueue(compareFunction, [5, 2, 10, 0])
        );

        const queue = new PriorityQueue(compareFunction, [0, 10, 5, 2]);

        expect(queue.size).toBe(4);
        expect(queue.add(20).add(7)).toEqual(new PriorityQueue(compareFunction, [0, 2, 5, 7, 10, 20]));

        expect(queue.push(30, 11)).toBe(8);

        expect(queue.pop()).toBe(0);
        expect(queue.size).toBe(7);
    });
});
