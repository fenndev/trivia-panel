import Song from '../../shared/interfaces/Song';
import Category from '../../shared/classes/Category';
import SongData from '../../shared/interfaces/SongData';
import CategoryData from '../../shared/interfaces/CategoryData';
import FileManager from './FileManager';
import LookupTable from './LookupTable';
import handleError from '../functions/handleError';
import createID from '../functions/createID';
import isObjectEqual from '../functions/isObjectEqual';

export default class Manager {
    private _categories: Category[];
    private _fileManager: FileManager;
    private _lookupTable: LookupTable;
    constructor() {
        this._categories = [];
        this._fileManager = new FileManager();
        this._lookupTable = new LookupTable();
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    public init(): void {
        this._categories = this.loadCategories();
        this._lookupTable.create(this._categories);
    }

    private loadCategories(): Category[] {
        const categories = this._fileManager.getCategories();
        return categories.map((item: CategoryData) => this.parseToCategory(item));
    }

    private parseToCategory(data: CategoryData): Category {
        const id = data.id ?? createID(data.name);
        data.songs.forEach((song) => {
            if (song.id) return;
            song.id = createID(song.songName);
        });
        const category = new Category(data.name, id, data.songs);
        return category;
    }

    public createCategory(categoryName: string): void {
        this._categories.push(new Category(categoryName, createID(categoryName), []));
    }

    public addSong(song: Song, categoryID: string): void {
        const category: Category | undefined = this._lookupTable.getCategory(categoryID);
        if (!category) handleError(new Error('Category does not exist!'));
        if (
            category?.songs.some((existingSong) => {
                return isObjectEqual(existingSong, song);
            })
        )
            handleError(new Error('Song already exists!'));
        else category?.songs.push(song);
    }

    public handleSong(songData: SongData): void {
        const songPath = this._fileManager.handle(songData.songFile);
        const gameImagePath = this._fileManager.handle(songData.gameImageFile);
        const { songName, gameName, pointValue, categoryID } = songData;
        const id = createID(songData.songName);
        const song: Song = {
            id,
            songName,
            songPath,
            gameName,
            gameImagePath,
            pointValue,
        };
        this.addSong(song, categoryID);
        this._fileManager.sync(this._categories);
        this._categories = this.loadCategories();
    }

    public findCategory = (categoryID: string): Category | undefined => this._lookupTable.getCategory(categoryID);

    public findSong = (songID: string): Song | undefined => this._lookupTable.getSong(songID);
}
