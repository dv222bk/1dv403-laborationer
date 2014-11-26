"use strict";

function MessageBoard(elementID) {
    var appBody, div, header, appVersion, messageCount, textarea, submitButton, element;
    var that = this;
    var messages = [];
    
    /* App DOM */
    element = document.getElementById(elementID);
    
    /* Section */
    appBody = document.createElement("section");
    appBody.className = "LabbyMezzage";
    element.appendChild(appBody);
    
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
    messageCount.innerHTML = "Antal Meddelanden " + messages.length;
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
    
    this.getMessages = function() {
        return messages;
    }
    
    this.getAppBody = function() {
        return appBody;
    }
}

MessageBoard.prototype.sendMessage = function() {
    this.getMessages().push(new Message(this.getAppBody().getElementsByTagName("textarea")[0].value, new Date()));
}

window.onload = function() {
        var what = new MessageBoard("msg1");
}