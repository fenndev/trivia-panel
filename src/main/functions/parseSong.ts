import FileData from '../../shared/interfaces/FileData';
import type { Song, ParsedSong, RawSong } from '../../shared/interfaces/Song';

export function toParsedSong(song: Song, gameImagePath: string, songPath: string): ParsedSong {
    const { songName, gameName, pointValue } = song;
    const parsedSong: ParsedSong = {
        songName,
        gameName,
        songPath,
        gameImagePath,
        pointValue,
    };
    return parsedSong;
}

export function toRawSong(song: Song, imageFile: FileData, songFile: FileData): RawSong {
    const { songName, gameName, pointValue } = song;
    const rawSong: RawSong = {
        songName,
        gameName,
        songFile,
        imageFile,
        pointValue,
    };
    return rawSong;
}
