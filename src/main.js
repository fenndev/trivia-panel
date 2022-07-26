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
