import type Category from '../interfaces/Category';
import type { Song } from '../interfaces/Song';
import parseID from '../functions/parseID';

export default class Collection {
    private _collection: Map<string, Category>;

    constructor() {
        this._collection = new Map<string, Category>();
    }

    // Category Functions

    getCategory(id: string): Category | undefined {
        return this._collection.get(id);
    }

    getCategories(): Category[] {
        return Array.from(this._collection.values());
    }

    addCategory(category: Category, id?: string): void {
        if (!id) this._collection.set(parseID(category.name), category);
        else this._collection.set(id, category);
    }

    addCategories(categories: Category[]): void {
        categories.forEach((category) => this.addCategory(category));
    }

    updateCategory(id: string, category: Category): void {
        if (this._collection.has(id)) this.addCategory(category, id);
        else this.addCategory(category);
    }

    deleteCategory(id: string): void {
        this._collection.delete(id);
    }

    clearCategories(): void {
        this._collection.clear();
    }

    calculatePointTotal(categoryID: string): number {
        const category = this.getCategory(categoryID);
        if (!category) return 0;
        const songs = Array.from(category.songs.values());
        return songs.reduce((a, b) => a + b.pointValue, 0);
    }

    // Song Functions

    getSong(songID: string, categoryID: string): Song | undefined {
        const category = this.getCategory(categoryID);
        if (category) return this._collection[categoryID].songs[songID];
        else return undefined;
    }

    getSongs(categoryID: string): Song[] {
        const category = this.getCategory(categoryID);
        if (category) return Object.values(category.songs);
        else return [];
    }

    addSong(song: Song, categoryID: string): void {
        const category = this.getCategory(categoryID);
        if (category) {
            const id = parseID(song.songName);
            category.songs.set(id, song);
        }
    }

    deleteSong(songID: string, categoryID: string): void {
        const category = this.getCategory(categoryID);
        if (category) {
            category.songs.delete(songID);
        }
    }
}
