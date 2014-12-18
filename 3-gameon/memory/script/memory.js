function MemoryGame(elementID, rows, cols) {
    var pictureArray, flippedImages, tries;
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    pictureArray = RandomGenerator.getPictureArray(rows, cols);
    flippedImages = 0;
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
    
    this.getFlippedImages = function() {
        return flippedImages;
    }
    
    this.setFlippedImages = function(number) {
        flippedImages = number;
    }
    
    this.getTries = function() {
        return tries;
    }
    
    this.setTries = function(number) {
        tries = number;
    }

    this.createApp();
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
    for(row = 0; row < this.getRows(); col+=1) {
        rowDiv = document.createElement("div");
        
        for(col = 0; col < this.getCols(); col+=1) {
            memoryImage = document.createElement("img");
            memoryImage.alt = "Ett memory kort";
            memoryImage.title = "Klicka för att se vilken bild som gömmer sig bakom det här kortet!";
            memoryImage.src = "pics/0.png";
            memoryImage.onclick = function(e) {
                e.preventDefault();
                that.checkImage(row, col);
                return false;
            };
            rowDiv.appendChild(memoryImage);
        }
        appBody.appendChild(rowDiv);
    }
};

MemoryGame.prototype.checkImage = function(row, col) {
    var memoryImage;
    memoryImage = this.root.querySelector("div")[row].childNodes()[col];
    memoryImage.src = "pics/" + ((row * this.getCols()) + col) + ".png";
    this.setFlippedImages(this.getFlippedImages + 1);
    this.checkStatus();
};