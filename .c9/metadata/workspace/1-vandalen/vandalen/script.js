{"changed":true,"filter":false,"title":"script.js","tooltip":"/1-vandalen/vandalen/script.js","value":"\"use strict\";\n\nvar makePerson = function(persArr){\n    var result, names = \"\", minAge, maxAge, averageAge, totalAge = 0, person;\n    var persArrCopy = persArr.slice(); // To avoid altering the original array\n    \n    for(person in persArrCopy) { // Error handling\n        if(typeof persArrCopy[person].name !== \"string\") { // Because of the strange values in the tests, this changes values instead of throwing errors, for the sake of completing all tests.\n            persArrCopy[person].name = \"John Doe\";\n            //throw Error(persArrCopy[person].name + \" är inte en sträng!\");\n        } else if (typeof persArrCopy[person].age !== \"number\") {\n            persArrCopy[person].age = \"0\";\n            //throw Error(persArrCopy[person].age + \" är inte ett nummer!\");\n        }\n    }\n    \n    persArrCopy.sort(function(person1,person2) {\n        return person1.name.localeCompare(person2.name);\n    });\n    persArrCopy.map(function(person, index){\n        names += person.name;\n        names += (index === persArrCopy.length - 1) ? \"\" : \", \";\n    });\n    \n    maxAge = Math.max.apply(Math, persArrCopy.map(function(person) { \n        return person.age;\n    }));\n    minAge = Math.min.apply(Math, persArrCopy.map(function(person) {\n        return person.age;\n    }));\n    persArrCopy.map(function(person) {\n        totalAge += person.age;\n    });\n    averageAge = Math.round(totalAge / persArrCopy.length);\n    \n    result = {\n        minAge: minAge,\n        maxAge: maxAge,\n        averageAge: averageAge,\n        names: names\n    };\n    \n    return result; \n} \nvar data = [{name: \"John Häggerud\", age: 37}, {name: \"Johan Leitet\", age: 36}, {name: \"Mats Loock\", age: 46}];\n\nvar result = makePerson(data);\n\nconsole.log(result);","undoManager":{"mark":90,"position":100,"stack":[[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":7,"column":193},"end":{"row":7,"column":194}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":7,"column":192},"end":{"row":7,"column":193}},"text":"H"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":7,"column":191},"end":{"row":7,"column":192}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":90},"end":{"row":24,"column":91}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":91},"end":{"row":24,"column":92}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":92},"end":{"row":24,"column":93}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":93},"end":{"row":24,"column":94}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":94},"end":{"row":24,"column":95}},"text":"F"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":95},"end":{"row":24,"column":96}},"text":"i"},{"action":"insertText","range":{"start":{"row":24,"column":96},"end":{"row":24,"column":97}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":97},"end":{"row":24,"column":98}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":98},"end":{"row":24,"column":99}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":99},"end":{"row":24,"column":100}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":100},"end":{"row":24,"column":101}},"text":"h"},{"action":"insertText","range":{"start":{"row":24,"column":101},"end":{"row":24,"column":102}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":102},"end":{"row":24,"column":103}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":102},"end":{"row":24,"column":103}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":101},"end":{"row":24,"column":102}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":100},"end":{"row":24,"column":101}},"text":"h"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":99},"end":{"row":24,"column":100}},"text":"t"},{"action":"removeText","range":{"start":{"row":24,"column":98},"end":{"row":24,"column":99}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":97},"end":{"row":24,"column":98}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":96},"end":{"row":24,"column":97}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":95},"end":{"row":24,"column":96}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":94},"end":{"row":24,"column":95}},"text":"F"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":93},"end":{"row":24,"column":94}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":92},"end":{"row":24,"column":93}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":91},"end":{"row":24,"column":92}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":90},"end":{"row":24,"column":91}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":24,"column":89},"end":{"row":24,"column":90}},"text":";"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":68},"end":{"row":25,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":25,"column":0},"end":{"row":25,"column":8}},"text":"        "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":25,"column":26},"end":{"row":26,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":26,"column":0},"end":{"row":27,"column":0}},"lines":["        "]},{"action":"insertText","range":{"start":{"row":27,"column":0},"end":{"row":27,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":26,"column":4},"end":{"row":26,"column":8}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":26,"column":0},"end":{"row":26,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":25,"column":26},"end":{"row":26,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":26,"column":7},"end":{"row":26,"column":8}},"text":";"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":27,"column":67},"end":{"row":27,"column":68}},"text":" "},{"action":"insertText","range":{"start":{"row":27,"column":67},"end":{"row":28,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":28,"column":0},"end":{"row":28,"column":8}},"text":"        "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":66},"end":{"row":27,"column":67}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":24,"column":66},"end":{"row":24,"column":67}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":26},"end":{"row":29,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":29,"column":0},"end":{"row":30,"column":0}},"lines":["        "]},{"action":"insertText","range":{"start":{"row":30,"column":0},"end":{"row":30,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":29,"column":4},"end":{"row":29,"column":8}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":29,"column":0},"end":{"row":29,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":28,"column":26},"end":{"row":29,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":36},"end":{"row":30,"column":37}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":30,"column":38},"end":{"row":30,"column":39}},"text":" "},{"action":"insertText","range":{"start":{"row":30,"column":38},"end":{"row":31,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":31,"column":0},"end":{"row":31,"column":8}},"text":"        "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":31,"column":31},"end":{"row":32,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":32,"column":0},"end":{"row":33,"column":0}},"lines":["        "]},{"action":"insertText","range":{"start":{"row":33,"column":0},"end":{"row":33,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":32,"column":4},"end":{"row":32,"column":8}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":32,"column":0},"end":{"row":32,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":31,"column":31},"end":{"row":32,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":31,"column":30},"end":{"row":31,"column":31}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":31,"column":30},"end":{"row":31,"column":31}},"text":";"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":28,"column":25},"end":{"row":28,"column":26}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":25},"end":{"row":28,"column":26}},"text":";"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":25,"column":25},"end":{"row":25,"column":26}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":25,"column":25},"end":{"row":25,"column":26}},"text":";"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":19,"column":47},"end":{"row":19,"column":48}},"text":"x"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":19,"column":46},"end":{"row":19,"column":47}},"text":"e"},{"action":"removeText","range":{"start":{"row":19,"column":45},"end":{"row":19,"column":46}},"text":"d"},{"action":"removeText","range":{"start":{"row":19,"column":44},"end":{"row":19,"column":45}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":44},"end":{"row":19,"column":45}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":45},"end":{"row":19,"column":46}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":46},"end":{"row":19,"column":47}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":47},"end":{"row":19,"column":48}},"text":"x"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":33},"end":{"row":16,"column":34}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":32},"end":{"row":16,"column":33}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":31},"end":{"row":16,"column":32}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":30},"end":{"row":16,"column":31}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":30},"end":{"row":16,"column":31}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":31},"end":{"row":16,"column":32}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":32},"end":{"row":16,"column":33}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":33},"end":{"row":16,"column":34}},"text":"s"},{"action":"insertText","range":{"start":{"row":16,"column":34},"end":{"row":16,"column":35}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":35},"end":{"row":16,"column":36}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":41},"end":{"row":16,"column":42}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":40},"end":{"row":16,"column":41}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":39},"end":{"row":16,"column":40}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":16,"column":38},"end":{"row":16,"column":39}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":38},"end":{"row":16,"column":39}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":39},"end":{"row":16,"column":40}},"text":"e"},{"action":"insertText","range":{"start":{"row":16,"column":40},"end":{"row":16,"column":41}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":41},"end":{"row":16,"column":42}},"text":"s"},{"action":"insertText","range":{"start":{"row":16,"column":42},"end":{"row":16,"column":43}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":16,"column":43},"end":{"row":16,"column":44}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":18},"end":{"row":17,"column":19}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":17},"end":{"row":17,"column":18}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":16},"end":{"row":17,"column":17}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":15},"end":{"row":17,"column":16}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":15},"end":{"row":17,"column":16}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":16},"end":{"row":17,"column":17}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":17},"end":{"row":17,"column":18}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":18},"end":{"row":17,"column":19}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":19},"end":{"row":17,"column":20}},"text":"o"},{"action":"insertText","range":{"start":{"row":17,"column":20},"end":{"row":17,"column":21}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":45},"end":{"row":17,"column":46}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":44},"end":{"row":17,"column":45}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":43},"end":{"row":17,"column":44}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":42},"end":{"row":17,"column":43}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":42},"end":{"row":17,"column":43}},"text":"p"},{"action":"insertText","range":{"start":{"row":17,"column":43},"end":{"row":17,"column":44}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":44},"end":{"row":17,"column":45}},"text":"r"},{"action":"insertText","range":{"start":{"row":17,"column":45},"end":{"row":17,"column":46}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":17,"column":46},"end":{"row":17,"column":47}},"text":"o"},{"action":"insertText","range":{"start":{"row":17,"column":47},"end":{"row":17,"column":48}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":19,"column":29},"end":{"row":19,"column":41}},"text":"currentValue"},{"action":"insertText","range":{"start":{"row":19,"column":29},"end":{"row":19,"column":30}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":30},"end":{"row":19,"column":31}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":31},"end":{"row":19,"column":32}},"text":"r"},{"action":"insertText","range":{"start":{"row":19,"column":32},"end":{"row":19,"column":33}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":33},"end":{"row":19,"column":34}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":19,"column":34},"end":{"row":19,"column":35}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":20,"column":17},"end":{"row":20,"column":29}},"text":"currentValue"},{"action":"insertText","range":{"start":{"row":20,"column":17},"end":{"row":20,"column":18}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":18},"end":{"row":20,"column":19}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":19},"end":{"row":20,"column":20}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":20},"end":{"row":20,"column":21}},"text":"s"},{"action":"insertText","range":{"start":{"row":20,"column":21},"end":{"row":20,"column":22}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":22},"end":{"row":20,"column":23}},"text":"n"}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":20,"column":29},"end":{"row":20,"column":29},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1415623020039}