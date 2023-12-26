export class AssertionError extends Error {
    name: string;

    constructor(message?: string) {
        const name = 'AssertionError';
        super(message || name);
        this.name = name;
    }
}

export function assert(condition: boolean | number | string, message?: string) {
    if (condition) return;

    throw new AssertionError(message);
}
