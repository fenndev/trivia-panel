import Song from '../../shared/interfaces/Song';
import Category from '../../shared/classes/Category';
import CategoryData from '../../shared/interfaces/CategoryData';
import JSONManager from './JSONManager';
import LookupTable from './LookupTable';
import handleError from '../functions/handleError';
import createID from '../functions/createID';

export default class Manager {
    private _categories: Category[];
    private _jsonManager: JSONManager;
    private _lookupTable: LookupTable;
    constructor() {
        this._categories = [];
        this._jsonManager = new JSONManager('resources/mock.json');
        this._lookupTable = new LookupTable();
    }

    // Getters and Setters
    get categories(): Category[] {
        return this._categories;
    }

    public async init(): Promise<void> {
        try {
            this._categories = await this.loadCategories();
            this._lookupTable.create(this._categories);
        } catch (err) {
            handleError(err);
        }
    }

    private async loadCategories(): Promise<Category[]> {
        try {
            const categories = await this._jsonManager.read();
            return categories.map((item: CategoryData) => this.parseToCategory(item));
        } catch (err) {
            handleError(err);
            return [];
        }
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

    public findCategory = (categoryID: string): Category | undefined => this._lookupTable.getCategory(categoryID);

    public findSong = (songID: string): Song | undefined => this._lookupTable.getSong(songID);
}
