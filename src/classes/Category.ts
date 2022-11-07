import type Song from './Song';

export default class Category {
    private name: string;
    private songs: Song[];
    private pointTotal: number;

    constructor(name: string, songs: Song[], pointTotal?: number) {
        this.name = name;
        this.songs = songs;
        if(pointTotal) this.pointTotal = pointTotal;
        else this.calculatePointTotal();
    }

    // Getters

    getName(): string { return this.name; }

    getSongs(): Song[] { return this.songs; }

    getPointTotal(): number { return this.pointTotal; }

    getSongAmount(): number { return this.songs.length; }

    getSong(songIndex: number): Song { return this.songs[songIndex] }

    // Setters

    setName(name: string): void { this.name = name; }

    setSongs(songs: Song[]): void { this.songs = songs };

    setPointTotal(pointTotal: number): void {
        if(pointTotal <= 0) throw new Error('Point total cannot be less than or equal to 0!');
        else if(pointTotal != this.calculatePointTotal()) throw new Error('Point total does not match the sum of the point values of the songs in this category!');
        else if(pointTotal < this.getSongAmount()) throw new Error('Point total cannot be less than the amount of songs in this category!');
        else this.pointTotal = pointTotal;
    }

    calculatePointTotal(): number {
        this.pointTotal = 0;
        this.songs.forEach(song => {
            this.pointTotal += song.getPointValue() 
        });
        return this.pointTotal;
    };
}