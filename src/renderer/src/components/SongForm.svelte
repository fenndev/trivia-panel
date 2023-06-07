<script lang="ts">
    import type Song from '../../../shared/interfaces/Song';
    import getFileData from '../functions/getFileData';
    import getFormInputValue from '../functions/getFormInputValue';
    import getFormFileInput from '../functions/getFormFileInput';
    import { getFormSelectValue } from '../functions/getFormInputValue';
    import type Category from '../../../shared/classes/Category';
    import getCategories from '../functions/getCategories';
    import createID from '../../../shared/functions/createID';
    let categories: Category[] = [];
    let hasCategories: boolean = false;

    async function submitSong(event: Event) {
        const form = event.currentTarget as HTMLFormElement;
        const gameName = getFormInputValue(form, 'game-name');
        const songName = getFormInputValue(form, 'song-name');
        let categorySelected: string;
        if (hasCategories) categorySelected = getFormSelectValue(form, 'category-name');
        else categorySelected = getFormInputValue(form, 'category-name');
        const pointValue = parseInt(getFormInputValue(form, 'point-value'));
        const imageFile = getFormFileInput(form, 'image-file');
        const songFile = getFormFileInput(form, 'song-file');
        const songData: Song = {
            songName,
            gameName,
            songFile: await getFileData(songFile),
            imageFile: await getFileData(imageFile),
            pointValue,
            categoryID: createID(categorySelected),
            categoryName: categorySelected,
        };
        //@ts-ignore
        window.api.sendFile(songData);
        hasCategories = true;
        categories = await getCategories();
    }
</script>

<form on:submit|preventDefault={(e) => submitSong(e)}>
    {#if !hasCategories}
        <div class="input-item">
            <label for="category-name">Category Name:</label>
            <input required type="text" name="category-name" id="category-name" />
        </div>
    {:else}
        <div class="input-item">
            <label for="category-list">Categories:</label>
            <select required name="category-list" id="category-list">
                {#each categories as category}
                    <option value={category.id}>{category.name}</option>
                {/each}
            </select>
        </div>
    {/if}
    <div class="input-item">
        <label for="game-name">Game Name:</label>
        <input required type="text" name="game-name" id="game-name" />
    </div>
    <div class="input-item">
        <label for="song-name">Song Name:</label>
        <input required type="text" name="song-name" id="song-name" />
    </div>
    <div class="input-item">
        <label for="game-file">Game Image:</label>
        <input required type="file" name="image-file" id="image-file" accept="image/*" />
    </div>
    <div class="input-item">
        <label for="audio-file">Song File:</label>
        <input required type="file" name="song-file" id="song-file" accept="audio/*" />
    </div>
    <div class="input-item">
        <label for="point-value">Point Value:</label>
        <input required type="number" name="point-value" id="point-value" accept="audio/*" />
    </div>

    <button type="submit">Submit</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
