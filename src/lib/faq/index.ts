export interface FaqCategory {
    title: string;
    description: string;
    entries: FaqEntry[];
}

export interface FaqEntry {
    question: string;
    answer: string;
}
