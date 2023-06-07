import Category from '../../shared/classes/Category';
import CategoryData from '../../shared/interfaces/CategoryData';
import createID from '../functions/createID';

export default class CategoryManager {
    private _categories: Category[];

    constructor(categories: CategoryData[]) {
        this._categories = categories.map((category) => {
            return this.parseToCategory(category);
        });
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    set categories(newCategories: CategoryData[]) {
        this._categories = newCategories.map((category) => {
            return this.parseToCategory(category);
        });
    }

    public addCategory(data: CategoryData): void {
        const category = this.parseToCategory(data);
        this.categories.push(category);
    }

    public parseToCategory(data: CategoryData): Category {
        return new Category(data.name, data.id, data.songs);
    }

    public updateCategory(category: Category): void {
        const index = this._categories.findIndex((categoryToUpdate) => {
            return categoryToUpdate.id === category.id;
        });
        if (index === -1) throw new Error('Category not found');
        this._categories[index] = category;
    }

    public deleteCategory(category: Category): void {
        const index = this._categories.findIndex((categoryToDelete) => {
            return categoryToDelete.id === category.id;
        });
        if (index === -1) throw new Error('Category not found');
    }
}
