import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { decryptToken } from '@/lib/advent/token/encryption';
import { Loader2 } from 'lucide-react';
import { FormEvent, useId, useMemo, useState } from 'react';
import { ImportedToken } from '../cards';

export interface Props {
    privateKey: string;
    onTokenImported: (token: ImportedToken) => void;
}

export default function ImportToken({ privateKey, onTokenImported }: Props) {
    'use client';

    const formId = useId();
    const emailId = useId();
    const tokenId = useId();
    const commentId = useId();

    const [isLoading, setLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [comment, setComment] = useState('');

    const isEmailInvalid = useMemo(
        () =>
            email.length === 0 ||
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            ),
        [email],
    );

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (token.length === 0 || isEmailInvalid) {
            return;
        }

        setLoading(true);
        decryptToken(token, privateKey)
            .then((tokenValue) => {
                if (!tokenValue.understood_relevance) {
                    throw new TypeError(
                        'Cannot use a token who did not confirm that the relevance of this material is known. The token was probably maliciously modified.',
                    );
                }

                setLoading(false);
                setFormError(null);

                setEmail('');
                setToken('');
                setComment('');

                onTokenImported({
                    token: tokenValue,
                    rawToken: token,
                    email,
                    comment,
                });
            })
            .catch((error) => {
                setLoading(false);
                setFormError(
                    `Der Token konnte nicht importiert werden: ${error}`,
                );
            });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Token importieren</CardTitle>
                <CardDescription>
                    Füge hier einen Token mit einem Kommentar zusammen ein um
                    ihn zu überprüfen.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    className="flex flex-col gap-3"
                    id={formId}
                    onSubmit={submitForm}
                >
                    {formError && (
                        <Alert variant="destructive">
                            <AlertDescription>{formError}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid w-full gap-1.5">
                        <Label
                            className={`${isEmailInvalid && 'text-destructive'}`}
                            htmlFor={emailId}
                        >
                            E-Mail des Einsenders
                        </Label>
                        <Input
                            id={emailId}
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value.trim())
                            }
                        />
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label
                            className={`${token.length === 0 && 'text-destructive'}`}
                            htmlFor={tokenId}
                        >
                            Token
                        </Label>
                        <Textarea
                            id={tokenId}
                            value={token}
                            onChange={(event) =>
                                setToken(event.target.value.trim())
                            }
                        />
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor={commentId}>Kommentar (optional)</Label>
                        <Textarea
                            id={comment}
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    disabled={token.length === 0 || isEmailInvalid || isLoading}
                    form={formId}
                    type="submit"
                >
                    {isLoading && <Loader2 className="animate-spin" />}
                    Importieren
                </Button>
            </CardFooter>
        </Card>
    );
}
