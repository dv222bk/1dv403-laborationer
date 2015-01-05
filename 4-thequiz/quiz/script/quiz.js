"use strict";

function QuizGame(elementID, firstURL) {
    var nextURL, questionHolder, answerCount, question;
    
    /* root element */
    this.root = document.getElementById(elementID);
    
    nextURL = firstURL;
    questionHolder = [];
    answerCount = 0;
    
    this.setNextURL = function(URL) {
        nextURL = URL; 
    };
    
    this.getNextURL = function() {
        return nextURL;
    };
    
    this.resetQuestion = function() {
        nextURL = firstURL;
    };
    
    this.addQuestion = function(nextQuestion) {
        question = nextQuestion;
    };
    
    this.updateQuestionHolder = function() {
        questionHolder.push([question, answerCount]);
    };
    
    this.getQuestionHolder = function() {
        return questionHolder;
    };
    
    this.resetQuestionHolder = function() {
        questionHolder = [];
    };
    
    this.increaseAnswerCount = function() {
        answerCount += 1;
    };
    
    this.resetAnswerCount = function() {
        answerCount = 0;
    };
    
    this.createApp();
    this.recieveQuestion();
}

QuizGame.prototype.restartApp = function() {
    this.root.innerHTML = "";
    this.resetQuestion();
    this.resetQuestionHolder();
    this.createApp();
    this.recieveQuestion();
};

QuizGame.prototype.createApp = function() {
    var appBody, header, appName, contentHolder, questionP, statusP, answerInput, submitButton;
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
    
    /* Content Holder */
    contentHolder = document.createElement("div");
    appBody.appendChild(contentHolder);
    
    /* Question holder */
    questionP = document.createElement("p");
    questionP.className = "question";
    contentHolder.appendChild(questionP);
    
    /* Status holder */
    statusP = document.createElement("p");
    statusP.className = "status";
    contentHolder.appendChild(statusP);
    
    /* Input field */
    answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.name = "answer";
    answerInput.onkeypress = function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            that.sendAnswer(this.value);
            this.value = "";
            return false;
        }
    };
    contentHolder.appendChild(answerInput);
    
    /* Send-button */
    submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Svara";
    submitButton.onclick = function(e) {
        e.preventDefault();
        that.sendAnswer(that.root.querySelector("input").value);
        that.root.querySelector("input").value = "";
        return false;
    };
    contentHolder.appendChild(submitButton);
};

QuizGame.prototype.sendAnswer = function(answer) {
    var xhr, JSONData;
    var that = this;
    xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                JSONData = JSON.parse(xhr.responseText);
                that.increaseAnswerCount();
                that.updateQuestionHolder();
                that.root.querySelector(".status").innerHTML = "";
                if(JSONData.nextURL !== undefined) {
                    that.setNextURL(JSONData.nextURL);
                    that.recieveQuestion();
                } else {
                    that.quizFinished();
                }
            } else if (xhr.status === 400) {
                that.root.querySelector(".status").innerHTML = "Fel svar! Försök igen!";
                that.increaseAnswerCount();
            } else {
                console.log("Läsfel. Status: " + xhr.status);
            }
        }
    };
    xhr.open("POST", this.getNextURL(), true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"answer":answer}));
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
                that.addQuestion(JSONData.question);
                that.setNextURL(JSONData.nextURL);
                that.root.querySelector(".question").innerHTML = "Fråga " + (that.getQuestionHolder().length + 1) + ": " + JSONData.question;
                that.resetAnswerCount();
            } else {
                console.log("Läsfel. Status: " + xhr.status);
            }
        }
    };
    xhr.open("GET", this.getNextURL(), true);
    xhr.send(null);
};

QuizGame.prototype.quizFinished = function() {
    var contentHolder, questionHolder, question, pElement, restartButton;
    var that = this;
    contentHolder = this.root.querySelector("div");
    contentHolder.innerHTML = "";
    questionHolder = this.getQuestionHolder();
    pElement = document.createElement("p");
    pElement.innerHTML = "Grattis! Du svarade rätt på alla frågor!";
    contentHolder.appendChild(pElement);

    for(question = 0; question < questionHolder.length; question += 1) {
        pElement = document.createElement("p");
        pElement.innerHTML = "Fråga " + (question + 1) + " (" + questionHolder[question][0] + "): " + questionHolder[question][1] + " försök.";
        contentHolder.appendChild(pElement);
    }
    
    restartButton = document.createElement("button");
    restartButton.type = "submit";
    restartButton.innerHTML = "Starta om quizzen";
    restartButton.onclick = function(e) {
        e.preventDefault();
        that.restartApp();
        return false;
    };
    contentHolder.appendChild(restartButton);
};