"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.Desktop = function(elementID) {
    var openWindows, lastWindowX, lastWindowY, zIndex;

    /* root element */
    this.root = document.getElementById(elementID);
    
    /* app holder */
    this.apps = 
    [
        {
            "name": "ImageViewer",
            "iconURL": "DESKTOPAPP/pics/appIcons/imageViewer.png",
            "appURL": DESKTOPAPP.apps.ImageViewer
        },
        {
            "name": "RSSReader",
            "iconURL": "DESKTOPAPP/pics/appIcons/RSSReader.png",
            "appURL": DESKTOPAPP.apps.RSSReader
        }
    ];
    
    openWindows = [];
    lastWindowX = 20;
    lastWindowY = 20;
    zIndex = 1;
    
    this.getWindows = function() {
        return openWindows;
    };
    this.addWindow = function(windowBody) {
        openWindows.push(windowBody);
        windowBody.style.zIndex = zIndex;
        this.increaseZIndex();
    };
    this.setLastWindowX = function(xCord) {
        lastWindowX = xCord;
    };
    this.getLastWindowX = function() {
        return lastWindowX;
    };
    this.setLastWindowY = function(yCord) {
        lastWindowY = yCord;
    };
    this.getLastWindowY = function() {
        return lastWindowY;
    };
    this.getZIndex = function() {
        return zIndex;
    };
    this.increaseZIndex = function() {
        zIndex += 1;
    };
    
    this.createApp();
};

DESKTOPAPP.Desktop.prototype.createApp = function() {
    var appbody, toolbar, appLink, app, i;
    var that = this;
    
    /* AppBody */
    appbody = document.createElement("section");
    appbody.className = "desktopApp";
    this.root.appendChild(appbody);
    
    /* Toolbar */
    toolbar = document.createElement("div");
    toolbar.className = "desktopToolbar";
    appbody.appendChild(toolbar);
    
    /* Apps */
    for(i = 0; i < this.apps.length; i += 1) {
        appLink = document.createElement("a");
        appLink.app = i;
        appLink.onclick = function(e) {
            e.preventDefault();
            new that.apps[this.app].appURL(this.app, that);
            return false;
        };
        app = document.createElement("img");
        app.alt = "Klicka för att starta " + this.apps[i].name + " appen";
        app.title = this.apps[i].name;
        app.src = this.apps[i].iconURL;
        app.className = "appIcon";
        appLink.appendChild(app);
        toolbar.appendChild(appLink);
    }
};

/* http://www.kirupa.com/html5/get_element_position_using_javascript.htm */
DESKTOPAPP.Desktop.prototype.getWindowCords = function(windowHolder) {
    var xPosition = 0, yPosition = 0;
  
    while(windowHolder) {
        xPosition += (windowHolder.offsetLeft - windowHolder.scrollLeft + windowHolder.clientLeft);
        yPosition += (windowHolder.offsetTop - windowHolder.scrollTop + windowHolder.clientTop);
        windowHolder = windowHolder.offsetParent;
    }
    return { x: xPosition, y: yPosition };
};

DESKTOPAPP.Desktop.prototype.updateLastWindowCords = function() {
    var cords;
    cords = this.getWindowCords(this.getWindows()[this.getWindows().length - 1]);
    this.setLastWindowX(cords.x);
    this.setLastWindowY(cords.y);
};

DESKTOPAPP.Desktop.prototype.removeWindow = function(windowBody) {
    var index = this.getWindows().indexOf(windowBody);
    if (index > -1) {
        this.getWindows().splice(index, 1);
    }
};

DESKTOPAPP.Desktop.prototype.makeWindowLast = function(windowBody) {
    if(this.getWindows().indexOf(windowBody) !== (this.getWindows().length - 1)) {
        this.removeWindow(windowBody);
        this.addWindow(windowBody);
    }
};