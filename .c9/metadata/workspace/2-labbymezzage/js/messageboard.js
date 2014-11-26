{"filter":false,"title":"messageboard.js","tooltip":"/2-labbymezzage/js/messageboard.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":6,"column":4},"end":{"row":6,"column":51},"action":"insert","lines":["this.root = document.getElementById(elementID);"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":4},"end":{"row":6,"column":0},"action":"insert","lines":["",""]},{"start":{"row":6,"column":0},"end":{"row":6,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":4},"end":{"row":6,"column":5},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":5},"end":{"row":6,"column":6},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":6},"end":{"row":6,"column":7},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":7},"end":{"row":6,"column":8},"action":"insert","lines":["R"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":7},"end":{"row":6,"column":8},"action":"remove","lines":["R"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":7},"end":{"row":6,"column":8},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":8},"end":{"row":6,"column":9},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":9},"end":{"row":6,"column":10},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":10},"end":{"row":6,"column":11},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":11},"end":{"row":6,"column":12},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":12},"end":{"row":6,"column":13},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":13},"end":{"row":6,"column":14},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":14},"end":{"row":6,"column":15},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":15},"end":{"row":6,"column":16},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":16},"end":{"row":6,"column":17},"action":"insert","lines":["e"]},{"start":{"row":6,"column":17},"end":{"row":6,"column":18},"action":"insert","lines":["n"]},{"start":{"row":6,"column":18},"end":{"row":6,"column":19},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":19},"end":{"row":6,"column":20},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":20},"end":{"row":6,"column":21},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":21},"end":{"row":6,"column":22},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":0},"end":{"row":9,"column":51},"action":"remove","lines":["    /* App DOM */","    this.root = document.getElementById(elementID);"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":51},"end":{"row":8,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":2},"end":{"row":44,"column":34},"action":"remove","lines":["  ","    /* Section */","    appBody = document.createElement(\"section\");","    appBody.className = \"LabbyMezzage\";","    this.root.appendChild(appBody);","    ","    /* Header */","    header = document.createElement(\"header\");","    appVersion = document.createElement(\"p\");","    appVersion.innerHTML = \"v0.1b\";","    header.appendChild(appVersion);","    appBody.appendChild(header);","    ","    /* Holder div */","    div = document.createElement(\"div\");","    appBody.appendChild(div);","    ","    /* Message Counter */","    messageCount = document.createElement(\"span\");","    messageCount.innerHTML = \"Antal Meddelanden \" + messages.length;","    div.appendChild(messageCount);","    ","    /* Textarea */","    textarea = document.createElement(\"textarea\");","    div.appendChild(document.createElement(\"textarea\"));","    ","    /* Send-button */","    submitButton = document.createElement(\"button\");","    submitButton.type = \"submit\";","    submitButton.innerHTML = \"Skriv\";","    submitButton.onclick = function(e) {","        e.preventDefault();","        that.sendMessage();","        alert(that.getMessages()[that.getMessages().length - 1].toString());","        return false;","    }","    div.appendChild(submitButton);"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":1},"end":{"row":8,"column":2},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":0},"end":{"row":8,"column":1},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":51},"end":{"row":8,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":19},"end":{"row":3,"column":20},"action":"remove","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":18},"end":{"row":3,"column":19},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":17},"end":{"row":3,"column":18},"action":"remove","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":16},"end":{"row":3,"column":17},"action":"remove","lines":["h"]},{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":14},"end":{"row":3,"column":15},"action":"remove","lines":[" "]},{"start":{"row":3,"column":13},"end":{"row":3,"column":14},"action":"remove","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":12},"end":{"row":3,"column":13},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":11},"end":{"row":3,"column":12},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":10},"end":{"row":3,"column":11},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":9},"end":{"row":3,"column":10},"action":"remove","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":8},"end":{"row":3,"column":9},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":7},"end":{"row":3,"column":8},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":6},"end":{"row":3,"column":7},"action":"remove","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":5},"end":{"row":3,"column":6},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":4},"end":{"row":3,"column":5},"action":"remove","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":0},"end":{"row":3,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":34},"end":{"row":3,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":44},"end":{"row":21,"column":45},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":45},"end":{"row":21,"column":46},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":46},"end":{"row":21,"column":47},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":47},"end":{"row":21,"column":48},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":48},"end":{"row":21,"column":49},"action":"insert","lines":["E"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":49},"end":{"row":21,"column":50},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":50},"end":{"row":21,"column":51},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":51},"end":{"row":21,"column":52},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":52},"end":{"row":21,"column":53},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":53},"end":{"row":21,"column":54},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":54},"end":{"row":21,"column":55},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":54},"end":{"row":21,"column":55},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":53},"end":{"row":21,"column":54},"action":"remove","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":52},"end":{"row":21,"column":53},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":51},"end":{"row":21,"column":52},"action":"remove","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":50},"end":{"row":21,"column":51},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":49},"end":{"row":21,"column":50},"action":"remove","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":48},"end":{"row":21,"column":49},"action":"remove","lines":["E"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":47},"end":{"row":21,"column":48},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":46},"end":{"row":21,"column":47},"action":"remove","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":45},"end":{"row":21,"column":46},"action":"remove","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":44},"end":{"row":21,"column":45},"action":"remove","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":51},"end":{"row":7,"column":0},"action":"insert","lines":["",""]},{"start":{"row":7,"column":0},"end":{"row":7,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":4},"end":{"row":8,"column":0},"action":"insert","lines":["",""]},{"start":{"row":8,"column":0},"end":{"row":8,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":4},"end":{"row":8,"column":5},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":5},"end":{"row":8,"column":6},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":6},"end":{"row":8,"column":7},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":7},"end":{"row":8,"column":8},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":8},"end":{"row":8,"column":9},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":9},"end":{"row":8,"column":10},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":9},"end":{"row":8,"column":10},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":8},"end":{"row":8,"column":9},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":7},"end":{"row":8,"column":8},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":6},"end":{"row":8,"column":7},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":5},"end":{"row":8,"column":6},"action":"remove","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":4},"end":{"row":8,"column":5},"action":"remove","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":4},"end":{"row":8,"column":5},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":5},"end":{"row":8,"column":6},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":6},"end":{"row":8,"column":7},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":7},"end":{"row":8,"column":8},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":8},"end":{"row":8,"column":9},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":9},"end":{"row":8,"column":10},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":10},"end":{"row":8,"column":11},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":11},"end":{"row":8,"column":12},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":12},"end":{"row":8,"column":13},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":13},"end":{"row":8,"column":14},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":14},"end":{"row":8,"column":15},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":15},"end":{"row":8,"column":16},"action":"insert","lines":["A"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":16},"end":{"row":8,"column":17},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":17},"end":{"row":8,"column":18},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":18},"end":{"row":8,"column":20},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":19},"end":{"row":8,"column":19},"action":"insert","lines":[""]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":20},"end":{"row":8,"column":21},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":5},"end":{"row":13,"column":0},"action":"insert","lines":["",""]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":4},"end":{"row":14,"column":0},"action":"insert","lines":["",""]},{"start":{"row":14,"column":0},"end":{"row":14,"column":4},"action":"insert","lines":["    "]},{"start":{"row":14,"column":4},"end":{"row":14,"column":21},"action":"insert","lines":["this.createApp();"]}]}],[{"group":"doc","deltas":[{"start":{"row":8,"column":0},"end":{"row":8,"column":21},"action":"remove","lines":["    this.createApp();"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":4},"end":{"row":8,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":0},"end":{"row":7,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":51},"end":{"row":7,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":240,"scrollleft":0,"selection":{"start":{"row":6,"column":51},"end":{"row":6,"column":51},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":14,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1417002210096,"hash":"3f82968105306381aca699ca961576ae01e9bb14"}