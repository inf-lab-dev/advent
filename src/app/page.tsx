import AdventWreath from '@/components/advent-wreath';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchAdventTasks } from '@/lib/advent/loader';
import { DoorOpen } from 'lucide-react';
import Link from 'next/link';

async function getHighestCandle() {
    const tasks = await fetchAdventTasks();

    return Array.from(tasks.values()).reduce(
        (previous, { manifest: { candles } }) =>
            candles > previous ? candles : previous,
        0,
    );
}

export default async function Home() {
    const candles = await getHighestCandle();

    return (
        <div>
            <section className="container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
                <div className="space-y-6 text-center lg:text-start">
                    <main className="text-5xl font-bold md:text-6xl">
                        <h1 className="inline">
                            <span className="inline bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                                Advent
                            </span>
                            <span>&nbsp;of&nbsp;</span>
                            <span className="inline whitespace-nowrap bg-gradient-to-r from-yellow-500 via-orange-500 to-red-700 bg-clip-text text-transparent">
                                Inf-Labs
                            </span>
                        </h1>
                    </main>

                    <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
                        Löse jeden Adventssonntag eine kleine Aufgabe um deine
                        Programmierfähigkeiten zu verbessern!
                    </p>

                    <div className="space-y-4 md:space-x-4 md:space-y-0">
                        <a
                            className={`w-full md:w-1/3 ${buttonVariants({
                                variant: 'default',
                            })}`}
                            href="#how-does-it-work"
                        >
                            Los gehts!
                        </a>

                        <Link
                            className={`w-full md:w-1/3 ${buttonVariants({
                                variant: 'outline',
                            })}`}
                            href="/faq"
                        >
                            Häufig gestellte Fragen
                        </Link>
                    </div>
                </div>

                <div className="relative z-10">
                    <AdventWreath candles={candles} />

                    {/* Shadow effect */}
                    <div className="absolute left-[25%] top-0 -z-[1] h-[120%] w-[50%] rotate-[35deg] border-r-[24px] bg-yellow-300 blur-[150px] will-change-transform motion-safe:animate-pulse"></div>
                </div>
            </section>

            <section className="container pt-24 sm:py-32">
                <h2 className="text-md mb-8 text-center font-bold text-primary lg:text-xl">
                    Hinweis
                </h2>

                <p className="text-center text-muted-foreground">
                    Wie sämtliches Material auf inf-lab.dev ist auch
                    dieses&nbsp;
                    <em>nicht direkt klausurrelevant</em>.<br />
                    Bearbeite immer zuerst das offizielle Material auf der
                    inf.zone Website!
                </p>
            </section>

            <section
                className="container py-24 text-center sm:py-32"
                id="how-does-it-work"
            >
                <h2 className="text-3xl font-bold md:text-4xl">
                    So&nbsp;
                    <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
                        funktioniert
                    </span>
                    &nbsp;es Schritt für Schritt
                </h2>
                <p className="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
                    Um viel Spaß bei der Bearbeitung der Aufgaben zu haben,
                    empfehlen wir dir die folgenden Schritte zu bearbeiten.
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-4">
                                <DoorOpen />
                                Lorem
                            </CardTitle>
                        </CardHeader>
                        <CardContent>Ipsum</CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-4">
                                <DoorOpen />
                                Lorem
                            </CardTitle>
                        </CardHeader>
                        <CardContent>Ipsum</CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-4">
                                <DoorOpen />
                                Lorem
                            </CardTitle>
                        </CardHeader>
                        <CardContent>Ipsum</CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-4">
                                <DoorOpen />
                                Lorem
                            </CardTitle>
                        </CardHeader>
                        <CardContent>Ipsum</CardContent>
                    </Card>
                </div>
            </section>

            <div>
                TODO: Somewhere on the page drop credit for the wreath images:
                <p>
                    Image by&nbsp;
                    <a
                        className="text-blue-800 hover:underline"
                        href="https://pixabay.com/users/openclipart-vectors-30363"
                    >
                        OpenClipart-Vectors
                    </a>
                    &nbsp;from&nbsp;
                    <a
                        className="text-blue-800 hover:underline"
                        href="https://pixabay.com/"
                    >
                        Pixabay
                    </a>
                </p>
            </div>
        </div>
    );
}
