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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { decryptToken } from '@/lib/advent/token/encryption';
import { Loader2 } from 'lucide-react';
import { useId, useState } from 'react';
import { ImportedToken } from '../cards';

export interface Props {
    privateKey: string;
    onTokenImported: (token: ImportedToken) => void;
}

export default function ImportToken({ privateKey, onTokenImported }: Props) {
    'use client';

    const tokenId = useId();
    const commentId = useId();

    const [isLoading, setLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const [token, setToken] = useState('');
    const [comment, setComment] = useState('');

    const submitForm = () => {
        if (token.length === 0) {
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

                setToken('');
                setComment('');

                onTokenImported({
                    token: tokenValue,
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
                <div className="flex flex-col gap-3">
                    {formError && (
                        <Alert variant="destructive">
                            <AlertDescription>{formError}</AlertDescription>
                        </Alert>
                    )}
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
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    disabled={token.length === 0 || isLoading}
                    onClick={submitForm}
                >
                    {isLoading && <Loader2 className="animate-spin" />}
                    Importieren
                </Button>
            </CardFooter>
        </Card>
    );
}
