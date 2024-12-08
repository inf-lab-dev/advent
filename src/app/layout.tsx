import { getImage as getWreathImage } from '@/components/advent-wreath';
import Content from '@/components/layout/page/content';
import Footer from '@/components/layout/page/footer';
import { Navbar } from '@/components/layout/page/header/navbar';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { fetchAdventTasks, getHighestCandle } from '@/lib/advent/loader';
import type { Metadata } from 'next';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
    const candles = await getHighestCandle();
    const { src: icon } = getWreathImage(candles);

    return {
        title: {
            default: 'Inf-Labs im Advent',
            template: '%s | Inf-Labs im Advent',
        },
        description:
            'Löse jeden Adventssonntag eine kleine Aufgabe um deine Programmierfähigkeiten zu verbessern!',
        icons: {
            icon,
            apple: icon,
        },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const tasks = await fetchAdventTasks();

    return (
        <html lang="de" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Navbar tasks={tasks} />
                    <Content>{children}</Content>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
