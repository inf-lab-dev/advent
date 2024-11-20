import fs from 'node:fs/promises';
import { AdventSunday } from '..';

export interface Manifest {
    advent: AdventSunday;
    title: string;
    is_solution_public: boolean;
    files: {
        content: string;
        solution: string;
    };
}

export const FILE_NAME = 'manifest.json';

export async function loadManifest(filePath: string): Promise<Manifest> {
    const manifestContent = await fs.readFile(filePath, { encoding: 'utf8' });
    const manifest = JSON.parse(manifestContent);

    if (
        !manifest.advent ||
        isNaN(manifest.advent) ||
        manifest.advent > 4 ||
        manifest.advent < 1
    ) {
        throw new TypeError(
            `The manifest at "${filePath}" is malformed, expected "advent" to be a valid advent in the range [1, 4].`,
        );
    } else if (!manifest.title) {
        throw new TypeError(
            `The manifest at "${filePath}" is malformed, expected "title" to be a non-empty string.`,
        );
    } else if (typeof manifest.is_solution_public !== 'boolean') {
        throw new TypeError(
            `The manifest at "${filePath}" is malformed, expected "is_solution_public" to be a boolean.`,
        );
    } else if (!manifest.files) {
        throw new TypeError(
            `The manifest at "${filePath}" is malformed, expected "files" to be an object.`,
        );
    } else if (!manifest.files.content) {
        throw new TypeError(
            `The manifest at "${filePath}" is malformed, expected "files.content" to be a non-empty path.`,
        );
    } else if (!manifest.files.solution) {
        throw new TypeError(
            `The manifest at "${filePath}" is malformed, expected "files.solution" to be a non-empty path.`,
        );
    }

    return manifest;
}
