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
import { fetchFaqCategories } from '@/lib/faq/loader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ',
};

export default async function Faq() {
    const categories = await fetchFaqCategories();

    return (
        <section className="container flex flex-col gap-7">
            <h1 className="text-2xl font-bold">Häufig gestellte Fragen</h1>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {categories.map(
                    ({ title, description, entries }, categoryIndex) => (
                        <section key={categoryIndex}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">
                                        {title}
                                    </CardTitle>
                                    <CardDescription>
                                        {description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="multiple">
                                        {entries.map(
                                            (
                                                { question, answer },
                                                entryIndex,
                                            ) => (
                                                <AccordionItem
                                                    key={entryIndex}
                                                    value={`item-${entryIndex}`}
                                                >
                                                    <AccordionTrigger className="text-xl">
                                                        {question}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div
                                                            className="prose dark:prose-invert"
                                                            dangerouslySetInnerHTML={{
                                                                __html: answer,
                                                            }}
                                                        />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ),
                                        )}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </section>
                    ),
                )}
            </div>
        </section>
    );
}
