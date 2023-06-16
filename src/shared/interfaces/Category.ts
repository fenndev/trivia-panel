import type { Song } from './Song';
interface Category {
    name: string;
    pointTotal: number;
    songs: Map<string, Song>;
}

export default Category;
