import JSONManager from './JSONManager';
import CategoryData from '../../shared/interfaces/CategoryData';
import fs from 'fs-extra';
import { join } from 'path';
import FileData from '../../shared/interfaces/FileData';
export default class FileManager {
    private _resourcePath: string;
    private _jsonPath: string;
    private _jsonManager: JSONManager;
    constructor() {
        this._resourcePath = 'resources';
        this._jsonPath = `${this._resourcePath}/mock.json`;
        if (!fs.existsSync(this._jsonPath)) fs.createFileSync(this._jsonPath);
        this._jsonManager = new JSONManager(this._jsonPath);
    }

    public getCategories(): CategoryData[] {
        return this._jsonManager.read();
    }

    public handle(fileData: FileData): string {
        const filePath = join(this._resourcePath, fileData.filename);
        fs.writeFileSync(filePath, Buffer.from(fileData.buffer));
        return filePath;
    }

    public sync(categories: CategoryData[]): void {
        this._jsonManager.write(categories);
    }
}
