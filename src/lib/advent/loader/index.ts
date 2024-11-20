import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { Task, Tasks } from '..';
import { FILE_NAME, loadManifest } from './manifest';
import { loadMarkdown } from './markdown';

const TASKS_FOLDER = './tasks';

async function loadTasks(): Promise<Tasks> {
    const taskDirectories = await fs.readdir(TASKS_FOLDER, {
        withFileTypes: true,
    });
    const tasks = new Map<string, Task>();

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
                solution: manifest.files.solution
                    ? await loadMarkdown(
                          path.join(
                              TASKS_FOLDER,
                              taskDirectory.name,
                              manifest.files.solution,
                          ),
                      )
                    : null,
            },
        });
    }

    return tasks;
}

export const fetchAdventTasks = cache(loadTasks);
