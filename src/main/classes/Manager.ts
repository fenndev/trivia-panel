import { RawSong, ParsedSong } from '../../shared/interfaces/Song';
import Collection from '../../shared/classes/Collection';
import FileManager from './FileManager';
import Category from '../../shared/interfaces/Category';
import { toParsedSong } from '../functions/parseSong';

class Manager {
    private static _instance: Manager;
    private _collection: Collection;
    private _fileManager: FileManager;
    private constructor() {
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
    }

    public onNewCategory(category: Category): void {
        this._collection.addCategory(category);
        this._fileManager.syncJSON(this._collection.toJSON());
    }

    get collection(): Collection {
        return this._collection;
    }
}
const manager = Manager.getInstance();

export default manager;
