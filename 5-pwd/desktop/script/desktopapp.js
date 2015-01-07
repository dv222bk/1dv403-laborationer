"use strict";

function DesktopApp(elementID) {
    
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    this.createApp();
}

DesktopApp.prototype.createApp = function() {
    var appbody, toolbar, appLink, imageViewerApp;
    
    /* AppBody */
    appbody = document.createElement("section");
    appbody.className = "desktopApp";
    this.root.appendChild(appbody);
    
    /* Toolbar */
    toolbar = document.createElement("div");
    toolbar.className = "desktopToolbar";
    appbody.appendChild(toolbar);
    
    /* Image Viewer App */
    appLink = document.createElement("a");
    imageViewerApp = document.createElement("img");
    imageViewerApp.alt = "Klicka för att starta ImageViewer appen";
    imageViewerApp.title = "ImageViewer";
    imageViewerApp.src = "desktop/pics/appIcons/imageViewer.png";
    imageViewerApp.className = "appIcon";
    appLink.appendChild(imageViewerApp);
    toolbar.appendChild(appLink);
};

DesktopApp.prototype.createWindow = function() {
    
}