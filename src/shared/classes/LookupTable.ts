import Category from '../interfaces/Category';
import { Song } from '../interfaces/Song';
import Table from '../interfaces/Table';

export default class LookupTable {
    private _categoryIndexTable: Table<number>;
    private _songTable: Table<Song>;

    constructor() {
        this._categoryIndexTable = {};
        this._songTable = {};
    }

    // Lookup Table functionality
    public syncronizeTables(categories: Category[]): void {
        categories.forEach((category: Category) => {
            if (!this.categoryExists(category.id)) {
                const index = this.getCategoryIndex(category.id);
                if (index) categories[index] = category;
            }
            category.songs.forEach((song: Song) => {
                if (!this.songExists(song.id)) this._songTable[song.id] = song;
            });
        });
    }

    songExists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._songTable, key);
    }

    categoryExists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._categoryIndexTable, key);
    }

    getCategoryIndex(key: string): number | undefined {
        return this._categoryIndexTable[key];
    }

    getSong(key: string): Song | undefined {
        return this._songTable[key];
    }
}
