import { RawSong, ParsedSong } from '../../shared/interfaces/Song';
import Collection from '../../shared/classes/Collection';
import FileManager from './FileManager';
import Parser from '../../shared/classes/Parser';
import Category from '../../shared/interfaces/Category';
import ParsedCategories from '../../shared/interfaces/ParsedCategories';

class Manager {
    private static _instance: Manager;
    private _fileManager: FileManager;
    private _parser: Parser;
    private _collection: Collection;
    private constructor() {
        this._fileManager = new FileManager();
        this._parser = new Parser();
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
        const parsedSong: ParsedSong = this._parser.songToParsedSong(song, imageFilePath, songFilePath);
        this._collection.addSong(parsedSong, categoryID);
        this._fileManager.syncJSON(this._parser.collectionToJSON(this._collection));
    }

    public onNewCategory(category: Category): void {
        this._collection.addCategory(category);
        this._fileManager.syncJSON(this._parser.collectionToJSON(this._collection));
    }

    public async getCollection(): Promise<ParsedCategories> {
        return await this._fileManager.getCategories();
    }
}
const manager = Manager.getInstance();

export default manager;
