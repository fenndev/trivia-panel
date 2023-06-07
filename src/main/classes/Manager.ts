import Song from '../../shared/interfaces/Song';
import Category from '../../shared/classes/Category';
import CategoryManager from './CategoryManager';
import SongManager from './SongManager';
import FileManager from './FileManager';
import LookupTable from './LookupTable';
import SongData from '../../shared/interfaces/SongData';
import createID from '../functions/createID';

class Manager {
    private static _instance: Manager;
    private _categoryManager: CategoryManager;
    private _fileManager: FileManager;
    private _songManager: SongManager;
    private _lookupTable: LookupTable;
    constructor(fileManager: FileManager, songManager: SongManager, lookupTable: LookupTable) {
        this._fileManager = fileManager;
        this._songManager = songManager;
        this._lookupTable = lookupTable;
        this._categoryManager = new CategoryManager(this._fileManager.getCategories());
        this._lookupTable.create(this._categoryManager.categories);
    }

    // Singleton
    public static getInstance(fileManager: FileManager, songManager: SongManager, lookupTable: LookupTable): Manager {
        if (!this._instance) {
            this._instance = new Manager(fileManager, songManager, lookupTable);
        }
        return this._instance;
    }

    public onNewSong(songData: SongData): void {
        const [imageFilePath, songFilePath] = this._fileManager.handleFiles([songData.imageFile, songData.songFile], songData.categoryID);
        const { songName, gameName, pointValue, categoryID } = songData;
        const song = this._songManager.createSong(createID(songName), songName, songFilePath, gameName, imageFilePath, pointValue);
        const category: Category | undefined = this._lookupTable.getCategory(categoryID);
        if (!category) throw new Error('Category does not exist!');
        else {
            this._songManager.addSong(song, category);
            this._categoryManager.updateCategory(category);
            this.synchronize();
        }
    }

    public synchronize(): void {
        this._categoryManager.categories = this._fileManager.sync(this._categoryManager.categories);
    }

    public findCategory = (categoryID: string): Category | undefined => this._lookupTable.getCategory(categoryID);

    public findSong = (songID: string): Song | undefined => this._lookupTable.getSong(songID);
}
const fileManager = new FileManager();
const songManager = new SongManager();
const lookupTable = new LookupTable();
const manager = Manager.getInstance(fileManager, songManager, lookupTable);

export default manager;
