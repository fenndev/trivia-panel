import SongData from '../../shared/interfaces/SongData';
import Category from '../../shared/classes/Category';

export default class SongManager {
    public createSong(id: string, songName: string, songPath: string, gameName: string, gameImagePath: string, pointValue: number): SongData {
        const song: SongData = {
            id,
            songName,
            songPath,
            gameName,
            gameImagePath,
            pointValue,
        };
        return song;
    }
    public addSong(song: SongData, category: Category): Category {
        category.songs.push(song);
        return category;
    }
}
