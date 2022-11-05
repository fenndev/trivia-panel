import App from './App.svelte';
const nw = require('nw.gui');


const app = new App({
    target: document.body
});

nw.Window.get().showDevTools();