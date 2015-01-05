"use strict";

function QuizGame(elementID) {
    var that = this;
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    this.createApp();
}

QuizGame.prototype.createApp = function() {
    var appBody, header, appVersion, select, option, x, y, i, button, col, row, rowDiv, memoryA, memoryImage;
    var that = this;
    
    /* Section */
    appBody = document.createElement("section");
    appBody.className = "QuizGame";
    this.root.appendChild(appBody);
    
    /* Header */
    header = document.createElement("header");
    appVersion = document.createElement("p");
    appVersion.innerHTML = "QUIZ GAME";
    header.appendChild(appVersion);
    appBody.appendChild(header);
    
};