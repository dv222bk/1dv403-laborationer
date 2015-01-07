"use strict";

function DesktopWindow(app, desktop) {
    
    /* App */
    this.app = app;
    
    /* Dekstop */
    this.desktop = desktop;
    
    this.createWindow();
}

DesktopWindow.prototype.createWindow = function() {
    var windowHolder, windowHeader, appIcon, appName, closeButton, windowBody, statusField;
    var that = this;
    
    /* WindowBody */
    windowHolder = document.createElement("div");
    windowHolder.className = "windowHolder";
    this.desktop.root.querySelector("section").appendChild(windowHolder);
    
    /* WindowHeader */
    windowHeader = document.createElement("div");
    windowHeader.className = "windowHeader";
    windowHolder.appendChild(windowHeader);
    
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
    windowBody.className = "appHolder";
    windowHolder.appendChild(windowBody);
    
    /* Status Field */
    statusField = document.createElement("div");
    statusField.className = "statusField";
    windowHolder.appendChild(statusField);
};

DesktopWindow.prototype.closeWindow = function() {
    
};