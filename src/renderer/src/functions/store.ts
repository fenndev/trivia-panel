import { writable } from 'svelte/store';
import type Category from '../../../shared/interfaces/Category';
import type { RawSong } from '../../../shared/interfaces/Song';
import Collection from '../../../shared/classes/Collection';
import parseID from '../../../shared/functions/parseID';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createCategories() {
    const _collection = new Collection();
    const { subscribe, set, update } = writable<Collection>(_collection);

    return {
        subscribe,
        updateCategories: (collection: Collection): void => set(collection),
        addCategory: (category: Category): void => {
            _collection.addCategory(category);
            update(() => _collection);
        },
        editCategory: (id: string, category: Category): void => {
            _collection.updateCategory(id, category);
            update(() => _collection);
        },
        removeCategory: (categoryID: string): void => {
            _collection.deleteCategory(categoryID);
            update(() => _collection);
        },
        addSong: (song: RawSong, categoryID: string): void => {
            _collection.addSong(song, categoryID);
            update(() => _collection);
        },
        editSong: (song: RawSong, categoryID: string): void => {
            const category = _collection.getCategory(categoryID);
            if (category) {
                const songID = parseID(song.songName);
                const currentSong = _collection.getSong(songID, categoryID);
                if (currentSong) {
                    const updatedSong = { ...currentSong, ...song };
                    _collection.deleteSong(songID, categoryID);
                    _collection.addSong(updatedSong, categoryID);
                }
            }
            update(() => _collection);
        },
        removeSong: (songID: string, categoryID: string): void => {
            _collection.deleteSong(songID, categoryID);
            update(() => _collection);
        },
        reset: (): void => set(new Collection()),
    };
}

export const categories = createCategories();
