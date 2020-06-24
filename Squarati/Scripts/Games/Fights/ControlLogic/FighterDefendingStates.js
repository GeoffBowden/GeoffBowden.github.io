// Fighter Defending States 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.defending//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// shows the how to defend animation, this will run its course naturally and this state does not monitor if it has finished
// mouse movement events will calculate the total defence acheived by 
class HumanDefendingState extends CoDependantFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.display.showDefendingInstructions() ; 
		this.fighter.defenceGained = 0;
		this.updateCount = 0 ;
		this.defenceCalculator = new DefenceCalculator () ;
		this.name = 'HumanDefendingState';
	};
	handleMouseMove( event ) {
		//addToFighterDefence () ;
		this.defenceCalculator.processEvent( event );
	};
	
	updateFighterStatus(){
		// calculate current defence
		this.updateCount += 1 ;
		this.fighter.defenceGained = 10 * ( this.defenceCalculator.totalDistance / this.updateCount );
	};
	
	getNextPhase( ){
		return fightPhase.defending;
	};
	forcedNextPhase ( ) {
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
		this.fighter.defenceGained = 0;
		this.updateCount = 0
		this.total = 0;
		this.name = 'ComputerDefendingState';
	};
	updateFighterStatus(){
  		// calculate current defence
		this.updateCount  += 1;
		let addition = Math.random( ) * 200 ;
		this.total += addition;
		this.fighter.defenceGained += 10 * ( this.total / this.updateCount  );
	};
	
	getNextPhase( ){
		return fightPhase.defending;
	};
	forcedNextPhase ( ) {
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
		this.fighter.defenceGained = 0;
		this.updateCount = 0
		this.total = 0;
		this.name = 'ComputerCounterDefendingState';
	};
	updateFighterStatus(){
		// calculate current defence
		this.updateCount  += 1;
		let addition = Math.random( ) * 200 ;
		this.total += addition;
		this.fighter.defenceGained += 10 * ( this.total / this.updateCount  );
	};
	getNextPhase( enemyFighter ){
		// do nothing here as linked with counterAttacked
		return fightPhase.counterDefending;
	};
	forcedNextPhase( enemyFighter ){
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
class HumanCounterDefendingState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.display.showDefendingInstructions() ; 
		this.fighter.defenceGained = 0;
		this.updateCount = 0 ;
		this.defenceCalculator = new DefenceCalculator () ;
		this.name = 'HumanCounterDefendingState';
	};
	handleMouseMove( event ) {
		//addToFighterDefence () ;
		this.defenceCalculator.processEvent( event );
	};
	
	updateFighterStatus(){
		// calculate current defence
		this.updateCount += 1 ;
		this.fighter.defenceGained = 10 * ( this.defenceCalculator.totalDistance / this.updateCount );
	};

	getNextPhase( enemyFighter ){
		return fightPhase.counterDefending;
	};
	forcedNextPhase( enemyFighter ){
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
