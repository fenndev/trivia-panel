import type FileData from './FileData';

// Common values between both `RawSong` and `ParsedSong`.
export interface Song {
    id: string;
    songName: string;
    gameName: string;
    pointValue: number;
}

// Represents a song containing the raw file data.
// Used by the `main` process to copy the files into
// a `resources` directory for use by the front-end
export interface RawSong extends Song {
    // raw file data for back-end file manipulation
    songFile: FileData;
    imageFile: FileData;
    categoryID: string;
}

// Represents a song as having been parsed from a
// JSON file on the back-end, containing filepaths
// to resources that are loaded by the front-end
export interface ParsedSong extends Song {
    songPath: string;
    gameImagePath: string;
}
