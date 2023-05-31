import Song from './Song';
export default interface CategoryData {
    name: string;
    id?: string;
    songs: Song[];
}
