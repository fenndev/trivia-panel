export class LookupTable<T> {
    private _table: { [key: string]: T };

    constructor() {
        this._table = {};
    }

    public exists(id: string): boolean {
        return !!this._table[id];
    }

    public get(id: string): T | undefined {
        return this._table[id];
    }

    public add(id: string, item: T): void {
        if (!this.exists(id)) {
            this._table[id] = item;
        }
    }

    public delete(id: string): void {
        if (this.exists(id)) {
            delete this._table[id];
        }
    }

    public getAll(): T[] {
        return Object.values(this._table);
    }
}
