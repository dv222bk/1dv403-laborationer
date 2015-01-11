"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.DesktopWindow = function() {
    /* Move Window variables */
    var currentX, currentY, moveWindowFunction, removeMoveWindowEventsFunction, resizeWindowFunction, removeResizeWindowEventsFunction;
    
    this.windowBody;
    this.windowHolder;
    this.contextMenu;
    this.contextMenuArkiv;
    this.statusField;
    this.desktop;
    
    this.getCurrentX = function() {
        return currentX;
    };
    this.setCurrentX = function(xCord) {
        currentX = xCord;
    };
    this.getCurrentY = function() {
        return currentY;
    };
    this.setCurrentY = function(yCord) {
        currentY = yCord;
    };
    this.getMoveWindowFunction = function() {
        return moveWindowFunction;
    };
    this.setMoveWindowFunction = function(windowFunction) {
        moveWindowFunction = windowFunction;
    };
    this.getRemoveMoveWindowEventsFunction = function() {
        return removeMoveWindowEventsFunction;
    };
    this.setRemoveMoveWindowEventsFunction = function(windowFunction) {
        removeMoveWindowEventsFunction = windowFunction;
    };
    this.getResizeWindowFunction = function() {
        return resizeWindowFunction;
    };
    this.setResizeWindowFunction = function(windowFunction) {
        resizeWindowFunction = windowFunction;
    };
    this.getRemoveResizeWindowEventsFunction = function() {
        return removeResizeWindowEventsFunction;
    };
    this.setRemoveResizeWindowEventsFunction = function(windowFunction) {
        removeResizeWindowEventsFunction = windowFunction;
    };
};

DESKTOPAPP.DesktopWindow.prototype.createWindow = function(desktop, resizeable, width, height) {
    var windowHeader, windowHeaderTop, appIcon, appName, closeButton, windowResize,
    contextMenuArkivMenu, contextMenuArkivMenuClose, contextMenuArkivMenuCloseA, contextMenuArkivMenuCloseImg;
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
    
    /* WindowHeader Top */
    windowHeaderTop = document.createElement("div");
    windowHeaderTop.onmousedown = function(e) {
        if(e.target === this) {
            var cords = that.calculateMousePosition(e);
            that.setCurrentX(cords.x);
            that.setCurrentY(cords.y);
            that.setMoveWindowFunction(that.moveWindow.bind(that));
            that.setRemoveMoveWindowEventsFunction(that.removeMoveWindowEvents.bind(that));
            document.addEventListener("mousemove", that.getMoveWindowFunction(), false);
            document.addEventListener("mouseup", that.getRemoveMoveWindowEventsFunction(), false);
        }
    };
    windowHeader.appendChild(windowHeaderTop);
    
    /* App Icon */
    appIcon = document.createElement("img");
    appIcon.alt = "Iconen för " + desktop.apps[this.app].name;
    appIcon.title = desktop.apps[this.app].name;
    appIcon.src = desktop.apps[this.app].iconURL;
    windowHeaderTop.appendChild(appIcon);
    
    /* App name */
    appName = document.createElement("p");
    appName.innerHTML = desktop.apps[this.app].name;
    windowHeaderTop.appendChild(appName);
    
    /* Close button */
    closeButton = document.createElement("button");
    closeButton.type = "submit";
    closeButton.innerHTML = "x";
    closeButton.onclick = function(e) {
        e.preventDefault();
        that.closeWindow();
        return false;
    };
    windowHeaderTop.appendChild(closeButton);
    
    /* Context Menu */
    this.contextMenu = document.createElement("ul");
    this.contextMenu.className = "contextMenu";
    windowHeader.appendChild(this.contextMenu);
    
    this.contextMenuArkiv = document.createElement("li");
    this.contextMenuArkiv.innerHTML = "Arkiv";
    this.contextMenuArkiv.onmousedown = function(e) {
        e.preventDefault();
            if(contextMenuArkivMenu.style.display === "none"){
                contextMenuArkivMenu.style.display = "block";
            } else {
                contextMenuArkivMenu.style.display = "none";
            }
        return false;
    };
    contextMenuArkivMenu = document.createElement("ul");
    contextMenuArkivMenu.style.display = "none";
    this.contextMenuArkiv.appendChild(contextMenuArkivMenu);

    contextMenuArkivMenuClose = document.createElement("li");
    contextMenuArkivMenu.appendChild(contextMenuArkivMenuClose);
    
    contextMenuArkivMenuCloseImg = document.createElement("img");
    contextMenuArkivMenuCloseImg.alt = "Stäng fönstret iconen";
    contextMenuArkivMenuCloseImg.title = "Klicka här för att stänga ner fönstret";
    contextMenuArkivMenuCloseImg.src = "DESKTOPAPP/pics/menuIcons/close.png";
    
    contextMenuArkivMenuCloseA = document.createElement("a");
    contextMenuArkivMenuCloseA.innerHTML = "Stäng fönstret";
    contextMenuArkivMenuCloseA.onmousedown = function(e) {
        e.preventDefault;
        that.closeWindow();
        return false;
    };
    contextMenuArkivMenuCloseA.insertBefore(contextMenuArkivMenuCloseImg, contextMenuArkivMenuCloseA.childNodes[0]);
    contextMenuArkivMenuClose.appendChild(contextMenuArkivMenuCloseA);
    
    this.contextMenu.appendChild(this.contextMenuArkiv);

    /* WindowBody */
    this.windowBody = document.createElement("div");
    this.windowBody.className = "windowBody";
    this.windowHolder.appendChild(this.windowBody);
    
    /* Status Field */
    this.statusField = document.createElement("div");
    this.statusField.className = "windowStatus";
    this.windowHolder.appendChild(this.statusField);
    
    if(resizeable) {
        /* WindowResize */
        windowResize = document.createElement("div");
        windowResize.className = "windowResize";
        windowResize.onmousedown = function(e) {
            if(e.target === this) {
                var cords = that.calculateMousePosition(e);
                that.setCurrentX(cords.x);
                that.setCurrentY(cords.y);
                that.setResizeWindowFunction(that.resizeWindow.bind(that));
                that.setRemoveResizeWindowEventsFunction(that.removeResizeWindowEvents.bind(that));
                document.addEventListener("mousemove", that.getResizeWindowFunction(), false);
                document.addEventListener("mouseup", that.getRemoveResizeWindowEventsFunction(), false);
            }
        };
        this.statusField.appendChild(windowResize);
    }
    
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

DESKTOPAPP.DesktopWindow.prototype.moveWindow = function(e) {
    var cords, validateMoveCords;
    cords = this.calculateMousePosition(e);
    validateMoveCords = this.validateMoveCords(parseInt(this.windowHolder.style.left, 10) - this.getCurrentX() + cords.x, parseInt(this.windowHolder.style.top, 10) - this.getCurrentY() + cords.y);
    if(validateMoveCords.x) {
        this.windowHolder.style.left = parseInt(this.windowHolder.style.left, 10) - this.getCurrentX() + cords.x + "px";
        this.setCurrentX(cords.x);
    }
    if(validateMoveCords.y) {
        this.windowHolder.style.top = parseInt(this.windowHolder.style.top, 10) - this.getCurrentY() + cords.y + "px";
        this.setCurrentY(cords.y);
    }
};

DESKTOPAPP.DesktopWindow.prototype.resizeWindow = function(e) {
    var cords, validateNewWindowSize;
    cords = this.calculateMousePosition(e);
    validateNewWindowSize = this.validateNewWindowSize(this.windowHolder.clientWidth - this.getCurrentX() + cords.x, this.windowHolder.offsetHeight - this.getCurrentY() + cords.y);
    if(validateNewWindowSize.x) {
        this.windowHolder.style.width = this.windowHolder.clientWidth - this.getCurrentX() + cords.x + "px";
        this.setCurrentX(cords.x);
    }
    if(validateNewWindowSize.y) {
        this.windowBody.style.height, this.windowBody.style.minHeight = this.windowBody.clientHeight - this.getCurrentY() + cords.y + "px";
        this.setCurrentY(cords.y);
    }
};

DESKTOPAPP.DesktopWindow.prototype.validateMoveCords = function(xCord, yCord) {
    var maxX, maxY, result;
    maxX = window.innerWidth - this.windowHolder.offsetWidth;
    maxY = window.innerHeight - this.windowHolder.offsetHeight - this.desktop.root.querySelector(".desktopToolbar").offsetHeight;
    result = {
        x: ((xCord <= maxX) && (xCord >= 0)) ? true : false,
        y: ((yCord <= maxY) && (yCord >= 0)) ? true : false
    };
    return result;
};

DESKTOPAPP.DesktopWindow.prototype.validateNewWindowSize = function(width, height) {
    var maxWidth, maxHeight, minWidth, minHeight, result, cords;
    minWidth = 300;
    minHeight = 300;
    cords = this.getWindowHolderCords();
    maxWidth = window.innerWidth - cords.x;
    maxHeight = window.innerHeight - this.desktop.root.querySelector(".desktopToolbar").clientHeight - cords.y;
    result = {
        x: ((width <= maxWidth) && (width >= minWidth)) ? true : false,
        y: ((height <= maxHeight) && (height >= minHeight)) ? true : false
    };
    return result; 
};

/* http://www.kirupa.com/html5/get_element_position_using_javascript.htm */
DESKTOPAPP.DesktopWindow.prototype.getWindowHolderCords = function() {
    var xPosition, yPosition;
    
    xPosition = this.windowHolder.offsetLeft - this.windowHolder.scrollLeft + this.windowHolder.clientLeft;
    yPosition = this.windowHolder.offsetTop - this.windowHolder.scrollTop + this.windowHolder.clientTop;
   
    return { x: xPosition, y: yPosition };
};

DESKTOPAPP.DesktopWindow.prototype.calculateMousePosition = function(e) {
    /* http://www.quirksmode.org/js/events_properties.html#position */
    var posx = 0;
	var posy = 0;
	if (!e) e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	return({ x: posx, y: posy });
};

DESKTOPAPP.DesktopWindow.prototype.removeMoveWindowEvents = function() {
    document.removeEventListener("mousemove", this.getMoveWindowFunction(), false);
    document.removeEventListener("mouseup", this.getRemoveMoveWindowEventsFunction(), false);
};

DESKTOPAPP.DesktopWindow.prototype.removeResizeWindowEvents = function() {
    document.removeEventListener("mousemove", this.getResizeWindowFunction(), false);
    document.removeEventListener("mouseup", this.getRemoveResizeWindowEventsFunction(), false);
};

DESKTOPAPP.DesktopWindow.prototype.showLoading = function() {
    var p, img;
    this.removeStatus();
    p = document.createElement("p");
    p.innerHTML = " Loading...";
    img = document.createElement("img");
    img.alt = "Laddnings icon";
    img.title = "Laddar...";
    img.src = "DESKTOPAPP/pics/ajax-loader.gif";
    this.statusField.insertBefore(p, this.statusField.childNodes[0]);
    p.insertBefore(img, p.childNodes[0]);
};

DESKTOPAPP.DesktopWindow.prototype.removeStatus = function() {
    var i;
    for(i = this.statusField.childNodes.length - 1; i >= 0; i -= 1) {
        if(this.statusField.childNodes[i].tagName != "DIV") {
            this.statusField.removeChild(this.statusField.childNodes[i]);
        }
    }
};

DESKTOPAPP.DesktopWindow.prototype.updateStatus = function() {
    var p, currentTime, hours, minutes;
    this.removeStatus();
    currentTime = new Date();
    p = document.createElement("p");
    hours = currentTime.getHours();
    hours = (hours > 9) ? hours : "0" + hours;
    minutes = currentTime.getMinutes();
    minutes = (minutes > 9) ? minutes : "0" + minutes;
    p.innerHTML = "Senast Uppdaterad: " + hours + ":" + minutes;
    this.statusField.insertBefore(p, this.statusField.childNodes[0]);
};