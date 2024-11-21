import AdventWreath from '@/components/advent-wreath';
import { Separator } from '@/components/ui/separator';
import { Task } from '@/lib/advent';
import { PropsWithChildren, useMemo } from 'react';

export interface Props extends PropsWithChildren {
    titleTemplate?: string;
    content: string;
    task: Task;
}

export default function Page({
    titleTemplate = '%s',
    content,
    task,
    children,
}: Props) {
    const title = useMemo(
        () => titleTemplate.replace('%s', task.manifest.title),
        [titleTemplate, task],
    );

    return (
        <article className="container">
            <aside className="mb-4 flex flex-col gap-5 md:float-right md:ml-24 md:max-w-[40%]">
                <AdventWreath candles={task.manifest.candles} />

                <div className="static mb-5 hidden overflow-hidden md:block">
                    {children}
                </div>
            </aside>
            <section>
                <h1 className="text-[2.5rem] font-bold md:text-[3.7rem]">
                    {title}
                </h1>
                <Separator className="mb-3 md:max-w-[55%]" />

                <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                <div className="mt-5 md:hidden">{children}</div>
            </section>
        </article>
    );
}
