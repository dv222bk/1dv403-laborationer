"use strict";

function DesktopWindow(app, desktop) {
    
    /* App */
    this.app = app;
    
    /* Dekstop */
    this.desktop = desktop;
    
    /* WindowHolder */
    this.windowHolder = document.createElement("div");
    this.windowHolder.className = "windowHolder";
    this.desktop.root.querySelector("section").appendChild(this.windowHolder);
    
    this.createWindow();
}

DesktopWindow.prototype.createWindow = function() {
    var windowHeader, appIcon, appName, closeButton, windowBody, statusField;
    var that = this;
    
    /* WindowHeader */
    windowHeader = document.createElement("div");
    windowHeader.className = "windowHeader";
    this.windowHolder.appendChild(windowHeader);
    
    /* App Icon */
    appIcon = document.createElement("img");
    appIcon.alt = "Iconen för " + this.desktop.apps[this.app].name;
    appIcon.title = this.desktop.apps[this.app].name;
    appIcon.src = this.desktop.apps[this.app].iconURL;
    windowHeader.appendChild(appIcon);
    
    /* App name */
    appName = document.createElement("p");
    appName.innerHTML = this.desktop.apps[this.app].name;
    windowHeader.appendChild(appName);
    
    /* Close button */
    closeButton = document.createElement("button");
    closeButton.type = "submit";
    closeButton.innerHTML = "x";
    closeButton.onclick = function(e) {
        e.preventDefault();
        that.closeWindow();
        return false;
    };
    windowHeader.appendChild(closeButton);
    
    /* Window Body */
    windowBody = document.createElement("div");
    windowBody.className = "windowBody";
    this.windowHolder.appendChild(windowBody);
    
    /* Status Field */
    statusField = document.createElement("div");
    statusField.className = "windowStatus";
    this.windowHolder.appendChild(statusField);
    
    /* Create App */
    this.createApp(windowBody);
};

DesktopWindow.prototype.closeWindow = function() {
    this.windowHolder.remove();
};

DesktopWindow.prototype.createApp = function(windowBody) {
    switch(this.app) {
        case 0:
            new ImageViewer(windowBody);
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
    }
};