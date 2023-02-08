import Song from '../src/classes/Song'
import Category from '../src/classes/Category'
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

  public get categoryList(): Category[] {
    return this.categories
  }
}
