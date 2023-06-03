import JSONManager from './JSONManager';
import CategoryData from '../../shared/interfaces/CategoryData';
import FileData from '../../shared/interfaces/FileData';
import fs from 'fs-extra';
import { basename, extname, join } from 'path';
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
        const fileExtension = extname(fileData.name);
        const fileName = basename(fileData.name, fileExtension);
        const filePath = join(this._resourcePath, `${fileName}${fileExtension}`);
        fs.writeFileSync(filePath, fileData.data);
        return filePath;
    }

    public sync(categories: CategoryData[]): void {
        this._jsonManager.write(categories);
    }
}
