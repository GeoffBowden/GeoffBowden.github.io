
/*
fightPhase.prefight
fightPhase.jumping  
fightPhase.attacking
fightPhase.attacked
fightPhase.counterAttacking
fightPhase.counterAttacked
fightPhase.fallingHurt
fightPhase.fallingTired
fightPhase.fallingDead
fightPhase.recovering
fightPhase.resting
fightPhase.dead
fightPhase.winner
*/

class FighterStateMachine {
	constructor(display, fighterDisplay) {
		this.startHeight = gameElements.startY;
		this.attackHeight = gameElements.skyHeight;
		this.display = display;
		this.fighterDisplay = fighterDisplay ;
		this.fighter = undefined;
		this.currentPhase = fightPhase.prefight;
		this.currentState = null;
	}; // ctor
	configure(fighter) {
		this.fighter = fighter ;
		return this;		
	};
	// functions for overriding
	handleClick(event){ };
	handleMouseMove(event){};
	handleHttpInput( content ) {};

	updateFighterStatus(){
		if(this.currentState){
			logMessage( 'class FighterStateMachine updateFighterStatus: fighter name: '+this.fighter.name + ': '+(this.currentState.name?this.currentState.name:'none'), 'logUpdateFighterStatus' ); 
			this.currentState.updateFighterStatus();
		};
	};
	performStateEndingAction(enemyFighter){
		if(this.currentState){
			this.currentState.performStateEndingAction(enemyFighter);
		};
	};
	
	getNextPhase (enemyFighter) {
		if(this.currentState){
			let nextPhase = this.currentState.getNextPhase(enemyFighter);
			if ( nextPhase == undefined ){
				throw 'Machine ' + this.name + ': undefined next state from ' + this.currentState.name + '.getNextPhase()';
			};
			logMessage( 'Machine ' +this.name+', State '+this.currentState.name+' get next phase: '+nextPhase.name, 'logGetNextPhase' ) ;
			return nextPhase;
		} else {
			logMessage( 'Machine ' +this.name+', No State Defined defaulting to '+this.currentPhase.name, 'logGetNextPhase' ) ;		
			return this.currentPhase;
		};
	};
	
	moveToPhase(phase){
		if( !phase ) {
			throw 'Machine ' + this.name + 'moveToPhase not put in' ;
		};
		this.currentPhase = phase;
		this._initialiseCurrentState();
	}; // moveToNextPhase

	_initialiseCurrentState(){
		let stateClass = this.states[this.currentPhase.name]; 
		if (!(stateClass)){ throw 'Machine ' + this.name + 'no state class defined for phase '+ this.currentPhase; };
		this.currentState = new stateClass (this.display, this.fighterDisplay, this.fighter) 
	};
	
	forceNextPhase (enemyFighter) {
		if ( !(this.currentState) ){
			logMessage( 'Machine ' +this.name+', No State Defined defaulting to '+this.currentPhase.name, 'logGetNextPhase' ) ;		
			this._initialiseCurrentState()
		}else{
			let nextPhase = this.currentState.forcedNextPhase(enemyFighter);
			logMessage( 'Machine ' +this.name+', State '+this.currentState.name+' get next phase: '+nextPhase.name, 'logForcedNextPhase' );
			this.moveToPhase( nextPhase ) ;
		};
	};
} ; // fighter state machine


class HumanFighterStateMachine extends FighterStateMachine {
	constructor (display, fighterDisplay ) {
		super(display, fighterDisplay);
		this.states = undefined;
		this.name = 'HumanFighterStateMachine';
	}; // ctor
	configure( fighter ){
		this.fighter = fighter;
		this.states = {
			[fightPhase.prefight.name]					:  PreFightState ,
			[fightPhase.jumping.name]					:  HumanJumpingState,
			[fightPhase.attacking.name]				:  HomeAttackingState,
			[fightPhase.defending.name]				:  HumanDefendingState,
			[fightPhase.counterAttacking.name]	:  HomeCounterAttackingState,
			[fightPhase.counterDefending.name]	:  HumanCounterDefendingState,
			[fightPhase.fallingHurt.name]				:  FallingHurtState,
			[fightPhase.fallingTired.name]				:  FallingTiredState,
			[fightPhase.fallingWinning.name]		:  FallingWinningState,
			[fightPhase.fallingDead.name]			:  FallingDeadState,
			[fightPhase.recovering.name]				:  HumanRecoveringState,
			[fightPhase.resting.name]					:  HumanRestingState,
			[fightPhase.dead.name]						:  HomeDeadState,
			[fightPhase.winner.name]					:  HomeWinnerState 
		};
		this._initialiseCurrentState();
		return this;
	}; // configure
	handleClick(event){
		if ( this.currentState ){
			this.currentState.handleClick( event ) ;
		}
	};
	handleMouseMove(event){
		if ( this.currentState ){
			this.currentState.handleMouseMove( event ) ;
		}
	};
}; // human

class ComputerFighterStateMachine extends FighterStateMachine {
	constructor (display, fighterDisplay, fighter) {
		super(display, fighterDisplay, fighter);
		this.name = 'ComputerFighterStateMachine';
		this.states = undefined;
	};
	configure( fighter ){
		this.fighter = fighter;
		this.states = {
			[fightPhase.prefight.name]					: PreFightState,
			[fightPhase.jumping.name]					: ComputerJumpingState,
			[fightPhase.attacking.name]				: AwayAttackingState,
			[fightPhase.defending.name]				: ComputerDefendingState,
			[fightPhase.counterAttacking.name]	: AwayCounterAttackingState,
			[fightPhase.counterDefending.name]	: ComputerCounterDefendingState,
			[fightPhase.fallingHurt.name]				: FallingHurtState,
			[fightPhase.fallingTired.name]				: FallingTiredState,
			[fightPhase.fallingWinning.name]		: FallingWinningState,
			[fightPhase.fallingDead.name]			: FallingDeadState,
			[fightPhase.recovering.name]				: ComputerRecoveringState,
			[fightPhase.resting.name]					: ComputerRestingState,
			[fightPhase.dead.name]						: AwayDeadState,
			[fightPhase.winner.name]					: AwayWinnerState 
		};
		this._initialiseCurrentState();
		return this;
	}; // configure

}; // Computer
