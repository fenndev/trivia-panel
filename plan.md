# Video Game Music Trivia
A simple application built with Javascript, HTML5, and CSS3 that allows users to play a guessing game with music.

## Application Flow

**Play:**

Upon opening the application, the user is presented with a splash screen. The splash screen contains a logo, a title, a subtitle, and a button. The button is labeled "Start".

If the user clicks the button, the splash screen disappears and the game begins. The game reads a JSON file and, using the data within, generates a list of categories. The users are presented with that list of categories, each containing a list of questions and an assigned point total. Players are allowed to select one category at a time.

Upon selecting a category, the game presents the user with the first question in that category. A placeholder image is displayed on-screen while an audio player is loaded with the audio file for the question. The audio file plays when the host clicks the "Play" button. The game listens for an event that is fired whenever users click their button, which is assigned a keyboard key. The user that clicks the button first then tells the host their answer; if they are correct, the host adds the point total to their team's score and clicks the 'Next' button. If the user is incorrect, the other players on the opposing teams are given a chance to answer the question.

When the 'Next' button is played, the game iterates to the next question in the category. If there are no more questions in the category, the game returns to the category selection screen and the category that was just chosen is greyed out and unselectable.

The game ends once all categories have been answered. The host compares the point totals of all the teams and the winners are chosen. The game then displays and end screen.

**Creation/Edit:**

At any time before the game begins, the host can click the 'Escape' key on their keyboard to change the game mode to 'Edit.' While in Edit mode, the host is shown a list of current categories and can click on each category to see the questions within. On the top right of each category, there is an 'X' button that allows the host to delete that category and all of the questions within. The host can also click the '+' button to add a new category; these also apply to the questions.

To create a category, the host only needs to enter in a 'Category Name.' The newly created Category is then added to the display of categories. The host can then click on the category to add questions.

Each question consists of a game title, a song title, an image, and an audio file. When creating a question, each of these fields needs to be filled in. The host then clicks on a 'Save' button to save the question and the JSON file is updated.'

There is also a settings menu that allows the host to change the volume of the audio player and change the button that signals that a player has rung the buzzer.