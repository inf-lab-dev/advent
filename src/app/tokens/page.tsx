import Cards from '@/components/page/tokens/cards';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Token-Validierung',
};

export default async function Tokens() {
    return (
        <section className="container flex flex-col gap-7">
            <h1 className="text-2xl font-bold">Token-Validierung</h1>

            <Alert>
                <AlertTitle>Hinweis</AlertTitle>
                <AlertDescription>
                    Diese Seite ist lediglich für die interne Überprüfung der
                    Tokens gedacht und ist ohne den korrekten privaten Schlüssel
                    Funktionslos. Solltest du versehentlich auf dieser Seite
                    gelandet sein, kommst du&nbsp;
                    <Link className="hover:underline" href="/">
                        hier zur Startseite
                    </Link>
                    .
                </AlertDescription>
            </Alert>

            <Cards />
        </section>
    );
}
