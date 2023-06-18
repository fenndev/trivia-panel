import type Category from '../interfaces/Category';
import type { Song, ParsedSong } from '../interfaces/Song';

export default class Collection {
    private _collection: Map<string, Category>;

    constructor() {
        this._collection = new Map<string, Category>();
    }

    public parseID(name: string): string {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }

    // Category Functions

    getCategory(id: string): Category | undefined {
        return this._collection.get(id);
    }

    get categories(): Category[] {
        return Array.from(this._collection.values());
    }

    addCategory(category: Category, id?: string): void {
        if (!id) this._collection.set(this.parseID(category.name), category);
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

    calculatePointTotal(categoryID: string): void {
        const category = this.getCategory(categoryID);
        if (!category) return;
        const songs = Array.from(category.songs.values());
        category.pointTotal = songs.reduce((a, b) => a + b.pointValue, 0);
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
            const id = this.parseID(song.songName);
            category.songs.set(id, song);
        }
    }

    deleteSong(songID: string, categoryID: string): void {
        const category = this.getCategory(categoryID);
        if (category) {
            category.songs.delete(songID);
        }
    }

    toJSON(): object {
        const collection = {};
        this._collection.forEach((value, key) => {
            console.log('Running!');
            collection[key] = {
                name: value.name,
                pointTotal: value.pointTotal,
                songs: Array.from(value.songs.values()).reduce((acc, song) => {
                    const { songName, gameName, songPath, gameImagePath, pointValue } = song as ParsedSong;
                    acc[this.parseID(songName)] = {
                        songName,
                        gameName,
                        songPath,
                        gameImagePath,
                        pointValue,
                    };
                    console.log(acc);
                    return acc;
                }, {}),
            };
        });
        return collection;
    }
}
