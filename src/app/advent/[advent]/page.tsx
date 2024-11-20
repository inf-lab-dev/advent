import AdventWreath from '@/components/advent-wreath';
import { Advent, fromLiteral, toLiteral } from '@/lib/advent';
import { fetchAdventData } from '@/lib/advent/loader';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export interface Props {
    params: Promise<{
        advent: Advent;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { advent } = await params;
    const sunday = fromLiteral(advent)!;

    return {
        title: `${sunday}. Advent`,
    };
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
            <aside className="mb-4 ml-24 md:float-right md:max-w-[40%]">
                <AdventWreath advent={task.manifest.advent} />
            </aside>
            <h1 className="text-[3.7rem] font-bold">{task.manifest.title}</h1>
            <hr className="mb-3 border-t-2 border-muted dark:border-muted-foreground" />
            <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: task.content }}
            />
        </article>
    );
}
