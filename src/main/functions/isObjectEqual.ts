import Song from '../../shared/interfaces/Song';

export default function isObjectEqual(obj1: Song, obj2: Song): boolean {
    return (
        obj1.id === obj2.id &&
        obj1.songName === obj2.songName &&
        obj1.songPath === obj2.songPath &&
        obj1.gameName === obj2.gameName &&
        obj1.gameImagePath === obj2.gameImagePath &&
        obj1.pointValue === obj2.pointValue
    );
}
