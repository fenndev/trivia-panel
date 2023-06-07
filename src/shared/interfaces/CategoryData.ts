import Song from './SongData';
export default interface CategoryData {
    name: string;
    id: string;
    songs: Song[];
}
