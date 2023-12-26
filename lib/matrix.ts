export function rotateClockwise<TValue>(matrix: TValue[][]) {
    return matrix[0].map((_value, index) => matrix.map((row) => row[index]).reverse());
}

export function rotateCounterClockwise<TValue>(matrix: TValue[][]) {
    return matrix[0].map((_val, index) => matrix.map((row) => row[row.length - 1 - index]));
}
