"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.Desktop = function(elementID) {
    var openWindows, lastWindowX, lastWindowY, zIndex, idleTime, increaseIdleTimeInterval, screenSaverInterval;
    var that = this;

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
        },
        {
            "name": "LabbyMezzage",
            "iconURL": "DESKTOPAPP/pics/appIcons/labbymezzage.png",
            "appURL": DESKTOPAPP.apps.LabbyMezzage
        }
    ];
    
    openWindows = [];
    lastWindowX = 20;
    lastWindowY = 20;
    zIndex = 1;
    idleTime = 0;
    increaseIdleTimeInterval = setInterval(increaseIdleTime, 10000);
    console.log(increaseIdleTimeInterval);
    
    document.onmousemove = function() {
        that.stopScreenSaver();
    };
    
    document.onkeypress = function() {
        that.stopScreenSaver();
    };
    
    function increaseIdleTime() {
        idleTime += 1;
        if(idleTime === 6) {
            that.startScreenSaver();
        }
    }
    
    this.resetIdleTime = function() {
        idleTime = 0;
    };
    
    this.getIdleTime = function() {
        return idleTime;
    };
    
    this.clearScreenSaverInterval = function() {
        screenSaverInterval = null;
    };
    
    this.setScreenSaverInterval = function(interval) {
        screenSaverInterval = interval;
    };
    
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
    
    this.overlay;
    
    /* Close window menu when clicking somewhere other than the menu */
    document.onmousedown = function(e) {
        var menu, i, k;
        for(i = 0; i < openWindows.length; i += 1) {
            menu = openWindows[i].querySelectorAll(".contextMenu ul ");
            for (k = 0; k < menu.length; k++) {
                if(menu[k].style.display !== "none" && menu[k] !== e.target && menu[k].parentNode !== e.target) {
                    menu[k].style.display = "none";
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
    
    /* overlay */
    this.overlay = document.createElement("div");
    this.overlay.className = "overlay";
    this.overlay.onmousedown = function(e) {
        if(e.target === this) {
            e.preventDefault();
            that.toggleOverlay();
            return false;
        }
    };
    appbody.appendChild(this.overlay);
    
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
        maxY = window.innerHeight - windowHolder.offsetHeight - this.root.querySelector(".desktopToolbar").offsetHeight;
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

DESKTOPAPP.Desktop.prototype.toggleOverlay = function() {
    if(this.overlay.style.visibility === "visible") {
        this.overlay.style.visibility = "hidden";
        this.overlay.innerHTML = "";
    } else {
        this.overlay.style.visibility = "visible";
    }
    this.overlay.style.zIndex = this.getZIndex() + 1;
};

DESKTOPAPP.Desktop.prototype.startScreenSaver = function() {
    var text;
    text = document.createElement("p");
    text.className = "screenSaver";
    text.innerHTML = "SCREEN SAVER";
    this.setScreenSaverInterval(setInterval(moveText, 2000));
    this.overlay.appendChild(text);
    this.toggleOverlay();
    
    function moveText() {
        var randomNumber = Math.floor((Math.random() * 9) + 1);
        text.style.left = "0";
        text.style.top = "0";
        switch(randomNumber) {
            case 1: 
                text.style.top = "20%";
                text.style.left = "12%";
                break;
            case 2: 
                text.style.top = "25%";
                text.style.left = "25%";
                break;
            case 3: 
                text.style.top = "50%";
                text.style.left = "50%";
                break;
            case 4: 
                text.style.top = "80%";
                text.style.left = "60%";
                break;
            case 5: 
                text.style.top = "72%";
                text.style.left = "30%";
                break;
            case 6: 
                text.style.top = "12%";
                text.style.left = "52%";
                break;
            case 7: 
                text.style.top = "64%";
                text.style.left = "32%";
                break;
            case 8: 
                text.style.top = "67%";
                text.style.left = "2%";
                break;
            case 9: 
                text.style.top = "14%";
                text.style.left = "8%";
                break;
        }
        
        randomNumber = Math.floor((Math.random() * 9) + 1);
        switch(randomNumber) {
            case 1: 
                text.style.color = "#FF8300";
                break;
            case 2: 
                text.style.color = "#48A5F8";
                break;
            case 3: 
                text.style.color = "#EF5F20";
                break;
            case 4: 
                text.style.color = "#C397D8";
                break;
            case 5: 
                text.style.color = "#62A83F";
                break;
            case 6: 
                text.style.color = "#FFDE3D";
                break;
            case 7: 
                text.style.color = "#E9D7D2";
                break;
            case 8: 
                text.style.color = "#FFFFFF";
                break;
            case 9: 
                text.style.color = "#ACACAC";
                break;
        }
    }
};

DESKTOPAPP.Desktop.prototype.stopScreenSaver = function() {
    if(this.getIdleTime() >= 6) {
        this.clearScreenSaverInterval();
        this.overlay.removeChild(this.overlay.querySelector("p"));
        this.toggleOverlay();
    }
    this.resetIdleTime();
};