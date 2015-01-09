"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.DesktopWindow = function() {
    this.windowBody;
    this.windowHolder;
    this.statusField;
    this.desktop;
};

DESKTOPAPP.DesktopWindow.prototype.createWindow = function(desktop, width, height) {
    var windowHeader, appIcon, appName, closeButton, contextMenu, contextMenuArkiv, contextMenuArkivMenu, contextMenuArkivMenuClose, contextMenuArkivMenuCloseA, contextMenuArkivMenuCloseImg;
    var that = this;
    
    this.desktop = desktop;
    
    /* Window Holder */
    this.windowHolder = document.createElement("div");
    this.windowHolder.className = "windowHolder";
    desktop.updateLastWindowCords();
    this.windowHolder.style.top = (desktop.getLastWindowY() + 20) + "px";
    this.windowHolder.style.left = (desktop.getLastWindowX() + 20) + "px";
    this.windowHolder.style.zIndex = desktop.getZIndex();
    this.windowHolder.onmousedown = function(e) {
        desktop.makeWindowLast(this);
    };
    desktop.root.querySelector("section").appendChild(this.windowHolder);
    desktop.addWindow(this.windowHolder);
    
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
    
    /* Context Menu */
    contextMenu = document.createElement("ul");
    contextMenu.className = "contextMenu";
    windowHeader.appendChild(contextMenu);
    
    contextMenuArkiv = document.createElement("li");
    contextMenuArkiv.innerHTML = "Arkiv";
    contextMenu.appendChild(contextMenuArkiv);
    
    contextMenuArkivMenu = document.createElement("ul");
    contextMenuArkiv.appendChild(contextMenuArkivMenu);
    
    contextMenuArkivMenuClose = document.createElement("li");
    contextMenuArkivMenu.appendChild(contextMenuArkivMenuClose);
    
    contextMenuArkivMenuCloseImg = document.createElement("img");
    contextMenuArkivMenuCloseImg.alt = "Stäng fönstret iconen";
    contextMenuArkivMenuCloseImg.title = "Klicka här för att stänga ner fönstret";
    contextMenuArkivMenuCloseImg.src = "DESKTOPAPP/pics/menuIcons/close.png";
    
    contextMenuArkivMenuCloseA = document.createElement("a");
    contextMenuArkivMenuCloseA.innerHTML = "Stäng fönstret";
    contextMenuArkivMenuCloseA.onclick = function(e) {
        e.preventDefault;
        that.closeWindow();
        return false;
    };
    contextMenuArkivMenuCloseA.insertBefore(contextMenuArkivMenuCloseImg, contextMenuArkivMenuCloseA.childNodes[0]);
    contextMenuArkivMenuClose.appendChild(contextMenuArkivMenuCloseA);

    /* WindowBody */
    this.windowBody = document.createElement("div");
    this.windowBody.className = "windowBody";
    this.windowHolder.appendChild(this.windowBody);
    
    /* Status Field */
    this.statusField = document.createElement("div");
    this.statusField.className = "windowStatus";
    this.windowHolder.appendChild(this.statusField);
    
    if(height !== undefined) {
        this.windowBody.style.maxHeight = height + "px";
        this.windowBody.style.overflow = "hidden";
    }
    if(width !== undefined) {
        this.windowHolder.style.width = width + "px";
    }
};

DESKTOPAPP.DesktopWindow.prototype.closeWindow = function() {
    this.desktop.removeWindow(this.windowHolder);
    this.windowHolder.parentNode.removeChild(this.windowHolder);
};

DESKTOPAPP.DesktopWindow.prototype.showLoading = function() {
    this.statusField.innerHTML = '<p><img src="DESKTOPAPP/pics/ajax-loader.gif" /> Loading...</p>';
};

DESKTOPAPP.DesktopWindow.prototype.removeStatus = function() {
    this.statusField.innerHTML = "";
};