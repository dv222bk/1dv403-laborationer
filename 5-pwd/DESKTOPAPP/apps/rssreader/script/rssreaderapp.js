"use strict";

var DESKTOPAPP = DESKTOPAPP || {};
DESKTOPAPP.apps = DESKTOPAPP.apps || {};

DESKTOPAPP.apps.RSSReader = function(app, desktop) {
    
    /* Inherit from DesktopWindow */
    DESKTOPAPP.DesktopWindow.call(this);
    
    /* RSSFeed */
    this.RSSFeed;
    this.changeRSSFeed("http://www.dn.se/m/rss/senaste-nytt");
    
    this.app = app;
    this.desktop = desktop;
    
    this.createWindow(this.desktop);
    this.createApp();
};

/* Inherit from DesktomWindow */
DESKTOPAPP.apps.RSSReader.prototype = new DESKTOPAPP.DesktopWindow();

DESKTOPAPP.apps.RSSReader.prototype.createApp = function() {
    var xhr, appBody, contextMenuSettings, contextMenuSettingsMenu, 
    contextMenuSettingsMenuUpdateInterval, contextMenuSettingsMenuUpdateIntervalImg, contextMenuSettingsMenuUpdateIntervalA,
    contextMenuSettingsMenuRSSFeed, contextMenuSettingsMenuRSSFeedImg, contextMenuSettingsMenuRSSFeedA,
    contextMenuSettingsMenuUpdate, contextMenuSettingsMenuUpdateImg, contextMenuSettingsMenuUpdateA;
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
                
                /* Context Menu */
                contextMenuSettings = document.createElement("li");
                contextMenuSettings.innerHTML = "Inställningar";
                contextMenuSettings.onclick = function(e) {
                    e.preventDefault();
                        if(contextMenuSettingsMenu.style.display === "none"){
                            contextMenuSettingsMenu.style.display = "block";
                        } else {
                            contextMenuSettingsMenu.style.display = "none";
                        }
                    return false;
                };
                contextMenuSettingsMenu = document.createElement("ul");
                contextMenuSettingsMenu.style.display = "none";
                contextMenuSettings.appendChild(contextMenuSettingsMenu);
                
                /* Updater interval */
                contextMenuSettingsMenuUpdateInterval = document.createElement("li");
                contextMenuSettingsMenu.appendChild(contextMenuSettingsMenuUpdateInterval);
                
                contextMenuSettingsMenuUpdateIntervalImg = document.createElement("img");
                contextMenuSettingsMenuUpdateIntervalImg.alt = "Uppdatera intervall iconen";
                contextMenuSettingsMenuUpdateIntervalImg.title = "Klicka här för att ändra uppdaterings intervall";
                contextMenuSettingsMenuUpdateIntervalImg.src = "DESKTOPAPP/pics/appIcons/menuIcons/updateinterval.png";
                
                contextMenuSettingsMenuUpdateIntervalA = document.createElement("a");
                contextMenuSettingsMenuUpdateIntervalA.innerHTML = "Uppdateringsintervall...";
                contextMenuSettingsMenuUpdateIntervalA.onclick = function(e) {
                    e.preventDefault;
                    that.closeWindow();
                    return false;
                };
                contextMenuSettingsMenuUpdateIntervalA.insertBefore(contextMenuSettingsMenuUpdateIntervalImg, contextMenuSettingsMenuUpdateIntervalA.childNodes[0]);
                contextMenuSettingsMenuUpdateInterval.appendChild(contextMenuSettingsMenuUpdateIntervalA);
                
                /* RSS feed changer */
                contextMenuSettingsMenuRSSFeed = document.createElement("li");
                contextMenuSettingsMenu.appendChild(contextMenuSettingsMenuRSSFeed);
                
                contextMenuSettingsMenuRSSFeedImg = document.createElement("img");
                contextMenuSettingsMenuRSSFeedImg.alt = "Ändra RSS iconen";
                contextMenuSettingsMenuRSSFeedImg.title = "Klicka här för att ändra RSS källa";
                contextMenuSettingsMenuRSSFeedImg.src = "DESKTOPAPP/pics/appIcons/menuIcons/RSSfeed.png";
                
                contextMenuSettingsMenuRSSFeedA = document.createElement("a");
                contextMenuSettingsMenuRSSFeedA.innerHTML = "Välj RSS källa...";
                contextMenuSettingsMenuRSSFeedA.onclick = function(e) {
                    e.preventDefault;
                    that.closeWindow();
                    return false;
                };
                contextMenuSettingsMenuRSSFeedA.insertBefore(contextMenuSettingsMenuRSSFeedImg, contextMenuSettingsMenuRSSFeedA.childNodes[0]);
                contextMenuSettingsMenuRSSFeed.appendChild(contextMenuSettingsMenuRSSFeedA);
                
                /* Update window */
                contextMenuSettingsMenuUpdate = document.createElement("li");
                contextMenuSettingsMenu.appendChild(contextMenuSettingsMenuUpdate);
                
                contextMenuSettingsMenuUpdateImg = document.createElement("img");
                contextMenuSettingsMenuUpdateImg.alt = "Updatera iconen";
                contextMenuSettingsMenuUpdateImg.title = "Klicka här för att uppdatera fönstret";
                contextMenuSettingsMenuUpdateImg.src = "DESKTOPAPP/pics/appIcons/menuIcons/update.png";
                
                contextMenuSettingsMenuUpdateA = document.createElement("a");
                contextMenuSettingsMenuUpdateA.innerHTML = "Uppdatera fönstret";
                contextMenuSettingsMenuUpdateA.onclick = function(e) {
                    e.preventDefault;
                    that.closeWindow();
                    return false;
                };
                contextMenuSettingsMenuUpdateA.insertBefore(contextMenuSettingsMenuUpdateImg, contextMenuSettingsMenuUpdateA.childNodes[0]);
                contextMenuSettingsMenuUpdate.appendChild(contextMenuSettingsMenuUpdateA);
                
                that.contextMenu.appendChild(contextMenuSettings);
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
    if(feed) {
        this.RSSFeed = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape(feed);
    } else {
        this.RSSFeed = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/";
    }
};