var loginPage ;
var cityMap;
// this function checks to see if the username cookie 
// is present, if not then show log in screen, if yes 
// then go straight to the city screen.
var frontPageLoad = function () {
	// release 1 only code 
	loadHvsCOneOnOneCode( release1CreateGameHvCOneOnOne ) ;

	// actual release code 
	//if ( ShowIfCookiesAreEnabled() ) { //
	//	let cookie = getCookie('userName');
	//	if ( cookie ){
	//		loadCityMap() ;
	//	}
	//	else {
	//		loadLoginSection () ;
	//	};		
	//}
	//else { // cookies are not enabled 
	//	loadLoginSection () ;
	//};
	// end of actual release code 
};

var release1CreateGameHvCOneOnOne = function ( ){
	contentDiv.classList.remove( "loader" );
	this.currentGame = new GameHvsCOneOnOne( 
															document.getElementById('contentDiv'), 
															release1HandleGameReturn,
															undefined
											);
}

var release1HandleGameReturn = function ( gameData ){
	
};

var ShowIfCookiesAreEnabled = function () {
	let text = "";
	let res = false ;

	if (navigator.cookieEnabled == true) {
		text = "Cookies are enabled.";
		res = true ;
	} 
	else {
		text = "Cookies are not enabled.";
		res = false ;
	};
	document.getElementById("contentDiv").innerHTML = text;
	return res;
};

// load the code, this will contain a class that encapsulates the 
// behaviour of the login page.
var loadLoginSection = function () {
	// add login page.js to header
	if (!window.__loginPageLoaded ){
		loadjscssfile( 'Scripts\\LoginPage.js', handleOnLoadLoginPage ) ;
		window.__loginPageLoaded = 'true';
	}else{
		loadCityMap();//maybe not this. this is a frig
	}
};

// once the code has been loaded 
// create the login page object with the content div to write its stuff
// the head can be guessed
var handleOnLoadLoginPage = function(){
	// load html into content div
	let contentDiv = document.getElementById( 'contentDiv' ) ;
	// create object login page
	loginPage = new LoginPage(contentDiv, doLogin);
	loginPage.initialise() ;
	contentDiv.classList.remove( "loader" );
};

var doLogin = function () {
	loginPage.clear() ;
	loadCityMap() ;
};

var loadCityMap = function() {
	let contentDiv = document.getElementById( 'contentDiv' ) ;
	contentDiv.classList.add( "loader" );
	if( !window.__CityMapLoaded ) {
		loadjscssfile( 'Scripts\\citymap.js', handleOnLoadCityMap ) ;
		window.__CityMapLoaded = 'true';	
	}else{
		handleOnLoadCityMap();
	};
};

var handleOnLoadCityMap = function() {
	let contentDiv = document.getElementById( "contentDiv" ) ;
	cityMap = new CityMap(contentDiv) ;
	cityMap.initialise();
	contentDiv.classList.remove( "loader" );
};

