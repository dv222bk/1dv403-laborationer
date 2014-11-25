"use strict";

window.onload = function() {
        var what = new MessageBoard("msg1");
        what.pushMessage("what what");
        alert(what.getMessages());
}

function MessageBoard(elementID) {
    var section, div, header, p, button, element;
    var that = this;
    var messages = [];
    
    this.getMessages = function() {
        return messages;
    }
    
    this.getMessage = function(index) {
        return messages[index];
    }
    
    this.pushMessage = function(_message) {
        messages.push(new Message(_message, new Date()));
    }
    
    /* App DOM */
    element = document.getElementById(elementID);
    
    /* Section */
    section = document.createElement("section");
    section.className = "LabbyMezzage";
    element.appendChild(section);
    
    /* Holder div */
    div = document.createElement("div");
    section.appendChild(div);
    
    /* Header */
    header = document.createElement("header");
    p = document.createElement("p");
    p.innerHTML = "v0.1b";
    header.appendChild(p);
    div.appendChild(header);
    
    /* Textarea */
    div.appendChild(document.createElement("textarea"));
    
    /* Send-button */
    button = document.createElement("button");
    button.type = "submit";
    button.innerHTML = "Skriv";
    button.onclick = function(e) {
        that.sendMessage();
        return false;
    }
    div.appendChild(button);
}

MessageBoard.prototype.sendMessage = function() {
    
}