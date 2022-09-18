const path = require('path');
const fs = require('fs-extra');
const __dirname = global.__dirname;

const App = (() => {
    // Static File Paths
    let resources = path.join(__dirname, 'resources');
    let triviaFile = path.resolve(resources, 'trivia.json');

    let CategoryManager = new CategoryManager();

    const DisplayManager = (() => {
        const body = document.body;

        const showSplashScreen = () => {
            // Element Creation
            let splashScreen = document.createElement('div');
            let splashScreenTitle = document.createElement('div');
            let splashScreenSubtitle = document.createElement('div');
            let splashScreenButton = document.createElement('button');

            // Add Classes
            splashScreen.classList.add('splash');
            splashScreenTitle.classList.add('splash__title');
            splashScreenSubtitle.classList.add('splash__subtitle');
            splashScreenButton.classList.add('splash__button');

            // Add Text and Content
            splashScreenTitle.textContent = 'VGMT'
            splashScreenSubtitle.textContent = 'Video Game Music Trivia'
            splashScreenButton.textContent = 'Start'

            // Append to Body
            splashScreen.appendChild(splashScreenTitle);
            splashScreen.appendChild(splashScreenSubtitle);
            splashScreen.appendChild(splashScreenButton);
            body.appendChild(splashScreen);

            

        };

        const showCategoryScreen = (categories) => {
        
            // Element Creation
            let categoryScreen = document.createElement('div');
            let categoryScreenTitle = document.createElement('h1');
            let categoryScreenSubtitle = document.createElement('h2');
            
            // Category Creation
    
            if(categories != undefined) {
                for(const category in categories) {
                    let categoryButton = document.createElement('button');
                    categoryButton.textContent = categories[category].categoryName;
                    categoryButton.classList.add('category');
                    categoryScreen.appendChild(categoryButton);
                }
            }
    
            // Add Classes
            categoryScreen.classList.add('categoryScreen');
            categoryScreenTitle.classList.add('categoryScreen__title');
            categoryScreenSubtitle.classList.add('categoryScreen__subtitle');
    
            // Add Text and Content
    
            categoryScreenTitle.textContent = "Select a Category";
            categoryScreenSubtitle.textContent = "Click on a category to start";
    
            // Append to Body
            categoryScreen.appendChild(categoryScreenTitle);
            categoryScreen.appendChild(categoryScreenSubtitle);
            body.appendChild(categoryScreen);
    
            // // Add Event Listeners
            // let categoryButtons = document.querySelectorAll('.category');
            // for(const categoryButton in categoryButtons) {
            //     categoryButtons[categoryButton].addEventListener('click', () => {
            //         body.removeChild(categoryScreen);
            //         showSongScreen(categories[categoryButton]);
            //     });
            // }
        };

        const showEditScreen = () => {
            // Element Creation
            let editScreen = document.createElement('div');
            let editScreenTitle = document.createElement('h1');
            let editScreenSubtitle = document.createElement('h2');
            let categoryNameInput = document.createElement('input');
            let categoryAddButton = document.createElement('button');

            // Add Classes
            editScreen.classList.add('editScreen');
            editScreenTitle.classList.add('editScreen__title');
            editScreenSubtitle.classList.add('editScreen__subtitle');
            categoryNameInput.classList.add('editScreen__input');
            categoryAddButton.classList.add('editScreen__button');

            // Add Text and Content
            editScreenTitle.textContent = "VGMT";
            editScreenSubtitle.textContent = "Edit Categories";
            categoryNameInput.placeholder = "Category Name";
            categoryAddButton.textContent = "Add Category";

            // Append to Body
            editScreen.appendChild(editScreenTitle);
            editScreen.appendChild(editScreenSubtitle);
            editScreen.appendChild(categoryNameInput);
            editScreen.appendChild(categoryAddButton);
            body.appendChild(editScreen);

            // Add Event Listeners
            categoryAddButton.addEventListener('click', () => {
                let categoryName = categoryNameInput.value;


            });
        };

        return {showSplashScreen, showCategoryScreen};
    })();

    const initialize = async () => {
        nw.Window.get().showDevTools();
        // if(await fs.pathExists(triviaFile)) {
        //     categories = await CategoryManager.loadCategories();
        // }
        // else {
        //     triviaFile = await fs.createFile("trivia.json");
        // }
        // DisplayManager.showSplashScreen();
    }


    return {initialize};
})();

async function exists(filePath) {
    return await fs.pathExists(filePath);
}