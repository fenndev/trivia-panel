import SongData from '../interfaces/SongData';

export default function calculatePointsTotal(songs: SongData[]): number {
    return songs.reduce((total, song) => total + song.pointValue, 0);
}
