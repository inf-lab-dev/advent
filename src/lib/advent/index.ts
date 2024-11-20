import { decrypt } from 'solution-zone';
import { renderMarkdown } from '../markdown';
import { Manifest } from './loader/manifest';

/**
 * An alias for a map of tasks.
 */
export type Tasks = Map<string, Task>;

/**
 * The content of a {@link Task}s file, which might be `encrypted`.
 */
export type FileContent = string | { encrypted: string };

/**
 * A task.
 */
export interface Task {
    /**
     * The slug that's used inside urls.
     */
    slug: string;

    /**
     * The manifest of the task.
     */
    manifest: Manifest;

    /**
     * The various connected files of the task.
     */
    files: {
        /**
         * The task's description file.
         */
        content: FileContent;

        /**
         * Possibly the tasks solution.
         */
        solution: FileContent | null;
    };
}

/**
 * Resolves possibly encrypted markdown content.
 *
 * @param content the possibly encrypted content
 * @param key possibly a key
 * @returns the rendered markdown if decrypting was possible or the previously rendered markdown if no decryption was necessary
 */
export async function resolveMarkdownContent(
    content: FileContent | null,
    key?: string,
) {
    if (content === null) {
        return null;
    } else if (typeof content !== 'string') {
        if (typeof key === 'string') {
            try {
                return renderMarkdown(await decrypt(key, content.encrypted));
            } catch {
                return null;
            }
        }

        return null;
    }

    return content;
}
