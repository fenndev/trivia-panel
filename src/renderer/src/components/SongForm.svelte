<script lang="ts">
    import type { RawSong } from '../../../shared/interfaces/Song';
    import getFileData from '../functions/getFileData';
    import getFormInputValue from '../functions/getFormInputValue';
    import getFormFileInput from '../functions/getFormFileInput';
    import type Category from '../../../shared/interfaces/Category';
    import getCategories from '../functions/getCategories';
    let categories: Category[] = [];

    async function submitSong(event: Event) {
        const form = event.currentTarget as HTMLFormElement;
        const gameName = getFormInputValue(form, 'game-name');
        const songName = getFormInputValue(form, 'song-name');
        const categorySelected = getFormInputValue(form, 'category-name');
        const pointValue = parseInt(getFormInputValue(form, 'point-value'));
        const imageFile = getFormFileInput(form, 'image-file');
        const songFile = getFormFileInput(form, 'song-file');
        const songData: RawSong = {
            songName,
            gameName,
            songFile: await getFileData(songFile),
            imageFile: await getFileData(imageFile),
            pointValue,
        };
        //@ts-ignore
        window.api.sendFile(songData);
    }
</script>

<form on:submit|preventDefault={(e) => submitSong(e)}>
    <div class="input-item">
        <label for="category-name">Category Name:</label>
        <input required type="text" name="category-name" id="category-name" />
    </div>
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
