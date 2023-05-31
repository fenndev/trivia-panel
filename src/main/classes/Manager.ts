import Song from '../interfaces/Song';
import Category from './Category';
import { v4 as uuid } from 'uuid';
import validate from '../functions/validate';
import handleError from '../functions/handleError';

const jsonPath = 'resources/mock.json';
export default class Manager {
    private _categories: Category[];

    constructor() {
        this._categories = [];
        try {
            validate(jsonPath);
        } catch (err) {
            handleError(err);
        }
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    // Song-Specific Logic

    createSong(songName: string, songPath: string, gameName: string, gameImagePath: string, pointTotal: number): Song {
        const song: Song = {
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

    createCategory(name: string, songs: Song[]): void {
        const id = uuid();
        const category = new Category(name, songs, id);
        this.addCategory(category);
    }

    addCategory(category: Category): void {
        this.categories.push(category);
    }

    editCategory(categoryID: string, updatedCategory: Partial<Category>): void {
        const index = this._categories.findIndex((category) => category.id === categoryID);
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
        const index = this._categories.findIndex((category) => category.id === categoryID);
        if (index !== -1) {
            this._categories.splice(index, 1);
        } else {
            throw new Error('Category not found!');
        }
    }
}
