import EpilogueNote from '@/components/page/advent/epilogue-note';
import Page from '@/components/page/advent/page';
import { resolveMarkdownContent } from '@/lib/advent';
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
    const content = await resolveMarkdownContent(task.files.content);

    if (content === null) {
        throw new TypeError(
            `Could not resolve description for task "${task.slug}".`,
        );
    }

    return (
        <Page content={content} task={task}>
            {task.files.epilogue && (
                <EpilogueNote
                    decrypted={task.manifest.is_epilogue_public}
                    slug={task.slug}
                />
            )}
        </Page>
    );
}
