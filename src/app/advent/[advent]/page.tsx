import Page from '@/components/page/advent/page';
import SolutionNote from '@/components/page/advent/solution-note';
import {
    extractTask,
    generateAdventMetadata,
    generateStaticAdventParams,
    PageProps,
} from '@/lib/advent/util/next';
import { Metadata } from 'next';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    return await generateAdventMetadata(props);
}

export async function generateStaticParams() {
    return await generateStaticAdventParams(false);
}

export default async function TaskDescription({ params }: PageProps) {
    const task = await extractTask(params);

    return (
        <Page content={task.files.content} task={task}>
            {task.files.solution && (
                <SolutionNote
                    decrypted={task.manifest.is_solution_public}
                    slug={task.slug}
                />
            )}
        </Page>
    );
}
