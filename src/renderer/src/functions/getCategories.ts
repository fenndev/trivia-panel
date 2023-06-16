import type Category from '../../../shared/interfaces/Category';

export default async function getCategories(): Promise<Category[]> {
    const categories: Category[] = [];
    //@ts-ignore dfafd
    const categoryData: CategoryData[] = await window.api.fetchCategories();
    if (categoryData) {
        categoryData.forEach(({ name, id, songs }) => {
            const newCategory: Category = {
                name,
                pointTotal: calculatePointsTotal(songs),
                songs,
            };
            categories.push(newCategory);
        });
        return categories;
    }
    return [];
}
