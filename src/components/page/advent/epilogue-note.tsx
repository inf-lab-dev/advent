'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Lock } from 'lucide-react';
import Form from 'next/form';
import Link from 'next/link';
import { useState } from 'react';

export interface Props {
    slug: string;
    decrypted: boolean;
}

function Decrypted({ slug }: Props) {
    return (
        <>
            <p>Der Epilog für diese Aufgabe wurde bereits veröffentlicht.</p>
            <Link
                className={buttonVariants({
                    variant: 'outline',
                })}
                href={`/advent/${slug}/epilogue`}
            >
                Epilog anzeigen
            </Link>
        </>
    );
}

function Encrypted({ slug }: Props) {
    const [touched, setTouched] = useState(false);
    const [password, setPassword] = useState('');

    const isInvalid = password.trim().length === 0;

    const onSubmit = () => {
        setPassword('');
        setTouched(false);
    };

    return (
        <>
            <p>
                Um den Epilog für diese Aufgabe anzuzeigen, musst du sie zuerst
                lösen und dann das in der Aufgabenstellung beschriebene Passwort
                hier eingeben.
            </p>
            <Form
                action={`/advent/${slug}/epilogue`}
                className="flex w-full flex-col items-center gap-3 md:flex-row"
                onSubmit={onSubmit}
            >
                <Input
                    className={`w-full flex-grow ${isInvalid && touched ? 'border-red-500 focus-visible:ring-red-800' : ''}`}
                    name="key"
                    placeholder="Passwort"
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onFocus={() => setTouched(true)}
                />
                <Button
                    className="w-full md:w-min"
                    disabled={isInvalid}
                    type="submit"
                    variant="outline"
                >
                    Epilog anzeigen
                </Button>
            </Form>
        </>
    );
}

export default function EpilogueNote({ slug, decrypted }: Props) {
    return (
        <Alert>
            {decrypted ? (
                <CheckCircle className="h-4 w-4" />
            ) : (
                <Lock className="h-4 w-4" />
            )}
            <AlertTitle>
                Epilog {decrypted ? 'veröffentlicht' : 'entsperren'}
            </AlertTitle>
            <AlertDescription>
                <div className="flex flex-col gap-3">
                    {decrypted ? (
                        <Decrypted decrypted={decrypted} slug={slug} />
                    ) : (
                        <Encrypted decrypted={decrypted} slug={slug} />
                    )}
                </div>
            </AlertDescription>
        </Alert>
    );
}
