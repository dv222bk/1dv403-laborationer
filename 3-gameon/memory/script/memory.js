function MemoryGame(elementID) {
    var pictureArray, tries, wrongTiles, rows, cols;
    var that = this;
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    /* game specific data */
    rows = 4;
    cols = 4;
    pictureArray = RandomGenerator.getPictureArray(4, 4);
    tries = 0;
    
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
    
    this.startWrongTiles = function(memoryImage1, memoryImage2) {
        wrongTiles = setTimeout(function() {
            that.wrongTiles(memoryImage1, memoryImage2);
        }, 1000);
    };

    this.stopWrongTiles = function() {
        clearInterval(wrongTiles);
    };

    this.createApp();
}

MemoryGame.prototype.wrongTiles = function(memoryImage1, memoryImage2) {
    memoryImage1.src = "memory/pics/0.png";
    memoryImage2.src = "memory/pics/0.png";
    memoryImage1.className = "";
    memoryImage2.className = "";
};

MemoryGame.prototype.createApp = function() {
    var appBody, header, appVersion, select, option, x, y, i, button, col, row, rowDiv, memoryImage;
    var that = this;
    
    /* Section */
    appBody = document.createElement("section");
    appBody.className = "MemoryGame";
    this.root.appendChild(appBody);
    
    /* Header */
    header = document.createElement("header");
    appVersion = document.createElement("p");
    appVersion.innerHTML = "MEMORY GAME";
    header.appendChild(appVersion);
    appBody.appendChild(header);
    
    /* Create new game */
    select = document.createElement("select");
    select.className = "memoryGameDimensions";
    x = 2;
    y = 2;
    for(i = 0; i < 4; i+=1) {
        option = document.createElement("option");
        option.value = x + "x" + y;
        option.innerHTML = x + "x" + y;
        select.appendChild(option);
        if(x === y) {
            x += 1;
        } else if (x > y) {
            y += 1;
        }
        if(x === 3 && y === 3) {
            x += 1;
        }
    }
    appBody.appendChild(select);
    
    button = document.createElement("button");
    button.type = "submit";
    button.innerHTML = "Starta nytt spel";
    button.onclick = function(e) {
        e.preventDefault();
        that.newGame();
        return false;
    };
    appBody.appendChild(button);
    
    /* Memory images */
    for(row = 0; row < this.getRows(); row+=1) {
        rowDiv = document.createElement("div");
        appBody.appendChild(rowDiv);
        
        for(col = 0; col < this.getCols(); col+=1) {
            memoryImage = document.createElement("img");
            memoryImage.alt = "Ett memory kort";
            memoryImage.title = "Ett memory kort";
            memoryImage.src = "memory/pics/0.png";
            /* Add the col and row to the image element so that we can easily get and use them later */
            memoryImage.col = col;
            memoryImage.row = row;
            memoryImage.onclick = function(e) {
                e.preventDefault();
                if(this.className !== "flipped" && this.className !== "complete") {
                    that.checkImage(this, (this.row * that.getCols() + this.col));
                }
                return false;
            };
            rowDiv.appendChild(memoryImage);
        }
    }
};

MemoryGame.prototype.checkImage = function(memoryImage, imgNumber) {
    memoryImage.src = "memory/pics/" + this.getPictureArray()[imgNumber] + ".png";
    memoryImage.className = "flipped"; // Mark the tile so that we know it's been clicked
    this.checkStatus(memoryImage);
};

MemoryGame.prototype.checkStatus = function(clickedImage) {
    var memoryImage1, memoryImage2, i, flippedImages;
    flippedImages = this.root.querySelectorAll(".flipped");
    if(flippedImages.length == 2) {
        this.setTries(this.getTries() + 1);
        memoryImage1 = flippedImages[0];
        memoryImage2 = flippedImages[1];
        if(memoryImage1.src !== memoryImage2.src) {
            this.startWrongTiles(memoryImage1, memoryImage2);
        } else {
            /* Mark the correct tiles so they can't be clicked again */
            memoryImage1.className = "complete";
            memoryImage2.className = "complete";
            if(this.root.querySelectorAll(".complete").length === this.getPictureArray().length) {
                this.gameEnd();
            }
        }
    } else if(flippedImages.length > 2) { // If the timeinterval hasn't finished yet (which results in there being more than 2 images with the class "flipped")
        this.stopWrongTiles();
        var wrongTiles = [];
        
        /* Find the tiles that isn't the tile the player just clicked on */
        for(i = 0; i < flippedImages.length; i+=1) {
            if(flippedImages[i] !== clickedImage){
                wrongTiles.push(flippedImages[i]); 
            }
        }
        this.wrongTiles(wrongTiles[0], wrongTiles[1]);
    }
};

MemoryGame.prototype.gameEnd = function() {
    alert("Du vann! Du använde dig av " + this.getTries() + " försök!");
};

MemoryGame.prototype.newGame = function() {
    var selectElement, dimensions;
    selectElement = this.root.querySelector(".memoryGameDimensions");
    dimensions = selectElement.options[selectElement.selectedIndex].value.split("x");
    
    /* Remove the old gameboard and reset everything */
    this.root.removeChild(this.root.querySelector(".MemoryGame"));
    this.setRows(dimensions[0]);
    this.setCols(dimensions[1]);
    this.setTries(0);
    this.setPictureArray();
    
    /* Create a new gameboard */
    this.createApp();
};