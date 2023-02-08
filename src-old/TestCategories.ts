import type Category from "./classes/Category";
import Song from "./classes/Song";
import fetchCategories from "./fetchCategories";

async function testCategories() {
    const categories: Category[] = await fetchCategories();
    console.log(categories);
}

export default testCategories;