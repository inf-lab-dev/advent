import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ',
};

export default function Faq() {
    return (
        <section className="container flex flex-col gap-7">
            <h1 className="text-2xl font-bold">Häufig gestellte Fragen</h1>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Allgemeines</CardTitle>
                        <CardDescription>
                            Allgemeine Fragen wie Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Maiores, voluptates
                            corporis. Fugit, quam ex enim vel, inventore
                            suscipit unde odio, laborum in maxime distinctio
                            accusamus est eius repellendus excepturi non?
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design
                                    pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design
                                    pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design
                                    pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Allgemeines</CardTitle>
                        <CardDescription>
                            Allgemeine Fragen wie Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Maiores, voluptates
                            corporis. Fugit, quam ex enim vel, inventore
                            suscipit unde odio, laborum in maxime distinctio
                            accusamus est eius repellendus excepturi non?
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design
                                    pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design
                                    pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design
                                    pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
