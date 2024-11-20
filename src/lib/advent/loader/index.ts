import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { AdventSunday } from '..';
import { Task, Tasks } from '../task';
import { FILE_NAME, loadManifest } from './manifest';
import { loadMarkdown } from './markdown';

const TASKS_FOLDER = './tasks';

function getSunday(tasks: Tasks): AdventSunday | null {
    const sunday = (tasks.sundays as number[]).reduce(
        (previous, current) => (current > previous ? current : previous),
        0,
    ) as AdventSunday | 0;

    if (sunday === 0) {
        return null;
    }

    return sunday;
}

async function loadTasks(): Promise<Tasks> {
    const taskFiles = await fs.readdir(TASKS_FOLDER, { withFileTypes: true });
    const taskList: Task[] = [];

    for (const taskFile of taskFiles) {
        if (!taskFile.isDirectory()) {
            continue;
        }

        const manifest = await loadManifest(
            path.join(TASKS_FOLDER, taskFile.name, FILE_NAME),
        );

        taskList.push({
            manifest,
            content: await loadMarkdown(
                path.join(TASKS_FOLDER, taskFile.name, manifest.files.content),
            ),
            solution: await loadMarkdown(
                path.join(TASKS_FOLDER, taskFile.name, manifest.files.solution),
            ),
        });
    }

    return new Tasks(taskList);
}

async function loadData(): Promise<
    [sunday: null | AdventSunday, tasks: Tasks]
> {
    const tasks = await loadTasks();

    return [getSunday(tasks), tasks];
}

export const fetchAdventData = cache(loadData);
