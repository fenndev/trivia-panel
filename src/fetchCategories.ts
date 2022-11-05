import { parse, stringify } from 'yaml';
const path = require('path');
const __dirname = global.__dirname;
const fs = require('fs-extra');
const resourceReference: string = path.resolve(__dirname, "resources\\dataStructure.yaml");
async function fetchCategories() {
    console.log("Fetching categories from " + resourceReference);
    const categories = await fs.readFile(resourceReference, 'utf8');
    const parsed = await parse(categories);
    return parsed.categories;
}

export default fetchCategories;