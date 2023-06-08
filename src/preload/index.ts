import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import SongData from '../shared/interfaces/Song';
import CategoryData from '../shared/interfaces/Category';

// Custom APIs for renderer
const api = {
    sendFile: (file: SongData): void => {
        console.log('Running!');
        ipcRenderer.send('new-file', file);
    },
    fetchCategories: async (): Promise<CategoryData[]> => {
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
