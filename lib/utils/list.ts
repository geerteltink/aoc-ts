/**
 * Filters out NaN (Not-a-Number) values from the given list of numbers.
 *
 * @param list - The array of numbers to filter.
 * @returns - A new array containing only non-NaN numbers from the original list.
 *
 * @example
 * const inputList = [1, 2, NaN, 3, 4, NaN, 5];
 * const result = filterOutNaN(inputList);
 * console.log(result); // Output: [1, 2, 3, 4, 5]
 */
export const filterOutNaN = (list: number[]) => list.filter((n) => !isNaN(n));

/**
 * Filters out occurrences of a specific value from an array.
 *
 * @param list - The array to filter.
 * @param val - The value to filter out from the array.
 * @returns - A new array with the specified value removed.
 *
 * @example
 * ```typescript
 * const originalArray = [1, 2, 3, 4, 3, 5];
 * const filteredArray = filterOut(originalArray, 3);
 * // filteredArray is now [1, 2, 4, 5]
 * ```
 *
 * @example
 * ```typescript
 * const words = ["apple", "orange", "banana", "apple"];
 * const filteredWords = filterOut(words, "apple");
 * // filteredWords is now ["orange", "banana"]
 * ```
 */
export const filterOut = <T>(list: T[], val: T) =>
	list.filter((i) => i !== val);

/**
 * Gets the last element of an array.
 *
 * @param arr - The input array.
 * @returns - The last element of the array, or undefined if the array is empty.
 *
 * @example
 * // Returns undefined
 * lastElementOfList([]);
 *
 * @example
 * // Returns 'world'
 * lastElementOfList(['hi', 'hello', 'world']);
 *
 * @example
 * // Returns -3
 * lastElementOfList([1, 2, 3, 10, -3]);
 *
 * @example
 * // Returns null
 * lastElementOfList([1, 'hello', true, null]);
 *
 * @example
 * // Returns { name: 'Jane' }
 * lastElementOfList([{ name: 'John' }, { name: 'Jane' }]);
 *
 * @example
 * // Returns [1, 2, 3]
 * lastElementOfList([['a', 'b', 'c'], [1, 2, 3]]);
 *
 * @example
 * // Returns 'c'
 * lastElementOfList<undefined>(['a', 'b', 'c']);
 *
 * @example
 * // Returns 3
 * lastElementOfList<null>([1, 2, 3]);
 */
export const lastElementOfList = <T>(list: T[]): T => list[list.length - 1];
