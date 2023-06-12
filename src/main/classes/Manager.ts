import { Song, RawSong, ParsedSong } from '../../shared/interfaces/Song';
import CategoryManager from './CategoryManager';
import FileManager from './FileManager';
import Category from '../../shared/interfaces/Category';

class Manager {
    private static _instance: Manager;
    private _categoryManager: CategoryManager;
    private _fileManager: FileManager;
    constructor() {
        this._fileManager = new FileManager();
        this._categoryManager = new CategoryManager();
    }

    // Singleton
    public static getInstance(): Manager {
        if (!this._instance) {
            this._instance = new Manager();
        }
        return this._instance;
    }

    public onNewSong(song: RawSong): void {
        if (!this._categoryManager.isRawSong(song)) return;
        if (!this._categoryManager.categoryExists(song.categoryID)) return;
        const index = this._categoryManager.getCategoryIndex(song.categoryID);
        if (!index) return;
        const category: Category = this._categoryManager[index];
        const [imageFilePath, songFilePath] = this._fileManager.handleFiles([song.imageFile, song.songFile], song.categoryID);
        const parsedSong: ParsedSong = this._categoryManager.parseSong(song, imageFilePath, songFilePath);
        this._categoryManager.addSong(parsedSong, category);
        this._categoryManager.updateCategory(category);
        this._fileManager.syncJSON(this._categoryManager.categories);
    }

    public onNewCategory(category: Category): void {
        if (this._categoryManager.categoryExists(category.id)) return;
        this._categoryManager.addCategory(category);
        this._fileManager.syncJSON(this._categoryManager.categories);
    }

    public onCategoriesRequest(): Category[] {
        return this._categoryManager.categories;
    }

    public findCategoryIndex = (categoryID: string): number | undefined => this._categoryManager.getCategoryIndex(categoryID);

    public findSong = (songID: string): Song | undefined => this._categoryManager.getSong(songID);
}
const manager = Manager.getInstance();

export default manager;
