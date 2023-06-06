<script lang="ts">
    import type SongData from '../../../shared/interfaces/SongData';
    import type FileData from '../../../shared/interfaces/FileData';
    async function submitSong(event: Event) {
        const form = event.currentTarget as HTMLFormElement;
        const gameName = (form.elements.namedItem('game-name') as HTMLInputElement).value;
        const songName = (form.elements.namedItem('song-name') as HTMLInputElement).value;
        const pointValue = parseInt((form.elements.namedItem('point-value') as HTMLInputElement).value);
        const imageFile = (form.elements.namedItem('image-file') as HTMLInputElement).files[0];
        const songFile = (form.elements.namedItem('song-file') as HTMLInputElement).files[0];
        const categoryID = 'anything-goes';
        const imageFileData: FileData = {
            filename: imageFile.name,
            extension: imageFile.name.slice(imageFile.name.lastIndexOf('.') + 1),
            buffer: await imageFile.arrayBuffer(),
        };

        const songFileData: FileData = {
            filename: songFile.name,
            extension: songFile.name.slice(songFile.name.lastIndexOf('.') + 1),
            buffer: await songFile.arrayBuffer(),
        };

        const songData: SongData = {
            songName,
            gameName,
            songFile: songFileData,
            imageFile: imageFileData,
            pointValue,
            categoryID,
        };
        //@ts-ignore
        window.api.sendFile(songData);
    }
</script>

<form on:submit|preventDefault={(e) => submitSong(e)}>
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
