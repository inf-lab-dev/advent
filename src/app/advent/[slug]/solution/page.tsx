import ErrorPage from '@/components/layout/error';
import Page from '@/components/page/advent/page';
import SolutionNote from '@/components/page/advent/solution-note';
import TokenGenerator from '@/components/page/advent/token-generator';
import { buttonVariants } from '@/components/ui/button';
import { resolveMarkdownContent, Task } from '@/lib/advent';
import { fetchPublicKey } from '@/lib/advent/token';
import {
    extractTask,
    generateAdventMetadata,
    generateStaticAdventParams,
    PageProps,
    UrlParams,
} from '@/lib/advent/util/next';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type SearchParams = Record<string, string | string[] | undefined>;

interface Props extends PageProps {
    searchParams: Promise<SearchParams>;
}

export interface DecryptedSolution {
    key: string | null;
    task: Task;
    content: string | null;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    return await generateAdventMetadata(props, 'Lösung für %s');
}

export async function generateStaticParams() {
    return await generateStaticAdventParams(true);
}

async function decryptSolution(
    params: Promise<UrlParams>,
    searchParams: Promise<SearchParams>,
): Promise<DecryptedSolution> {
    const task = await extractTask(params);
    const { key } = await searchParams;
    const secureKey = typeof key !== 'string' ? undefined : key;

    if (task.files.solution === null) {
        notFound();
    }

    const content = await resolveMarkdownContent(
        task.files.solution,
        secureKey,
    );

    return { key: secureKey ?? null, content, task };
}

export default async function TaskSolution({ params, searchParams }: Props) {
    const publicKey = await fetchPublicKey();
    const { key, task, content } = await decryptSolution(params, searchParams);

    return content ? (
        <Page content={content} task={task} titleTemplate="Lösung für „%s“">
            <div className="flex flex-col gap-2">
                {task.manifest.supports_hand_in && (
                    <TokenGenerator
                        password={key ?? 'NOT_SPECIFIED'}
                        publicKey={publicKey}
                        task={task.slug}
                    />
                )}

                <Link
                    className={`w-full ${buttonVariants({ variant: 'secondary' })}`}
                    href={`/advent/${task.slug}`}
                >
                    Zurück zur Aufgabenstellung
                </Link>
            </div>
        </Page>
    ) : (
        <ErrorPage
            code="Brrrr..."
            icon="snowflake"
            text="Das eingegebene Passwort ist leider falsch."
        >
            <div className="flex flex-col gap-5 lg:w-1/2">
                <SolutionNote decrypted={false} slug={task.slug} />

                <Link
                    className={buttonVariants({ variant: 'outline' })}
                    href={`/advent/${task.slug}`}
                >
                    Zurück zur Aufgabenstellung
                </Link>
            </div>
        </ErrorPage>
    );
}
