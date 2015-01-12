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
    
    document.onmousemove = function() {
        that.stopScreenSaver();
    };
    
    document.onkeypress = function() {
        that.stopScreenSaver();
    };
    
    document.onclick = function() {
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
    this.addWindow = function(windowApp) {
        openWindows.push(windowApp);
        windowApp.getWindowHolder().style.zIndex = zIndex;
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
        for(i = 0; i < openWindows.length - 1; i += 1) {
            menu = openWindows[i].getWindowHolder().querySelectorAll(".contextMenu ul ");
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
    var appbody, toolbar, appLink, app, i, closeAllWindowsLink, closeAllWindows;
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
    
    /* Close all Windows icon */
    closeAllWindowsLink = document.createElement("a");
    closeAllWindowsLink.className = "closeAllWindows";
    closeAllWindowsLink.onclick = function(e) {
        e.preventDefault();
        that.closeAllWindows();
        return false;
    };
    toolbar.appendChild(closeAllWindowsLink);
    
    closeAllWindows = document.createElement("img");
    closeAllWindows.alt = "Klicka här för att stänga alla öppna fönster";
    closeAllWindows.title = "Stäng alla öppna fönster";
    closeAllWindows.src = "DESKTOPAPP/pics/appIcons/closeallwindows.png";
    closeAllWindowsLink.appendChild(closeAllWindows);
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
    cords = this.getWindowCords(this.getWindows()[this.getWindows().length - 1].getWindowHolder());
    this.setLastWindowX(cords.x);
    this.setLastWindowY(cords.y);
};

DESKTOPAPP.Desktop.prototype.removeWindow = function(windowApp) {
    var index = this.getWindows().indexOf(windowApp);
    if (index > -1) {
        if (typeof windowApp.closeWindow == 'function') {
            windowApp.closeWindow();
        }
        this.getWindows().splice(index, 1);
        windowApp.getWindowHolder().parentNode.removeChild(windowApp.getWindowHolder());
    }
};

DESKTOPAPP.Desktop.prototype.closeAllWindows = function() {
    var i;
    for (i = this.getWindows().length - 1; i >= 0; i -= 1) {
        this.removeWindow(this.getWindows()[i]);
    }
};

DESKTOPAPP.Desktop.prototype.makeWindowLast = function(windowApp) {
    var index = this.getWindows().indexOf(windowApp);
    if((index !== (this.getWindows().length - 1)) && index > -1) {
        this.getWindows().splice(index, 1);
        this.addWindow(windowApp);
        this.updateLastWindowCords();
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
    text.innerHTML = "SCREENSAVER";
    this.setScreenSaverInterval(setInterval(moveText, 2000));
    this.overlay.appendChild(text);
    this.toggleOverlay();
    
    function moveText() {
        var randomNumber = Math.floor((Math.random() * 80));
        text.style.top = randomNumber + "%";
        randomNumber = Math.floor((Math.random() * 60));
        text.style.left = randomNumber + "%";
        
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