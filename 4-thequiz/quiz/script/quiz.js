"use strict";

function QuizGame(elementID, firstURL) {
    var nextURL = firstURL;
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    this.setNextURL = function(URL) {
        nextURL = URL; 
    }
    
    this.getNextURL = function() {
        return nextURL;
    }
    
    this.createApp();
    this.recieveQuestion();
}

QuizGame.prototype.createApp = function() {
    var appBody, header, appName, questionHolder, questionP, answerInput, submitButton;
    var that = this;
    
    /* Section */
    appBody = document.createElement("section");
    appBody.className = "QuizGame";
    this.root.appendChild(appBody);
    
    /* Header */
    header = document.createElement("header");
    appName = document.createElement("p");
    appName.innerHTML = "QUIZ GAME";
    header.appendChild(appName);
    appBody.appendChild(header);
    
    /* Question holder */
    questionHolder = document.createElement("div");
    questionP = document.createElement("p");
    questionP.className = "question";
    questionHolder.appendChild(questionP);
    appBody.appendChild(questionHolder);
    
    /* Input field */
    answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.name = "answer";
    appBody.appendChild(answerInput);
    
    /* Send-button */
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Svara";
    submitButton.onclick = function(e) {
        e.preventDefault();
        that.sendAnswer(that.root.querySelector("input").value);
        return false;
    };
    appBody.appendChild(submitButton);
};

QuizGame.prototype.sendAnswer = function(answer) {
    var xhr, JSONData;
    var that = this;
    xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.log("Läsfel. Status: " + xhr.status);
            }
        }
    };
    xhr.open("POST", this.getNextURL(), true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(answer));
};

QuizGame.prototype.recieveQuestion = function() {
    var xhr, JSONData;
    var that = this;
    xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                JSONData = JSON.parse(xhr.responseText); 
                that.root.querySelector(".question").innerHTML = JSONData.question;
                that.setNextURL(JSONData.nextURL);
            } else {
                console.log("Läsfel. Status: " + xhr.status);
            }
        }
    };
    xhr.open("GET", this.getNextURL(), true);
    xhr.send(null);
};