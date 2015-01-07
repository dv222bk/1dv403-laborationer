"use strict";

function DesktopApp(elementID) {
    
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    this.createApp();
}

DesktopApp.prototype.createApp = function() {
    var appbody, toolbar;
    
    /* AppBody */
    appbody = document.createElement("section");
    appbody.className = "desktopApp";
    this.root.appendChild(appbody);
    
    /* Toolbar */
    toolbar = document.createElement("div");
    toolbar.className = "desktopToolbar";
    appbody.appendChild(toolbar);
};

DesktopApp.prototype.createWindow = function() {
    
}