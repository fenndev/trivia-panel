import Collection from '../../../shared/classes/Collection';

export default async function getCategories(): Promise<Collection> {
    //@ts-ignore dfafd
    const data = await window.api.fetchCategories();
    if (data) {
        const collection: Collection = structuredClone(data);
        return collection;
    }
    return new Collection();
}
