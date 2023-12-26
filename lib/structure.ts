import { swap } from './array';

export type PriorityQueueComparator<TValue, TReturn = number> = (valueA: TValue, valueB: TValue) => TReturn;

export class PriorityQueue<TValue> {
    #heap: TValue[];
    #compare: PriorityQueueComparator<number, boolean>;

    constructor(comparator: PriorityQueueComparator<TValue>, heap: TValue[] = []) {
        this.#heap = heap;
        this.#compare = (a: number, b: number) => comparator(this.#heap[a], this.#heap[b]) > 0;
    }

    get size() {
        return this.#heap.length;
    }

    peek() {
        return this.#heap.at(0);
    }

    #parent = (index: number) => (index - 1) >>> 1;
    #swap = (indexA: number, indexB: number) => swap(this.#heap, indexA, indexB);

    #siftUp() {
        let current = this.size - 1;
        let parent = this.#parent(current);

        while (current && this.#compare(current, parent)) {
            this.#swap(current, parent);

            current = parent;
            parent = this.#parent(current);
        }
    }

    add(value: TValue) {
        this.#heap.push(value);
        this.#siftUp();
        return this;
    }

    push(...values: TValue[]) {
        values.forEach((value) => this.add(value));
        return this.size;
    }

    #left = (index: number) => (index << 1) + 1;
    #right = (index: number) => (index + 1) << 1;
    #valid = (indexA: number, indexB: number) => indexA < this.size && this.#compare(indexA, indexB);

    #siftDown() {
        let current = 0;
        let left = this.#left(current);
        let right = this.#right(current);

        while (this.#valid(left, current) || this.#valid(right, current)) {
            const max = this.#valid(right, left) ? right : left;

            this.#swap(current, max);

            current = max;
            left = this.#left(current);
            right = this.#right(current);
        }
    }

    pop() {
        const value = this.peek();

        if (!this.size) return value;

        this.#swap(0, -1);
        this.#heap.pop();
        this.#siftDown();

        return value;
    }
}
