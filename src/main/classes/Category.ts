import Song from '../interfaces/Song';

export default class Category {
    name: string;
    songs: Song[];
    id: string;

    constructor(name: string, songs: Song[], id: string) {
        this.name = name;
        this.songs = songs;
        this.id = id;
    }

    get pointTotal(): number {
        return this.calculatePointsTotal();
    }

    private calculatePointsTotal(): number {
        return this.songs.reduce((total, song) => total + song.pointTotal, 0);
    }
}
