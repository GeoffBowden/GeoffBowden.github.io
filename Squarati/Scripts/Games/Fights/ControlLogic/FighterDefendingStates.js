// Fighter Defending States 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.defending//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// shows the how to defend animation, this will run its course naturally and this state does not monitor if it has finished
// mouse movement events will calculate the total defence achieved by 
class HumanDefendingState extends CoDependantFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.fighterDisplay.showAsDefending();
		this.display.showDefendingInstructions() ; 
		this.fighter.defenceGained = 0;
		this.updateCount = 0 ;
		this.defenceCalculator = new DefenceCalculator () ;
		this.name = 'HumanDefendingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	handleMouseMove( event ) {
		//addToFighterDefence () ;
		this.defenceCalculator.processEvent( event );
	};
	
	updateFighterStatus(){
		// calculate current defence
		this.updateCount += 1 ;
		this.fighter.defenceGained = 10 * ( this.defenceCalculator.totalDistance / this.updateCount );
		logMessage( 'class HumanDefendingState updateFighterStatus: defenceGained: '+this.fighter.defenceGained+', ticks: ' + this.updateCount, 'logUpdateFighterStatus' ); 
	};
	performStateEndingAction(){
		this.display.hideFingerVerticalSwipeAnimation();
	};
	
	getNextPhase( ){
		return fightPhase.defending;
	};
	forcedNextPhase ( ) {
		this.performStateEndingAction();
		if ( this.fighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
			return fightPhase.fallingDead;
		}else{
			return fightPhase.counterAttacking;
		};
	};
};
class ComputerDefendingState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.fighterDisplay.showAsDefending();
		this.fighter.defenceGained = 0;
		this.updateCount = 0
		this.total = 0;
		this.name = 'ComputerDefendingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	updateFighterStatus(){
  		// calculate current defence
		this.updateCount  += 1;
		let addition = Math.random( ) * 200 ;
		this.total += addition;
		if ( this.updateCount <= 10 ) {
			this.fighter.defenceGained = this.total ;
		}else{
			this.fighter.defenceGained = 10 * ( this.total / this.updateCount  );
		};
		logMessage( 'class ComputerDefendingState updateFighterStatus: defenceGained: '+this.fighter.defenceGained+', ticks: ' + this.updateCount, 'logUpdateFighterStatus' ); 
	};
	
	getNextPhase( ){
		return fightPhase.defending;
	};
	forcedNextPhase ( ) {
		this.performStateEndingAction();
		if ( this.fighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
			return fightPhase.fallingDead;
		}else{
			return fightPhase.counterAttacking;
		};
	};
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fightPhase.counterDefending ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ComputerCounterDefendingState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.fighterDisplay.showAsCounterDefending();
		this.fighter.defenceGained = 0;
		this.updateCount = 0
		this.total = 0;
		this.name = 'ComputerCounterDefendingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	updateFighterStatus(){
		// calculate current defence
		this.updateCount  += 1;
		let addition = Math.random( ) * 200 ;
		this.total += addition;
		if ( this.updateCount <= 10 ) {
			this.fighter.defenceGained = this.total ;
		}else{
			this.fighter.defenceGained = 10 * ( this.total / this.updateCount  );
		};
		logMessage( 'class ComputerCounterDefendingState updateFighterStatus: defenceGained: '+this.fighter.defenceGained+', ticks: ' + this.updateCount, 'logUpdateFighterStatus' ); 
	};
	getNextPhase( enemyFighter ){
		// do nothing here as linked with counterAttacked
		return fightPhase.counterDefending;
	};
	forcedNextPhase( enemyFighter ){
		this.performStateEndingAction();
		if( this.fighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
			return fightPhase.fallingDead;
		}else{
			if ( enemyFighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
				return fightPhase.fallingWinning;
			}else{
				return fightPhase.fallingTired;
			};
		};
	};
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HumanCounterDefendingState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.fighterDisplay.showAsCounterDefending();
		this.display.showDefendingInstructions() ; 
		this.fighter.defenceGained = 0;
		this.updateCount = 0 ;
		this.defenceCalculator = new DefenceCalculator () ;
		this.name = 'HumanCounterDefendingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	handleMouseMove( event ) {
		//addToFighterDefence () ;
		this.defenceCalculator.processEvent( event );
	};
	
	updateFighterStatus(){
		// calculate current defence
		this.updateCount += 1 ;
		this.fighter.defenceGained = 10 * ( this.defenceCalculator.totalDistance / this.updateCount );
		logMessage( 'class HumanCounterDefendingState updateFighterStatus: defenceGained: '+this.fighter.defenceGained+', ticks: ' + this.updateCount, 'logUpdateFighterStatus' ); 
	};
	performStateEndingAction(){
		this.display.hideFingerVerticalSwipeAnimation();
	};

	getNextPhase( enemyFighter ){
		return fightPhase.counterDefending;
	};
	forcedNextPhase( enemyFighter ){
		this.performStateEndingAction();
		if( this.fighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
			return fightPhase.fallingDead;
		}else{
			if ( enemyFighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
				return fightPhase.fallingWinning;
			}else{
				return fightPhase.fallingTired;
			};
		};
	};
};
