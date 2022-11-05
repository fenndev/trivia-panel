const path = require('path');
const fs = require('fs-extra');
const __dirname = global.__dirname;
import App from './App.svelte';
import { Question } from "./interfaces/question";
import { Category } from "./interfaces/category";

const app = new App({
    target: document.body
});

let categoryArray: [] = [];
const resourceReference = path.join(__dirname, 'resources', 'trivia.json');

function resourceExists(filePath: string) {
    try {
        return fs.statSync(filePath).isFile();
    }
    catch (err) {
        return false;
    }
}

function fetchCategories() {
    if(resourceExists(resourceReference)) {
        const categories = fs.readJsonSync(resourceReference);
        return categories;
    }
    else {
        console.log('Failed');
        return undefined;
    }
    
}

function createCategory(name: string) {
    
}