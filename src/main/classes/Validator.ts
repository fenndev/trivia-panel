import Song from '../../shared/interfaces/Song';
import CategoryData from '../../shared/interfaces/CategoryData';
import FileManager from './FileManager';
export default class Validator {
    private _fileManager: FileManager;
    constructor(fileManager: FileManager) {
        this._fileManager = fileManager;
    }
    public async validate(): Promise<boolean> {
        const categories = this._fileManager.getCategories();
        const errors: string[] = [];
        try {
            // Validate all the filepaths
            for (const category of categories) {
                if (!Array.isArray(category.songs)) {
                    errors.push(`Category does not have a 'songs' property, or it is not an array: ${JSON.stringify(category)}`);
                    continue;
                }
                for (const song of category.songs) {
                    // Validate the song file path
                    const songExists = song.songPath && this._fileManager.validateFile(song.songPath);
                    if (!songExists) {
                        errors.push(`Invalid or missing song file for song '${song.songName}' in '${category.name}': ${song.songPath}`);
                    }
                    // Validate the game image file path
                    const gameImageExists = song.gameImagePath && this._fileManager.validateFile(song.gameImagePath);
                    if (!gameImageExists) {
                        errors.push(`Invalid or missing game image file for song '${song.songName}' in '${category.name}': ${song.songPath}`);
                    }
                }
            }

            if (errors.length > 0) {
                console.error(`Validation failed: ${errors.length} errors detected.\n${errors.join('\n')}`);
                return false;
            }

            return true;
        } catch (error) {
            console.error(`Unknown error occurred: ${error}`);
            return false;
        }
    }

    // Compare two Songs and determine if they are the same
    public isSameSong(song1: Song, song2: Song): boolean {
        return (
            song1.id === song2.id &&
            song1.songName === song2.songName &&
            song1.songPath === song2.songPath &&
            song1.gameName === song2.gameName &&
            song1.gameImagePath === song2.gameImagePath &&
            song1.pointValue === song2.pointValue
        );
    }

    public isSameCategory(category1: CategoryData, category2: CategoryData): boolean {
        // Compare category names and IDs
        if (category1.name !== category2.name || category1.id !== category2.id) {
            return false;
        }

        // Compare song array lengths
        if (category1.songs.length !== category2.songs.length) return false;

        // Compare the actual songs
        for (let i = 0; i < category1.songs.length; i++) {
            if (!this.isSameSong(category1.songs[i], category2.songs[i])) return false;
        }

        return true;
    }
}
