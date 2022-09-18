import { Question, Category } from '../classes/export';
import { v4 as uuidv4 } from 'uuid';

// Category Manager Class

class CategoryManager {
    public categories: Category[];

    constructor(categories: Category[] = []) {
        this.categories = categories;
    }

    createCategory(displayName: string, categoryID: string, questionArray: Question[]) {
        this.categories.push(new Category(displayName, categoryID, questionArray));
    };

    deleteCategory(category: Category) {
        this.categories.splice(this.categories.indexOf(category), 1);
    };
}

export { CategoryManager };