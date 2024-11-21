'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { encryptToken } from '@/lib/advent/token/encryption';
import { Check, Loader2, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

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

function TokenField({ password, task, publicKey }: Props) {
    const [token, setToken] = useState<string | null>(null);
    const [successfulyCopied, setSuccessfullyCopied] = useState<boolean | null>(
        null,
    );

    useEffect(() => {
        const token = createToken(task, password);

        encryptToken(token, publicKey).then(setToken);
    }, [password, task, publicKey]);

    const copyToClipboard = () => {
        if (!token) {
            throw new TypeError('Cannot copy "NULL" token to clipboard.');
        }

        try {
            navigator.clipboard.writeText(token);

            setSuccessfullyCopied(true);
        } catch (error) {
            if (error instanceof DOMException) {
                setSuccessfullyCopied(false);

                alert(
                    'FEHLER: Der Token konnte nicht automatisch kopiert werden. Bitte markierte und kopiere ihn manuell.',
                );
            }
        }
    };

    return (
        <div className="flex min-h-24 flex-col items-center justify-center gap-5">
            {token ? (
                <>
                    <Textarea
                        className="select-all"
                        value={token}
                        readOnly
                        onClick={(event) =>
                            (event.target as HTMLTextAreaElement).select()
                        }
                    />
                    <Button
                        className="w-full"
                        variant={
                            successfulyCopied === false
                                ? 'destructive'
                                : 'default'
                        }
                        onClick={copyToClipboard}
                    >
                        {successfulyCopied === true && <Check />}
                        {successfulyCopied === false && <TriangleAlert />}
                        In die Zwischenablage kopieren
                    </Button>
                </>
            ) : (
                <Loader2 className="animate-spin" />
            )}
        </div>
    );
}

export default function TokenGenerator(props: Props) {
    return (
        <Dialog>
            <DialogTrigger
                className={`w-full ${buttonVariants({ variant: 'destructive' })}`}
            >
                Token erstellen
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Token erstellen</DialogTitle>
                    <DialogDescription>
                        Um zu bestätigen, dass du die Aufgabe gelöst hast,
                        kannst du dir hier einen Token erstellen welchen du
                        deinem Tutor per E-Mail senden kannst.
                    </DialogDescription>
                </DialogHeader>

                <TokenField {...props} />

                <DialogFooter>
                    <p>
                        <strong>Hinweis zum Datenschutz:</strong> Der generierte
                        Token enthält die aktuelle Uhrzeit, die Aufgabe sowie
                        das eingegebene Passwort. Er lässt allerdings keine
                        Rückschlüsse auf dich als Person zu. Dennoch solltest du
                        ihn nur mit deinem Tutor teilen.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
