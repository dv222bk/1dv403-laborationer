"use strict";

var DESKTOPAPP = DESKTOPAPP || {};
DESKTOPAPP.apps = DESKTOPAPP.apps || {};

DESKTOPAPP.apps.LabbyMezzage = function(app, desktop) {
    var messages, userName;
    
    messages = [];
    
    this.app = app;
    this.desktop = desktop;
    
    this.messageHolder;
    
    userName = "test";
    
    /* Inherit from DesktopWindow */
    DESKTOPAPP.DesktopWindow.call(this);
    
    this.getMessages = function() {
        return messages;
    };
    
    this.getMessage = function(messageID) {
        return messages[messageID];
    };
    
    this.getUserName = function() {
        return userName;
    };
    
    this.setUserName = function(_userName) {
        userName = _userName;
    };
    
    this.createWindow(this.desktop, true);
    this.createApp();
};

/* Inherit from DesktopWindow */
DESKTOPAPP.apps.LabbyMezzage.prototype = new DESKTOPAPP.DesktopWindow();

DESKTOPAPP.apps.LabbyMezzage.prototype.createApp = function() {
    var appBody, writeMessage, textarea;
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
    textarea = document.createElement("textarea");
    textarea.onkeypress = function(e) {
        if(e.keyCode == 13) {
            if(!e.shiftKey) {
                e.preventDefault();
                that.sendMessage();
                return false;
            }
        }
    };
    writeMessage.appendChild(textarea);
};

DESKTOPAPP.apps.LabbyMezzage.prototype.sendMessage = function() {
    var textarea = this.windowBody.querySelector("textarea");
    // Remove all HTML tags
    textarea.value = textarea.value.replace( /<[^>]+>/g, '' );
    if(textarea.value.trim() !== "") {
        this.getMessages().push(new DESKTOPAPP.apps.LabbyMezzage.Message(textarea.value.trim(), new Date(), this.getUserName()));
        this.renderMessage(this.getMessages().length - 1);
    }
    textarea.value = "";
};

DESKTOPAPP.apps.LabbyMezzage.prototype.renderMessage = function(messageID) {
    var messageContainer, nameDate, name, date, messageText;
    var that = this;
    
    /* Container */
    messageContainer = document.createElement("div");
    /* Insert the new message at the top of the holder div, at the bottom of the message list */
    this.messageHolder.insertBefore(messageContainer, this.messageHolder.childNodes[messageID]);
    
    /* nameDate */
    nameDate = document.createElement("div");
    messageContainer.appendChild(nameDate);
    
    /* name */
    name = document.createElement("p");
    name.innerHTML = this.getMessage(messageID).getName();
    nameDate.appendChild(name);
    
    /* date */
    date = document.createElement("p");
    date.innerHTML = this.getMessage(messageID).getDateText();
    nameDate.appendChild(date);
    
    /* MsgText */
    messageText = document.createElement("p");
    messageText.innerHTML = this.getMessage(messageID).getHTMLText();
    messageContainer.appendChild(messageText);
    
    /* Scroll to the bottom of the page, in case the user wasn't already there 
    this.messageHolder.scrollTo(0, this.messageHolder.scrollHeight);
    */
};

DESKTOPAPP.apps.LabbyMezzage.prototype.renderMessages = function() {
    var divs, i;
    
    // Remove all messages
    divs = this.windowBody.querySelectorAll("div");
    /* First div element is the holder div, don't remove it */
    for(i = 1; i < divs.length; i+=1) {
        /* To remove an object, you need to target the parent */
        divs[i].parentNode.removeChild(divs[i]);
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
    return this.getText().replace(/\n/g, "<br />");
};

DESKTOPAPP.apps.LabbyMezzage.Message.prototype.getDateText = function() {
    return this.getDate().toLocaleTimeString();
};

DESKTOPAPP.apps.LabbyMezzage.Message.prototype.getTimeStamp = function() {
    var monthNames = [ "januari", "februari", "mars", "april", "maj", "juni",
    "juli", "agusti", "september", "october", "november", "december" ];
    return "Inlägget skapades den " + (this.getDate().getDate()) + " " + monthNames[this.getDate().getMonth()] + " " + this.getDate().getFullYear() + " klockan " + this.getDateText();
};