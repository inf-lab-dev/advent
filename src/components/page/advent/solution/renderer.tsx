'use client';

import ErrorPage from '@/components/layout/error';
import { buttonVariants } from '@/components/ui/button';
import { resolveMarkdownContent, Task } from '@/lib/advent';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
    notFound,
    ReadonlyURLSearchParams,
    useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import Page from '../page';
import SolutionNote from '../solution-note';
import TokenGenerator from '../token-generator';

export interface Props {
    task: Task;
    publicKey: string;
}

export interface DecryptedSolution {
    key: string | null;
    task: Task;
    content: string | null;
}

async function decryptSolution(
    task: Task,
    searchParams: ReadonlyURLSearchParams,
): Promise<DecryptedSolution> {
    const key = searchParams.get('key') ?? undefined;

    if (task.files.solution === null) {
        notFound();
    }

    const content = await resolveMarkdownContent(task.files.solution, key);

    return { key: key ?? null, content, task };
}

function WrongPassword({ task }: { task: Task }) {
    return (
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

function Loader() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-2xl text-primary">
            <div className="items-middle flex items-center gap-2">
                <Loader2 className="h-12 w-12 animate-spin" />
                <span>Lösung entschlüsseln...</span>
            </div>
        </div>
    );
}

export default function Renderer({ task, publicKey }: Props) {
    const searchParams = useSearchParams();
    const [decryptedSolution, setDecryptedSolution] =
        useState<DecryptedSolution | null>(null);

    useEffect(
        () =>
            void decryptSolution(task, searchParams).then(setDecryptedSolution),
        [task, searchParams],
    );

    return decryptedSolution ? (
        decryptedSolution.content ? (
            <Page
                content={decryptedSolution.content}
                task={decryptedSolution.task}
                titleTemplate="Lösung für „%s“"
            >
                <div className="flex flex-col gap-2">
                    {decryptedSolution.task.manifest.supports_hand_in && (
                        <TokenGenerator
                            password={decryptedSolution.key ?? 'NOT_SPECIFIED'}
                            publicKey={publicKey}
                            task={decryptedSolution.task.slug}
                        />
                    )}

                    <Link
                        className={`w-full ${buttonVariants({ variant: 'secondary' })}`}
                        href={`/advent/${decryptedSolution.task.slug}`}
                    >
                        Zurück zur Aufgabenstellung
                    </Link>
                </div>
            </Page>
        ) : (
            <WrongPassword task={decryptedSolution.task} />
        )
    ) : (
        <Loader />
    );
}
