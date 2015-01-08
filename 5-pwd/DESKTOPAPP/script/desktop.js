"use strict";

var DESKTOPAPP = DESKTOPAPP || {};

DESKTOPAPP.Desktop = function(elementID) {
    
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