"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.DesktopWindow = function() {
    
    /* WindowHolder */
    this.windowHolder = document.createElement("div");
    
    /* Window Body */
    this.windowBody = document.createElement("div");
};

DESKTOPAPP.DesktopWindow.prototype.createWindow = function(desktop) {
    var windowHeader, appIcon, appName, closeButton, statusField;
    var that = this;
    
    /* WindowHeader */
    windowHeader = document.createElement("div");
    windowHeader.className = "windowHeader";
    this.windowHolder.appendChild(windowHeader);
    
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
    
    /* WindowHolder and WindowBody */
    this.windowHolder.className = "windowHolder";
    this.windowBody.className = "windowBody";
    this.desktop.root.querySelector("section").appendChild(this.windowHolder);
    this.windowHolder.appendChild(this.windowBody);
    
    /* Status Field */
    statusField = document.createElement("div");
    statusField.className = "windowStatus";
    this.windowHolder.appendChild(statusField);
};

DESKTOPAPP.DesktopWindow.prototype.closeWindow = function() {
    this.windowHolder.remove();
};