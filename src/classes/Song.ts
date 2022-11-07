class Song {
    private songTitle: string;
    private gameTitle: string;
    private songPath: string;
    private imagePath: string;
    private pointValue: number;

    constructor(songTitle: string, gameTitle: string, songPath: string, imagePath: string, pointValue: number) {
        this.songTitle = songTitle;
        this.gameTitle = gameTitle;
        this.songPath = songPath;
        this.imagePath = imagePath;
        this.pointValue = pointValue;
    }

    getSongTitle(): string {
        return this.songTitle;
    }

    getGameTitle(): string {
        return this.gameTitle;
    }

    getSongPath(): string {
        return this.songPath;
    }

    getImagePath(): string {
        return this.imagePath;
    }

    getPointValue(): number {
        return this.pointValue;
    }

    setSongTitle(songTitle: string): void {
        this.songTitle = songTitle;
    }

    setGameTitle(gameTitle: string): void {
        this.gameTitle = gameTitle;
    }

    setSongPath(songPath: string): void {
        this.songPath = songPath;
    }

    setImagePath(imagePath: string): void {
        this.imagePath = imagePath;
    }

    setNewPointValue(pointValue: number): void {
        this.pointValue = pointValue;
    }
}

export default Song;