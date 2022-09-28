import { Question } from "./question";

// Category Class

// class Category {
//     public categoryID: string;
//     public displayName: string;
//     public pointTotal: number = 0;
//     public questionArray: Question[];

//     constructor(displayName: string, categoryID: string, questionArray: Question[]) {
//         this.displayName = displayName;
//         this.categoryID = categoryID;
//         this.questionArray = questionArray;
//         this.calculatePointTotal();
//     }

//     calculatePointTotal() {
//         this.pointTotal = 0;
//         this.questionArray.forEach(question => {
//             this.pointTotal += question.pointValue;
//         });
//     }

//     addQuestion(question: Question) {
//         this.questionArray.push(question);
//         this.calculatePointTotal();
//     }

//     deleteQuestion(questionID: string) {
//         this.questionArray = this.questionArray.splice(this.retreiveQuestionIndex(questionID), 1);
//         this.calculatePointTotal();
//     }

//     editQuestion(questionID: string, question: Question) {
//         this.questionArray[this.retreiveQuestionIndex(questionID)] = question;
//         this.calculatePointTotal();
//     }
    
//     retreiveQuestion(questionID: string) {
//         return this.questionArray.find(question => question.questionID === questionID);
//     }

//     retreiveQuestionIndex(questionID: string) {
//         return this.questionArray.findIndex(question => question.questionID === questionID);
//     }
// }

interface Category {
    categoryID: string;
    displayName: string;
    pointTotal: number;
    questions: Question[];
};

export { Category };