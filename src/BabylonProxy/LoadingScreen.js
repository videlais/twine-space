import { ILoadingScreen } from "@babylonjs/core/Loading/loadingScreen.js";

class CustomLoadingScreen extends ILoadingScreen {
    //optional constructor parameters scene, customLoadingScreen, optionalColor
    loadingUIBackgroundColor = "";
    loadingUIText = "Custom message here";
    
    constructor(loadingUIText) {
        super();
        this.loadingUIText = loadingUIText;
    }

    displayLoadingUI() {
      alert(this.loadingUIText);
    }
  
    hideLoadingUI() {
      alert("Loaded!");
    }
  }