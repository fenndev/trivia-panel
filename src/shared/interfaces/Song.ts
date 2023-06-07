import FileData from './FileData';

export default interface Song {
    songName: string;
    gameName: string;
    songFile: FileData;
    imageFile: FileData;
    pointValue: number;
    categoryID: string;
}
