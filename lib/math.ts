export function sum(first: number, second: number) {
    return first + second;
}

export function sumAll(numbers: number[]) {
    return numbers.reduce(sum);
}

export function subtract(first: number, second: number) {
    return first - second;
}

export function subtractAll(numbers: number[]) {
    return numbers.reduce(subtract);
}

export function multiply(first: number, second: number) {
    return first * second;
}

export function multiplyAll(numbers: number[]) {
    return numbers.reduce(multiply);
}

export function divide(first: number, second: number) {
    return first / second;
}

export function divideAll(numbers: number[]) {
    return numbers.reduce(divide);
}

export type Range<TMin = number, TMax = number> = [min: TMin, max: TMax];

export function inRange(value: number, [min, max]: Range, offset = 0) {
    return (value - (min - offset)) * (value - (max + offset)) <= 0;
}

export function quadratic(a: number, b: number, c: number) {
    const discriminant = Math.sqrt(b ** 2 - 4 * a * c);

    return [(-b + discriminant) / (2 * a), (-b - discriminant) / (2 * a)] as [root: number, root: number];
}

export function gcd(...numbers: number[]): number {
    if (numbers.length !== 2) return numbers.reduce((a, b) => gcd(a, b));
    const [a, b] = numbers.map(Math.abs);
    if (!b) return a;
    return gcd(b, a % b);
}

export function lcm(...numbers: number[]): number {
    if (numbers.length !== 2) return numbers.reduce((a, b) => lcm(a, b));
    return Math.abs(multiplyAll(numbers)) / gcd(...numbers);
}
