const path = require('path');
const fs = require('fs-extra');
const __dirname = global.__dirname;
const nw = require('nw.gui');
import { greetings } from './test';
import { Question, Category } from './modules/aggregate';

const App = (() => {
    nw.Window.get().showDevTools();
    console.log(greetings);
    let newQuestionArray: Question[] = [];
    newQuestionArray.push(new Question("test", "test", "test", "test", 5, "test"));
    let newCategory = new Category('New Category', 'New Category Description', newQuestionArray);
    console.log(newCategory)
})();