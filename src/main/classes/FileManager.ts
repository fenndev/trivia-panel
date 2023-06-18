import Category from '../../shared/interfaces/Category';
import Collection from '../../shared/classes/Collection';
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

    // Handle catastrophic failure and exit gracefully.
    private async ensureResourceStructure(): Promise<void> {
        try {
            await fs.ensureDir(this._resourcePath);
            await fs.ensureFile(this._jsonPath);
            await fs.ensureDir(this._categoriesPath);
        } catch (error: unknown) {
            console.error('Error while ensuring resource structure: ', error);
            process.exit(1);
        }
    }

    public async getCategories(): Promise<Category[]> {
        try {
            return await this.readJSON();
        } catch (error: unknown) {
            console.error('Error parsing JSON: ', error);
            return [];
        }
    }

    // File Handling

    private async handle(fileData: FileData, categoryID: string): Promise<string> {
        try {
            const categoryPath = join(this._categoriesPath, categoryID);
            await fs.ensureDir(categoryPath);
            const filePath = join(categoryPath, fileData.filename);
            await fs.writeFile(filePath, Buffer.from(fileData.buffer));
            return filePath;
        } catch (error: unknown) {
            console.error('Error handling file: ', error);
            return '';
        }
    }

    public handleFiles(fileData: FileData[], categoryID: string): string[] {
        const filePaths: string[] = [];
        fileData.forEach(async (file) => {
            filePaths.push(await this.handle(file, categoryID));
        });
        return filePaths;
    }

    public syncJSON(data: object): void {
        this.writeJSON(data);
    }

    async readJSON(): Promise<Category[]> {
        const data = await fs.readFile(this._jsonPath, 'utf8');
        const categories = JSON.parse(data) as Category[];
        return categories;
    }

    async writeJSON(data: object): Promise<void> {
        console.log(data);
        const stringifiedData = JSON.stringify(data, null, 4);
        console.log(stringifiedData);
        await fs.outputFile(this._jsonPath, stringifiedData);
    }

    async copy(): Promise<Collection> {
        await fs.copyFile(this._jsonPath, `${this._jsonPath}-copy`);
        const data = await fs.readFile(`${this._jsonPath}-copy`, 'utf-8');
        const json = JSON.parse(data);
        return json;
    }

    async removeCopy(): Promise<void> {
        await fs.rm(`${this._jsonPath}-copy`);
    }

    async updateJSON(data: object): Promise<void> {
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
