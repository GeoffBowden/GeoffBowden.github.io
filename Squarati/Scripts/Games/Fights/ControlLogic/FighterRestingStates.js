// Fighter Resting States

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.resting//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HumanRestingState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HumanRestingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		this.fighter.restingLevel = 0;
		this.restingCalculator = new RecoveryCalculator() ;
		this.tickCount = 0;
	};
	updateFighterStatus(){
		this.tickCount += 1;
		let average = this.restingCalculator.totalDistance / this.tickCount ;
		this.fighter.restingLevel += gameElements.basicRestingPerTick + average;
		logMessage( 'class HumanRestingState updateFighterStatus: restingLevel: '+this.fighter.restingLevel+', ticks: ' + this.tickCount, 'logUpdateFighterStatus' ); 
	};
	handleMouseMove( event ) {
		this.restingCalculator.processEvent( event );
	};

	getNextPhase(  ){
		if ( this.fighter.restingLevel >= this.fighter.restingTarget ) {
			return fightPhase.jumping;
		}else{
			return fightPhase.resting;
		};
	};
};
class ComputerRestingState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'ComputerRestingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
		this.fighter.restingLevel = 0 ;
	};
	updateFighterStatus(){
		let randomAdd = Math.round( Math.random() * gameElements.bonusRestingPerTick )
		this.fighter.restingLevel += gameElements.basicRestingPerTick + randomAdd;
		logMessage( 'class ComputerRestingState updateFighterStatus: restingLevel: '+this.fighter.restingLevel+', ticks: ' + this.tickCount, 'logUpdateFighterStatus' ); 
	};

	getNextPhase(  ){
		if ( this.fighter.restingLevel >= this.fighter.restingTarget ) {
			return fightPhase.jumping;
		}else{
			return fightPhase.resting;
		};
	};

};
