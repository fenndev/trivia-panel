<script lang='ts'>
    import type { Question } from './interfaces/question';
    import type { Category } from './interfaces/category';
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