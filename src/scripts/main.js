const path = require('path');
const fs = require('fs-extra');
const __dirname = global.__dirname;

const App = (() => {
    nw.Window.get().showDevTools();
})();