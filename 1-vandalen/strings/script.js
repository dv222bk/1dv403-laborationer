"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		var i, ch;
		
		str = str.trim();
		if(str === ""){
			throw Error("Du måste skriva en sträng!");
		}
		
		for(i = 0; i < str.length; i += 1) {
			ch = str.charAt(i);
			if(ch === ch.toUpperCase()) {
				str = str.substr(0, i) + ch.toLowerCase() + str.substr(i + 1);
			} else {
				str = str.substr(0, i) + ch.toUpperCase() + str.substr(i + 1);
			}
		}
		
		return str.replace(/A|a/g, "#");
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
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};