// fighter Recovery states

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.recovering//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HumanRecoveringState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HumanRecoveringState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		this.fighter.recoveryLevel = 0 ;
		this.recoveryCalculator = new RecoveryCalculator ();
		this.tickCount = 0 ;
		this.display.showRecoveryInstructions();
		this.fighterDisplay.showAsRecovering();
	};
	handleMouseMove( event ) {
		this.recoveryCalculator.processEvent( event );
	};
	// temporary code to be replaced
	updateFighterStatus(){
		this.tickCount += 1;
		let average = this.recoveryCalculator.totalDistance / this.tickCount ;
		this.fighter.recoveryLevel += gameElements.basicRecoveryPerTick  + average;
		logMessage( 'class HumanRecoveringState updateFighterStatus: recoveryLevel: '+this.fighter.recoveryLevel+', ticks: ' + this.tickCount, 'logUpdateFighterStatus' ); 
	};
	performStateEndingAction(){
		this.display.hideFingerHorizontalSwipeAnimation();
	};
	getNextPhase(  ){
		if ( this.fighter.recoveryLevel >= this.fighter.recoveryTarget ) {
			return fightPhase.jumping;
		}else{
			return fightPhase.recovering;
		};
	};
};
class ComputerRecoveringState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'ComputerRecoveringState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		this.fighter.recoveryLevel = 0;
		this.fighterDisplay.showAsRecovering();
	};
	updateFighterStatus(){
		let randomAdd = Math.round( Math.random() * gameElements.bonusRecoveryPerTick )
		this.fighter.recoveryLevel += gameElements.basicRecoveryPerTick + randomAdd;
		logMessage( 'class ComputerRecoveringState updateFighterStatus: recoveryLevel: '+this.fighter.recoveryLevel+', ticks: ' + this.tickCount, 'logUpdateFighterStatus' ); 
	};
	getNextPhase(  ){
		if ( this.fighter.recoveryLevel >= this.fighter.recoveryTarget ) {
			return fightPhase.jumping;
		}else{
			return fightPhase.recovering;
		};
	};
};
