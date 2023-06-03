import fs from 'fs-extra';
import CategoryData from '../../shared/interfaces/CategoryData';

export default class JSONManager {
    private _filePath: string;

    constructor(filePath: string) {
        this._filePath = filePath;
    }

    async read(): Promise<CategoryData[]> {
        const data = await fs.readFile(this._filePath, 'utf8');
        const categories = JSON.parse(data) as CategoryData[];
        return categories;
    }

    async write(data: CategoryData[]): Promise<void> {
        const stringifiedData = JSON.stringify(data, null, 4);
        await fs.outputFile(this._filePath, stringifiedData);
    }
}
