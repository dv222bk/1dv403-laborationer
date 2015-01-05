"use strict";

function QuizGame(elementID) {
    var that = this;
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    this.createApp();
}

QuizGame.prototype.createApp = function() {
    var appBody, header, appName;
    var that = this;
    
    /* Section */
    appBody = document.createElement("section");
    appBody.className = "QuizGame";
    this.root.appendChild(appBody);
    
    /* Header */
    header = document.createElement("header");
    appName = document.createElement("p");
    appName.innerHTML = "QUIZ GAME";
    header.appendChild(appName);
    appBody.appendChild(header);
    
};