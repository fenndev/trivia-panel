import Category from '../../shared/interfaces/Category';
import type { Song } from '../../shared/interfaces/Song';
import createID from '../../shared/functions/createID';
import calculatePointsTotal from '../../shared/functions/calculatePointTotal';
import { LookupTable } from '../../shared/classes/LookupTable';

export default class CategoryManager {
    private _categoryTable: LookupTable<Category>;
    constructor() {
        this._categoryTable = new LookupTable<Category>();
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categoryTable.getAll();
    }

    public addCategory(category: Category): void {
        this._categoryTable.add(category.id, category);
    }

    public setCategories(categories: Category[]): void {
        categories.forEach((category) => this.addCategory(category));
    }

    public createCategory(name: string, songs: Song[] = [], id?: string): void {
        const newCategory: Category = {
            name,
            id: id ? id : createID(name),
            pointTotal: calculatePointsTotal(songs),
            songs,
        };
        this.addCategory(newCategory);
    }

    public updateCategory(newCategory: Category): void {
        if (!this.categoryExists(newCategory.id)) {
            this.createCategory(newCategory.name, newCategory.songs, newCategory.id);
        } else this._categoryTable.add(newCategory.id, newCategory);
    }

    public deleteCategory(categoryID: string): void {
        this._categoryTable.delete(categoryID);
    }

    getCategory(id: string): Category | undefined {
        return this._categoryTable.get(id);
    }

    categoryExists(id: string): boolean {
        return this._categoryTable.exists(id);
    }

    calculatePointTotal(category: Category): number {
        return category.songs.reduce((a, b) => a + b.pointValue, 0);
    }
}
