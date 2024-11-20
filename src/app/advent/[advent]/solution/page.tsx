import ErrorPage from '@/components/layout/error';
import Page from '@/components/page/advent/page';
import SolutionNote from '@/components/page/advent/solution-note';
import { buttonVariants } from '@/components/ui/button';
import { Task } from '@/lib/advent';
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
import { decrypt } from 'solution-zone';

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

    let content: string | null = task.files.solution;

    if (content === null) {
        notFound();
    } else if (!task.manifest.is_solution_public) {
        if (typeof key !== 'string') {
            content = null;
        } else {
            try {
                content = await decrypt(key as string, content);
            } catch {
                content = null;
            }
        }
    }

    return [task, content];
}

export default async function TaskSolution({ params, searchParams }: Props) {
    const [task, content] = await decryptSolution(params, searchParams);

    return content ? (
        <Page content={content} task={task} titleTemplate="Lösung für „%s“">
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
