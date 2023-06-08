import type SongData from './SongData';
interface Category {
    name: string;
    id: string;
    pointTotal: number;
    songs: SongData[];
}

export default Category;
