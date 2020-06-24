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
  console.log( document.cookie );
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