import type { Song } from './Song';

export default interface Category {
    name: string;
    pointTotal: number;
    songs: Map<string, Song>;
}
