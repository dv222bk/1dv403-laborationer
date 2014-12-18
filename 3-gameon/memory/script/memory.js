function MemoryGame(elementID, rows, cols) {
    /* root element */
    this.root = document.getElementById(elementID);
    
    var pictureArray = RandomGenerator.getPictureArray(rows, cols);
    
    this.getPictureArray = function() {
        return pictureArray;
    };
    
    this.getRows = function() {
        return rows;
    }
    
    this.getCols = function() {
        return cols;
    }

    this.createApp();
}

MemoryGame.prototype.createApp = function() {
    var appBody, div, header, appVersion, col, row, rowDiv, memoryImage;
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
    for(row = 0; row < this.getRows; col+=1) {
        rowDiv = document.createElement("div");
        
        for(col = 0; col < this.getCols; col+=1) {
            memoryImage = document.createElement("img");
            memoryImage.alt = "Ett memory kort";
            memoryImage.title = "Klicka för att se vilken bild som gömmer sig bakom det här kortet!";
            memoryImage.src = "pics/0.png";
            rowDiv.appendChild(memoryImage);
        }
        appBody.appendChild(rowDiv);
    }
};