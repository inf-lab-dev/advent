import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Task } from '..';
import { fetchAdventTasks } from '../loader';

/**
 * The url (path) params the advent pages receive.
 */
export interface UrlParams {
    /**
     * The slug of a task.
     */
    slug: string;
}

/**
 * The props of a task page.
 */
export interface PageProps {
    /**
     * The contained {@link UrlParams}.
     */
    params: Promise<UrlParams>;
}

/**
 * Generates the static page-params so NextJs can pre-render all task pages.
 *
 * @param requireEpilogue if only tasks with epilogues should be respected
 * @returns all {@link UrlParams}s needed to pre-render the pages
 */
export async function generateStaticAdventParams(requireEpilogue: boolean) {
    const tasks = await fetchAdventTasks();

    return Array.from(tasks.values())
        .filter(({ files }) => files.epilogue || !requireEpilogue)
        .map(({ slug }) => ({ slug }));
}

/**
 * Generates the  meta data for task pages.
 *
 * @param props the properties of the page
 * @param template the template to use when determining the title, `%s` will be replaced by the task's title
 * @returns the generated metadata
 */
export async function generateAdventMetadata(
    { params }: PageProps,
    template = '%s',
): Promise<Metadata> {
    const { slug } = await params;
    const tasks = await fetchAdventTasks();
    const title = tasks.get(slug)?.manifest.navigation.title ?? 'UNKNOWN';

    return {
        title: template.replace('%s', title),
    };
}

/**
 * Extracts the task from the given {@link UrlParams} that were wrapped inside {@link PageProps}.
 * This function automatically calls {@link notFound} if no task with the given slug has been found.
 *
 * @param params the url params that contain the task-slug
 * @returns the found task
 */
export async function extractTask(params: Promise<UrlParams>): Promise<Task> {
    const { slug } = await params;
    const tasks = await fetchAdventTasks();

    const task = tasks.get(slug);

    if (!task) {
        notFound();
    }

    return task;
}
