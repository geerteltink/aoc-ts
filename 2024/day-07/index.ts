import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 3749;
const EXPECTED_PART_TWO = 11387;

const parseInput = (data: string): { target: number; numbers: number[] }[] => {
    return data
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => {
            const [target, numbers] = line.split(': ');
            return {
                target: parseInt(target, 10),
                numbers: numbers.split(' ').map(Number),
            };
        });
};

const generateOperatorCombinations = (length: number, operators: string[]): string[][] => {
    const combinations: string[][] = [];

    const generate = (current: string[], depth: number) => {
        if (depth === length) {
            combinations.push([...current]);
            return;
        }
        for (const op of operators) {
            current.push(op);
            generate(current, depth + 1);
            current.pop();
        }
    };

    generate([], 0);
    return combinations;
};

const evaluateExpression = (numbers: number[], operators: string[]): number => {
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const nextNum = numbers[i + 1];

        switch (operator) {
            case '+':
                result += nextNum;
                break;
            case '*':
                result *= nextNum;
                break;
            case '||':
                result = parseInt(`${result}${nextNum}`, 10);
                break;
        }
    }

    return result;
};

const findValidEquations = (equations: { target: number; numbers: number[] }[], operators: string[]): number => {
    let totalCalibrationResult = 0;

    for (const { target, numbers } of equations) {
        const operatorCombinations = generateOperatorCombinations(numbers.length - 1, operators);
        for (const operators of operatorCombinations) {
            if (evaluateExpression(numbers, operators) === target) {
                totalCalibrationResult += target;
                break;
            }
        }
    }

    return totalCalibrationResult;
};

const part1 = async (data: string): Promise<Solution> => {
    const equations = parseInput(data);
    const operators = ['+', '*'];

    return findValidEquations(equations, operators);
};

const part2 = async (data: string): Promise<Solution> => {
    const equations = parseInput(data);
    const operators = ['+', '*', '||'];

    return findValidEquations(equations, operators);
};

export const main = async (year: string, day: string) => {
    return Promise.resolve()
        .then(function () {
            return testSolution(year, day, part1, testInput1, EXPECTED_PART_ONE);
        })
        .then(function () {
            return solve(year, day, part1, input);
        })
        .then(function () {
            return testSolution(year, day, part2, testInput2, EXPECTED_PART_TWO);
        })
        .then(function () {
            return solve(year, day, part2, input);
        })
        .then(function () {
            console.log(`DONE: 🎉`);
            process.exit(0);
        })
        .catch((error: Error) => {
            console.error(error.message);
        });
};
