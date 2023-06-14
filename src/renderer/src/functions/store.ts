import { writable } from 'svelte/store';
import type Category from '../../../shared/interfaces/Category';
import type { RawSong } from '../../../shared/interfaces/Song';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createCategories() {
    const { subscribe, set, update } = writable<Category[]>([]);

    return {
        subscribe,
        updateCategories: (categories: Category[]): void => set(categories),
        addCategory: (category: Category): void => update((categories) => [...categories, category]),
        editCategory: (category: Category): void =>
            update((categories) => {
                const index = categories.findIndex((c) => c.id === category.id);
                if (index >= 0) {
                    const updatedCategory = { ...categories[index], ...category };
                    categories[index] = updatedCategory;
                }
                return categories;
            }),
        removeCategory: (categoryID: string): void => update((categories) => categories.filter((category) => category.id !== categoryID)),
        addSong: (song: RawSong): void =>
            update((categories) => {
                const index = categories.findIndex((c) => c.id === song.categoryID);
                if (index >= 0) {
                    categories[index].songs.push(song);
                }
                return categories;
            }),
        editSong: (song: RawSong): void =>
            update((categories) => {
                for (const category of categories) {
                    const songIndex = category.songs.findIndex((s) => s.id === song.id);
                    if (songIndex >= 0) {
                        const updatedSong = { ...category.songs[songIndex], ...song };
                        category.songs[songIndex] = updatedSong;
                        break;
                    }
                }
                return categories;
            }),
        removeSong: (categoryID: string, songID: string): void =>
            update((categories) => {
                const index = categories.findIndex((c) => c.id === categoryID);
                if (index >= 0) {
                    categories[index].songs = categories[index].songs.filter((song) => song.id !== songID);
                }
                return categories;
            }),
        reset: (): void => set([]),
    };
}

export const categories = createCategories();
