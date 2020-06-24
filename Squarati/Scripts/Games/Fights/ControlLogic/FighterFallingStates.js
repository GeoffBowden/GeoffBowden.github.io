////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fightPhase.fallingHurt //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class FallingFightState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'FallingFightState';
	};
	updateFighterStatus() {
		this.fighterDisplay.y += gameElements.gravityPelsPerTimeout * 2;
		if ( this.fighterDisplay.y >= gameElements.startY ) {
			this.fighterDisplay.y = gameElements.startY;
		};
	};
};
class FallingHurtState extends FallingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'FallingHurtState';
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
		// show suitable animation
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
	constructor(display, fighterDisplay, fighter ){ super(display, fighterDisplay, fighter );};
	getNextPhase(){
		if ( this.fighterDisplay.y >= gameElements.startY ) {
			return fightPhase.winner;
		}else{
			return fightPhase.fallingWinning;
		};
	};
};
