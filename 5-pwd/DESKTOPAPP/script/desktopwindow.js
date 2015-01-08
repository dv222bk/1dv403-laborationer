"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.DesktopWindow = function() {
    this.windowBody;
    this.windowHolder;
    this.statusField;
};

DESKTOPAPP.DesktopWindow.prototype.createWindow = function(desktop) {
    var windowHeader, appIcon, appName, closeButton;
    var that = this;
    
    if(desktop.getLastWindow() !== null) {
        desktop.updateLastWindowCords();
    }
    
    /* Window Holder */
    this.windowHolder = document.createElement("div");
    this.windowHolder.className = "windowHolder";
    this.windowHolder.style.top = (desktop.getLastWindowY() + 20) + 'px';
    this.windowHolder.style.left = (desktop.getLastWindowX() + 20) + 'px';
    this.windowHolder.style.zIndex = desktop.getZIndex();
    desktop.root.querySelector("section").appendChild(this.windowHolder);
    desktop.setLastWindow(this.windowHolder);
    desktop.increaseZIndex();
    
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
    
    /* WindowBody */
    this.windowBody = document.createElement("div");
    this.windowBody.className = "windowBody";
    this.windowHolder.appendChild(this.windowBody);
    
    /* Status Field */
    this.statusField = document.createElement("div");
    this.statusField.className = "windowStatus";
    this.windowHolder.appendChild(this.statusField);
};

DESKTOPAPP.DesktopWindow.prototype.closeWindow = function() {
    this.windowHolder.remove();
};

DESKTOPAPP.DesktopWindow.prototype.showLoading = function() {
    this.statusField.innerHTML = '<p><img src="DESKTOPAPP/pics/ajax-loader.gif" /> Loading...</p>';
};

DESKTOPAPP.DesktopWindow.prototype.removeStatus = function() {
    this.statusField.innerHTML = "";
};