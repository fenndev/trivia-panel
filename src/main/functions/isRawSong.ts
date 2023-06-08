import type { Song, RawSong } from '../../shared/interfaces/Song';
export default function isRawSong(obj: Song): obj is RawSong {
    return 'songFile' in obj && 'imageFile' in obj;
}
