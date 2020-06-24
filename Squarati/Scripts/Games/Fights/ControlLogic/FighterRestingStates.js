// Fighter Resting States

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.resting//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HumanRestingState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HumanRestingState';
		this.fighter.restingLevel = 0;
		this.restingCalculator = new RecoveryCalculator() ;
		this.tickCount = 0;
	};
	updateFighterStatus(){
		this.tickCount += 1;
		let average = this.restingCalculator.totalDistance / this.tickCount ;
		this.fighter.restingLevel += gameElements.basicRestingPerTick + average;
	};
	handleMouseMove( event ) {
		this.recoveryCalculator.processEvent( event );
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
		this.fighter.restingLevel = 0 ;
	};
	updateFighterStatus(){
		let randomAdd = Math.round( Math.random() * gameElements.bonusRestingPerTick )
		this.fighter.recoveryLevel += gameElements.basicRestingPerTick + randomAdd;
	};

	getNextPhase(  ){
		if ( this.fighter.restingLevel >= this.fighter.restingTarget ) {
			return fightPhase.jumping;
		}else{
			return fightPhase.resting;
		};
	};

	getNextPhase(  ){
		return fightPhase.resting;
	};
};
