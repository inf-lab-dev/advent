import fs from 'node:fs/promises';
import { z } from 'zod';

/**
 * The type of manifests.
 */
export type Manifest = z.infer<typeof SCHEMA>;

/**
 * The schema for manifests.
 */
const SCHEMA = z.object({
    title: z.string().trim().min(1),
    candles: z.number().int().min(0).max(4),
    is_draft: z.boolean(),
    is_solution_public: z.boolean(),
    navigation: z.object({
        weight: z.number().int().positive(),
        title: z.string().trim().min(1),
    }),
    files: z.object({
        content: z.string().trim().min(1),
        solution: z.string().trim().min(1).optional(),
    }),
});

/**
 * The fixed file name of the manifest.
 */
export const FILE_NAME = 'manifest.json';

/**
 * Attempts to load a manifest at the given `filePath`.
 *
 * @param filePath the path to the manifest file to load
 * @returns the loaded manifest
 * @throws {TypeError} if the manifest is malformed
 */
export async function loadManifest(filePath: string): Promise<Manifest> {
    const manifestContent = await fs.readFile(filePath, { encoding: 'utf8' });
    const manifest = JSON.parse(manifestContent);

    const { success, data, error } = SCHEMA.safeParse(manifest);

    if (!success) {
        throw new TypeError(`The manifest at "${filePath}" is malformed.`, {
            cause: error.format(),
        });
    }

    return data;
}
