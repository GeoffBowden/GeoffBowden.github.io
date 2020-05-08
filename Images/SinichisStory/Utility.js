
var getRandomNatural = function ( max ) {
	return Math.floor( Math.random() * Math.floor( max ) ) + 1;
}; 

var rollD3 = function () {
	return getRandomNatural( 3 ) ;
};

var rollD6 = function () {
	return getRandomNatural( 6 ) ;
};

var roll2D6 = function () {
	return rollD6() + rollD6() ;
}

var roll4D3 = function () {
	return rollD3() + rollD3() + rollD3() + rollD3();
}

var generateStat = function () {
	let natStat = roll2D6() ;
	let reserveStat = roll4D3() ;
	return (reserveStat>natStat)?reserveStat:natStat;
}

// the cookie crew
// adds a name and value pair to the cookie
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  var cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  if ( cookieNameExists ( cname ) || document.cookie == '' ){
	document.cookie = cookie;
  }
  else{
	document.cookie += cookie;
  };
};

// returns true or false if a cookie name exists on the docuement.cookie
function cookieNameExists( cname ) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    };
    if (c.indexOf(name) == 0) {
      return true;
    };
  };
  return false;
};

// given a name returns the value associated with the name from the cookie, empty string 
// if the cookie does not exist
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    };
  };
  return "";
};

// in the cookie state tag output the cookie
function showCookie () {
	var cookieStateDiv = document.getElementById( 'cookieState' ) ;
	cookieStateDiv.innerHTML = "cookie state: " + document.cookie; 
};

// if cookies are enabled then this will return true 
// otherwise will return false 
var CookiesAreEnabled = function () {
	if (navigator.cookieEnabled == true) {
		res = true ;
	} 
	else {
		res = false ;
	};
	return res;
};

//////////////////////////////////////////////////////////////
// reading back the cookies
var sinichiStats = function () {
	console.log( "cookie" ) ;
	console.log( document.cookie ) ;
	if ( document.cookie == "" ) {
		return {
			skill : "10" ,
			jump : "10" ,
			fitness : "10" ,
			recovery : "10" ,
			hp : "10" 
		};
	} else {
		return {
			skill : getCookie( "sinichiSkill" ) ,
			jump : getCookie( "sinichiJump" ) ,
			fitness : getCookie( "sinichiFitness" ) ,
			recovery : getCookie( "sinichiRecovery" ) ,
			hp : getCookie( "sinichiHP" ) 
		};
	};
};

var showFooter = function() {
	var body = document.getElementsByTagName( "body" ) [0];
	body.innerHTML += `
	<footer>
		<table>
		<tr><th>Skill</th><th>Jump</th><th>Fitness</th><th>Recovery</th><th>HP</th></tr>
		<tr><td id="Skill">0</td><td id="Jump">0</td><td id="Fitness">0</td><td id="Recovery">0</td><td id="HP">0</td></tr>
		</table>
	</footer>
	`;
	let skillCell = document.getElementById( "Skill" );
	let jumpCell = document.getElementById( "Jump" );
	let fitnessCell = document.getElementById("Fitness");
	let recoveryCell = document.getElementById("Recovery");
	let hpCell = document.getElementById("HP");
	
	var sinichi = sinichiStats();
	
	skillCell.innerHTML = sinichi.skill;
	jumpCell.innerHTML = sinichi.jump;
	fitnessCell.innerHTML = sinichi.fitness;
	recoveryCell.innerHTML = sinichi.recovery;
	hpCell.innerHTML = sinichi.hp;
	
}

