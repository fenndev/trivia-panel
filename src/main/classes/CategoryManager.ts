import Category from '../../shared/interfaces/Category';
import type { Song, ParsedSong, RawSong } from '../../shared/interfaces/Song';
import Table from '../../shared/interfaces/Table';
import createID from '../../shared/functions/createID';
import calculatePointsTotal from '../../shared/functions/calculatePointTotal';

export default class CategoryManager {
    private _categories: Category[];
    private _categoryTable: Table<Category>;
    private _songTable: Table<Song>;
    constructor() {
        this._categories = [];
        this._categoryTable = {};
        this._songTable = {};
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    // Lookup Table functionality
    public syncronizeTables(): void {
        this._categories.forEach((category: Category) => {
            if (!this.categoryExists(category.id)) this._categoryTable[category.id] = category;
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
        this._categories[newCategory.id] = newCategory;
    }

    public deleteCategory(category: Category): void {
        delete this._categoryTable[category.id];
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

    getCategory(id: string): Category | undefined {
        return this._categoryTable[id];
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

    isRawSong(obj: Song): obj is RawSong {
        return 'songFile' in obj && 'imageFile' in obj;
    }
}
