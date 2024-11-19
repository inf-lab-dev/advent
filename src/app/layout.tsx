import Content from '@/components/layout/page/content';
import Footer from '@/components/layout/page/footer';
import { Navbar } from '@/components/layout/page/header/navbar';
import { ThemeProvider } from '@/components/layout/theme-provider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Inf-Labs im Advent',
    description: 'TODO: something smart lol',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Navbar />
                    <Content>{children}</Content>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
