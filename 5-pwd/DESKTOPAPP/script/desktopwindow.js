"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.DesktopWindow = function() {
    
    this.windowBody;
    this.windowHolder;

};

DESKTOPAPP.DesktopWindow.prototype.createWindow = function(desktop) {
    var windowHeader, appIcon, appName, closeButton, statusField, windowHolder, windowBody;
    var that = this;
    
    /* Window Holder */
    windowHolder = document.createElement("div");
    windowHolder.className = "windowHolder";
    desktop.root.querySelector("section").appendChild(windowHolder);
    this.windowHolder = windowHolder;
    
    /* WindowHeader */
    windowHeader = document.createElement("div");
    windowHeader.className = "windowHeader";
    windowHolder.appendChild(windowHeader);
    
    /* App Icon */
    appIcon = document.createElement("img");
    appIcon.alt = "Iconen för " + desktop.apps[this.app].name;
    appIcon.title = desktop.apps[this.app].name;
    appIcon.src = desktop.apps[this.app].iconURL;
    windowHeader.appendChild(appIcon);
    
    /* App name */
    appName = document.createElement("p");
    appName.innerHTML = desktop.apps[this.app].name;
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
    
    /* WindowBody */
    windowBody = document.createElement("div");
    windowBody.className = "windowBody";
    windowHolder.appendChild(windowBody);
    this.windowBody = windowBody;
    
    /* Status Field */
    statusField = document.createElement("div");
    statusField.className = "windowStatus";
    windowHolder.appendChild(statusField);
};

DESKTOPAPP.DesktopWindow.prototype.closeWindow = function() {
    this.windowHolder.remove();
};