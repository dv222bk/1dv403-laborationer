"use strict";

function MessageBoard(elementID) {
    var messages = [];
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    this.getMessages = function() {
        return messages;
    }
    
    this.createApp();
}

MessageBoard.prototype.createApp = function() {
    var appBody, div, header, appVersion, messageCount, textarea, submitButton;
    var that = this;
    
    /* Section */
    appBody = document.createElement("section");
    appBody.className = "LabbyMezzage";
    this.root.appendChild(appBody);
    
    /* Header */
    header = document.createElement("header");
    appVersion = document.createElement("p");
    appVersion.innerHTML = "v0.1b";
    header.appendChild(appVersion);
    appBody.appendChild(header);
    
    /* Holder div */
    div = document.createElement("div");
    appBody.appendChild(div);
    
    /* Message Counter */
    messageCount = document.createElement("span");
    messageCount.innerHTML = "Antal Meddelanden " + this.getMessages().length;
    div.appendChild(messageCount);
    
    /* Textarea */
    textarea = document.createElement("textarea");
    div.appendChild(document.createElement("textarea"));
    
    /* Send-button */
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Skriv";
    submitButton.onclick = function(e) {
        e.preventDefault();
        that.sendMessage();
        alert(that.getMessages()[that.getMessages().length - 1].toString());
        return false;
    }
    div.appendChild(submitButton);
}

MessageBoard.prototype.sendMessage = function() {
    var textarea = this.root.querySelector("textarea");
    if(textarea.value.trim() !== "") {
        this.getMessages().push(new Message(textarea.value.trim(), new Date()));
    }
    textarea.value = "";
    this.renderMessage(this.getMessages().length - 1);
}

MessageBoard.prototype.renderMessage = function(messageID) {
    var messageContainer = document.createElement("div");
    var messageText = document.createElement("p");
    var messageDate = document.createElement("p");
    var insertDestination = this.root.querySelector('div');
    messageText.innerHTML = this.getMessages()[messageID].getHTMLText();
    messageDate.innerHTML = this.getMessages()[messageID].getDateText();
    messageContainer.appendChild(messageText);
    messageContainer.appendChild(messageDate);
    /* Insert the new message at the top of the holder div, at the bottom of the message list */
    insertDestination.insertBefore(messageContainer, insertDestination.childNodes[messageID]);
}

MessageBoard.prototype.renderMessages = function() {
    var divs, i;
    
    // Remove all messages
    divs = this.root.querySelectorAll("div");
    /* First div element is the holder div, don't remove it */
    for(i = 1; i < divs.length; i+=1) {
        /* To remove an object, you need to target the parent */
        divs[i].parentNode.removeChild(divs[i]);
    }
    
    // Render all messages
    for(i = 0; i < this.getMessages().length; i+=1) {
        this.renderMessage(i);
    }
}

window.onload = function() {
    var what = new MessageBoard("msg1");
}