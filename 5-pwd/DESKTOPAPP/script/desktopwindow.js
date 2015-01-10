"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.DesktopWindow = function() {
    /* Move Window variables */
    var startX, startY, currentX, currentY;
    
    this.windowBody;
    this.windowHolder;
    this.contextMenu;
    this.contextMenuArkiv;
    this.statusField;
    this.desktop;
    
    this.getStartX = function() {
        return startX;
    };
    this.setStartX = function(xCord) {
        startX = xCord;
    };
    this.getStartY = function() {
        return startY;
    };
    this.setStartY = function(yCord) {
        startY = yCord;
    };
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
};

DESKTOPAPP.DesktopWindow.prototype.createWindow = function(desktop, width, height) {
    var windowHeader, windowHeaderTop, appIcon, appName, closeButton, contextMenuArkivMenu, contextMenuArkivMenuClose, contextMenuArkivMenuCloseA, contextMenuArkivMenuCloseImg;
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
        document.addEventListener("mousemove", that.moveWindow(e), false);
    };
    windowHeaderTop.onmouseup = function(e) {
        e.preventDefault();
        document.removeEventListener("mousemove", that.moveWindow(e), false);
        return false;
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
	this.setStartX(posx);
	this.setStartY(posy);
	console.log(posx);
	console.log(posy);
};

DESKTOPAPP.DesktopWindow.prototype.showLoading = function() {
    var p, img;
    p = document.createElement("p");
    p.innerHTML = " Loading...";
    img = document.createElement("img");
    img.alt = "Laddnings icon";
    img.title = "Laddar...";
    img.src = "DESKTOPAPP/pics/ajax-loader.gif";
    this.statusField.appendChild(p);
    p.insertBefore(img, p.childNodes[0]);
};

DESKTOPAPP.DesktopWindow.prototype.removeStatus = function() {
    this.statusField.innerHTML = "";
};

DESKTOPAPP.DesktopWindow.prototype.updateStatus = function() {
    var currentTime = new Date();
    this.statusField.innerHTML = "Senast Uppdaterad: " + currentTime.toTimeString();
};