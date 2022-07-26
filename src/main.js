const fs = require('fs-extra');
const path = require('path');

// Song Class

class Song {
    constructor(name, gameImage, songFile) {
        this.name = name;
        this.gameImage = gameImage;
        this.songFile = songFile;
    }
}

// Category Class

class Category {
    songArray = [];

    constructor(categoryName) {
        this.categoryName = categoryName;
    }

    addSong(song) {
        this.songArray.push(song);
    }

    removeSong(song) {
        this.songArray.splice(this.songArray.indexOf(song), 1);
    }

    getSong(index) {
        return this.songArray[index];
    }
}


class CategoryManager {
    categoryFolder = path.join(__dirname, 'categories');
    currentCategory;

    constructor() {

    }

    async initialize() {
        await findAllCategories();
    }

    async findAllCategories() {
        let categoryJSONFile = path.resolve(this.categoryFolder, 'categories.json');
        let categories = await fs.readJSON(categoryJSONFile);



    }

    setCurrentCategory(category) {
        this.currentCategory = category;
    }

    getCurrentCategory() {
        return this.currentCategory;
    }
};

// Category Creation

async function createCategory(categoryName) {
    let category = new Category(categoryName);
    
}

function createCategory(categoryName) {
    let category = new Category(categoryName);
    return category;
}

// Save Category

function saveCategory(category) {
    let categoryJSON = JSON.stringify(category);
    fs.writeFileSync(path.join(__dirname, 'categories', category.categoryName + '.json'), categoryJSON);
}

function loadCategories() {
    let categories = [];
    let categoryFiles = fs.readdirSync(path.join(__dirname, 'categories'));
    for(const category in categoryFiles) {
        let categoryJSON = fs.readFileSync(path.join(__dirname, 'categories', categoryFiles[category]));
        let categoryObject = JSON.parse(categoryJSON);
        categories.push(categoryObject);
    }
    return categories;
}


// UIManager Class

class UIManager {
    body;

    constructor() {
        this.body = document.body;
    }

    showSplashScreen() {

    }
}

// Main Application Loop

const App = (() => {
    const uiManager = new UIManager();

})();