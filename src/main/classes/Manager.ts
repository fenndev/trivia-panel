import { Song, RawSong, ParsedSong } from '../../shared/interfaces/Song';
import CategoryManager from './CategoryManager';
import FileManager from './FileManager';
import LookupTable from './LookupTable';
import Category from '../../shared/interfaces/Category';
import isRawSong from '../functions/isRawSong';

class Manager {
    private static _instance: Manager;
    private _categoryManager: CategoryManager;
    private _fileManager: FileManager;
    private _lookupTable: LookupTable;
    constructor() {
        this._fileManager = new FileManager();
        this._lookupTable = new LookupTable();
        this._categoryManager = new CategoryManager(this._fileManager.getCategories());
        if (this._categoryManager.categories.length !== 0) this._lookupTable.create(this._categoryManager.categories);
    }

    // Singleton
    public static getInstance(): Manager {
        if (!this._instance) {
            this._instance = new Manager();
        }
        return this._instance;
    }

    public onNewSong(song: Song, categoryID: string): void {
        if (!isRawSong(song)) return;
        if (!this._lookupTable.categoryExists(categoryID)) return;
        const category: Category = this._lookupTable.getCategory(categoryID) as Category;
        const [imageFilePath, songFilePath] = this._fileManager.handleFiles([song.imageFile, song.songFile], categoryID);
        const parsedSong: ParsedSong = this._categoryManager.parseSong(song, imageFilePath, songFilePath);
        this._categoryManager.addSong(parsedSong, category);
        this._categoryManager.updateCategory(category);
        this._lookupTable.addSong(parsedSong);
        this._fileManager.sync(this._categoryManager.categories);
    }

    public onNewCategory(category: Category): void {
        if (this._lookupTable.categoryExists(category.id)) return;
        this._categoryManager.addCategory(category);
        this._lookupTable.addCategory(category);
        this._fileManager.sync(this._categoryManager.categories);
    }

    public onCategoriesRequest(): Category[] {
        return this._categoryManager.categories;
    }

    public findCategory = (categoryID: string): Category | undefined => this._lookupTable.getCategory(categoryID);

    public findSong = (songID: string): Song | undefined => this._lookupTable.getSong(songID);
}
const manager = Manager.getInstance();

export default manager;
