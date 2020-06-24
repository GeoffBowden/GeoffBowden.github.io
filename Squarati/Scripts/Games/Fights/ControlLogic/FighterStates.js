////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.prefight//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PreFightState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'PreFightState' ;
	};
	getNextPhase( enemyFighter ){
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
			return fightPhase.attacking ;
		}else{
			return fightPhase.jumping;
		}
	};
	performStateEndingAction(enemyFighter){
		this.angleDirection = 0;
		this.fighterDisplay.rotate( 0 );
	}; 
}
class HumanJumpingState extends JumpState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HumanJumpingState' ;
	};

	handleClick( event ) {
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
		// show animation
	};
	getNextPhase(  ){
		return fightPhase.dead;
	};
};
class AwayDeadState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'AwayDeadState';
	};
	getNextPhase(  ){
		return fightPhase.dead;
	};
};
//fightPhase.winner//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HomeWinnerState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HomeWinnerState';
		// show animation 
	};
	getNextPhase(  ){
		return fightPhase.winner;
	};
};
class AwayWinnerState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'AwayWinnerState';
	};
	getNextPhase(  ){
		return fightPhase.winner;
	};
};

