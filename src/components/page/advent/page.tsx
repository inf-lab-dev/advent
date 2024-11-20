import AdventWreath from '@/components/advent-wreath';
import { Advent } from '@/lib/advent';
import { fetchAdventData } from '@/lib/advent/loader';
import { Task } from '@/lib/advent/task';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

export interface Props extends PropsWithChildren {
    titleTemplate?: string;
    content: string;
    task: Task;
}

export interface Params {
    advent: Advent;
}

export async function extractTask(
    params: Promise<Params>,
): Promise<[advent: Advent, task: Task]> {
    const [, tasks] = await fetchAdventData();
    const { advent } = await params;

    const task = tasks.get(advent);

    if (!task) {
        notFound();
    }

    return [advent, task];
}

export default function Page({
    titleTemplate = '%s',
    content,
    task,
    children,
}: Props) {
    return (
        <article className="container">
            <aside className="mb-4 flex flex-col gap-5 md:float-right md:ml-24 md:max-w-[40%]">
                <AdventWreath advent={task.manifest.advent} />

                <div className="static mb-5 hidden overflow-hidden md:block">
                    {children}
                </div>
            </aside>
            <section>
                <h1 className="text-[3.7rem] font-bold">
                    {titleTemplate.replace('%s', task.manifest.title)}
                </h1>
                <hr className="mb-3 border-t-2 border-muted dark:border-muted-foreground" />

                <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                <div className="mt-5 md:hidden">{children}</div>
            </section>
        </article>
    );
}
