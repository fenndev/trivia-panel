import FileData from './FileData';

export default interface SongData {
    categoryID: string;
    songName: string;
    songFile: FileData;
    gameName: string;
    gameImageFile: FileData;
    pointValue: number;
}
