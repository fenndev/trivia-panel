import Category from '../../shared/classes/Category';
import CategoryData from '../../shared/interfaces/CategoryData';
import SongData from '../../shared/interfaces/SongData';
import createID from '../../shared/functions/createID';
import type Song from '../../shared/interfaces/Song';

export default class CategoryManager {
    private _categories: Category[];

    constructor(categories: CategoryData[]) {
        this._categories = categories.map((category) => {
            return this.parseToCategory(category);
        });
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    public setCategories(categories: CategoryData[]): void {
        this._categories = categories.map((category) => {
            return this.parseToCategory(category);
        });
    }

    public createCategory(name: string, songs: SongData[] = []): Category {
        const newCategory: CategoryData = {
            name,
            id: createID(name),
            songs,
        };
        return this.addCategory(newCategory);
    }

    public addCategory(data: CategoryData): Category {
        const newCategory = this.parseToCategory(data);
        this._categories.push(newCategory);
        return newCategory;
    }

    public parseToCategory(data: CategoryData): Category {
        return new Category(data.name, data.id, data.songs);
    }

    public updateCategory(categoryData: CategoryData): void {
        const categoryToUpdate = this.parseToCategory(categoryData);
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

    public addSong(song: SongData, category: CategoryData): void {
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
