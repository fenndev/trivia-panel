import fs from 'fs-extra';
import Category from './Category';

export default class Validator {
    private jsonPath = 'resources/mock.json';

    public async initialize(): Promise<void> {
        if (await this.validate(this.jsonPath)) console.log(`Successfully validated!`);
    }

    public async validate(filepath: string): Promise<boolean> {
        try {
            // Check if the file exists
            const fileExists = await fs.pathExists(filepath);
            if (!fileExists) {
                console.error(`File does not exist: ${filepath}`);
                return false;
            }

            // File exists, read its contents
            const data = await fs.readFile(filepath, 'utf8');
            // Parse the JSON data
            const categories: Category[] = JSON.parse(data);
            const errors: string[] = [];

            // Validate all the filepaths
            for (const category of categories) {
                if (!Array.isArray(category.songs)) {
                    errors.push(`Category does not have a 'songs' property, or it is not an array: ${JSON.stringify(category)}`);
                    continue;
                }
                for (const song of category.songs) {
                    // Validate the song file path
                    const songExists = song.songPath && (await fs.pathExists(song.songPath));
                    if (!songExists) {
                        errors.push(`Invalid or missing song file for song '${song.songName}' in '${category.name}': ${song.songPath}`);
                    }
                    // Validate the game image file path
                    const gameImageExists = song.gameImagePath && (await fs.pathExists(song.gameImagePath));
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
}
