<script lang="ts">
    import { ipcRenderer } from "electron";
    import { categories } from '../../../store'
    function addCategory(event) {
        const formData = new FormData(event.target)
        const newCategory = {
            name: formData.get('name'),
            songs: []
        }
        ipcRenderer.send('new-category-data', newCategory)     
    }

    ipcRenderer.on('new-category-created', (_event: any, newCategories) => {
        categories.set(newCategories)
    }) 
</script>

<form on:submit|preventDefault={addCategory}>
    <input type="text" name="name" placeholder="Category Name" />
    <button type="submit">Create Category</button>
  </form>