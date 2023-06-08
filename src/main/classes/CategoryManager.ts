import Category from '../../shared/interfaces/Category';
import SongData from '../../shared/interfaces/SongData';
import type Song from '../../shared/interfaces/Song';
import createID from '../../shared/functions/createID';
import calculatePointsTotal from '../../shared/functions/calculatePointTotal';

export default class CategoryManager {
    private _categories: Category[];

    constructor(categories: Category[]) {
        this._categories = categories;
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    public setCategories(categories: Category[]): void {
        this._categories = categories;
    }

    public createCategory(name: string, songs: SongData[] = []): Category {
        const newCategory: Category = {
            name,
            id: createID(name),
            pointTotal: calculatePointsTotal(songs),
            songs,
        };
        return this.addCategory(newCategory);
    }

    public addCategory(newCategory: Category): Category {
        this._categories.push(newCategory);
        return newCategory;
    }

    public updateCategory(categoryToUpdate: Category): void {
        const index = this._categories.findIndex((category) => category.id == categoryToUpdate.id);
        if (index != -1) {
            this._categories[index] = categoryToUpdate;
        } else return;
    }

    public deleteCategory(category: Category): void {
        const index = this._categories.findIndex((categoryToDelete) => {
            return categoryToDelete.id === category.id;
        });
        if (index === -1) throw new Error('Category not found');
    }

    public addSong(song: SongData, category: Category): void {
        category.songs.push(song);
        this.updateCategory(category);
    }

    public parseToSongData(song: Song, gameImagePath: string, songPath: string): SongData {
        const { id, songName, gameName, pointValue } = song;
        const newSong: SongData = {
            id,
            songName,
            gameName,
            songPath,
            gameImagePath,
            pointValue,
        };
        return newSong;
    }
}
