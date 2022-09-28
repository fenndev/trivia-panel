import type { Question } from "./question";

interface Category {
    categoryID: string;
    displayName: string;
    pointTotal: number;
    questions: Question[];
};

export type { Category };