import type { Song } from './Song';
interface Category {
    name: string;
    id: string;
    pointTotal: number;
    songs: Song[];
}

export default Category;
