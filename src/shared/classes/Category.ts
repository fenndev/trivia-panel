import Song from '../interfaces/Song';

export default class Category {
    name: string;
    id: string;
    songs: Song[];

    constructor(name: string, id: string, songs: Song[]) {
        this.name = name;
        this.id = id;
        this.songs = songs;
    }

    get pointTotal(): number {
        return this.calculatePointsTotal();
    }

    private calculatePointsTotal(): number {
        return this.songs.reduce((total, song) => total + song.pointTotal, 0);
    }
}
