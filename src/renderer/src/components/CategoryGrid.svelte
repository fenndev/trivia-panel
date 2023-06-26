<script lang="ts">
    import type Collection from '../../../shared/classes/Collection';
    import Parser from '../../../shared/classes/Parser';
    import type Category from '../../../shared/interfaces/Category';
    import getCategories from '../functions/getCategories';
    let collection: Collection;
    let categories: Category[];
    let parser: Parser;
    onload = async () => {
        parser = new Parser();
        collection = parser.jsonToCollection(await getCategories());
        categories = collection.getCategories();
        Array.from(categories.values()).forEach((category) => {
            console.log('Category: ');
            console.log(category);
            console.log('Songs:');
            console.log(category.songs);
            Array.from(category.songs.values()).forEach((song) => {
                console.log(song);
            });
        });
    };
</script>

<main>
    {#if collection}
        {#each categories as category}
            <h1>{category.name}</h1>
            <h2>{category.pointTotal}</h2>
            {#each Array.from(category.songs.values()) as value}
                <h3>{value.songName}, from {value.gameName}</h3>
                <h4>{value.pointValue}</h4>
                {#if parser.isParsedSong(value)}
                    <img src={value.gameImagePath} alt="Art of the video game" />
                    <audio src={value.songPath} controls />
                {/if}
            {/each}
        {/each}
    {/if}
</main>

<style>
    img {
        max-width: 100%;
        height: auto;
    }
</style>
