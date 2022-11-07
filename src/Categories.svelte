<!-- <script lang="ts">
    import fetchCategories from "./fetchCategories";
    let promise = fetchCategories();
</script>

{#await promise}
    <p>loading...</p>
    {console.log('loading...')}
{:then categories}
    <ul>
        {console.log(categories)}
        {#each categories as category}
            {console.log(category.name)}
            <li>{category.name}</li>
        {/each}
    </ul>
{:catch error}
    <p>{error.message}</p>
{/await} -->