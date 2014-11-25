"use strict";

var engine = {
    "init" : window.onload = function() {
        var mess = new Message("Testmeddelande", new Date());
        alert(mess);
        alert(mess.getText());
        mess.setText("En annan text\nsom är coolare\nän den första");
        alert(mess);
        alert(mess.getHTMLText());
        alert(mess.getDateText());
    }
};