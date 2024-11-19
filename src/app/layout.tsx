import Content from '@/components/layout/page/content';
import Footer from '@/components/layout/page/footer';
import { Navbar } from '@/components/layout/page/header/navbar';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { fetchAdventData } from '@/lib/advent/loader';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: {
        default: 'Inf-Labs im Advent',
        template: '%s | Inf-Labs im Advent',
    },
    description: 'TODO: something smart lol',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [, tasks] = await fetchAdventData();

    return (
        <html lang="de" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Navbar sundays={tasks.sundays} />
                    <Content>{children}</Content>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
