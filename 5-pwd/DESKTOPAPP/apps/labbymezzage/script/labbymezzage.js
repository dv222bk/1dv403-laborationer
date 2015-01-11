"use strict";

var DESKTOPAPP = DESKTOPAPP || {};
DESKTOPAPP.apps = DESKTOPAPP.apps || {};

DESKTOPAPP.apps.LabbyMezzage = function(app, desktop) {
    var messages, userName, updateTime, ajaxInterval, numberOfMsgs, lastXMLGet;
    
    messages = [];
    
    this.app = app;
    this.desktop = desktop;
    
    this.messageHolder;
    this.textarea;
    
    userName = "test";
    updateTime = 10000;
    numberOfMsgs = 50;
    
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
    
    this.getUserName = function() {
        return userName;
    };
    
    this.setUserName = function(_userName) {
        userName = _userName;
    };
    
    this.getUpdateTime = function() {
        return updateTime;
    };
    
    this.setUpdateTime = function(miliSeconds) {
        updateTime = miliSeconds;
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
    
    this.getLastXMLGet = function() {
        return lastXMLGet;
    };
    
    this.setLastXMLGet = function(XMLGet) {
        lastXMLGet = XMLGet;
    };
    
    this.createWindow(this.desktop, true);
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
    this.setGetInterval(this.getUpdateTime());
};

DESKTOPAPP.apps.LabbyMezzage.prototype.closeWindow = function() {
    this.desktop.removeWindow(this.windowHolder);
    this.windowHolder.parentNode.removeChild(this.windowHolder);
    this.clearAjaxInterval();
};

DESKTOPAPP.apps.LabbyMezzage.prototype.getAjax = function() {
    var xhr, parser, XMLData, message;
    var that = this;
    
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
    var xhr, JSONData;
    var that = this;
    
    
    this.textarea.value = this.textarea.value.replace( /<[^>]+>/g, '' ).trim();
    if(this.textarea.value.trim() !== "") {
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
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send("text=" + this.textarea.value + "&username=" + this.getUserName());
    }
    this.textarea.value = "";
};

DESKTOPAPP.apps.LabbyMezzage.prototype.setGetInterval = function(miliSeconds) {
    var that = this;
    this.clearAjaxInterval();
    this.setAjaxInterval(setInterval(function() {
       that.getAjax(); 
    }, miliSeconds));
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
    
    /* Scroll to the bottom of the page, in case the user wasn't already there 
    this.messageHolder.scrollTo(0, this.messageHolder.scrollHeight);
    */
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
    hours = (hours > 10) ? hours : "0" + hours;
    minutes = this.getDate().getMinutes();
    minutes = (minutes > 10) ? minutes : "0" + minutes;
    return hours + ":" + minutes;
};

DESKTOPAPP.apps.LabbyMezzage.Message.prototype.getTimeStamp = function() {
    var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Agu", "Sep", "Oct", "Nov", "Dec" ];
    return this.getDate().getDate() + " " + monthNames[this.getDate().getMonth()] + " " + this.getDate().getFullYear() + " " + this.getDateText();
};