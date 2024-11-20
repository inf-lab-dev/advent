import ErrorPage from '@/components/layout/error';
import Page, { extractTask, Params } from '@/components/page/advent/page';
import SolutionNote from '@/components/page/advent/solution-note';
import { buttonVariants } from '@/components/ui/button';
import { Advent, fromLiteral, toLiteral } from '@/lib/advent';
import { fetchAdventData } from '@/lib/advent/loader';
import { Task } from '@/lib/advent/task';
import { Metadata } from 'next';
import Link from 'next/link';
import { decrypt } from 'solution-zone';

type SearchParams = Record<string, string | string[] | undefined>;

export interface Props {
    params: Promise<Params>;
    searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { advent } = await params;
    const sunday = fromLiteral(advent)!;

    return {
        title: `Lösung zum ${sunday}. Advent`,
    };
}

export async function generateStaticParams() {
    const [, tasks] = await fetchAdventData();

    return tasks.sundays.map((sunday) => ({
        advent: toLiteral(sunday),
    }));
}

async function decryptSolution(
    params: Promise<Params>,
    searchParams: Promise<SearchParams>,
): Promise<[advent: Advent, task: Task, content: string | null]> {
    const [advent, task] = await extractTask(params);
    const { key } = await searchParams;

    let content: string | null = task.solution;

    if (!task.manifest.is_solution_public) {
        if (typeof key !== 'string') {
            content = null;
        } else {
            try {
                content = await decrypt(key as string, task.solution);
            } catch {
                content = null;
            }
        }
    }

    return [advent, task, content];
}

export default async function TaskSolution({ params, searchParams }: Props) {
    const [advent, task, content] = await decryptSolution(params, searchParams);

    return content ? (
        <Page titleTemplate="Lösung für „%s“" task={task} content={content}>
            <Link
                className={`w-full ${buttonVariants({ variant: 'secondary' })}`}
                href={`/advent/${advent}`}
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
                <SolutionNote advent={advent} decrypted={false} />

                <Link
                    className={buttonVariants({ variant: 'outline' })}
                    href={`/advent/${advent}`}
                >
                    Zurück zur Aufgabenstellung
                </Link>
            </div>
        </ErrorPage>
    );
}
