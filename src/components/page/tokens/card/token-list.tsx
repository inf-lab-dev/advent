import { Alert, AlertDescription } from '@/components/ui/alert';
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
import Link from 'next/link';
import { useMemo } from 'react';
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

    const sortedTokens = useMemo(
        () => tokens.toSorted((a, b) => a.token.at - b.token.at),
        [tokens],
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Importierte Tokens</CardTitle>
                <CardDescription>
                    Hier findest du, nach ihrem Datum sortiert, die importierten
                    Tokens.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {sortedTokens.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Aufgabe</TableHead>
                                <TableHead>Datum</TableHead>
                                <TableHead>UUID</TableHead>
                                <TableHead>Passwort</TableHead>
                                <TableHead>Kommentar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedTokens.map(
                                (
                                    {
                                        token: { task, at, id, password },
                                        comment,
                                    },
                                    index,
                                ) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            <Link href={`/advent/${task}`}>
                                                {task}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {DATE_FORMAT.format(at)} Uhr
                                        </TableCell>
                                        <TableCell>
                                            <code className="select-all">
                                                {id}
                                            </code>
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
