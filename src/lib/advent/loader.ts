import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { remark } from 'remark';
import frontmatter from 'remark-frontmatter';
import yamlFrontmatter from 'remark-frontmatter-yaml';
import gfm from 'remark-gfm';
import html from 'remark-html';
import { AdventSunday } from '.';
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

    const renderer = remark()
        .use(html)
        .use(frontmatter)
        .use(yamlFrontmatter)
        .use(gfm);

    for (const taskFile of taskFiles) {
        if (!taskFile.isFile()) {
            continue;
        }

        const content = await fs.readFile(
            path.join(TASKS_FOLDER, taskFile.name),
            { encoding: 'utf-8' },
        );

        const file = await renderer.process(content);
        const { advent, title } = (file.data.frontmatter ??
            {}) as Partial<FrontMatter>;

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
            sunday: advent,
            content: file.toString(),
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
