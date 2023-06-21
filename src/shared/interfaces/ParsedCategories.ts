import type { ParsedSong } from './Song';

export default interface ParsedCategories {
    [categoryID: string]: {
        name: string;
        pointTotal: number;
        songs: {
            [id: string]: ParsedSong;
        };
    };
}
