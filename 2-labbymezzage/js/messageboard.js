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

MessageBoard.prototype.sendMessage = function() {
    var textarea = this.root.querySelector("textarea");
    if(textarea.value.trim() !== "") {
        this.getMessages().push(new Message(textarea.value.trim(), new Date()));
    }
    textarea.value = "";
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

window.onload = function() {
    var what = new MessageBoard("msg1");
}