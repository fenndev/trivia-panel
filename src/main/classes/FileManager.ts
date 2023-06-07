import JSONManager from './JSONManager';
import CategoryData from '../../shared/interfaces/CategoryData';
import fs, { ensureDirSync } from 'fs-extra';
import { join } from 'path';
import FileData from '../../shared/interfaces/FileData';
export default class FileManager {
    private _resourcePath = 'resources';
    private _jsonPath = `${this._resourcePath}/mock.json`;
    private _categoriesPath = `${this._resourcePath}/categories`;
    private _jsonManager: JSONManager;

    constructor() {
        this.ensureResourceStructure();
        this._jsonManager = new JSONManager(this._jsonPath);
    }

    private ensureResourceStructure(): void {
        fs.ensureDirSync(this._resourcePath);
        fs.ensureFileSync(this._jsonPath);
        fs.ensureDirSync(this._categoriesPath);
    }

    public getCategories(): CategoryData[] {
        try {
            return this._jsonManager.read();
        } catch (error: unknown) {
            return [];
        }
    }

    private handle(fileData: FileData, categoryID: string): string {
        const categoryPath = join(this._categoriesPath, categoryID);
        ensureDirSync(categoryPath);
        const filePath = join(categoryPath, fileData.filename);
        fs.writeFileSync(filePath, Buffer.from(fileData.buffer));
        return filePath;
    }

    public handleFiles(fileData: FileData[], categoryID: string): string[] {
        const filePaths: string[] = [];
        fileData.forEach((file) => {
            filePaths.push(this.handle(file, categoryID));
        });
        return filePaths;
    }

    public sync(categories: CategoryData[]): CategoryData[] {
        console.log(`Sync Categories: ${categories}`);
        this._jsonManager.write(categories);
        return this.getCategories();
    }

    public validateFile(filePath: string): boolean {
        return fs.pathExistsSync(filePath);
    }
}
