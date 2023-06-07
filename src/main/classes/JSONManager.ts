import fs from 'fs-extra';
import CategoryData from '../../shared/interfaces/CategoryData';
import handleError from '../functions/handleError';

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

    update(data: CategoryData[]): void {
        const copyData = this.copy();
        try {
            this.write(data);
            this.removeCopy();
        } catch (error: unknown) {
            handleError(error);
            this.write(copyData);
            this.removeCopy();
        }
    }

    copy(): CategoryData[] {
        fs.copyFileSync(this._filePath, `${this._filePath}-copy`);
        const data = fs.readFileSync(`${this._filePath}-copy`, 'utf-8');
        const json = JSON.parse(data);
        return json;
    }

    removeCopy(): void {
        fs.rmSync(`${this._filePath}-copy`);
    }
}
