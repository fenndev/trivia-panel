import Song from '../../shared/interfaces/Song';
import Category from '../../shared/classes/Category';
import CategoryData from '../../shared/interfaces/CategoryData';
import handleError from '../functions/handleError';
import fs from 'fs-extra';

const jsonPath = 'resources/mock.json';
export default class Manager {
    private _categories: Category[];

    constructor() {
        this._categories = [];
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    public async initialize(): Promise<void> {
        try {
            this._categories = await this.importCategories();
        } catch (err) {
            handleError(err);
        }
    }

    private async importCategories(): Promise<Category[]> {
        try {
            const data = await fs.readFile(jsonPath, 'utf8');
            const parsedData: CategoryData[] = await JSON.parse(data);
            const categories: Category[] = parsedData.map((item: CategoryData) => {
                if (item.id) return this.createCategory(item.name, item.songs, item.id);
                else return this.createCategory(item.name, item.songs);
            });
            return categories;
        } catch (err) {
            handleError(err);
            return [];
        }
    }

    public async createIDs(): Promise<void> {
        try {
            this._categories.forEach((category) => {
                category.songs.forEach((song) => {
                    const index = category.songs.findIndex((s) => s === song);
                    if (index !== -1) if (!song.id) category.songs[index] = this.createSong(song.songName, song.songPath, song.gameName, song.gameImagePath, song.pointTotal);
                });
            });
            await this.saveCategories();
        } catch (err) {
            handleError(err);
        }
    }

    public async saveCategories(): Promise<void> {
        try {
            const data = JSON.stringify(this._categories, null, 4);
            await fs.outputFile(jsonPath, data);
        } catch (err) {
            handleError(err);
        }
    }

    // Song-Specific Logic

    createSong(songName: string, songPath: string, gameName: string, gameImagePath: string, pointTotal: number): Song {
        const id = songName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        const song: Song = {
            id,
            songName,
            songPath,
            gameName,
            gameImagePath,
            pointTotal,
        };
        return song;
    }

    editSong(song: Song, updatedSong: Partial<Song>): void {
        Object.assign(song, updatedSong);
    }

    addSongToCategory(song: Song, category: Category): void {
        if (!song || !category) throw new Error('Song or category not provided!');
        if (category.songs.includes(song)) throw new Error('Song already in category!');
        category.songs.push(song);
    }

    addSongsToCategory(songs: Song[], category: Category): void {
        songs.forEach((song) => this.addSongToCategory(song, category));
    }

    removeSongFromCategory(song: Song, category: Category): void {
        const index = category.songs.indexOf(song);
        if (index > -1) {
            category.songs.splice(index, 1);
        }
    }

    // Category-Related Logic

    createCategory(name: string, songs: Song[], id?: string): Category {
        if (!id)
            id = name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');
        const category = new Category(name, id!, songs);
        return category;
    }

    addCategory(category: Category): void {
        this.categories.push(category);
    }

    editCategory(categoryID: string, updatedCategory: Partial<Category>): void {
        const index = this.findCategoryIndex(categoryID);
        if (index !== -1) {
            const category = this._categories[index];

            if (updatedCategory.name) {
                category.name = updatedCategory.name;
            }

            if (updatedCategory.songs) {
                updatedCategory.songs.forEach((song) => {
                    if (!category.songs.includes(song)) {
                        this.addSongToCategory(song, category);
                    }
                });
                category.songs.forEach((song) => {
                    if (!updatedCategory.songs!.includes(song)) {
                        this.removeSongFromCategory(song, category);
                    }
                });
            }
        } else {
            throw new Error('Category not found!');
        }
    }

    removeCategory(categoryID: string): void {
        const index = this.findCategoryIndex(categoryID);
        if (index !== -1) {
            this._categories.splice(index, 1);
        } else {
            throw new Error('Category not found!');
        }
    }

    findCategoryIndex(categoryID: string): number {
        return this._categories.findIndex((category) => category.id === categoryID);
    }

    findSongIndex(categoryID: string, songName): number {
        const index = this.findCategoryIndex(categoryID);
        if (index !== -1) {
            return this._categories[index].songs.findIndex((song) => song.songName === songName);
        } else return index;
    }

    findSong(songID: string): Song | undefined {
        for (const category of this._categories) {
            const song = category.songs.find((s) => s.id === songID);
            if (song) {
                return song; // Return the song if found
            }
        }
        return undefined; // Return undefined if the song is not found
    }

    findCategory(categoryID: string): Category | undefined {
        const category = this._categories.find((cat) => cat.id == categoryID);
        if (category) return category;
        return undefined;
    }
}
