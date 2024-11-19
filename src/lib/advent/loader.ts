import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { AdventSunday } from '.';
import { renderMarkdown } from '../markdown';
import { Task, Tasks } from './task';

const TASKS_FOLDER = './tasks';

interface FrontMatter {
    advent: AdventSunday;
    title: string;
}

function getPossibleSunday(tasks: Tasks): AdventSunday | null {
    const keys = Object.keys(tasks);

    const sunday = keys
        .map(Number)
        .reduce(
            (previous, current) => (current > previous ? current : previous),
            0,
        ) as AdventSunday | 0;

    if (sunday === 0) {
        return null;
    }

    return sunday;
}

async function fetchTasks(): Promise<Tasks> {
    const taskList: Task[] = [];

    const taskFiles = await fs.readdir(TASKS_FOLDER, { withFileTypes: true });

    for (const taskFile of taskFiles) {
        if (!taskFile.isFile()) {
            continue;
        }

        const markdown = await fs.readFile(
            path.join(TASKS_FOLDER, taskFile.name),
            { encoding: 'utf-8' },
        );

        const [content, { advent, title }] =
            await renderMarkdown<Partial<FrontMatter>>(markdown);

        if (!advent || isNaN(advent) || advent > 4 || advent < 1) {
            throw new TypeError(
                `The task-frontmatter of "${taskFile.name}" is malformed, expected "advent" to be a valid advent in the range [1, 4].`,
            );
        } else if (!title) {
            throw new TypeError(
                `The task-frontmatter of "${taskFile.name}" is malformed, expected "title" to be a non-empty string.`,
            );
        }

        taskList.push({
            title,
            content,
            sunday: advent,
        });
    }

    return new Tasks(taskList);
}

async function fetchData(): Promise<
    [sunday: null | AdventSunday, tasks: Tasks]
> {
    const tasks = await fetchTasks();

    return [getPossibleSunday(tasks), tasks];
}

export const fetchAdventData = cache(fetchData);
