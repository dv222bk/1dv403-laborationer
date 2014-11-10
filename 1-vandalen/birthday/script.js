"use strict";

window.onload = function(){

	
	var birthday = function(date){
		var today, dateCheck, daysToBirthday
		
		date = date.trim();
		dateCheck = /^(19|20)[0-9]{2}-(1[0-2]|0[1-9])-(3[0-1]|[1-2][0-9]|0[1-9])$/; // Kontrollerar så att datumet är ett korrekt datum mellan 1900-01-01 och 2099-12-31 (tar inte hänsyn till att vissa månader har mindre än 31 dagar)
		if(!dateCheck.test(date)) {
			throw Error("Felaktigt datum format. Var god ange datum enligt YYYY-MM-DD!");
		}
		
		date = new Date(date);
		if(date.toString() === "Invalid Date") { // Kontrollerar ifall datumet är ett faktiskt korrekt datum
			throw Error("Felaktigt datum angivet. Var god ange ett korrekt datum");
		}
		
		today = new Date();
		date.setFullYear(today.getFullYear());
		if(today > date) { // Om födelsedagen redan har inträffat i år, så kommer nästa födelsedag att inträffa nästa år
			date.setFullYear(date.getFullYear() + 1);
		}
		
		daysToBirthday = Math.floor((date.getTime() - today.getTime()) / (1000*60*60*24)) + 1;
		if(daysToBirthday === 365) { // Om det är 365 dagar ifrån datumet, så är det idag.
			daysToBirthday = 0;
		}
		
		return daysToBirthday;
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};