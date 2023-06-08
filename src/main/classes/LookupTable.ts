import CategoryData from '../../shared/interfaces/Category';
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
            this.addCategory(category);
        });
    }

    public addCategory(category: CategoryData): void {
        this._categoryTable[category.id] = category;
        category.songs.forEach((song) => {
            this._songTable[song.id] = song;
        });
    }

    getCategory(key: string): CategoryData | undefined {
        return this._categoryTable[key];
    }

    getSong(key: string): SongData | undefined {
        return this._songTable[key];
    }

    songExists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._songTable, key);
    }

    categoryExists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._categoryTable, key);
    }
}
