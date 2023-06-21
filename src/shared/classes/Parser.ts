import type { Song, RawSong, ParsedSong } from '../interfaces/Song';
import type FileData from '../interfaces/FileData';
import type Category from '../interfaces/Category';
import type ParsedCategories from '../interfaces/ParsedCategories';
import Collection from './Collection';
import parseID from '../functions/parseID';
export default class Parser {
    public collectionToJSON(collection: Collection): ParsedCategories {
        const jsonObject = {};
        Array.from(collection.getCategories()).forEach((value) => {
            const pointTotal = collection.calculatePointTotal(parseID(value.name));
            jsonObject[parseID(value.name)] = {
                name: value.name,
                pointTotal,
                songs: Array.from(value.songs.values()).reduce((acc, song) => {
                    const { songName, gameName, songPath, gameImagePath, pointValue } = song as ParsedSong;
                    acc[parseID(songName)] = {
                        songName,
                        gameName,
                        songPath,
                        gameImagePath,
                        pointValue,
                    };
                    return acc;
                }, {}),
            };
        });
        return jsonObject;
    }

    public jsonToCollection(data: ParsedCategories): Collection {
        const collection = new Collection();
        const values = Object.values(data);
        values.forEach((value) => {
            if (this.isCategory(value)) {
                const id = parseID(value.name);
                collection.addCategory(value, id);
                const songs = Object.values(data[id].songs);
                songs.forEach((song) => {
                    if (this.isParsedSong(song)) collection.addSong(song, id);
                });
            }
        });
        return collection;
    }

    public songToRawSong(song: Song, imageFile: FileData, songFile: FileData): RawSong {
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

    songToParsedSong(song: Song, gameImagePath: string, songPath: string): ParsedSong {
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

    public isCategory(data: object): data is Category {
        return 'name' in data && 'pointTotal' in data && 'songs' in data;
    }

    public isSong(data: object): data is Song {
        return 'songName' in data && 'gameName' in data && 'pointValue' in data;
    }

    public isRawSong(data: Song): data is RawSong {
        return 'songFile' in data && 'imageFile' in data;
    }

    public isParsedSong(data: Song): data is ParsedSong {
        return 'songPath' in data && 'gameImagePath' in data;
    }
}
