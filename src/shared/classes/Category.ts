import CategoryData from '../interfaces/CategoryData';
import SongData from '../interfaces/SongData';

export default class Category implements CategoryData {
    name: string;
    id: string;
    songs: SongData[];

    constructor(name: string, id: string, songs: SongData[]) {
        this.name = name;
        this.id = id;
        this.songs = songs;
    }

    get pointTotal(): number {
        return this.calculatePointsTotal();
    }

    private calculatePointsTotal(): number {
        return this.songs.reduce((total, song) => total + song.pointValue, 0);
    }
}
