import Category from '../../shared/interfaces/Category';
import type { Song, ParsedSong } from '../../shared/interfaces/Song';
import Table from '../../shared/interfaces/Table';
import createID from '../../shared/functions/createID';
import calculatePointsTotal from '../../shared/functions/calculatePointTotal';

export default class CategoryManager {
    private _categories: Category[];
    private _categoryIndexTable: Table<number>;
    private _songTable: Table<Song>;
    constructor(categories: Category[]) {
        this._categories = categories;
        this._categoryIndexTable = {};
        this._songTable = {};
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    // Lookup Table functionality
    public syncronizeTables(): void {
        this._categories.forEach((category: Category) => {
            if (!this.categoryExists(category.id)) {
                const index = this.getCategoryIndex(category.id);
                if (index) this._categories[index] = category;
            }
            category.songs.forEach((song: Song) => {
                if (!this.songExists(song.id)) this._songTable[song.id] = song;
            });
        });
    }

    public addCategory(category: Category): void {
        this._categories.push(category);
        this.syncronizeTables();
    }

    public addSong(song: Song, category: Category): void {
        category.songs.push(song);
        this._songTable[song.id] = song;
        this.updateCategory(category);
    }

    public addSongs(songs: Song[], category: Category): void {
        songs.forEach((song) => {
            this.addSong(song, category);
        });
    }

    public setCategories(categories: Category[]): void {
        this._categories = categories;
    }

    public createCategory(name: string, songs: Song[] = []): void {
        const newCategory: Category = {
            name,
            id: createID(name),
            pointTotal: calculatePointsTotal(songs),
            songs,
        };
        this.addCategory(newCategory);
    }

    public updateCategory(newCategory: Category): void {
        const index: number | undefined = this.getCategoryIndex(newCategory.id);
        if (index) this._categories[index] = newCategory;
        else return;
    }

    public deleteCategory(category: Category): void {
        const index = this.getCategoryIndex(category.id);
        if (index) this._categories.splice(index, 1);
        else return;
    }

    public parseSong(song: Song, gameImagePath: string, songPath: string): ParsedSong {
        const { id, songName, gameName, pointValue } = song;
        const newSong: ParsedSong = {
            id,
            songName,
            gameName,
            songPath,
            gameImagePath,
            pointValue,
        };
        return newSong;
    }

    getCategoryIndex(key: string): number | undefined {
        return this._categoryIndexTable[key];
    }

    getSong(key: string): Song | undefined {
        return this._songTable[key];
    }

    songExists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._songTable, key);
    }

    categoryExists(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._categoryIndexTable, key);
    }
}
