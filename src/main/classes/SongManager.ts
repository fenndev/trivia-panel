import { Song, RawSong, ParsedSong } from '../../shared/interfaces/Song';
import { LookupTable } from '../../shared/classes/LookupTable';

export default class SongManager {
    private _songTable: LookupTable<Song>;

    constructor() {
        this._songTable = new LookupTable<Song>();
    }

    getSong(id: string): Song | undefined {
        return this._songTable.get(id);
    }

    songExists(id: string): boolean {
        return this._songTable.exists(id);
    }

    public deleteSong(songID: string): void {
        this._songTable.delete(songID);
    }

    public addSong(song: Song): void {
        this._songTable.add(song.id, song);
    }

    public addSongs(songs: Song[]): void {
        songs.forEach((song) => {
            this.addSong(song);
        });
    }

    public parseSong(song: Song, gameImagePath: string, songPath: string): ParsedSong {
        const { id, songName, gameName, pointValue } = song;
        const newSong: ParsedSong = {
            id,
            songName,
            gameName,
            songPath,
            gameImagePath,
            pointValue,
        };
        return newSong;
    }

    isRawSong(obj: Song): obj is RawSong {
        return 'songFile' in obj && 'imageFile' in obj;
    }
}
