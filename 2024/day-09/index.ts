import input from './input.txt';
import testInput1 from './input1.test.txt';
import testInput2 from './input2.test.txt';
import { testSolution, type Solution, solve } from '@lib';

const EXPECTED_PART_ONE = 1928;
const EXPECTED_PART_TWO = 2858;

const parseDiskMap = (diskMap: string): (number | '.')[] => {
    const blocks: (number | '.')[] = [];
    let fileId = 0;

    for (let i = 0; i < diskMap.length; i += 2) {
        const fileLength = parseInt(diskMap[i], 10);
        const freeSpaceLength = parseInt(diskMap[i + 1], 10);

        const fileBlock = Array(fileLength).fill(fileId);
        blocks.push(...fileBlock);

        if (!isNaN(freeSpaceLength)) {
            const freeSpaceBlock = Array(freeSpaceLength).fill('.');
            blocks.push(...freeSpaceBlock);
        }

        fileId++;
    }

    return blocks;
};

// Don't do a recursive solution, it is so slow
const defragment = (blocks: (number | '.')[]): (number | '.')[] => {
    let firstFreeSpaceIndex = blocks.indexOf('.');
    let lastNonFreeSpaceIndex = blocks.length - 1;

    while (firstFreeSpaceIndex !== -1 && lastNonFreeSpaceIndex !== -1 && firstFreeSpaceIndex < lastNonFreeSpaceIndex) {
        while (firstFreeSpaceIndex < blocks.length && blocks[firstFreeSpaceIndex] !== '.') {
            firstFreeSpaceIndex++;
        }

        while (lastNonFreeSpaceIndex >= 0 && blocks[lastNonFreeSpaceIndex] === '.') {
            lastNonFreeSpaceIndex--;
        }

        if (firstFreeSpaceIndex < lastNonFreeSpaceIndex) {
            blocks[firstFreeSpaceIndex] = blocks[lastNonFreeSpaceIndex];
            blocks[lastNonFreeSpaceIndex] = '.';
        }
    }

    return blocks;
};

const calculateChecksum = (blocks: (number | '.')[]): number => {
    return blocks.reduce((checksum: number, block, index) => {
        if (block !== '.') {
            checksum += index * (block as number);
        }
        return checksum;
    }, 0);
};

const part1 = async (data: string): Promise<number> => {
    const blocks = parseDiskMap(data.trim());

    console.log(blocks);
    console.log(blocks.slice(100, 200));

    const compactedBlocks = defragment(blocks);

    console.log(compactedBlocks);
    console.log(compactedBlocks.slice(100, 200));

    return calculateChecksum(compactedBlocks);
};

const improvedDefragment = (blocks: (number | '.')[]): (number | '.')[] => {
    const fileIds = Array.from(new Set(blocks.filter((block) => block !== '.'))).sort((a, b) => b - a);

    fileIds.forEach((fileId) => {
        const fileIndices = blocks.reduce((indices, block, index) => {
            if (block === fileId) indices.push(index);
            return indices;
        }, [] as number[]);

        const fileLength = fileIndices.length;
        let freeSpaceStart = -1;

        for (let i = 0; i < blocks.length; i++) {
            if (blocks.slice(i, i + fileLength).every((block) => block === '.')) {
                freeSpaceStart = i;
                break;
            }
        }

        if (freeSpaceStart !== -1 && freeSpaceStart < fileIndices[0]) {
            fileIndices.forEach((index, i) => {
                blocks[freeSpaceStart + i] = fileId;
                blocks[index] = '.';
            });
        }
    });

    return blocks;
};

const part2 = async (data: string): Promise<Solution> => {
    const blocks = parseDiskMap(data.trim());

    console.log(blocks);
    console.log(blocks.slice(100, 200));

    const compactedBlocks = improvedDefragment(blocks);

    console.log(compactedBlocks);
    console.log(compactedBlocks.slice(100, 200));

    return calculateChecksum(compactedBlocks);
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
