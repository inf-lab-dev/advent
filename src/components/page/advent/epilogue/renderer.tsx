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
import EpilogueNote from '../epilogue-note';
import Page from '../page';
import TokenGenerator from '../token-generator';

export interface Props {
    task: Task;
    publicKey: string;
}

export interface DecryptedEpilogue {
    key: string | null;
    task: Task;
    content: string | null;
}

async function decryptEpilogue(
    task: Task,
    searchParams: ReadonlyURLSearchParams,
): Promise<DecryptedEpilogue> {
    const key = searchParams.get('key') ?? undefined;

    if (task.files.epilogue === null) {
        notFound();
    }

    const content = await resolveMarkdownContent(task.files.epilogue, key);

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
                <EpilogueNote decrypted={false} slug={task.slug} />

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
                <span>Epilog entschlüsseln...</span>
            </div>
        </div>
    );
}

export default function Renderer({ task, publicKey }: Props) {
    const searchParams = useSearchParams();
    const [decryptedEpilogue, setDecryptedEpilogue] =
        useState<DecryptedEpilogue | null>(null);

    useEffect(
        () =>
            void decryptEpilogue(task, searchParams).then(setDecryptedEpilogue),
        [task, searchParams],
    );

    return decryptedEpilogue ? (
        decryptedEpilogue.content ? (
            <Page
                content={decryptedEpilogue.content}
                task={decryptedEpilogue.task}
                titleTemplate="Epilog für „%s“"
            >
                <div className="flex flex-col gap-2">
                    {decryptedEpilogue.task.manifest.supports_hand_in && (
                        <TokenGenerator
                            password={decryptedEpilogue.key ?? 'NOT_SPECIFIED'}
                            publicKey={publicKey}
                            task={decryptedEpilogue.task.slug}
                        />
                    )}

                    <Link
                        className={`w-full ${buttonVariants({ variant: 'secondary' })}`}
                        href={`/advent/${decryptedEpilogue.task.slug}`}
                    >
                        Zurück zur Aufgabenstellung
                    </Link>
                </div>
            </Page>
        ) : (
            <WrongPassword task={decryptedEpilogue.task} />
        )
    ) : (
        <Loader />
    );
}
