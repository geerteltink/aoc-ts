export type Graph<T extends string | number> = {
    [key in T]: T[];
};

export function dfs<T extends string | number>(
    graph: Graph<T>,
    start: T,
    visited: Set<T> = new Set(),
    result: T[]
): void {
    if (visited.has(start)) return;

    visited.add(start);

    for (const neighbor of graph[start]) {
        dfs(graph, neighbor, visited, result);
    }

    result.push(start);
}
