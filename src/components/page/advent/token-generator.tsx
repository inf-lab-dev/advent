'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Token } from '@/lib/advent/token';
import { encryptToken } from '@/lib/advent/token/encryption';
import { Check, Loader2, TriangleAlert } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

export interface Props {
    password: string;
    task: string;
    publicKey: string;
}

function createToken(
    task: string,
    password: string,
    understoodRelevance: boolean,
): Token {
    if (!understoodRelevance) {
        throw new TypeError(
            'Cannot create a token if the user did not understand the relevance of the labs.',
        );
    }

    return {
        task,
        at: Date.now(),
        id: crypto.randomUUID(),
        password,
        understood_relevance: understoodRelevance,
    };
}

function UnderstoodRelevanceCheckbox({
    understood,
    onUnderstoodChanged,
}: {
    understood: boolean;
    onUnderstoodChanged: (newUnderstood: boolean) => void;
}) {
    const id = useId();

    return (
        <div className="items-top flex space-x-2">
            <Checkbox
                checked={understood}
                id={id}
                onCheckedChange={onUnderstoodChanged}
            />
            <div className="grid gap-1.5 leading-none">
                <label
                    className={`${!understood ? 'text-red-700' : ''} text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                    htmlFor={id}
                >
                    Ich habe verstanden, dass die Inf-Labs kein offizieller
                    Bestandteil der Inf-Einf-B Veranstaltung sind.
                </label>
                {!understood && (
                    <p className="text-sm leading-[1rem] text-muted-foreground">
                        Ich bestätige, dass ich verstanden habe, dass die
                        Inf-Labs kein offizieller Bestandteil der Veranstaltung
                        Inf-Einf-B sind. Außerdem erkläre ich, dass mir bewusst
                        ist, dass die Übungen auf <em>inf.zone</em> Vorrang
                        haben und dass ich am Advent of Inf-Labs nur teilnehme,
                        um mein Wissen durch&nbsp;
                        <strong>zusätzliche Übungen</strong> zu vertiefen.
                    </p>
                )}
            </div>
        </div>
    );
}

function TokenField({
    password,
    task,
    publicKey,
    understoodRelevance,
}: Props & { understoodRelevance: boolean }) {
    const [token, setToken] = useState<string | null>(null);
    const [successfulyCopied, setSuccessfullyCopied] = useState<boolean | null>(
        null,
    );

    useEffect(() => {
        const token = createToken(task, password, understoodRelevance);

        encryptToken(token, publicKey).then(setToken);
    }, [password, task, publicKey, understoodRelevance]);

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
                        Token in die Zwischenablage kopieren
                    </Button>
                </>
            ) : (
                <Loader2 className="animate-spin" />
            )}
        </div>
    );
}

export default function TokenGenerator(props: Props) {
    const [understoodRelevance, setUnderstoodRelevance] = useState(false);

    return (
        <Dialog>
            <DialogTrigger
                className={`w-full ${buttonVariants({ variant: 'default' })}`}
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

                <UnderstoodRelevanceCheckbox
                    understood={understoodRelevance}
                    onUnderstoodChanged={setUnderstoodRelevance}
                />

                {understoodRelevance && (
                    <>
                        <Separator />
                        <TokenField
                            {...props}
                            understoodRelevance={understoodRelevance}
                        />

                        <DialogFooter>
                            <p>
                                <strong>Hinweis zum Datenschutz:</strong> Der
                                generierte Token enthält deine obige
                                Bestätigung, die aktuelle Uhrzeit, die Aufgabe
                                sowie das eingegebene Passwort. Er lässt
                                allerdings keine Rückschlüsse auf dich als
                                Person zu. Dennoch solltest du ihn nur mit
                                deinem Tutor per E-Mail teilen.
                            </p>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
