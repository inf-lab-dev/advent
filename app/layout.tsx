import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Advent of Inf-Einf',
    description: 'TODO: something smart lol',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
            <body>{children}</body>
        </html>
    );
}
