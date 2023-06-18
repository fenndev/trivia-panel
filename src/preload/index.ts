import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { RawSong } from '../shared/interfaces/Song';
import type Category from '../shared/interfaces/Category';
import type Collection from '../shared/classes/Collection';

// Custom APIs for renderer
const api = {
    sendFile: (file: RawSong, categoryID: string): void => {
        console.log('Running!');
        ipcRenderer.send('new-file', file, categoryID);
    },
    addCategory: (category: Category): void => {
        console.log('Adding category: ', category);
        ipcRenderer.send('new-category', category);
    },
    fetchCategories: async (): Promise<Collection> => {
        return await ipcRenderer.invoke('fetch-categories');
    },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
    } catch (error) {
        console.error(error);
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI;
    // @ts-ignore (define in dts)
    window.api = api;
}
