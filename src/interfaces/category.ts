import type { Question } from "./question";

interface Category {
    displayName: string;
    pointTotal: number;
    questions: Question[];
};

export type { Category };