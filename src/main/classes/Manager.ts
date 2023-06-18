import { Song, RawSong, ParsedSong } from '../../shared/interfaces/Song';
import Collection from '../../shared/classes/Collection';
import FileManager from './FileManager';
import Category from '../../shared/interfaces/Category';
import { toParsedSong } from '../functions/parseSong';

class Manager {
    private static _instance: Manager;
    private _collection: Collection;
    private _fileManager: FileManager;
    constructor() {
        this._fileManager = new FileManager();
        this._collection = new Collection();
    }

    // Singleton
    public static getInstance(): Manager {
        if (!this._instance) {
            this._instance = new Manager();
        }
        return this._instance;
    }

    public onNewSong(song: RawSong, categoryID: string): void {
        const [imageFilePath, songFilePath] = this._fileManager.handleFiles([song.imageFile, song.songFile], categoryID);
        const parsedSong: ParsedSong = toParsedSong(song, imageFilePath, songFilePath);
        this._collection.addSong(parsedSong, categoryID);
        this._fileManager.syncJSON(this._collection.toJSON());
        // if (this._songManager.isRawSong(song) && this._categoryManager.categoryExists(song.categoryID)) {
        //     const category: Category = this._categoryManager.getCategory(song.categoryID) as Category;
        //
        //     const parsedSong: ParsedSong = parseSong(song, imageFilePath, songFilePath);
        //     this._songManager.addSong(parsedSong);
        //     this._categoryManager.updateCategory(category);
        //     this._fileManager.syncJSON(this._categoryManager.categories);
        // } else return;
    }

    public onNewCategory(category: Category): void {
        this._collection.addCategory(category);
        this._fileManager.syncJSON(this._collection.toJSON());
        // if (this._categoryManager.categoryExists(category.id)) return;
        // this._categoryManager.addCategory(category);
        // this._fileManager.syncJSON(this._categoryManager.categories);
    }

    get collection(): Collection {
        return this._collection;
    }

    // public findCategory = (categoryID: string): Category | undefined => this._categoryManager.getCategory(categoryID);

    // public findSong = (songID: string): Song | undefined => this._songManager.getSong(songID);
}
const manager = Manager.getInstance();

export default manager;
