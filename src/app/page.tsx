import AdventWreath from '@/components/advent-wreath';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchAdventTasks, getHighestCandle } from '@/lib/advent/loader';
import { Award, KeyRound, LockOpen, PartyPopper } from 'lucide-react';
import Link from 'next/link';

function AdventOverBanner() {
    return (
        <Card className="w-full lg:w-3/4">
            <CardHeader>
                <CardTitle className="flex items-center gap-4 text-xl">
                    <PartyPopper className="h-8 w-8 stroke-rose-500" />
                    <span className="bg-linear-to-r from-rose-500 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                        Vielen Dank für eure Teilnahme!
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
                <p>
                    Das inf-lab.dev Team bedankt dich herzlich für eure
                    Teilnahme. Wir wünschen euch ein frohes Weihnachtsfest und
                    einen guten Rutsch in das nächste Jahr!
                </p>
                <p>
                    Wir werden dann Anfang nächsten Jahres die Gewinner per
                    E-Mail kontaktieren.
                </p>
            </CardContent>
        </Card>
    );
}

export default async function Home() {
    const candles = await getHighestCandle();
    const tasks = await fetchAdventTasks();

    const showAdventOverBanner = Array.from(tasks.values()).every(
        ({ manifest: { supports_hand_in, is_epilogue_public } }) =>
            !supports_hand_in && is_epilogue_public,
    );

    return (
        <div>
            <section className="container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
                <div className="overflow-hodden space-y-6 text-center lg:text-start">
                    <main className="text-5xl font-bold md:text-6xl">
                        <h1 className="inline break-all">
                            <span className="from-primary inline bg-linear-to-r to-red-500 bg-clip-text text-transparent">
                                Advent
                            </span>
                            <span>&nbsp;of&nbsp;</span>
                            <span className="inline bg-linear-to-r from-yellow-500 via-orange-500 to-red-700 bg-clip-text whitespace-nowrap text-transparent">
                                Inf-Labs
                            </span>
                        </h1>
                    </main>

                    <p className="text-muted-foreground mx-auto text-xl md:w-10/12 lg:mx-0">
                        Löse jeden Adventssonntag eine kleine Aufgabe um deine
                        Programmierfähigkeiten zu verbessern!
                    </p>

                    <div className="space-y-4 md:space-y-0 md:space-x-4">
                        <a
                            className={`w-full md:w-1/3 ${buttonVariants({
                                variant: 'default',
                            })}`}
                            href="#how-does-it-work"
                        >
                            Los gehts!
                        </a>

                        <Link
                            className={`text-foreground w-full md:w-1/3 ${buttonVariants({ variant: 'outline' })}`}
                            href="/faq"
                        >
                            Häufig gestellte Fragen
                        </Link>
                    </div>
                    {showAdventOverBanner && <AdventOverBanner />}
                </div>

                <div className="relative z-10">
                    <AdventWreath candles={candles} />

                    {/* Shadow effect */}
                    <div className="absolute top-0 left-[25%] -z-1 h-[120%] w-[50%] rotate-35 border-r-24 bg-yellow-300 blur-[150px] will-change-transform motion-safe:animate-pulse"></div>
                </div>
            </section>

            <section className="container pt-24 sm:py-32">
                <h2 className="text-md text-primary mb-8 text-center font-bold lg:text-xl">
                    Hinweis
                </h2>

                <p className="text-muted-foreground text-center">
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
                    <span className="from-primary/60 to-primary bg-linear-to-b bg-clip-text text-transparent">
                        funktioniert
                    </span>
                    &nbsp;es Schritt für Schritt
                </h2>
                <p className="text-muted-foreground mx-auto mt-4 mb-8 text-xl md:w-3/4">
                    Um Erfolgreich am Advent of Inf-Labs teilzunehmen, solltest
                    du jeden Adventssonntag eine Aufgabe lösen. Mehr Infos dazu
                    kannst du im&nbsp;
                    <Link className="font-bold underline" href="/faq">
                        FAQ
                    </Link>
                    &nbsp;nachlesen. Folge am besten den folgenden Schritte:
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-4">
                                <LockOpen />
                                Schritt 1
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            Aufgabe lösen und Lösungswort eingeben
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-4">
                                <KeyRound />
                                Schritt 2
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            Token generieren und an den Tutor senden
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-4">
                                <Award />
                                Schritt 3
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            Wir tragen euch in ein Leaderboard ein
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
