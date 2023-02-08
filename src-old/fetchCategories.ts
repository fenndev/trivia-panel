import { parse } from 'yaml';
import Song from './classes/Song';
import Category from './classes/Category';
const path = require('path');
const __dirname = global.__dirname;
const fs = require('fs-extra');
const resourceReference: string = path.resolve(__dirname, "resources\\trivia.yaml");

async function fetchCategories() {
    const categories = await fs.readFile(resourceReference, 'utf8');
    const parsed = await parse(categories).categories;
    const parsedCategories: Category[] = [];
    parsed.forEach(category => { parsedCategories.push(parseToCategory(category)) });
    return parsedCategories;
}

function parseToCategory(category: any): Category {
    const songs: Song[] = [];
    category.songs.forEach(song => { songs.push(parseToSong(song)); });
    let newCategory = new Category(category.name, songs);
    if(category.pointTotal) newCategory.setPointTotal(category.pointTotal);
    else newCategory.calculatePointTotal();
    return newCategory;
}

const parseToSong = (song: any): Song => new Song(song.songTitle, song.gameTitle, song.songPath, song.imagePath, song.pointValue);

export default fetchCategories;