"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.Desktop = function(elementID) {
    var openWindows, lastWindowX, lastWindowY, zIndex, i;

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
        },
        {
            "name": "Memory",
            "iconURL": "DESKTOPAPP/pics/appIcons/memory.png",
            "appURL": DESKTOPAPP.apps.Memory
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
        this.root.querySelector(".desktopToolbar").style.zIndex = zIndex + 1;
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
    
    /* Close window menu when clicking somewhere other than the menu */
    document.onclick = function(e) {
        for(i = 0; i < openWindows.length; i += 1) {
            var what = openWindows[i].querySelectorAll(".contextMenu ul");
            for (var k = 0; k < what.length; k++) {
                if(what[k].style.display !== "none" && what[k] !== e.target && what[k].parentNode !== e.target) {
                    what[k].style.display = "none";
                }
            }
        }
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
    var xPosition, yPosition, maxX, maxY;
    
    yPosition = 0;
    xPosition = 0;
    
    if(windowHolder !== undefined) {
        maxX = window.innerWidth - windowHolder.offsetWidth - 40;
        maxY = window.innerHeight - windowHolder.offsetHeight - 70;
    }
    
    while(windowHolder) {
        xPosition += (windowHolder.offsetLeft - windowHolder.scrollLeft + windowHolder.clientLeft);
        yPosition += (windowHolder.offsetTop - windowHolder.scrollTop + windowHolder.clientTop);
        windowHolder = windowHolder.offsetParent;
    }
    
    if(xPosition >= maxX) {
        xPosition = 0;
    }
    if(yPosition >= maxY) {
        yPosition = 0;
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