import { inRange } from './math';
import { TupleSet } from './tuple';

export type Point = [x: number, y: number];

export type Line = [start: Point, end: Point];

export function isAdjacent([x, y]: Point, [[x1, y1], [x2, y2]]: Line, offset = 1) {
    return inRange(x, [x1, x2], offset) && inRange(y, [y1, y2], offset);
}

export function taxicab([x1, y1]: Point, [x2, y2]: Point) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export class Points extends TupleSet<Point> {}
