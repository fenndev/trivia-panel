// Question Class

class Question {
    public gameName: string;
    public imagePath: string;
    public songName: string;
    public songPath: string;
    public pointValue: number;
    public questionID: string;

    constructor(gameName: string, imagePath: string, songName: string, songPath: string, pointValue: number, questionID: string) {
        this.gameName = gameName;
        this.imagePath = imagePath;
        this.songName = songName;
        this.songPath = songPath;
        this.pointValue = pointValue;
        this.questionID = questionID;
    }
}

export { Question };