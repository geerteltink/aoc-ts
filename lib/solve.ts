export type Solution = string | number | undefined;
export type part = (data: string) => Promise<Solution>;

export const testSolution = async (
    year: string,
    day: string,
    part: part,
    input: string,
    expected: Solution | undefined
) => {
    console.log(`Solving year ${year} day ${day} ${part.name}...`);
    const solution = await part(input);
    if (solution !== expected) {
        const msg = `Test day ${day} ${part.name} failed!\nExpected: ${expected} - Received: ${solution}`;
        throw new Error(msg);
    }
};

export const solve = async (_year: string, day: string, part: part, input: string) => {
    console.log(`Solution day ${day} ${part.name}: `, await part(input));
};
