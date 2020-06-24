
// fight states are different to player states I think
// the fight can be about to begin
// in progress
// over 
//this will allow pre-fight and post-fight animations 
// that will not rely on fighters.
var fightStates = {
	preFight: "preFight",
	starting: "starting",
	inFight: "inFight", // covered off by the fighter state machines
	outro: "outro", //time to show a celebration animation or the like
	postFight: "postFight"
}; // fight States
Object.freeze( fightStates );

var fightResult = {
	none: "none",
	homeWin: "Home Win",
	awayWin: "Away Win",
	draw: "draw"
};
Object.freeze( fightResult );

class OneOnOneFight{
	constructor ( display, homeFighter, awayFighter, homeEngine, awayEngine, onReady, onResult ){
		this.display = display;
		this.homeFighter = rfdc()( homeFighter );
		this.awayFighter = rfdc()( awayFighter );
		this.setReletiveStats( ) ;
		this.homeEngine = homeEngine.configure( this.homeFighter ) ;
		this.awayEngine = awayEngine.configure( this.awayFighter ) ;
		this.onResult = onResult ;
		this.fightState = fightStates.preFight;
		this.display.setHeading( "Click To Start", 1 ) ;
		this.onReady = onReady ;
		this.result = fightResult.none;
		this.loadManifest();
		this.timeout = gameElements.timeoutLengthInMS;
	};// constructor
	loadManifest(){
		setTimeout( this.manifestCallBack.bind( this ) , this.timeout ) ;
	};
	manifestCallBack(){
		this.onReady();
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setReletiveStats() {
		let jumping = /*SquaratikaConfig*/	getJumpHeights( 
									this.homeFighter.fightingStatistics.currentFightingStatistics.jumping, 
									this.awayFighter.fightingStatistics.currentFightingStatistics.jumping 
									) ;
		this.homeFighter.jumpHeight = jumping.homeJumpHeight ;
		this.awayFighter.jumpHeight = jumping.awayJumpHeight ;
		// stun recovery rate
		let recovery = getRecoveryLevels( 
										this.homeFighter.fightingStatistics.currentFightingStatistics.recovery, 
										this.awayFighter.fightingStatistics.currentFightingStatistics.recovery 
										);
		this.homeFighter.recoveryTarget = recovery.homeRecoveryTarget;
		this.awayFighter.recoveryTarget = recovery.awayRecoveryTarget;
		// rest recovery rate
		let resting = getRestingLevels( 
										this.homeFighter.fightingStatistics.currentFightingStatistics.resting, 
										this.awayFighter.fightingStatistics.currentFightingStatistics.resting
										) ;
		this.homeFighter.restingTarget = resting.homeRestingTarget ;
		this.awayFighter.restingTarget = resting.awayRestingTarget ;
		
		let defence = getDefenceLevels(
										this.homeFighter.fightingStatistics.currentFightingStatistics.defence, 
										this.awayFighter.fightingStatistics.currentFightingStatistics.defence
									);
		this.homeFighter.defenceTarget = defence.homeDefenceTarget ;
		this.awayFighter.defenceTarget = defence.awayDefenceTarget ;
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	begin() {
		console.log( 'begin' ) ;
		// add the events to drive the game
		this.display.canvas.addEventListener( 'click', this.stageClick.bind(this));
	};
	stageClick( event ) {
		console.log( 'stage click' );
		event.preventDefault();
		event.stopPropagation();
		switch ( this.fightState ) {
			case fightStates.preFight : {
				// now we set the status to pre fight, show an animation and fade the header .
				this.fightState = fightStates.starting;
				this.display.setHeadingBackgroundColor( 'Gold' ) ;
				this.display.fadeOutHeading( this.getCountDownCallBack( 0 ) );
				//this.display.fadeOutHeading( this.startFightCountDown.bind( this )  ) ;
			} break  // hand if pre-fight
			case fightStates.starting : { // do nothing to mess with the referee 
			}  break  
			case fightStates.inFight : {
				this.homeEngine.handleClick(event) ;
				this.awayEngine.handleClick(event);
			}  break  
			case fightStates.outro : { // do nothing on click
			}  break  
			case fightStates.postFight : { // do nothing on click
			}  break  
			default: throw 'Unheard of state ' + this.fightState + 'in OneonOneFight.js' ;
		};
		return false;
	};
	getCountDownCallBack( seed ) {
		var index = ( seed == undefined || seed == null ) ?0:seed;
		var messageList = ['Ready','Steady','Go'] ;
		var callback = function () {
			if ( index < messageList.length ) {
				this.display.setHeading( messageList[index], 0 );
				this.display.fadeInHeading( this.getCountDownCallBack(index+1)  );
			}else{
				this.startFight() ;
			};
		};
		return callback.bind( this );
	};
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	startFight() {
		this.fightState = fightStates.inFight ;
		this.display.setHeadingBackgroundColor( 'Green' ) ;
		this.display.setHeading( 'Click to jump', 1 );
		setTimeout( this.handleTimeOut.bind( this ), this.timeout ); 
	};
	handleTimeOut( event ) {
		if ( this.fightState == fightStates.inFight ) {
			// update fighters using state
			let oldHomeFighterPhase = this.homeEngine.currentPhase;
			let oldAwayFighterPhase = this.awayEngine.currentPhase;
			this.homeEngine.updateFighterStatus();
			this.awayEngine.updateFighterStatus();
			let nextHomeFighterPhase = this.homeEngine.getNextPhase(this.awayEngine.fighter);
			let nextAwayFighterPhase = this.awayEngine.getNextPhase(this.homeEngine.fighter);
		
			// if we are moving phase 
			this._moveToNextState( oldHomeFighterPhase, nextHomeFighterPhase, oldAwayFighterPhase, nextAwayFighterPhase ) ;
			logMessage( 'final HomeFighterPhase: '+ this.homeEngine.currentPhase.name, 'logMoveToNextState' );
			logMessage( 'final AwayFighterPhase: '+ this.awayEngine.currentPhase.name, 'logMoveToNextState' );
			logMessage( '__________________ ', 'logMoveToNextState' );

			/////////////////////////////
			if ( this._endOfGame( this.homeEngine.currentPhase ) &&
				 this._endOfGame( this.awayEngine.currentPhase ) ) {	
				this.showResult() ;
			}else{
				// continue game
				setTimeout( this.handleTimeOut.bind( this ), this.timeout ); 
			};
		};
	};
	_moveToNextState(
						oldHomeFighterPhase,
						nextHomeFighterPhase,
						oldAwayFighterPhase,
						nextAwayFighterPhase
				) {
		logMessage( '__________________ ', 'logMoveToNextState' );
		logMessage( '__OneOnOne move to next state__', 'logMoveToNextState' );
		logMessage( 'oldHomeFighterPhase: '+ oldHomeFighterPhase.name, 'logMoveToNextState' );
		logMessage( 'nextHomeFighterPhase: '+ nextHomeFighterPhase.name, 'logMoveToNextState' );
		logMessage( 'oldAwayFighterPhase: '+ oldAwayFighterPhase.name, 'logMoveToNextState' );
		logMessage( 'nextAwayFighterPhase: '+ nextAwayFighterPhase.name, 'logMoveToNextState' );
		logMessage( '__________________ ', 'logMoveToNextState' );
		if ( this._phaseHasChanged( oldHomeFighterPhase, nextHomeFighterPhase )) {
			logMessage( 'home phase has changed', 'logMoveToNextState' ) ;
			this.homeEngine.performStateEndingAction( this.awayEngine.fighter ) ;
//			nextHomeFighterPhase = this.homeEngine.
			this.homeEngine.moveToPhase(nextHomeFighterPhase);
			// if enemy state is co-dependant then we have to force it's state 
			if( oldAwayFighterPhase.coDependant ) {
				this.awayEngine.performStateEndingAction( this.homeEngine.fighter ) ;
				this.awayEngine.forceNextPhase(this.homeEngine.fighter) ;
				return;
			};
			if (nextHomeFighterPhase.paired ) {
				this.awayEngine.performStateEndingAction( this.homeEngine.fighter ) ;
				this.awayEngine.moveToPhase(nextHomeFighterPhase.paired) ;
				return;
			};
		};
		if ( this._phaseHasChanged( oldAwayFighterPhase, nextAwayFighterPhase )){
			this.awayEngine.performStateEndingAction( this.homeEngine.fighter );
			this.awayEngine.moveToPhase(nextAwayFighterPhase);
			if( oldHomeFighterPhase.coDependant ) {
				if (this._homeEndStateActionNotPerformed( oldHomeFighterPhase, nextHomeFighterPhase )) {
					this.homeEngine.performStateEndingAction( this.awayEngine.fighter );
				};
				this.homeEngine.forceNextPhase(this.awayEngine.fighter); 
				return;
			};
			if(nextAwayFighterPhase.paired){
				if (this._homeEndStateActionNotPerformed( oldHomeFighterPhase, nextHomeFighterPhase )) {
					this.homeEngine.performStateEndingAction( this.awayEngine.fighter );
				};
				this.homeEngine.moveToPhase(nextAwayFighterPhase.paired); 
				return;
			};
		};
	};
	_phaseHasChanged( old, next ) { return old.name != next.name ; };
	_homeEndStateActionNotPerformed( oldHomeFighterPhase, nextHomeFighterPhase ) { return oldHomeFighterPhase == nextHomeFighterPhase ; };
	_endOfGame( fighterPhase )  { return  (fighterPhase.name == fightPhase.winner.name) || (fighterPhase.name == fightPhase.dead.name ) ; };
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	showResult () {
		this.display.setHeadingBackgroundColor( "Blue" ) ;
		this.display.setHeading( this.result, 0 );
		this.display.fadeInHeading( this.end.bind( this ) );
	};
	end() {
		this.fightState = fightStates.postFight;
		this.display.canvas.removeEventListener( 'click', this.stageClick.bind(this));
		if ( this.onResult ) {
			this.onResult ( this.homeFighter, this.awayFighter );
		};
	};
}// class OneOnOneFight 