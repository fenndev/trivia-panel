import type { Song } from '../interfaces/Song';

export default function calculatePointsTotal(songs: Song[]): number {
    return songs.reduce((total, song) => total + song.pointValue, 0);
}
