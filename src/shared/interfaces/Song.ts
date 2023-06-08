import FileData from './FileData';

export default interface Song {
    id: string;
    songName: string;
    gameName: string;
    songFile: FileData;
    imageFile: FileData;
    pointValue: number;
    categoryID: string;
    categoryName?: string;
}
