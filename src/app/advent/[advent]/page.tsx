import AdventWreath from '@/components/advent-wreath';
import { Advent, toLiteral } from '@/lib/advent';
import { fetchAdventData } from '@/lib/advent/loader';
import { notFound } from 'next/navigation';

export interface Props {
    params: Promise<{
        advent: Advent;
    }>;
}

export async function generateStaticParams() {
    const [, tasks] = await fetchAdventData();

    return tasks.sundays.map((sunday) => ({
        advent: toLiteral(sunday),
    }));
}

export default async function TaskDescription({ params }: Props) {
    const [, tasks] = await fetchAdventData();
    const { advent } = await params;

    const task = tasks.get(advent);

    if (!task) {
        notFound();
    }

    return (
        <article className="container">
            <aside className="mb-4 md:float-right md:max-w-[40%]">
                <AdventWreath advent={task.sunday} />
            </aside>
            <h1 className="text-[3.7rem] font-bold">{task.title}</h1>
            <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: task.content }}
            />
        </article>
    );
}
