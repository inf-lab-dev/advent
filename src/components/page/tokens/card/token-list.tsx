import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ImportedToken } from '../cards';

const DATE_FORMAT = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short',
});

export interface Props {
    tokens: ImportedToken[];
}

export default function TokenList({ tokens }: Props) {
    'use client';

    const [successfulyCopied, setSuccessfullyCopied] = useState<boolean | null>(
        null,
    );

    const sortedTokens = useMemo(
        () => tokens.toSorted((a, b) => a.token.at - b.token.at),
        [tokens],
    );

    const copyTable = () => {
        const tsvData = sortedTokens
            .map(
                ({
                    token: { task, at, id, password },
                    rawToken,
                    email,
                    comment,
                }) =>
                    `${email}\t${task}\t${DATE_FORMAT.format(at)}\t${id}\t${rawToken}\t${password}\t${comment}`,
            )
            .join('\n');

        navigator.clipboard
            .writeText(tsvData)
            .then(() => setSuccessfullyCopied(true))
            .catch(() => setSuccessfullyCopied(false));
    };

    return (
        <Card>
            <CardHeader className="flex flex-col gap-3 md:flex-row">
                <div>
                    <CardTitle>Importierte Tokens</CardTitle>
                    <CardDescription>
                        Hier findest du, nach ihrem Datum sortiert, die
                        importierten Tokens.
                    </CardDescription>
                </div>
                <div className="flex flex-grow">
                    <Button
                        className="ml-auto w-full md:w-auto"
                        disabled={sortedTokens.length === 0}
                        variant={
                            successfulyCopied === false
                                ? 'destructive'
                                : 'default'
                        }
                        onClick={copyTable}
                    >
                        {successfulyCopied && <Check />}
                        Tabelle für Excel kopieren
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {sortedTokens.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>E-Mail</TableHead>
                                <TableHead>Aufgabe</TableHead>
                                <TableHead>Datum</TableHead>
                                <TableHead>Passwort</TableHead>
                                <TableHead>Kommentar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedTokens.map(
                                (
                                    {
                                        token: { task, at, password },
                                        email,
                                        comment,
                                    },
                                    index,
                                ) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <a
                                                className="hover:underline"
                                                href={`mailto:${email}`}
                                            >
                                                {email}
                                            </a>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Link
                                                className="hover:underline"
                                                href={`/advent/${task}`}
                                                target="_blank"
                                            >
                                                {task}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {DATE_FORMAT.format(at)} Uhr
                                        </TableCell>
                                        <TableCell>{password}</TableCell>
                                        <TableCell>
                                            {comment || <em>kein Kommentar</em>}
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                ) : (
                    <Alert>
                        <AlertDescription>
                            Es wurden noch keine Tokens importiert.
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
