import type Song from './Song'

export default class Category {
  private totalPoints: number
  constructor(private categoryName: string, private songList: Song[]) {
    this.calculatePointTotal()
  }

  // Getters

  public get name(): string {
    return this.categoryName
  }

  public set name(name: string) {
    this.name = name
  }

  public get songs(): Song[] {
    return this.songs
  }

  public set songs(songs: Song[]) {
    this.songs = songs
  }

  public get songTotal(): number {
    return this.songs.length
  }

  public getSong(songIndex: number): Song {
    return this.songs[songIndex]
  }

  public get points(): number {
    return this.totalPoints
  }

  public set points(pointTotal: number) {
    if (pointTotal <= 0) throw new Error('Point total cannot be less than or equal to 0!')
    else if (pointTotal != this.calculatePointTotal())
      throw new Error(
        'Point total does not match the sum of the point values of the songs in this category!'
      )
    else if (pointTotal < this.songTotal)
      throw new Error('Point total cannot be less than the amount of songs in this category!')
    else this.totalPoints = pointTotal
  }

  public calculatePointTotal(): number {
    this.totalPoints = 0
    this.songs.forEach((song) => {
      this.totalPoints += song.points
    })
    return this.totalPoints
  }
}
