import type Category from "./classes/Category";
import Song from "./classes/Song";
import fetchCategories from "./fetchCategories";

async function testCategories() {
    console.log("Testing categories...")
    const categories: Category[] = await fetchCategories();
    console.log(categories);
}

export default testCategories;