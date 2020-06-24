var __loginPageLoaded = true ;

class LoginPage {
	constructor (contentDiv, onLoginHandler){ 
		this.contentDiv = contentDiv;
		this.onLoginHandler = onLoginHandler;
	};
	
	html () {
		return `
		<div id="loginControls">
			<div id=userNameDiv">
				<label id="userNameLabel" for="userName">Enter your user name</label>
				<input id="userName" name="userName" type="text" witdth="225" maxlength="30" minlength="5" autofocus="" required></input>
				<button id="login">Enter</button>
			</div>
		</div>
		`;
	};
	
	initialise (  ) {
		this.contentDiv.innerHTML = this.html();
		var buttonTag = document.getElementById( "login" ) ;
		buttonTag.addEventListener( 'click', this.login.bind(this) );
	};
	
	login () {
		var userNameElement = document.getElementById( "userName" );
		if ( userNameElement.checkValidity() ){
			let username = userNameElement.value;
			setCookie( "username", username, 50 );
			this.onLoginHandler () ;
		}
		else {
			alert( 'not valid login' );
		};
	};

	clear() {
		this.contentDiv.innerHTML = '';
	};
};