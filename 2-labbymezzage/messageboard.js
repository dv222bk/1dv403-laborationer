"use strict";

var MessageBoard = {
    "messages" : [],
    
    "init" : window.onload = function() {
        var mess = new Message("Testmeddelande", new Date());
        MessageBoard.messages.push(mess);
        alert(MessageBoard.messages[0].getText());
    }
};