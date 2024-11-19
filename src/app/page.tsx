import AdventWreath from '@/components/advent-wreath';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchAdventData } from '@/lib/advent/loader';
import { DoorOpen } from 'lucide-react';

export default async function Home() {
    const [advent] = await fetchAdventData();

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
                                Inf-Einf
                            </span>
                        </h1>
                    </main>

                    <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
                        Löse jeden Adventssonntag eine kleine Aufgabe um deine
                        Programmierfähigkeiten zu verbessern!
                    </p>

                    <div className="space-y-4 md:space-x-4 md:space-y-0">
                        <a
                            href="#how-does-it-work"
                            className={`w-full md:w-1/3 ${buttonVariants({
                                variant: 'default',
                            })}`}
                        >
                            Los gehts!
                        </a>

                        <Button className="w-full md:w-1/3" variant="outline">
                            TODO: THIS
                        </Button>
                    </div>
                </div>

                <div className="relative z-10">
                    <AdventWreath advent={advent} />

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
                id="how-does-it-work"
                className="container py-24 text-center sm:py-32"
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
                        href="https://pixabay.com/users/openclipart-vectors-30363"
                        className="text-blue-800 hover:underline"
                    >
                        OpenClipart-Vectors
                    </a>
                    &nbsp;from&nbsp;
                    <a
                        href="https://pixabay.com/"
                        className="text-blue-800 hover:underline"
                    >
                        Pixabay
                    </a>
                </p>
            </div>
        </div>
    );
}
