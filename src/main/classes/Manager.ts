import { Song, RawSong, ParsedSong } from '../../shared/interfaces/Song';
import CategoryManager from './CategoryManager';
import FileManager from './FileManager';
import Category from '../../shared/interfaces/Category';
import SongManager from './SongManager';

class Manager {
    private static _instance: Manager;
    private _categoryManager: CategoryManager;
    private _songManager: SongManager;
    private _fileManager: FileManager;
    constructor() {
        this._fileManager = new FileManager();
        this._categoryManager = new CategoryManager();
        this._songManager = new SongManager();
    }

    // Singleton
    public static getInstance(): Manager {
        if (!this._instance) {
            this._instance = new Manager();
        }
        return this._instance;
    }

    public onNewSong(song: RawSong): void {
        if (this._songManager.isRawSong(song) && this._categoryManager.categoryExists(song.categoryID)) {
            const category: Category = this._categoryManager.getCategory(song.categoryID) as Category;
            const [imageFilePath, songFilePath] = this._fileManager.handleFiles([song.imageFile, song.songFile], song.categoryID);
            const parsedSong: ParsedSong = this._songManager.parseSong(song, imageFilePath, songFilePath);
            this._songManager.addSong(parsedSong);
            this._categoryManager.updateCategory(category);
            this._fileManager.syncJSON(this._categoryManager.categories);
        } else return;
    }

    public onNewCategory(category: Category): void {
        if (this._categoryManager.categoryExists(category.id)) return;
        this._categoryManager.addCategory(category);
        this._fileManager.syncJSON(this._categoryManager.categories);
    }

    public onCategoriesRequest(): Category[] {
        return this._categoryManager.categories;
    }

    public findCategory = (categoryID: string): Category | undefined => this._categoryManager.getCategory(categoryID);

    public findSong = (songID: string): Song | undefined => this._songManager.getSong(songID);
}
const manager = Manager.getInstance();

export default manager;
