import Page, { extractTask, Params } from '@/components/page/advent/page';
import SolutionNote from '@/components/page/advent/solution-note';
import { fromLiteral, toLiteral } from '@/lib/advent';
import { fetchAdventData } from '@/lib/advent/loader';
import { Metadata } from 'next';

export interface Props {
    params: Promise<Params>;
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
    const [advent, task] = await extractTask(params);

    return (
        <Page task={task} content={task.content}>
            <SolutionNote
                advent={advent}
                decrypted={task.manifest.is_solution_public}
            />
        </Page>
    );
}
