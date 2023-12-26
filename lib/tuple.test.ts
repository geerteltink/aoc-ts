import { describe, expect, test } from 'bun:test';
import { TupleSet } from './tuple';

describe('Tuple library', () => {
    test('Tuple set', () => {
        expect(new TupleSet()).toEqual(new TupleSet());
        expect(
            new TupleSet([
                [0, 1],
                [2, 3],
                [4, 5],
            ])
        ).toEqual(
            new TupleSet([
                [0, 1],
                [2, 3],
                [4, 5],
            ])
        );
        expect(
            new TupleSet(
                new TupleSet([
                    [0, 1],
                    [2, 3],
                    [4, 5],
                ])
            )
        ).toEqual(
            new TupleSet(
                new TupleSet([
                    [0, 1],
                    [2, 3],
                    [4, 5],
                ])
            )
        );
        expect(
            new TupleSet(
                new Set([
                    [0, 1],
                    [2, 3],
                    [4, 5],
                ])
            )
        ).toEqual(
            new TupleSet(
                new Set([
                    [0, 1],
                    [2, 3],
                    [4, 5],
                ])
            )
        );

        const set = new TupleSet([
            [0, 1],
            [2, 3],
            [4, 5],
        ]);

        expect(set.size).toBe(3);
        expect([...set]).toEqual([
            [0, 1],
            [2, 3],
            [4, 5],
        ]);
        expect(set.add([6, 7]).add([8, 9])).toEqual(
            new TupleSet([
                [0, 1],
                [2, 3],
                [4, 5],
                [6, 7],
                [8, 9],
            ])
        );
        expect(set.clear()).toBeUndefined();
        set.add([0, 1]).add([2, 3]).add([4, 5]).add([6, 7]).add([8, 9]);
        expect(set.delete([8, 9])).toBeTrue();
        expect(set.delete([10, 11])).toBeFalse();
        expect([...set.entries()]).toEqual([
            [
                [0, 1],
                [0, 1],
            ],
            [
                [2, 3],
                [2, 3],
            ],
            [
                [4, 5],
                [4, 5],
            ],
            [
                [6, 7],
                [6, 7],
            ],
        ]);
        expect(set.forEach((point) => point)).toBeUndefined();
        expect(set.has([6, 7])).toBeTrue();
        expect(set.has([8, 9])).toBeFalse();
        expect([...set.keys()]).toEqual([
            [0, 1],
            [2, 3],
            [4, 5],
            [6, 7],
        ]);
        expect([...set.values()]).toEqual([
            [0, 1],
            [2, 3],
            [4, 5],
            [6, 7],
        ]);
    });
});
