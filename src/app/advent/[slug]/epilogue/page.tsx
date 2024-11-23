import Renderer from '@/components/page/advent/epilogue/renderer';
import { fetchPublicKey } from '@/lib/advent/token';
import {
    extractTask,
    generateAdventMetadata,
    generateStaticAdventParams,
    PageProps,
} from '@/lib/advent/util/next';
import { Metadata } from 'next';
import { Suspense } from 'react';

type SearchParams = Record<string, string | string[] | undefined>;

interface Props extends PageProps {
    searchParams: Promise<SearchParams>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    return await generateAdventMetadata(props, 'Epilog für %s');
}

export async function generateStaticParams() {
    return await generateStaticAdventParams(true);
}

export default async function TaskEpilogue({ params }: Props) {
    const publicKey = await fetchPublicKey();
    const task = await extractTask(params);

    return (
        <Suspense>
            <Renderer publicKey={publicKey} task={task} />
        </Suspense>
    );
}
