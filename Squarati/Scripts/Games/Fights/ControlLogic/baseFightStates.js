var fightPhase = {
	prefight: {name: 'prefight', coDependant: false, paired:false }, 
	jumping: {name: 'jumping', coDependant: false, paired:false },  
	attacking: {name: 'attacking', coDependant: false, paired:  {name: 'defending', coDependant: true, paired:false }},
	defending: {name: 'defending', coDependant: true, paired:false },
	counterAttacking: {name: 'counterAttacking', coDependant: false, paired:false },
	counterDefending: {name: 'counterDefending', coDependant: true, paired: {name: 'counterAttacking', coDependant: false, paired:false }},
	fallingHurt: {name: 'fallingHurt', coDependant: false, paired:false },
	fallingTired: {name: 'fallingTired', coDependant: false, paired:false },
	fallingWinning: {name: 'fallingWinning', coDependant: false, paired: {name: 'fallingDead', coDependant: false, paired:false }},
	fallingDead: {name: 'fallingDead', coDependant: false, paired:false },
	recovering: {name: 'recovering', coDependant: false, paired:false },
	resting: {name: 'resting', coDependant: false, paired:false },
	dead: {name: 'dead', coDependant: false, paired:false },
	winner: {name: 'winner', coDependant: false, paired:false }
};

Object.freeze( fightPhase ) ;

var battleMatrix = new BattleMatrix() ;
Object.freeze( battleMatrix ) ;

// "abstract" parent classes ///////////////////////////////////////////////////////
class FightState {
	constructor( display, fighterDisplay, fighter ){
		this.display = display;
		this.fighterDisplay = fighterDisplay ;
		this.fighter = fighter;
	};
	// functions called by state machine in response to human input
	handleClick( event ){ };
	handleMouseMove( event ) {};
	handleHttpInput( content ) {};
	// functions called by state machine in response to game timer
	updateFighterStatus(){ logMessage( 'class FightState updateFighterStatus: do nothing', 'logUpdateFighterStatus' ); };
	performStateEndingAction(enemyFighter){logMessage( 'performStateEndingAction: '+this.name, 'logPerformStateEndingAction' );}; 
	getNextPhase(enemyFighter){};
};

// this is for passive paired fightStates that wait for the active fight phase to finish
class CoDependantFightState extends FightState {
	constructor(display, fighterDisplay, fighter ){ super(display, fighterDisplay, fighter );};
	// work out a phase that is not this one?
	forcedNextPhase ( enemyFighter ) {
		this.performStateEndingAction();
		return undefined;
	};
};
