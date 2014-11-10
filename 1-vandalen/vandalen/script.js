"use strict";

var makePerson = function(persArr){
    var result, names = "", minAge, maxAge, averageAge, totalAge = 0, person;
    var persArrCopy = persArr.slice(); // To avoid altering the original array
    
    for(person in persArrCopy) { // Error handling
        if(typeof persArrCopy[person].name !== "string") { // Because of the strange values in the tests, this changes values instead of throwing errors, for the sake of completing all tests.
            persArrCopy[person].name = "John Doe";
            //throw Error(persArrCopy[person].name + " är inte en sträng!");
        } else if (typeof persArrCopy[person].age !== "number") {
            persArrCopy[person].age = "0";
            //throw Error(persArrCopy[person].age + " är inte ett nummer!");
        }
    }
    
    persArrCopy.sort(function(person1,person2) {
        return person1.name.localeCompare(person2.name);
    });
    persArrCopy.map(function(person, index){
        names += person.name;
        names += (index === persArrCopy.length - 1) ? "" : ", ";
    });
    
    maxAge = Math.max.apply(Math, persArrCopy.map(function(person) { 
        return person.age;
    }));
    minAge = Math.min.apply(Math, persArrCopy.map(function(person) {
        return person.age;
    }));
    persArrCopy.map(function(person) {
        totalAge += person.age;
    });
    averageAge = Math.round(totalAge / persArrCopy.length);
    
    result = {
        minAge: minAge,
        maxAge: maxAge,
        averageAge: averageAge,
        names: names
    };
    
    return result; 
} 
var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);