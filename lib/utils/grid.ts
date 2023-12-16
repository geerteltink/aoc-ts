export interface Grid<Coordinate, Value> {}

export interface Coordinate {
    x: number;
    y: number;
}

export type Value = String | Number;

export class Grid<Coordinate, Value> {
    public minX = 0;
    public minY = 0;
    public maxX = 0;
    public maxY = 0;

    private data = new Map<string, Value>();

    constructor(public readonly defaultValue: Value) {}

    public set(coordinate: Coordinate, value: Value) {
        this.data.set(JSON.stringify(coordinate), value);
    }

    public get(coordinate: Coordinate): Value {
        const key = JSON.stringify(coordinate);
        if (!this.data.has(key)) {
            return this.defaultValue;
        }

        return this.data.get(key) || this.defaultValue;
    }

    public delete(coordinate: Coordinate) {
        this.data.delete(JSON.stringify(coordinate));
    }

    public size(): number {
        return this.data.size;
    }

    public *keys(): IterableIterator<Coordinate> {
        for (const key of this.data.keys()) {
            yield JSON.parse(key);
        }
    }

    public *values(): IterableIterator<Value> {
        return this.data.values();
    }

    /*
    public *forEach(): IterableIterator<[Coordinate, Value]> {
        for (const [key, value] of this.data.entries()) {
            const coordinate = JSON.parse(key) as Coordinate;
            yield [coordinate, value];
        }
    }*/

    public forEach(callbackfn: (key: Coordinate, value: Value) => void) {
        for (const [key, value] of this.data.entries()) {
            callbackfn(JSON.parse(key) as Coordinate, value);
        }
    }

    public map(callbackfn: (coordinate: Coordinate, value: Value) => void) {
        for (const [key, value] of this.data.entries()) {
            const coordinate = JSON.parse(key) as Coordinate;
            callbackfn(coordinate, value);
        }

        return this;
    }
}

export function createGrid(input: string, defaultValue: Value): Grid<Coordinate, Value> {
    const grid = new Grid<Coordinate, Value>(defaultValue);
    const data = input.trim().split(/\r?\n/);

    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            const value = data[y][x];
            if (value !== grid.defaultValue) {
                grid.set({ x, y }, data[y][x]);
            }

            if (x < grid.minX) {
                grid.minX = x;
            }
            if (y < grid.minY) {
                grid.minY = y;
            }
            if (x > grid.maxX) {
                grid.maxX = x;
            }
            if (y > grid.maxY) {
                grid.maxY = y;
            }
        }
    }

    return grid;
}

export function printGrid(grid: Grid<Coordinate, Value>) {
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;

    for (const coordinate of grid.keys()) {
        if (coordinate.x < minX) {
            minX = coordinate.x;
        }
        if (coordinate.y < minY) {
            minY = coordinate.y;
        }
        if (coordinate.x > maxX) {
            maxX = coordinate.x;
        }
        if (coordinate.y > maxY) {
            maxY = coordinate.y;
        }
    }

    console.log(minX, minY, maxX, maxY);

    for (let y = minY; y <= maxY; y++) {
        let line = '';
        for (let x = minX; x <= maxX; x++) {
            line += grid.get({ x, y }).toString();
        }
        console.log(line);
    }
    console.log();
}
