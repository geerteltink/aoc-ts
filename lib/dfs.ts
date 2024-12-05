export type Graph<T extends string | number> = {
    [key in T]: T[];
};

/**
 * Performs a Depth-First Search (DFS) on a graph starting from a given node.
 *
 * @template T - The type of the nodes in the graph, which can be either string or number.
 * @param {Graph<T>} graph - The graph represented as an adjacency list, where each key is a node and the value is an array of neighboring nodes.
 * @param {T} start - The starting node for the DFS traversal.
 * @param {Set<T>} [visited=new Set()] - A set to keep track of visited nodes to avoid cycles. Defaults to an empty set.
 * @param {T[]} result - An array to store the nodes in the order they are visited.
 *
 * @returns {void} This function does not return a value. It modifies the `result` array in place.
 *
 * @example
 * const graph = {
 *   1: [2, 3],
 *   2: [4],
 *   3: [],
 *   4: []
 * };
 * const result = [];
 * dfs(graph, 1, new Set(), result);
 * console.log(result); // Output might be [4, 2, 3, 1] depending on the graph structure
 */
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
