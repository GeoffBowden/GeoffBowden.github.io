////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.prefight//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PreFightState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'PreFightState' ;
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	getNextPhase( enemyFighter ){
		//logMessage( 'State '+this.name+' get next phase: '+fightPhase.jumping, 'logGetNextPhase' ) ;
		return fightPhase.jumping;
	};
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.jumping  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class JumpState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
	    super(display, fighterDisplay, fighter );
	    this.angle = 20; 
	    this.angleDirection = 0 ; 
		this.angleDelta = -1 ;
	};
	getNextPhase( enemyFighter ){ 
	    return this.currentPhase; 
	};
	_doJump () {
		//this.angleDirection = (this.angleDirection)?this.angleDirection * -1:1; // done use delta for simple calc
		if ( this.angleDirection == -1 ){
			this.angleDelta = 1;
		} else if ( this.angleDirection == 1 ) {
			this.angleDelta = -1;
		}
		this.angleDirection += this.angleDelta;
		this.fighterDisplay.rotate( this.angle * this.angleDirection ) 
		this.fighterDisplay.y -= this.fighter.jumpHeight;
	};
	_doGravity (){
		this.fighterDisplay.y += gameElements.gravityPelsPerTimeout;
		if ( this.fighterDisplay.y >= gameElements.startY ) {
			this.fighterDisplay.y = gameElements.startY;
			this.angleDirection = 0;
			this.fighterDisplay.rotate( 0 );
		};
	};
	_getNextPhase (){
		if ( this.fighterDisplay.y < gameElements.skyHeight ) {
			//logMessage( 'State '+this.name+' get next phase: '+fightPhase.attacking, 'logGetNextPhase' ) ;
			return fightPhase.attacking ;
		}else{
			//logMessage( 'State '+this.name+' get next phase: '+fightPhase.jumping, 'logGetNextPhase' ) ;
			return fightPhase.jumping;
		}
	};
	performStateEndingAction(enemyFighter){
		this.angleDirection = 0;
		this.fighterDisplay.rotate( 0 );
		//logMessage( 'performStateEndingAction: '+this.name, 'logPerformStateEndingAction' );
	}; 
}
class HumanJumpingState extends JumpState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HumanJumpingState' ;
		//logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};

	handleClick( event ) {
		logMessage( this.name + ' Handle click', 'logClicks' ) ;
		this._doJump();
	};

	updateFighterStatus(){
		this._doGravity();
	};
	
	getNextPhase( enemyFighter ){
		return this._getNextPhase();
	};
};
class ComputerJumpingState extends JumpState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'ComputerJumpingState' ;
		//logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};

	updateFighterStatus(){
		let chanceOfJump = Math.random() ;
		if ( chanceOfJump < 0.43 ) {
			this._doJump();
		}
		if ( this.fighterDisplay.y > gameElements.skyHeight ){
			this._doGravity();
		};
	};

	getNextPhase( enemyFighter ){
		return this._getNextPhase();
	};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.dead//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HomeDeadState extends FightState {
	constructor(display, fighterDisplay, fighter ){
		super(display, fighterDisplay, fighter );
		this.name = 'HomeDeadState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		// show animation
	};
	getNextPhase(  ){
		logMessage( 'State '+this.name+' get next phase: '+fightPhase.dead, 'logGetNextPhase' ) ;
		return fightPhase.dead;
	};
};
class AwayDeadState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'AwayDeadState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	getNextPhase(  ){
		logMessage( 'State '+this.name+' get next phase: '+fightPhase.dead, 'logGetNextPhase' ) ;
		return fightPhase.dead;
	};
};
//fightPhase.winner//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HomeWinnerState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HomeWinnerState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		// show animation 
	};
	getNextPhase(  ){
		logMessage( 'State '+this.name+' get next phase: '+fightPhase.winner, 'logGetNextPhase' ) ;
		return fightPhase.winner;
	};
};
class AwayWinnerState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'AwayWinnerState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	getNextPhase(  ){
		logMessage( 'State '+this.name+' get next phase: '+fightPhase.winner, 'logGetNextPhase' ) ;
		return fightPhase.winner;
	};
};
