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

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    return await generateAdventMetadata(props, 'Lösung für %s');
}

export async function generateStaticParams() {
    return await generateStaticAdventParams(true);
}

async function decryptSolution(
    params: Promise<UrlParams>,
    searchParams: Promise<SearchParams>,
): Promise<[task: Task, content: string | null]> {
    const task = await extractTask(params);
    const { key } = await searchParams;

    if (task.files.solution === null) {
        notFound();
    }

    const content = await resolveMarkdownContent(
        task.files.solution,
        typeof key !== 'string' ? undefined : key,
    );

    return [task, content];
}

export default async function TaskSolution({ params, searchParams }: Props) {
    const publicKey = await fetchPublicKey();
    const [task, content] = await decryptSolution(params, searchParams);

    // TODO: use actual password
    return content ? (
        <Page content={content} task={task} titleTemplate="Lösung für „%s“">
            <TokenGenerator
                password={'UNKNOWN'}
                publicKey={publicKey}
                task={task.slug}
            />

            <Link
                className={`w-full ${buttonVariants({ variant: 'secondary' })}`}
                href={`/advent/${task.slug}`}
            >
                Zurück zur Aufgabenstellung
            </Link>
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
