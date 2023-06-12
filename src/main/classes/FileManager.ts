import Category from '../../shared/interfaces/Category';
import fs from 'fs-extra';
import { join } from 'path';
import FileData from '../../shared/interfaces/FileData';
export default class FileManager {
    private _resourcePath = 'resources';
    private _jsonPath = `${this._resourcePath}/categories.json`;
    private _categoriesPath = `${this._resourcePath}/categories`;

    constructor() {
        this.ensureResourceStructure();
    }

    private async ensureResourceStructure(): Promise<void> {
        fs.ensureDir(this._resourcePath);
        fs.ensureFile(this._jsonPath);
        fs.ensureDir(this._categoriesPath);
    }

    public async getCategories(): Promise<Category[]> {
        try {
            return await this.readJSON();
        } catch (error: unknown) {
            return [];
        }
    }

    // File Handling

    private async handle(fileData: FileData, categoryID: string): Promise<string> {
        const categoryPath = join(this._categoriesPath, categoryID);
        const filePath = join(categoryPath, fileData.filename);
        fs.writeFile(filePath, Buffer.from(fileData.buffer));
        return filePath;
    }

    public handleFiles(fileData: FileData[], categoryID: string): string[] {
        const filePaths: string[] = [];
        fileData.forEach(async (file) => {
            filePaths.push(await this.handle(file, categoryID));
        });
        return filePaths;
    }

    public async syncJSON(categories: Category[]): Promise<Category[]> {
        this.updateJSON(categories);
        return this.getCategories();
    }

    async readJSON(): Promise<Category[]> {
        const data = await fs.readFile(this._jsonPath, 'utf8');
        const categories = JSON.parse(data) as Category[];
        return categories;
    }

    async writeJSON(data: Category[]): Promise<void> {
        const stringifiedData = JSON.stringify(data, null, 4);
        fs.outputFile(this._jsonPath, stringifiedData);
    }

    async copy(): Promise<Category[]> {
        await fs.copyFile(this._jsonPath, `${this._jsonPath}-copy`);
        const data = await fs.readFile(`${this._jsonPath}-copy`, 'utf-8');
        const json = JSON.parse(data);
        return json;
    }

    async removeCopy(): Promise<void> {
        await fs.rm(`${this._jsonPath}-copy`);
    }

    async updateJSON(data: Category[]): Promise<void> {
        const copyData = await this.copy();
        try {
            await this.writeJSON(data);
            await this.removeCopy();
        } catch (error: unknown) {
            await this.writeJSON(copyData);
            await this.removeCopy();
        }
    }
}
