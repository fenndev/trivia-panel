import Category from '../../../shared/classes/Category';
import type CategoryData from '../../../shared/interfaces/CategoryData';

export default async function getCategories(): Promise<Category[]> {
    const categories: Category[] = [];
    //@ts-ignore dfafd
    const categoryData: CategoryData[] = await window.api.fetchCategories();
    if (categoryData) {
        categoryData.forEach((category) => {
            categories.push(new Category(category.name, category.id, category.songs));
        });
        return categories;
    }
    return [];
}
