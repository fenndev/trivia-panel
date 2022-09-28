const path = require('path');
const fs = require('fs-extra');
const __dirname = global.__dirname;
import App from './App.svelte';

const app = new App({
    target: document.body
});

function fetchResourceReference() {
    return path.resolve('./resources/trivia.json');
}

function fetchCategories() {
    const resourceReference = fetchResourceReference();
    const categories = fs.readJsonSync(resourceReference);
    console.log(categories);
    return categories;
}

fetchCategories();