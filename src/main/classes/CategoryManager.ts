import Category from '../../shared/interfaces/Category';
import type { Song, ParsedSong, RawSong } from '../../shared/interfaces/Song';
import Table from '../../shared/interfaces/Table';
import createID from '../../shared/functions/createID';
import calculatePointsTotal from '../../shared/functions/calculatePointTotal';

export default class CategoryManager {
    private _categoryTable: Table<Category>;
    private _songTable: Table<Song>;
    constructor() {
        this._categoryTable = {};
        this._songTable = {};
    }

    // Getters and Setters
    get categories(): Category[] {
        return Object.values(this._categoryTable);
    }

    public getSongs(categoryID: string): Song[] {
        if (!this.categoryExists(categoryID)) return [];
        const category = this.getCategory(categoryID);
        return category!.songs;
    }

    public addCategory(category: Category): void {
        if (!this.categoryExists(category.id)) this._categoryTable[category.id] = category;
    }

    public addSong(song: Song, category: Category): void {
        if (!this.categoryExists(category.id)) return;
        category.songs.push(song);
        this._songTable[song.id] = song;
        if (this.calculatePointTotal(category) != this.calculatePointTotal(this.getCategory(category.id) as Category)) category.pointTotal = this.calculatePointTotal(category);
        this.updateCategory(category);
    }

    public addSongs(songs: Song[], category: Category): void {
        songs.forEach((song) => {
            if (this.songExists(song.id)) return;
            this.addSong(song, category);
        });
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
        if (!this.categoryExists(newCategory.id)) this.createCategory(newCategory.name, newCategory.songs, newCategory.id);
        this._categoryTable[newCategory.id] = newCategory;
    }

    public deleteCategory(categoryID: string): void {
        if (!this.categoryExists(categoryID)) return;
        this._categoryTable[categoryID].songs.forEach((song) => {
            this.deleteSong(song.id);
        });
        delete this._categoryTable[categoryID];
    }

    public deleteSong(songID: string): void {
        if (!this.songExists(songID)) return;
        delete this._songTable[songID];
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

    songExists(id: string): boolean {
        return !!this._songTable[id];
    }

    categoryExists(id: string): boolean {
        return !!this._categoryTable[id];
    }

    isRawSong(obj: Song): obj is RawSong {
        return 'songFile' in obj && 'imageFile' in obj;
    }

    calculatePointTotal(category: Category): number {
        return category.songs.reduce((a, b) => a + b.pointValue, 0);
    }
}
