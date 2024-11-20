'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Advent } from '@/lib/advent';
import { CheckCircle, Lock } from 'lucide-react';
import Form from 'next/form';
import Link from 'next/link';
import { useState } from 'react';

export interface Props {
    advent: Advent;
    decrypted: boolean;
}

function Decrypted({ advent }: Props) {
    return (
        <>
            <p>Die Lösungen für diese Aufgabe wurden bereits veröffentlicht.</p>
            <Link
                className={buttonVariants({
                    variant: 'ghost',
                })}
                href={`/advent/${advent}/solution`}
            >
                Lösung anzeigen
            </Link>
        </>
    );
}

function Encrypted({ advent }: Props) {
    const [touched, setTouched] = useState(false);
    const [password, setPassword] = useState('');

    const isInvalid = password.trim().length === 0;

    return (
        <>
            <p>
                Um die Lösung für diese Aufgabe anzuzeigen, musst du zuerst die
                Aufgabe lösen und dann das in der Aufgabenstellung beschriebene
                Passwort unten eingeben.
            </p>
            <Form
                className="flex w-full flex-col items-center gap-3 md:flex-row"
                action={`/advent/${advent}/solution`}
            >
                <Input
                    className={`w-full flex-grow ${isInvalid && touched ? 'border-red-500 focus-visible:ring-red-800' : ''}`}
                    name="key"
                    type="text"
                    placeholder="Passwort"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onFocus={() => setTouched(true)}
                />
                <Button
                    className="w-full md:w-min"
                    variant="secondary"
                    type="submit"
                    disabled={isInvalid}
                >
                    Lösung anzeigen
                </Button>
            </Form>
        </>
    );
}

export default function SolutionNote({ advent, decrypted }: Props) {
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
                        <Decrypted advent={advent} decrypted={decrypted} />
                    ) : (
                        <Encrypted advent={advent} decrypted={decrypted} />
                    )}
                </div>
            </AlertDescription>
        </Alert>
    );
}
