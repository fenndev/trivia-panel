import App from './App.svelte';
const nw = require('nw.gui');
import testCategories from './TestCategories';

async function test() {
    await testCategories();
};

const app = new App({
    target: document.body
});

nw.Window.get().showDevTools();
test();