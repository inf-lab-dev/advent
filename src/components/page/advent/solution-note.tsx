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
            <p>Die Lösungen für diese Aufgabe wurden bereits veröffentlicht.</p>
            <Link
                className={buttonVariants({
                    variant: 'outline',
                })}
                href={`/advent/${slug}/solution`}
            >
                Lösung anzeigen
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
                Um die Lösung für diese Aufgabe anzuzeigen, musst du sie zuerst
                lösen und dann das in der Aufgabenstellung beschriebene Passwort
                hier eingeben.
            </p>
            <Form
                action={`/advent/${slug}/solution`}
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
                    Lösung anzeigen
                </Button>
            </Form>
        </>
    );
}

export default function SolutionNote({ slug, decrypted }: Props) {
    return (
        <Alert>
            {decrypted ? (
                <CheckCircle className="h-4 w-4" />
            ) : (
                <Lock className="h-4 w-4" />
            )}
            <AlertTitle>
                Lösungen {decrypted ? 'veröffentlicht' : 'entsperren'}
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
