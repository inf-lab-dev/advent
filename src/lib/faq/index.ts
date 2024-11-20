/**
 * A category of the faq.
 */
export interface FaqCategory {
    /**
     * The name of the category.
     */
    title: string;

    /**
     * The description of the category, does **not support** markdown.
     */
    description: string;

    /**
     * The entries.
     */
    entries: FaqEntry[];
}

/**
 * An entry of the faq.
 */
export interface FaqEntry {
    /**
     * The question.
     */
    question: string;

    /**
     * The answer, supports markdown.
     */
    answer: string;
}
