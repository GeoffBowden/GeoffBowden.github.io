////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fightPhase.fallingHurt //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class FallingFightState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.fighterDisplay.showAsFallingHurt();
	};
	updateFighterStatus() {
		this.fighterDisplay.y += gameElements.gravityPelsPerTimeout * 2;
		if ( this.fighterDisplay.y >= gameElements.startY ) {
			this.fighterDisplay.y = gameElements.startY;
		};
		logMessage( 'class FallingFightState updateFighterStatus: this.fighterDisplay.y: '+this.fighterDisplay.y, 'logUpdateFighterStatus' ); 
	};
};
class FallingHurtState extends FallingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'FallingHurtState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		// show animation
	};
	getNextPhase( ){
		if ( this.fighterDisplay.y >= gameElements.startY ) {
			return fightPhase.recovering;
		}else{
			return fightPhase.fallingHurt;
		};
	};
};
//fightPhase.fallingTired//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class FallingTiredState extends FallingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'FallingTiredState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		// show animation
	};
	getNextPhase(  ){
		if ( this.fighterDisplay.y >= gameElements.startY ) {
			return fightPhase.resting;
		}else{
			return fightPhase.fallingTired;
		};
	};
};
//fightPhase.fallingDead//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class FallingDeadState extends FallingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'FallingDeadState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		// show suitable animation
		this.fighterDisplay.showAsFallingDead();
	};
	getNextPhase(  ){
		if ( this.fighterDisplay.y >= gameElements.startY ) {
			return fightPhase.dead;
		}else{
			return fightPhase.fallingDead;
		};
	};
};
//fightPhase.fallingDead//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class FallingWinningState extends FallingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'Falling winning';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		this.fighterDisplay.showAsFallingWinner();
	};
	getNextPhase(){
		if ( this.fighterDisplay.y >= gameElements.startY ) {
			return fightPhase.winner;
		}else{
			return fightPhase.fallingWinning;
		};
	};
};
