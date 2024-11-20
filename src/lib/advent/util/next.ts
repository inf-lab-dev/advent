import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Task } from '..';
import { fetchAdventTasks } from '../loader';

export interface UrlParams {
    advent: string;
}

export interface PageProps {
    params: Promise<UrlParams>;
}

export async function generateStaticAdventParams(requireSolution: boolean) {
    const tasks = await fetchAdventTasks();

    return Array.from(tasks.values())
        .filter(({ files }) => files.solution || !requireSolution)
        .map(({ slug }) => ({
            advent: slug,
        }));
}

export async function generateAdventMetadata(
    { params }: PageProps,
    template = '%s',
): Promise<Metadata> {
    const { advent } = await params;
    const tasks = await fetchAdventTasks();
    const title = tasks.get(advent)?.manifest.navigation.title ?? 'UNKNOWN';

    return {
        title: template.replace('%s', title),
    };
}

export async function extractTask(params: Promise<UrlParams>): Promise<Task> {
    const { advent } = await params;
    const tasks = await fetchAdventTasks();

    const task = tasks.get(advent);

    if (!task) {
        notFound();
    }

    return task;
}
