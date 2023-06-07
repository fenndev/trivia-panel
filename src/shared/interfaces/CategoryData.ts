import type SongData from './SongData';
interface CategoryData {
    name: string;
    id: string;
    songs: SongData[];
}

export default CategoryData;
