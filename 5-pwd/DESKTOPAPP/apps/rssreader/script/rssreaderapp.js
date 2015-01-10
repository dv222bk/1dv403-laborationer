"use strict";

var DESKTOPAPP = DESKTOPAPP || {};
DESKTOPAPP.apps = DESKTOPAPP.apps || {};

DESKTOPAPP.apps.RSSReader = function(app, desktop) {
    var RSSFeed, RSSInterval;
    
    /* Inherit from DesktopWindow */
    DESKTOPAPP.DesktopWindow.call(this);
    
    /* RSSFeed */
    RSSFeed;
    RSSInterval;
    
    this.changeRSSFeed = function(feed) {
        if(feed) {
            RSSFeed = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape(feed);
        } else {
            RSSFeed = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/";
        }
        this.callAjax();
    };
    this.getRSSFeed = function() {
        return RSSFeed;
    };
    this.clearRSSInterval = function() {
        clearInterval(RSSInterval);
    };
    this.setRSSInterval = function(interval) {
        RSSInterval = interval;
    };
    
    this.app = app;
    this.desktop = desktop;
    this.appBody;
    
    this.createWindow(this.desktop, true);
    this.createApp();
};

/* Inherit from DesktopWindow */
DESKTOPAPP.apps.RSSReader.prototype = new DESKTOPAPP.DesktopWindow();

DESKTOPAPP.apps.RSSReader.prototype.createApp = function() {
    this.createSettingsMenu();
    this.changeRSSFeed("http://www.dn.se/m/rss/senaste-nytt");
    this.appBody = document.createElement("div");
    this.appBody.className = "RSSReaderApp";
    this.windowBody.appendChild(this.appBody);
    this.setAjaxInterval(60000);
};

DESKTOPAPP.apps.RSSReader.prototype.closeWindow = function() {
    this.desktop.removeWindow(this.windowHolder);
    this.windowHolder.parentNode.removeChild(this.windowHolder);
    this.clearRSSInterval();
};

DESKTOPAPP.apps.RSSReader.prototype.callAjax = function() {
    var xhr;
    var that = this;
    
    xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            that.updateStatus();
            
            that.appBody.innerHTML = "";
            if(xhr.status === 200) {
                that.appBody.innerHTML = xhr.responseText;
            } else {
                that.appBody.innerHTML = "Läsfel. Status: " + xhr.status;
            }
        } else if(xhr.readyState === 1) {
            that.showLoading();
        }
    };
    xhr.open("GET", this.getRSSFeed(), true);
    xhr.send(null);
};

DESKTOPAPP.apps.RSSReader.prototype.setAjaxInterval = function(interval) {
    var that = this;
    
    this.clearRSSInterval();
    this.setRSSInterval(setInterval(function() {
       that.callAjax(); 
    }, interval));
};

DESKTOPAPP.apps.RSSReader.prototype.updateMenu = function() {
    var alertWindow, intervalSelect, intervalOption, option, submitButton;
    var that = this;
    
    this.desktop.toggleOverlay();
    
    alertWindow = document.createElement("div");
    alertWindow.className = "alertWindow";
    this.desktop.overlay.appendChild(alertWindow);
    
    intervalSelect = document.createElement("select");
    alertWindow.appendChild(intervalSelect);
    
    for(option = 1; option < 6; option += 1) {
        intervalOption = document.createElement("option");
        intervalOption.value = option * 60000;
        intervalOption.innerHTML = option + " minut";
        if(option > 1) {
            intervalOption.innerHTML += "er";
        }
        intervalSelect.appendChild(intervalOption);
    }
    
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Ändra";
    submitButton.onmousedown = function(e) {
        e.preventDefault();
        that.setAjaxInterval(intervalSelect.value);
        that.desktop.toggleOverlay();
        return false;
    };
    alertWindow.appendChild(submitButton);
};

DESKTOPAPP.apps.RSSReader.prototype.changeRSSMenu = function() {
    var alertWindow, radioButton, feedName, i, submitButton;
    var that = this;
    
    this.desktop.toggleOverlay();
    
    alertWindow = document.createElement("div");
    alertWindow.className = "alertWindow";
    this.desktop.overlay.appendChild(alertWindow);
    
    for(i = 0; i < 5; i += 1) {
        radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "RSSFeed";
        feedName = document.createElement("p");
        switch(i) {
            case 0:
                radioButton.value = "http://www.dn.se/m/rss/senaste-nytt";
                feedName.innerHTML = "Dagens Nyheter";
                break;
            case 1:
                radioButton.value = "http://www.aftonbladet.se/rss.xml";
                feedName.innerHTML = "Aftonbladet";
                break;
            case 2:
                radioButton.value = "http://www.skaraborgslanstidning.se/rss";
                feedName.innerHTML = "Skaraborgs Läns Tidning";
                break;
            case 3:
                radioButton.value = "http://www.sweclockers.com/feeds/nyheter";
                feedName.innerHTML = "SweClockers.com";
                break;
            case 4:
                radioButton.value = "user";
                feedName = document.createElement("input");
                feedName.type = "text";
                feedName.name = "customRSSFeed";
                feedName.onmousedown = function(e) {
                    radioButton.checked = true;
                };
                break;
        }
        alertWindow.appendChild(radioButton);
        alertWindow.appendChild(feedName);
    }
    
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Ändra";
    submitButton.onmousedown = function(e) {
        var radioButton = alertWindow.querySelector('input[type=radio]:checked');
        if(radioButton !== null) {
            e.preventDefault();
            that.windowBody.scrollTop = 0;
            if(radioButton.value === "user") {
                that.changeRSSFeed(alertWindow.querySelector('input[type=text]').value);
            } else {
                that.changeRSSFeed(radioButton.value);
            }
            that.desktop.toggleOverlay();
            return false;
        }
    };
    alertWindow.appendChild(submitButton);
};

DESKTOPAPP.apps.RSSReader.prototype.createSettingsMenu = function() {
    var contextMenuSettings, contextMenuSettingsMenu, 
    contextMenuSettingsMenuUpdateInterval, contextMenuSettingsMenuUpdateIntervalImg, contextMenuSettingsMenuUpdateIntervalA,
    contextMenuSettingsMenuRSSFeed, contextMenuSettingsMenuRSSFeedImg, contextMenuSettingsMenuRSSFeedA,
    contextMenuSettingsMenuUpdate, contextMenuSettingsMenuUpdateImg, contextMenuSettingsMenuUpdateA;
    var that = this;
    
    contextMenuSettings = document.createElement("li");
    contextMenuSettings.innerHTML = "Inställningar";
    contextMenuSettings.onmousedown = function(e) {
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
    contextMenuSettingsMenuUpdateIntervalA.onmousedown = function(e) {
        e.preventDefault;
        that.updateMenu();
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
    contextMenuSettingsMenuRSSFeedA.onmousedown = function(e) {
        e.preventDefault;
        that.changeRSSMenu();
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
    contextMenuSettingsMenuUpdateA.onmousedown = function(e) {
        e.preventDefault;
        that.windowBody.scrollTop = 0;
        that.callAjax();
        return false;
    };
    contextMenuSettingsMenuUpdateA.insertBefore(contextMenuSettingsMenuUpdateImg, contextMenuSettingsMenuUpdateA.childNodes[0]);
    contextMenuSettingsMenuUpdate.appendChild(contextMenuSettingsMenuUpdateA);
    
    this.contextMenu.appendChild(contextMenuSettings);
};