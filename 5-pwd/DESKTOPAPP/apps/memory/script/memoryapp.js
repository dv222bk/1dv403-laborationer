"use strict";

var DESKTOPAPP = DESKTOPAPP || {};
DESKTOPAPP.apps = DESKTOPAPP.apps || {};

DESKTOPAPP.apps.Memory = function(app, desktop) {
    var pictureArray, tries, complete, currentDimensions, wrongTiles, rows, cols;
    var that = this;
    
    this.app = app;
    this.desktop = desktop;
    
    /* Inherit from DesktopWindow */
    DESKTOPAPP.DesktopWindow.call(this);
    
    /* game specific data */
    rows = 4;
    cols = 4;
    pictureArray = RandomGenerator.getPictureArray(4, 4);
    tries = 0;
    complete = 0;
    currentDimensions = "4x4";
    
    /* functions */
    this.getPictureArray = function() {
        return pictureArray;
    };
    
    this.setPictureArray = function() {
        pictureArray = RandomGenerator.getPictureArray(rows, cols);
    };
    
    this.getRows = function() {
        return rows;
    };
    
    this.setRows = function(number) {
        rows = number;
    };
    
    this.getCols = function() {
        return cols;
    };
    
    this.setCols = function(number) {
        cols = number;
    };
    
    this.getTries = function() {
        return tries;
    };
    
    this.setTries = function(number) {
        tries = number;
    };
    
    this.getComplete = function() {
        return complete;
    };
    
    this.increaseComplete = function() {
        complete += 2;
    };
    
    this.resetComplete = function() {
        complete = 0;
    };
    
    this.setCurrentDimensions = function(dimensions) {
        currentDimensions = dimensions;
    };
    
    this.getCurrentDimensions = function() {
        return currentDimensions;
    };
    
    this.startWrongTiles = function(memoryA1, memoryA2) {
        wrongTiles = setTimeout(function() {
            that.wrongTiles(memoryA1, memoryA2);
        }, 1000);
    };

    this.stopWrongTiles = function() { // If the player clicks before the animation is finished, the animation should be cancelled
        clearInterval(wrongTiles);
    };

    this.createWindow(this.desktop, 220);
    this.createSettingsMenu();
    this.createApp();
};

/* Inherit from DesktopWindow */
DESKTOPAPP.apps.Memory.prototype = new DESKTOPAPP.DesktopWindow();

DESKTOPAPP.apps.Memory.prototype.wrongTiles = function(memoryA1, memoryA2) {
    memoryA1.childNodes[0].src = "DESKTOPAPP/apps/memory/pics/0.png";
    memoryA2.childNodes[0].src = "DESKTOPAPP/apps/memory/pics/0.png";
    memoryA1.className = "";
    memoryA2.className = "";
};

DESKTOPAPP.apps.Memory.prototype.createApp = function() {
    var appBody, col, row, rowDiv, memoryA, memoryImage;
    var that = this;
    
    /* Section */
    appBody = document.createElement("section");
    appBody.className = "MemoryGame";
    this.windowBody.appendChild(appBody);
    
    /* Memory images */
    for(row = 0; row < this.getRows(); row+=1) {
        rowDiv = document.createElement("div");
        appBody.appendChild(rowDiv);
        
        for(col = 0; col < this.getCols(); col+=1) {
            memoryA = document.createElement("a");
            /* Add the col and row to the a element so that we can easily get and use them later */
            memoryA.col = col;
            memoryA.row = row;
            memoryA.onclick = function(e) {
                e.preventDefault();
                if(this.className !== "flipped" && this.className !== "complete") {
                    that.checkImage(this, (this.row * that.getCols() + this.col));
                }
                return false;
            };
            memoryImage = document.createElement("img");
            memoryImage.alt = "Ett memory kort";
            memoryImage.title = "Ett memory kort";
            memoryImage.src = "DESKTOPAPP/apps/memory/pics/0.png";
            memoryA.appendChild(memoryImage);
            rowDiv.appendChild(memoryA);
        }
    }
    
    /* Make it so that windowBody has the same height as the content */
    this.windowBody.style.height = "auto";
};

DESKTOPAPP.apps.Memory.prototype.checkImage = function(memoryA, imgNumber) {
    memoryA.childNodes[0].src = "DESKTOPAPP/apps/memory/pics/" + this.getPictureArray()[imgNumber] + ".png";
    memoryA.className = "flipped"; // Mark the tile so that we know it's been clicked
    this.checkStatus(memoryA);
};

DESKTOPAPP.apps.Memory.prototype.checkStatus = function(clickedImageA) {
    var memoryA1, memoryA2, i, flippedImages;
    flippedImages = this.windowBody.querySelectorAll(".flipped");
    if(flippedImages.length == 2) {
        this.setTries(this.getTries() + 1);
        memoryA1 = flippedImages[0];
        memoryA2 = flippedImages[1];
        if(memoryA1.childNodes[0].src !== memoryA2.childNodes[0].src) {
            this.startWrongTiles(memoryA1, memoryA2);
        } else {
            /* Mark the correct tiles so they can't be clicked again */
            memoryA1.className = "complete";
            memoryA2.className = "complete";
            this.increaseComplete();
            if(this.getComplete() === this.getPictureArray().length) {
                this.gameEnd();
            }
        }
    } else if(flippedImages.length > 2) { // If the timeinterval hasn't finished yet (which results in there being more than 2 images with the class "flipped")
        this.stopWrongTiles();
        var wrongTiles = [];
        
        /* Find the tiles that isn't the tile the player just clicked on */
        for(i = 0; i < flippedImages.length; i+=1) {
            if(flippedImages[i] !== clickedImageA){
                wrongTiles.push(flippedImages[i]); 
            }
        }
        this.wrongTiles(wrongTiles[0], wrongTiles[1]);
    }
};

DESKTOPAPP.apps.Memory.prototype.gameEnd = function() {
    var appBody, pElement;
    appBody = this.windowBody.querySelector("section");
    pElement = document.createElement("p");
    pElement.innerHTML = "Du vann! Det tog dig " + this.getTries() + " par vändningar!";
    appBody.appendChild(pElement);
};

DESKTOPAPP.apps.Memory.prototype.newGame = function() {
    var dimensions;
    dimensions = this.getCurrentDimensions().split("x");
    
    /* Remove the old gameboard and reset everything */
    this.windowBody.removeChild(this.windowBody.querySelector(".MemoryGame"));
    this.setRows(dimensions[0]);
    this.setCols(dimensions[1]);
    this.setTries(0);
    this.setPictureArray();
    this.resetComplete();
    
    /* Create a new gameboard */
    this.createApp();
};

DESKTOPAPP.apps.Memory.prototype.gameSettingsMenu = function() {
    var alertWindow, selectDimensions, i, x, y, option, submitButton;
    var that = this;
    
    this.desktop.toggleOverlay();
    
    alertWindow = document.createElement("div");
    alertWindow.className = "alertWindow";
    this.desktop.overlay.appendChild(alertWindow);
    
    selectDimensions = document.createElement("select");
    alertWindow.appendChild(selectDimensions);
    x = 2;
    y = 2;
    for(i = 0; i < 4; i+=1) {
        option = document.createElement("option");
        option.value = x + "x" + y;
        option.innerHTML = x + "x" + y;
        selectDimensions.appendChild(option);
        if(x === y) {
            x += 1;
        } else if (x > y) {
            y += 1;
        }
        if(x === 3 && y === 3) {
            x += 1;
        }
    }
    
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Ändra";
    submitButton.onmousedown = function(e) {
        e.preventDefault();
        that.setCurrentDimensions(selectDimensions.value);
        that.newGame();
        that.desktop.toggleOverlay();
        return false;
    };
    alertWindow.appendChild(submitButton);
};

DESKTOPAPP.apps.Memory.prototype.createSettingsMenu = function() {
    var contextMenuSettings, contextMenuSettingsMenu, 
    contextMenuSettingsMenuRestartGame, contextMenuSettingsMenuRestartGameImg, contextMenuSettingsMenuRestartGameA,
    contextMenuSettingsMenuGameSettings, contextMenuSettingsMenuGameSettingsImg, contextMenuSettingsMenuGameSettingsA;
    var that = this;
    
    contextMenuSettings = document.createElement("li");
    contextMenuSettings.innerHTML = "Inställningar";
    contextMenuSettings.onmousedown = function(e) {
        e.preventDefault();
            if(contextMenuSettingsMenu.style.display === "none"){
                contextMenuSettingsMenu.style.display = "block";
            } else {
                contextMenuSettingsMenu.style.display = "none";
            }
        return false;
    };
    contextMenuSettingsMenu = document.createElement("ul");
    contextMenuSettingsMenu.style.display = "none";
    contextMenuSettings.appendChild(contextMenuSettingsMenu);
    
    /* Updater interval */
    contextMenuSettingsMenuRestartGame = document.createElement("li");
    contextMenuSettingsMenu.appendChild(contextMenuSettingsMenuRestartGame);
    
    contextMenuSettingsMenuRestartGameImg = document.createElement("img");
    contextMenuSettingsMenuRestartGameImg.alt = "Starta om spelet iconen";
    contextMenuSettingsMenuRestartGameImg.title = "Klicka här för att ändra starta om spelet";
    contextMenuSettingsMenuRestartGameImg.src = "DESKTOPAPP/pics/appIcons/menuIcons/update.png";
    
    contextMenuSettingsMenuRestartGameA = document.createElement("a");
    contextMenuSettingsMenuRestartGameA.innerHTML = "Starta om";
    contextMenuSettingsMenuRestartGameA.onmousedown = function(e) {
        e.preventDefault;
        that.newGame();
        return false;
    };
    contextMenuSettingsMenuRestartGameA.insertBefore(contextMenuSettingsMenuRestartGameImg, contextMenuSettingsMenuRestartGameA.childNodes[0]);
    contextMenuSettingsMenuRestartGame.appendChild(contextMenuSettingsMenuRestartGameA);
    
    /* Game settings */
    contextMenuSettingsMenuGameSettings = document.createElement("li");
    contextMenuSettingsMenu.appendChild(contextMenuSettingsMenuGameSettings);
    
    contextMenuSettingsMenuGameSettingsImg = document.createElement("img");
    contextMenuSettingsMenuGameSettingsImg.alt = "Spel inställnings iconen";
    contextMenuSettingsMenuGameSettingsImg.title = "Klicka här för att ändra spel inställningarna";
    contextMenuSettingsMenuGameSettingsImg.src = "DESKTOPAPP/pics/appIcons/menuIcons/settings.png";
    
    contextMenuSettingsMenuGameSettingsA = document.createElement("a");
    contextMenuSettingsMenuGameSettingsA.innerHTML = "Inställningar...";
    contextMenuSettingsMenuGameSettingsA.onmousedown = function(e) {
        e.preventDefault;
        that.gameSettingsMenu();
        return false;
    };
    contextMenuSettingsMenuGameSettingsA.insertBefore(contextMenuSettingsMenuGameSettingsImg, contextMenuSettingsMenuGameSettingsA.childNodes[0]);
    contextMenuSettingsMenuGameSettings.appendChild(contextMenuSettingsMenuGameSettingsA);
    
    this.contextMenu.appendChild(contextMenuSettings);
};