import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { FaqCategory } from '.';
import { renderMarkdown } from '../markdown';

const FAQ_FOLDER = './content/faq';
const INDEX_FILE = '_index.md';
const MARKDOWN_TITLE_REGEX = /^# (.+)$/m;

/**
 * Extracts the very first title element from the given markdown string.
 *
 * @param markdown the markdown string to extract from
 * @returns a tuple consisting of the extracted title and the remaining content
 */
function extractTitle(
    markdown: string,
): [title: string | null, content: string] {
    const match = markdown.match(MARKDOWN_TITLE_REGEX);

    if (match) {
        const title = match[1];
        const content = markdown.replace(MARKDOWN_TITLE_REGEX, '').trim();

        return [title, content];
    }

    return [null, markdown];
}

/**
 * Loads a single {@link FaqCategory} at the given `folderPath`.
 *
 * @param folderPath the path to the folder to load from
 * @returns the loaded category
 * @throws {TypeError} if any of the files is malformed, i.e. does not contain a header in-front or if there is no `_index.md` file
 */
async function loadFaqCategory(folderPath: string): Promise<FaqCategory> {
    const entryFiles = await fs.readdir(folderPath, { withFileTypes: true });
    const category: Partial<FaqCategory> = { entries: [] };

    for (const entryFile of entryFiles) {
        const filePath = path.join(folderPath, entryFile.name);

        if (!entryFile.isFile()) {
            continue;
        }

        const fileContent = await fs.readFile(filePath, { encoding: 'utf8' });
        const [firstHeader, description] = extractTitle(fileContent);

        if (firstHeader === null) {
            throw new TypeError(
                `The faq file at "${filePath}" is malformed, it does not contain a first heading at the top.`,
            );
        }

        if (entryFile.name === INDEX_FILE) {
            category.title = firstHeader;
            category.description = description;
        } else {
            category.entries!.push({
                question: firstHeader,
                answer: renderMarkdown(description),
            });
        }
    }

    if (!category.title || !category.description) {
        throw new TypeError(
            `The faq directory at "${folderPath}" is malformed, it does not contain a valid "${INDEX_FILE}" file.`,
        );
    }

    return category as FaqCategory;
}

/**
 * Loads all {@link FaqCategory} from the file system.
 *
 * @returns the loaded categories
 * @throws {TypeError} if any of the categories is invalid, see {@link loadFaqCategory}
 */
async function loadFaqCategories(): Promise<FaqCategory[]> {
    const categories: FaqCategory[] = [];
    const categoryFolders = await fs.readdir(FAQ_FOLDER, {
        withFileTypes: true,
    });

    for (const categoryFolder of categoryFolders) {
        if (!categoryFolder.isDirectory()) {
            continue;
        }

        categories.push(
            await loadFaqCategory(path.join(FAQ_FOLDER, categoryFolder.name)),
        );
    }

    return categories;
}

/**
 * Fetches the faq categories in a cached manner.
 *
 * @see {@link loadFaqCategories}
 */
export const fetchFaqCategories = cache(loadFaqCategories);
