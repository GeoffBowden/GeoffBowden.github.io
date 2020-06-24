
// this is the mail

class CityMap {
	constructor(contentDiv){
		this.contentDiv = contentDiv;
		this.stage = null;
		this.canvas = null;
		this.mapImage = null;
	}; // end constructor
	initialise() {
		this.contentDiv.innerHTML = this.html();
		this.canvas = document.getElementById( 'map' );
		this.canvas.addEventListener( 'click', this.handleMapclick.bind(this) );
		this.stage = new createjs.Stage("map");
		// i don't know what this is
		this.mapImage = new Image(this.canvas.clientWidth, this.canvas.clientHeight);
		this.mapImage.crossOrigin = "anonymous";
		this.mapImage.onload = this.addBitmapToStage.bind( this );
		this.mapImage.src = systemSettings.resourcesUri + "Images/Maps/blank.png";
		// load the game loading code
		this.loadGameLoader();
	}; // end intialize
	addBitmapToStage () {
		var bitmap = new createjs.Bitmap(this.mapImage);
		this.stage.addChild( bitmap ) ;
		this.stage.update();	
	};
	clearMap() { 
		this.contentDiv.innerHTML = '' ; 
	};
	handleMapclick( event ) {
		this.clearMap();
		// if the HvsCOneOnOne button clicked then
		this.startHvsCOneOnOne();
	}
	handleGameReturn ( gameData ){
		this.currentGame.endGame() ;
		this.initialise();
	};
	loadGameLoader(){
		if( !window.__gameLoaderLoaded){
			loadjscssfile( 'Scripts/Games/Fights/Common/gameLoader.js');
			window.__gameLoaderLoaded = true ;
		}
	};
	startHvsCOneOnOne() {
		loadHvsCOneOnOneCode( this.createGameHvCOneOnOne.bind(this) ) ;
	};
	createGameHvCOneOnOne(){
		this.currentGame = new GameHvsCOneOnOne( this.contentDiv, this.handleGameReturn.bind(this));
		// TODO ADD STUFF HERE AS NEEDED
	};
	html ()  {
		return `
<canvas id="map" height="350" width="600">No show</canvas>
		`;
	}; // end html
}; // end city map class