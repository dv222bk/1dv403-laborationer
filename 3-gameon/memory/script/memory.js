function MemoryGame(elementID, rows, cols) {
    var pictureArray, flippedImages, tries, wrongTiles;
    
    /* root element */
    this.root = document.getElementById(elementID);
    var that = this;
    
    pictureArray = RandomGenerator.getPictureArray(rows, cols);
    tries = 0;
    
    this.getPictureArray = function() {
        return pictureArray;
    };
    
    this.getRows = function() {
        return rows;
    };
    
    this.getCols = function() {
        return cols;
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
    }

    this.createApp();
}

MemoryGame.prototype.wrongTiles = function(memoryImage1, memoryImage2) {
    memoryImage1.src = "memory/pics/0.png";
    memoryImage2.src = "memory/pics/0.png";
    memoryImage1.className = "";
    memoryImage2.className = "";
}

MemoryGame.prototype.createApp = function() {
    var appBody, header, appVersion, col, row, rowDiv, memoryImage;
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
    
    /* Memory images */
    for(row = 0; row < this.getRows(); row+=1) {
        rowDiv = document.createElement("div");
        appBody.appendChild(rowDiv);
        
        for(col = 0; col < this.getCols(); col+=1) {
            memoryImage = document.createElement("img");
            memoryImage.alt = "Ett memory kort";
            memoryImage.title = "Ett memory kort";
            memoryImage.src = "memory/pics/0.png";
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
    memoryImage.className = "flipped";
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