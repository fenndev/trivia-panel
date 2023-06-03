import fs from 'fs-extra';
import CategoryData from '../../shared/interfaces/CategoryData';

export default class JSONManager {
    private _filePath: string;

    constructor(filePath: string) {
        this._filePath = filePath;
    }
    read(): CategoryData[] {
        const data = fs.readFileSync(this._filePath, 'utf8');
        const categories = JSON.parse(data) as CategoryData[];
        return categories;
    }

    write(data: CategoryData[]): void {
        const stringifiedData = JSON.stringify(data, null, 4);
        fs.outputFileSync(this._filePath, stringifiedData);
    }
}
