import Category from '../../shared/classes/Category';
import SongData from '../../shared/interfaces/SongData';
import Table from '../../shared/interfaces/Table';
export default class LookupTable {
    private _categoryTable: Table<Category>;
    private _songTable: Table<SongData>;
    constructor() {
        this._categoryTable = {};
        this._songTable = {};
    }

    public create(categories: Category[]): void {
        categories.forEach((category) => {
            this._categoryTable[category.id] = category;
            category.songs.forEach((song) => {
                this._songTable[song.id] = song;
            });
        });
    }

    getCategory(key: string): Category | undefined {
        return this._categoryTable[key];
    }

    getSong(key: string): SongData | undefined {
        return this._songTable[key];
    }

    exists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._categoryTable, key) || Object.prototype.hasOwnProperty.call(this._songTable, key);
    }
}
