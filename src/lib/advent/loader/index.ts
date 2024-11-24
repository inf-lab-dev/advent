import { renderMarkdown } from '@/lib/markdown';
import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { FileContent, Task, Tasks } from '..';
import { FILE_NAME, loadManifest } from './manifest';

/**
 * The folder in which the tasks are contained,
 * relative from the root of the project.
 */
const TASKS_FOLDER = './content/tasks';

/**
 * Loads a possibly encrypted markdown file.
 *
 * @param filePath the path to the markdown file
 * @param isEncrypted if the file is encryted
 * @returns the rendered markdown file as `string` if `isEncrypted` is `false`, a _encrypted wrapper_ with the unrendered markdown otherwise
 */
async function loadMarkdown(
    filePath: string,
    isEncrypted = false,
): Promise<FileContent> {
    const markdown = await fs.readFile(filePath, { encoding: 'utf-8' });

    return isEncrypted ? { encrypted: markdown } : renderMarkdown(markdown);
}

/**
 * Loads the tasks from the file system.
 *
 * @returns the loaded tasks
 * @throws {TypeError} if the manifest is malformed
 */
async function loadTasks(): Promise<Tasks> {
    const tasks = new Map<string, Task>();
    const taskDirectories = await fs.readdir(TASKS_FOLDER, {
        withFileTypes: true,
    });

    for (const taskDirectory of taskDirectories) {
        if (!taskDirectory.isDirectory()) {
            continue;
        }

        const manifest = await loadManifest(
            path.join(TASKS_FOLDER, taskDirectory.name, FILE_NAME),
        );

        if (manifest.is_draft) {
            continue;
        }

        tasks.set(taskDirectory.name, {
            slug: taskDirectory.name,
            manifest,
            files: {
                content: await loadMarkdown(
                    path.join(
                        TASKS_FOLDER,
                        taskDirectory.name,
                        manifest.files.content,
                    ),
                ),
                epilogue: manifest.files.epilogue
                    ? await loadMarkdown(
                          path.join(
                              TASKS_FOLDER,
                              taskDirectory.name,
                              manifest.files.epilogue,
                          ),
                          !manifest.is_epilogue_public,
                      )
                    : null,
            },
        });
    }

    return tasks;
}

/**
 * Fetches the advent tasks in a cached manner.
 *
 * @see {@link loadTasks}
 */
export const fetchAdventTasks = cache(loadTasks);
