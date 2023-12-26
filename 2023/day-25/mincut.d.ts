declare module '@graph-algorithm/minimum-cut' {
    export function mincut<TConnection>(connections: TConnection[]): Generator<TConnection>;
}
