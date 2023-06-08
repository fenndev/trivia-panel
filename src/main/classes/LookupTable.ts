import Category from '../../shared/classes/Category';
import CategoryData from '../../shared/interfaces/CategoryData';
import SongData from '../../shared/interfaces/SongData';
import Table from '../../shared/interfaces/Table';
export default class LookupTable {
    private _categoryTable: Table<CategoryData>;
    private _songTable: Table<SongData>;
    constructor() {
        this._categoryTable = {};
        this._songTable = {};
    }

    public create(categories: CategoryData[]): void {
        categories.forEach((category) => {
            this._categoryTable[category.id] = category;
            category.songs.forEach((song) => {
                this._songTable[song.id] = song;
            });
        });
    }

    public update(category: CategoryData): void {
        const categories = Object.keys(this._categoryTable).map((key) => this.getCategory(key) as CategoryData);
        categories.push(category);
        this._categoryTable = {};
        this._songTable = {};
        this.create(categories);
    }

    getCategory(key: string): CategoryData | undefined {
        return this._categoryTable[key];
    }

    getSong(key: string): SongData | undefined {
        return this._songTable[key];
    }

    exists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._categoryTable, key) || Object.prototype.hasOwnProperty.call(this._songTable, key);
    }
}
