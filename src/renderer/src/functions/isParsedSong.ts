import type { Song, ParsedSong } from '../../../shared/interfaces/Song';
export default function isParsedSong(obj: Song): obj is ParsedSong {
    return 'songPath' in obj && 'gameImagePath' in obj;
}
