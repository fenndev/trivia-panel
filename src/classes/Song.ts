export default class Song {
  constructor(
    private songName: string,
    private gameName: string,
    private songPath: string,
    private imagePath: string,
    private pointValue: number
  ) {}

  public get songTitle(): string {
    return this.songName
  }

  public set songTitle(songTitle: string) {
    this.songName = songTitle
  }

  public get gameTitle(): string {
    return this.gameName
  }

  public set gameTitle(gameTitle: string) {
    this.gameName = gameTitle
  }

  public get audio(): string {
    return this.songPath
  }

  public set audio(songPath: string) {
    this.songPath = songPath
  }

  public get image(): string {
    return this.imagePath
  }

  public set image(imagePath: string) {
    this.imagePath = imagePath
  }

  public get points(): number {
    return this.pointValue
  }

  public set points(pointValue: number) {
    this.pointValue = pointValue
  }
}
