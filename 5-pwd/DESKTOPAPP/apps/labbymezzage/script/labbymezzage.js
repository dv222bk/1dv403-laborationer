"use strict";

var DESKTOPAPP = DESKTOPAPP || {};
DESKTOPAPP.apps = DESKTOPAPP.apps || {};

DESKTOPAPP.apps.LabbyMezzage = function(app, desktop) {
    var messages, username, updateTime, ajaxInterval, numberOfMsgs, lastXMLGet;
    
    messages = [];
    
    this.app = app;
    this.desktop = desktop;
    
    this.messageHolder;
    this.textarea;
    
    username = (localStorage.getItem("LabbyMezzage Username") === null) ? "Anonymous" : localStorage.getItem("LabbyMezzage Username");
    updateTime = (localStorage.getItem("LabbyMezzage Updatetime") === null) ? 10000 : localStorage.getItem("LabbyMezzage Updatetime");
    numberOfMsgs = (localStorage.getItem("LabbyMezzage Msgnumber") === null) ? 50 : localStorage.getItem("LabbyMezzage Msgnumber");
    
    /* Inherit from DesktopWindow */
    DESKTOPAPP.DesktopWindow.call(this);
    
    this.getMessages = function() {
        return messages;
    };
    
    this.getMessage = function(messageArrayID) {
        return messages[messageArrayID];
    };
    
    this.removeMessages = function() {
        messages = [];
    };
    
    this.getUsername = function() {
        return username;
    };
    
    this.setUsername = function(_username) {
        username = _username;
    };
    
    this.reloadUsername = function() {
        username = (localStorage.getItem("LabbyMezzage Username") === null) ? username : localStorage.getItem("LabbyMezzage Username");
    };
    
    this.getUpdateTime = function() {
        return updateTime;
    };
    
    this.setUpdateTime = function(miliSeconds) {
        updateTime = miliSeconds;
    };
    
    this.reloadUpdateTime = function() {
        updateTime = (localStorage.getItem("LabbyMezzage Updatetime") === null) ? updateTime: localStorage.getItem("LabbyMezzage Updatetime");
    };
    
    this.setAjaxInterval = function(interval) {
        ajaxInterval = interval;
    };
    
    this.clearAjaxInterval = function() {
        clearInterval(ajaxInterval);
    };
    
    this.getNumberOfMsgs = function() {
        return numberOfMsgs;
    };
    
    this.setNumberOfMsgs = function(number) {
        numberOfMsgs = number;
    };
    
    this.reloadNumberOfMsgs = function() {
        numberOfMsgs = (localStorage.getItem("LabbyMezzage Msgnumber") === null) ? numberOfMsgs : localStorage.getItem("LabbyMezzage Msgnumber");
    };
    
    this.getLastXMLGet = function() {
        return lastXMLGet;
    };
    
    this.setLastXMLGet = function(XMLGet) {
        lastXMLGet = XMLGet;
    };
    
    this.createWindow(this.desktop, true);
    this.createSettingsMenu();
    this.createApp();
};

/* Inherit from DesktopWindow */
DESKTOPAPP.apps.LabbyMezzage.prototype = new DESKTOPAPP.DesktopWindow();

DESKTOPAPP.apps.LabbyMezzage.prototype.createApp = function() {
    var appBody, writeMessage;
    var that = this;
    
    /* Section */
    appBody = document.createElement("section");
    appBody.className = "LabbyMezzage";
    this.windowBody.appendChild(appBody);
    
    /* Message Holder */
    this.messageHolder = document.createElement("div");
    this.messageHolder.className = "messages";
    appBody.appendChild(this.messageHolder);
    
    /* WriteMessage Area*/
    writeMessage = document.createElement("div");
    writeMessage.className = "writeMessage";
    appBody.appendChild(writeMessage);
    
    /* Textarea */
    this.textarea = document.createElement("textarea");
    this.textarea.onkeypress = function(e) {
        if(e.keyCode == 13) {
            if(!e.shiftKey) {
                e.preventDefault();
                that.postAjax();
                return false;
            }
        }
    };
    writeMessage.appendChild(this.textarea);

    this.getAjax();
    this.setGetInterval();
};

DESKTOPAPP.apps.LabbyMezzage.prototype.closeWindow = function() {
    this.desktop.removeWindow(this.windowHolder);
    this.windowHolder.parentNode.removeChild(this.windowHolder);
    this.clearAjaxInterval();
};

DESKTOPAPP.apps.LabbyMezzage.prototype.getAjax = function() {
    var xhr, parser, XMLData, message;
    var that = this;
    
    this.reloadNumberOfMsgs();
    this.reloadUpdateTime();
    
    xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            that.updateStatus();
            
            if(xhr.status === 200) {
                if (window.DOMParser) {
                    parser = new DOMParser();
                    XMLData=parser.parseFromString(xhr.responseText,"text/xml");
                /* For Internet Explorer */
                } else {
                    XMLData = new ActiveXObject("Microsoft.XMLDOM");
                    XMLData.async = false;
                    XMLData.loadXML(xhr.responseText);
                }
                
                if(XMLData !== that.getLastXMLGet() && that.getLastXMLGet() !== null) {
                    that.removeMessages();
                    
                    for(message = 0; message < XMLData.querySelectorAll("message").length; message += 1) {
                        that.getMessages().push(new DESKTOPAPP.apps.LabbyMezzage.Message(
                            XMLData.querySelectorAll("message text")[message].innerHTML,
                            new Date(+XMLData.querySelectorAll("message time")[message].innerHTML),
                            XMLData.querySelectorAll("message author")[message].innerHTML
                        ));
                    }
                    that.renderMessages();
                    that.setLastXMLGet(XMLData);
                }
            } else {
                that.messageHolder.innerHTML = "Läsfel. Status: " + xhr.status;
            }
        } else if(xhr.readyState === 1) {
            that.showLoading();
        }
    };
    xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?history=" + this.getNumberOfMsgs(), true);
    xhr.send(null);
};

DESKTOPAPP.apps.LabbyMezzage.prototype.postAjax = function() {
    var xhr;
    var that = this;
    
    this.textarea.value = this.textarea.value.replace( /<[^>]+>/g, '' ).trim();
    if(this.textarea.value.trim() !== "") {
        this.reloadUsername();
        
        xhr = new XMLHttpRequest();
        xhr.abort();
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                that.updateStatus();
                
                if(xhr.status === 200) {
                    that.getAjax();
                } else {
                    that.messageHolder.innerHTML = "Läsfel. Status: " + xhr.status;
                }
            } else if(xhr.readyState === 1) {
                that.showLoading();
            }
        };
        xhr.open("POST", "http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("text=" + this.textarea.value + "&username=" + this.getUsername());
    }
    this.textarea.value = "";
};

DESKTOPAPP.apps.LabbyMezzage.prototype.setGetInterval = function() {
    var that = this;
    this.clearAjaxInterval();
    this.setAjaxInterval(setInterval(function() {
       that.getAjax(); 
    }, this.getUpdateTime()));
};

DESKTOPAPP.apps.LabbyMezzage.prototype.renderMessage = function(messageArrayID) {
    var messageContainer, nameDate, name, date, messageText;
    
    /* Container */
    messageContainer = document.createElement("div");
    /* Insert the new message at the top of the holder div, at the bottom of the message list */
    this.messageHolder.insertBefore(messageContainer, this.messageHolder.childNodes[messageArrayID]);
    
    /* nameDate */
    nameDate = document.createElement("div");
    messageContainer.appendChild(nameDate);
    
    /* name */
    name = document.createElement("p");
    name.innerHTML = this.getMessage(messageArrayID).getName();
    nameDate.appendChild(name);
    
    /* date */
    date = document.createElement("p");
    date.innerHTML = this.getMessage(messageArrayID).getTimeStamp();
    nameDate.appendChild(date);
    
    /* MsgText */
    messageText = document.createElement("p");
    messageText.innerHTML = this.getMessage(messageArrayID).getHTMLText();
    messageContainer.appendChild(messageText);
    
};

DESKTOPAPP.apps.LabbyMezzage.prototype.renderMessages = function() {
    var i;
    
    // Remove all messages
    while (this.messageHolder.firstChild) {
        this.messageHolder.removeChild(this.messageHolder.firstChild);
    }
    
    // Render all messages
    for(i = 0; i < this.getMessages().length; i+=1) {
        this.renderMessage(i);
    }
    
    // Scroll to bottom
    this.messageHolder.scrollTop = this.messageHolder.scrollHeight;
};

DESKTOPAPP.apps.LabbyMezzage.prototype.updateMenu = function() {
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
        intervalOption.value = option * 10000;
        intervalOption.innerHTML = (option * 10) + " sekunder";
        intervalSelect.appendChild(intervalOption);
    }
    
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Ändra";
    submitButton.onmousedown = function(e) {
        e.preventDefault();
        that.setUpdateTime(intervalSelect.value);
        localStorage.setItem("LabbyMezzage Updatetime", intervalSelect.value);
        that.setGetInterval();
        that.desktop.toggleOverlay();
        return false;
    };
    alertWindow.appendChild(submitButton);
};

DESKTOPAPP.apps.LabbyMezzage.prototype.changeMsgNumberMenu = function() {
    var alertWindow, msgNumberSelect, msgNumberOption, option, submitButton;
    var that = this;
    
    this.desktop.toggleOverlay();
    
    alertWindow = document.createElement("div");
    alertWindow.className = "alertWindow";
    this.desktop.overlay.appendChild(alertWindow);
    
    msgNumberSelect = document.createElement("select");
    alertWindow.appendChild(msgNumberSelect);
    
    for(option = 1; option < 6; option += 1) {
        msgNumberOption = document.createElement("option");
        msgNumberOption.value = option * 10;
        msgNumberOption.innerHTML = (option * 10) + " meddelanden";
        msgNumberSelect.appendChild(msgNumberOption);
    }
    
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Ändra";
    submitButton.onmousedown = function(e) {
        e.preventDefault();
        that.setNumberOfMsgs(msgNumberSelect.value);
        localStorage.setItem("LabbyMezzage Msgnumber", msgNumberSelect.value);
        that.getAjax();
        that.desktop.toggleOverlay();
        return false;
    };
    alertWindow.appendChild(submitButton);
};

DESKTOPAPP.apps.LabbyMezzage.prototype.changeUsernameMenu = function() {
    var alertWindow, usernameField, submitButton;
    var that = this;
    
    this.desktop.toggleOverlay();
    
    alertWindow = document.createElement("div");
    alertWindow.className = "alertWindow";
    this.desktop.overlay.appendChild(alertWindow);
    
    usernameField = document.createElement("input");
    usernameField.type = "text";
    usernameField.name = "newUsername";
    usernameField.value = this.getUsername();
    alertWindow.appendChild(usernameField);
    
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Ändra";
    submitButton.onmousedown = function(e) {
        if(usernameField.value.trim() !== "") {
            e.preventDefault();
            that.setUsername(usernameField.value.trim());
            localStorage.setItem("LabbyMezzage Username", usernameField.value.trim());
            that.desktop.toggleOverlay();
            return false;
        }
    };
    alertWindow.appendChild(submitButton);
};

DESKTOPAPP.apps.LabbyMezzage.prototype.createSettingsMenu = function() {
    var contextMenuSettings, contextMenuSettingsMenu, 
    contextMenuSettingsMenuUpdateInterval, contextMenuSettingsMenuUpdateIntervalImg, contextMenuSettingsMenuUpdateIntervalA,
    contextMenuSettingsMenuMsgNumber, contextMenuSettingsMenuMsgNumberImg, contextMenuSettingsMenuMsgNumberA,
    contextMenuSettingsMenuUsername, contextMenuSettingsMenuUsernameImg, contextMenuSettingsMenuUsernameA,
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
    
    /* Change number of messages */
    contextMenuSettingsMenuMsgNumber = document.createElement("li");
    contextMenuSettingsMenu.appendChild(contextMenuSettingsMenuMsgNumber);
    
    contextMenuSettingsMenuMsgNumberImg = document.createElement("img");
    contextMenuSettingsMenuMsgNumberImg.alt = "Ändra antal meddelanden iconen";
    contextMenuSettingsMenuMsgNumberImg.title = "Klicka här för att ändra antal meddelanden som visas";
    contextMenuSettingsMenuMsgNumberImg.src = "DESKTOPAPP/pics/appIcons/menuIcons/speechbubbles.png";
    
    contextMenuSettingsMenuMsgNumberA = document.createElement("a");
    contextMenuSettingsMenuMsgNumberA.innerHTML = "Antal meddelanden...";
    contextMenuSettingsMenuMsgNumberA.onmousedown = function(e) {
        e.preventDefault;
        that.changeMsgNumberMenu();
        return false;
    };
    contextMenuSettingsMenuMsgNumberA.insertBefore(contextMenuSettingsMenuMsgNumberImg, contextMenuSettingsMenuMsgNumberA.childNodes[0]);
    contextMenuSettingsMenuMsgNumber.appendChild(contextMenuSettingsMenuMsgNumberA);
    
    /* Change username */
    contextMenuSettingsMenuUsername = document.createElement("li");
    contextMenuSettingsMenu.appendChild(contextMenuSettingsMenuUsername);
    
    contextMenuSettingsMenuUsernameImg = document.createElement("img");
    contextMenuSettingsMenuUsernameImg.alt = "Ändra alias iconen";
    contextMenuSettingsMenuUsernameImg.title = "Klicka här för att ändra ditt alias";
    contextMenuSettingsMenuUsernameImg.src = "DESKTOPAPP/pics/appIcons/menuIcons/user.png";
    
    contextMenuSettingsMenuUsernameA = document.createElement("a");
    contextMenuSettingsMenuUsernameA.innerHTML = "Alias...";
    contextMenuSettingsMenuUsernameA.onmousedown = function(e) {
        e.preventDefault;
        that.changeUsernameMenu();
        return false;
    };
    contextMenuSettingsMenuUsernameA.insertBefore(contextMenuSettingsMenuUsernameImg, contextMenuSettingsMenuUsernameA.childNodes[0]);
    contextMenuSettingsMenuUsername.appendChild(contextMenuSettingsMenuUsernameA);
    
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
        that.getAjax();
        return false;
    };
    contextMenuSettingsMenuUpdateA.insertBefore(contextMenuSettingsMenuUpdateImg, contextMenuSettingsMenuUpdateA.childNodes[0]);
    contextMenuSettingsMenuUpdate.appendChild(contextMenuSettingsMenuUpdateA);
    
    this.contextMenu.appendChild(contextMenuSettings);
};

DESKTOPAPP.apps.LabbyMezzage.Message = function(message, date, name) {
    
    this.getText = function() {
        return message;
    };
    
    this.setText = function(_text) {
        message = _text;
    };
    
    this.getDate = function() {
        return date;
    };
    
    this.setDate = function(_date) {
        date = _date;
    };
    
    this.getName = function() {
        return name;
    };
    
    this.setName = function(_name) {
        name = _name;
    };
};

DESKTOPAPP.apps.LabbyMezzage.Message.prototype.toString = function() {
    return this.getText() + " (" + this.getDate() + ")";
};

DESKTOPAPP.apps.LabbyMezzage.Message.prototype.getHTMLText = function() {
    if(this.getText() !== null) {
        return this.getText().replace(/\n/g, "<br />");
    }
};

DESKTOPAPP.apps.LabbyMezzage.Message.prototype.getDateText = function() {
    var hours, minutes;
    hours = this.getDate().getHours();
    hours = (hours > 9) ? hours : "0" + hours;
    minutes = this.getDate().getMinutes();
    minutes = (minutes > 9) ? minutes : "0" + minutes;
    return hours + ":" + minutes;
};

DESKTOPAPP.apps.LabbyMezzage.Message.prototype.getTimeStamp = function() {
    var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Agu", "Sep", "Oct", "Nov", "Dec" ];
    return this.getDate().getDate() + " " + monthNames[this.getDate().getMonth()] + " " + this.getDate().getFullYear() + " " + this.getDateText();
};