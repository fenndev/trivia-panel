import Song from '../../shared/interfaces/Song';
import Category from '../../shared/classes/Category';

export default class SongManager {
    public createSong(id: string, songName: string, songPath: string, gameName: string, gameImagePath: string, pointValue: number): Song {
        const song: Song = {
            id,
            songName,
            songPath,
            gameName,
            gameImagePath,
            pointValue,
        };
        return song;
    }
    public addSong(song: Song, category: Category): Category {
        category.songs.push(song);
        return category;
    }
}
