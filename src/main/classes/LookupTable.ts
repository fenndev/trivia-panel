import CategoryData from '../../shared/interfaces/Category';
import type { Song } from '../../shared/interfaces/Song';
import Table from '../../shared/interfaces/Table';
export default class LookupTable {
    private _categoryTable: Table<CategoryData>;
    private _songTable: Table<Song>;
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

    public addSong(song: Song): void {
        this._songTable[song.id] = song;
    }

    public addSongs(songs: Song[]): void {
        songs.forEach((song) => {
            this.addSong(song);
        });
    }

    getCategory(key: string): CategoryData | undefined {
        return this._categoryTable[key];
    }

    getSong(key: string): Song | undefined {
        return this._songTable[key];
    }

    songExists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._songTable, key);
    }

    categoryExists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._categoryTable, key);
    }
}
