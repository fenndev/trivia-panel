import Category from '../../shared/classes/Category';
import CategoryData from '../../shared/interfaces/CategoryData';
import SongData from '../../shared/interfaces/SongData';

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

    public setCategories(categories: CategoryData[]): void {
        this._categories = categories.map((category) => {
            return this.parseToCategory(category);
        });
    }

    public createCategory(data: CategoryData): Category {
        return this.addCategory(data);
    }

    public addCategory(data: CategoryData): Category {
        const category = this.parseToCategory(data);
        this._categories.push(category);
        return category;
    }

    public parseToCategory(data: CategoryData): Category {
        return new Category(data.name, data.id, data.songs);
    }

    public updateCategory(categoryToUpdate: Category): void {
        console.log(this._categories);
        const index = this._categories.findIndex((category) => category.id == categoryToUpdate.id);
        console.log(index);
        if (index != -1) {
            this._categories[index] = categoryToUpdate;
        } else return;
    }

    public deleteCategory(category: Category): void {
        const index = this._categories.findIndex((categoryToDelete) => {
            return categoryToDelete.id === category.id;
        });
        if (index === -1) throw new Error('Category not found');
    }
}
