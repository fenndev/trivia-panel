import { Question } from "./question";

interface Category {
    categoryID: string;
    displayName: string;
    pointTotal: number;
    questions: Question[];
};

export { Category };