import Song from './Song'
import Category from './Category'
const fs = require('fs-extra')

export default class CategoryManager {
  private filePath = '../trivia.json'
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  private async readData(): Promise<string> {
    try {
      return await fs.readFile(this.filePath, 'utf8')
    } catch (error) {
      throw new Error(error)
    }
  }

  private parseData(data: string): void {
    const parsedData = JSON.parse(data)
    this.categories = parsedData.map((categoryData) => {
      const songs = categoryData.songs.map(
        (songData) =>
          new Song(
            songData.songTitle,
            songData.gameName,
            songData.song,
            songData.image,
            songData.points
          )
      )
      return new Category(categoryData.name, songs)
    })
  }

  public async loadCategories(): Promise<void> {
    try {
      const data = await this.readData()
      this.parseData(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  public async testValues(): Promise<{ name: string; missingFiles: string[] }> {
    try {
      const data = await this.readData()
      const parsedData = JSON.parse(data)

      const result = parsedData.categories.map((category) => {
        const missingFiles: string[] | undefined = category.songs
          .filter((song) => !fs.pathExistsSync(song.audio) || !fs.pathExistsSync(song.image))
          .map((song) => {
            const missing: string[] = []
            if (!fs.pathExistsSync(song.audio)) missing.push(song.audio)
            if (!fs.pathExistsSync(song.image)) missing.push(song.image)
            return missing
          })
          .flat()

        return {
          name: category.name,
          missingFiles
        }
      })
      return result
    } catch (error) {
      throw new Error(error)
    }
  }

  public get categoryList(): Category[] {
    return this.categories
  }
}
