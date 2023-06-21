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
        console.log(categories);
    };
</script>

<main>
    {#if collection}
        {#each categories as category}
            <h1>{category.name}</h1>
            <h2>{category.pointTotal}</h2>
            {#each [...category.songs.entries()] as [key, value]}
                {console.log(key)}
                <h3>{value.songName}, from {value.gameName}</h3>
                <h4>{value.pointValue}</h4>
                {#if parser.isParsedSong(value)}
                    <img src={value.gameImagePath} alt="Art of the video game" />
                    <audio src={value.songPath} />
                {/if}
            {/each}
        {/each}
    {/if}
</main>
