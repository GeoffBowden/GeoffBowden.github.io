// view port  height="350" width="600"

class GameHvsCOneOnOne extends GameClass {
    constructor (contentDiv, callback ) {
		// add distractor to content div
        super() ;
		// create the combatants
		let api = new SquaratikaAPI();
		this.homePlayer = api.getSquaratikaConfig( "Sinichi" ) ;
		this.awayPlayer = api.getSquaratikaConfig( "MrVanillaBadGuy" ) ;
		this.callback = callback ;
		this.display = new OneOnOneGameDisplay( contentDiv, this.handleLoad.bind(this), this.homePlayer, this.awayPlayer ) ;
    };
    
	handleLoad( stage ) {
		console.log( 'handleload' );
		// maybe remove distractor from content div
		// create the game logic
		this.fight = new OneOnOneFight( 
											this.display, 
											this.homePlayer,  //or .fightingStatistics
											this.awayPlayer,  // or .fightingStatistics 
											new HumanFighterStateMachine(this.display, this.display.homeFighterDisplay) ,
											new ComputerFighterStateMachine(this.display, this.display.awayFighterDisplay),
											this.beginFight.bind(this) , // call back for when ready to start the fight
											this.fightOver.bind(this)  // callback for when the fight is over
									);
		// test code
		//this.display.canvas.addEventListener( 'click', this.canvasClick.bind(this));
		//this.clickTestVal = 0;
	};
	beginFight( ){
		console.log( 'begin fight' ) ;
		this.fight.begin();
	};
	
	fightOver( homePlayerState, awayPlayerState ){
		this.handleLoad( this.stage );
	};
	
	endGame () {
		this.display.clear() ;
        this.callback( this.gameData );
    };
	
	canvasClick ( event ) {
		console.log( 'click' ) ;
		if ( this.clickTestVal % 2 == 0 ){
			this.display.showFingerTapAnimation();
		}else{
			this.display.hideFingerTapAnimation();
		};
		this.clickTestVal += 1 ;
		return false;
    }; //canvasClick
	
}; // end class