import Song from '../../shared/interfaces/Song';
import Category from '../../shared/classes/Category';
import SongData from '../../shared/interfaces/SongData';
import CategoryManager from './CategoryManager';
import FileManager from './FileManager';
import LookupTable from './LookupTable';
import CategoryData from '../../shared/interfaces/CategoryData';

class Manager {
    private static _instance: Manager;
    private _categoryManager: CategoryManager;
    private _fileManager: FileManager;
    private _lookupTable: LookupTable;
    constructor(fileManager: FileManager, lookupTable: LookupTable) {
        this._fileManager = fileManager;
        this._lookupTable = lookupTable;
        this._categoryManager = new CategoryManager(this._fileManager.getCategories());
        if (this._categoryManager.categories.length !== 0) this._lookupTable.create(this._categoryManager.categories);
    }

    // Singleton
    public static getInstance(fileManager: FileManager, lookupTable: LookupTable): Manager {
        if (!this._instance) {
            this._instance = new Manager(fileManager, lookupTable);
        }
        return this._instance;
    }

    public onNewSong(song: Song): void {
        const [imageFilePath, songFilePath] = this._fileManager.handleFiles([song.imageFile, song.songFile], song.categoryID);
        const songData: SongData = this._categoryManager.parseToSongData(song, imageFilePath, songFilePath);
        let category: CategoryData;
        const isExistingCategory: boolean = this._lookupTable.exists(song.categoryID);
        if (isExistingCategory) category = this._lookupTable.getCategory(song.categoryID) as CategoryData;
        else category = this._categoryManager.createCategory(song.categoryName as string, [songData]);
        this._categoryManager.addSong(songData, category);
        this._categoryManager.updateCategory(category);
        if (this._categoryManager.categories.length !== 0) this._lookupTable.create(this._categoryManager.categories);
        this._fileManager.sync(this._categoryManager.categories);
    }

    public onNewCategory(category: CategoryData): void {
        const isExistingCategory: boolean = this._lookupTable.exists(category.id);
        if (isExistingCategory) return;
        this._categoryManager.addCategory(category);
        this._lookupTable.update(category);
        this._fileManager.sync(this._categoryManager.categories);
    }

    public onCategoriesRequest(): Category[] {
        return this._categoryManager.categories;
    }

    public findCategory = (categoryID: string): CategoryData | undefined => this._lookupTable.getCategory(categoryID);

    public findSong = (songID: string): SongData | undefined => this._lookupTable.getSong(songID);
}
const fileManager = new FileManager();
const lookupTable = new LookupTable();
const manager = Manager.getInstance(fileManager, lookupTable);

export default manager;
