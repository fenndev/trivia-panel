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
        editCategory: (category: Partial<Category>): void => {},
        removeCategory: (categoryID: string): void => {},
        addSong: (song: RawSong): void => {},
        editSong: (song: Partial<RawSong>): void => {},
        removeSong: (categoryID: string, songID: string): void => {},
        reset: (): void => set([]),
    };
}

export const categories = createCategories();
