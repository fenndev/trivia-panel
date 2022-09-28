const path = require('path');
const fs = require('fs-extra');
const __dirname = global.__dirname;
const nw = require('nw.gui');
import { greetings } from './test';
import { Question, Category } from './modules/aggregate';
import App from './App.svelte';

const app = new App({
    target: document.body
});