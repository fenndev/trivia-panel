class RenderManager {
    public splashScreen: HTMLElement | undefined;

    constructor () {
        this.renderSplashScreen();
    }
    public renderSplashScreen() {
        // Element Creation
        let splashScreen: HTMLDivElement = document.createElement('div');
        let splashScreenTitle: HTMLDivElement = document.createElement('div');
        let splashScreenSubtitle: HTMLDivElement = document.createElement('div');
        let splashScreenButton: HTMLButtonElement = document.createElement('button');
    
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
        document.body.appendChild(splashScreen);

        this.splashScreen = splashScreen;
    }

    private hideSplashScreen() {
        if(this.splashScreen != undefined) {
            document.body.removeChild(this.splashScreen);
        }
    }
}

export { RenderManager };