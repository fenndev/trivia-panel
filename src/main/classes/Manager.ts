import Song from './Song';
import Category from './Category';
import { v4 as uuid } from 'uuid';
import Validator from './Validator';

export default class Manager {
    categories: Category[];
    validator: Validator;

    constructor(categories: Category[] = []) {
        this.categories = categories;
        this.validator = new Validator();
        this.validator.initialize();
    }

    createCategory(name: string, songs: Song[]): void {
        const id = uuid();
        const category = new Category(name, songs, id);
        this.addCategory(category);
    }

    addCategory(category: Category): void {
        this.categories.push(category);
    }

    removeCategory(category: Category): void {
        const index = this.categories.indexOf(category);
        if (index > -1) {
            this.categories.splice(index, 1);
        }
    }

    addSongToCategory(song: Song, category: Category): void {
        if (category.songs.includes(song)) {
            throw new Error('Song already in category');
        }
        category.songs.push(song);
    }

    removeSongFromCategory(song: Song, category: Category): void {
        const index = category.songs.indexOf(song);
        if (index > -1) {
            category.songs.splice(index, 1);
        }
    }

    editCategory(category: Category, newName: string, newSongs: Song[]): void {
        category.name = newName;
        category.songs = newSongs;
    }

    editSong(song: Song, newSongName: string, newSongPath: string, newGameName: string, newGameImagePath: string, newPointTotal: number): void {
        song.songName = newSongName;
        song.songPath = newSongPath;
        song.gameName = newGameName;
        song.gameImagePath = newGameImagePath;
        song.pointTotal = newPointTotal;
    }
}
