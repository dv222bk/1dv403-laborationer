"use strict";

var DESKTOPAPP = DESKTOPAPP || {};
DESKTOPAPP.apps = DESKTOPAPP.apps || {};

DESKTOPAPP.apps.RSSReader = function(app, desktop) {
    
    DESKTOPAPP.DesktopWindow.call(this);
    
    this.RSSFeed = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/";
    this.app = app;
    this.desktop = desktop;
    this.createWindow(this.desktop);
    this.createApp();
};

DESKTOPAPP.apps.RSSReader.prototype = new DESKTOPAPP.DesktopWindow();

DESKTOPAPP.apps.RSSReader.prototype.createApp = function() {
    var xhr, appBody;
    var that = this;
    xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                that.removeStatus();

                /* App Body */
                appBody = document.createElement("div");
                appBody.className = "RSSReaderApp";
                appBody.innerHTML = xhr.responseText;
                that.windowBody.appendChild(appBody);
            } else {
                console.log("Läsfel. Status: " + xhr.status);
            }
        } else {
            that.showLoading();
        }
    };
    xhr.open("GET", this.RSSFeed, true);
    xhr.send(null);
};

DESKTOPAPP.apps.RSSReader.prototype.changeRSSFeed = function(feed) {
    this.RSSFeed = feed;
};