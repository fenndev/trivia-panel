<script lang="ts">
    import type Category from '../../../shared/interfaces/Category';
    import getCategories from '../functions/getCategories';
    import isParsedSong from '../functions/isParsedSong';
    let categories: Category[];

    onload = async () => (categories = await getCategories());
</script>

<main>
    {#if categories}
        {#each categories as category}
            <h1>{category.name}</h1>
            <h2>{category.pointTotal}</h2>
            {#each category.songs as song}
                <h3>{song.songName}, from {song.gameName}</h3>
                <h4>{song.pointValue}</h4>
                {#if isParsedSong(song)}
                    <img src={song.gameImagePath} alt="Art of the video game" />
                    <audio src={song.songPath} />
                {/if}
            {/each}
        {/each}
    {/if}
</main>
