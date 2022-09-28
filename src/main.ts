const path = require('path');
const fs = require('fs-extra');
const __dirname = global.__dirname;
import App from './App.svelte';

const app = new App({
    target: document.body
});