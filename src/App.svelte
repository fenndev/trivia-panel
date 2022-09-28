<script lang='ts'>
    import { Question } from './modules/classes/Question';
    import { Category } from './modules/classes/Category';
    const questionObj: Question = {
        gameName : 'test',
        imagePath : 'test',
        songName : 'test',
        songPath : 'test',
        pointValue : 1,
        questionID : "1"
    }

    const newCategory: Category = {
        displayName : 'test',
        categoryID : '1',
        questions : [questionObj],
        pointTotal : questionObj.pointValue
    }
</script>

<h1>Hello World</h1>