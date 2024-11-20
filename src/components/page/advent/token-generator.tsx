'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { encryptToken } from '@/lib/advent/token/encryption';
import { useState } from 'react';

export interface Props {
    password: string;
    task: string;
    publicKey: string;
}

function createToken(task: string, password: string) {
    return {
        task,
        at: Date.now(),
        id: crypto.randomUUID(),
        password,
    };
}

export default function TokenGenerator({ password, task, publicKey }: Props) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);

    const generateToken = () => {
        const token = createToken(task, password);

        setLoading(true);

        encryptToken(token, publicKey).then((encryptedToken) => {
            setToken(encryptedToken);
            setLoading(false);
        });
    };

    const copyToClipboard = () => {
        if (!token) {
            throw new TypeError('Cannot copy "NULL" token to clipboard.');
        }

        setLoading(true);
        navigator.clipboard.writeText(token).then(() => setLoading(false));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Token erstellen</CardTitle>
                <CardDescription>
                    Um zu bestätigen, dass du die Aufgabe gelöst hast, kannst du
                    dir hier einen Token erstellen welchen du deinem Tutor per
                    E-Mail senden kannst.
                </CardDescription>

                <CardContent>
                    {token ? (
                        <>
                            <Textarea value={token} readOnly />
                            <Button
                                disabled={isLoading}
                                variant="default"
                                onClick={copyToClipboard}
                            >
                                In die Zwischenablage kopieren
                            </Button>
                        </>
                    ) : (
                        <Button
                            disabled={isLoading}
                            variant="outline"
                            onClick={generateToken}
                        >
                            Neuen Token erstellen
                        </Button>
                    )}
                </CardContent>

                <CardFooter>TODO: some sort of disclaimer...</CardFooter>
            </CardHeader>
        </Card>
    );
}
