////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.attacking//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// this state needs to show attacking then move on
class BaseAttackingFightState extends FightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.callbackDone = false ;
		this.display.animateAttack( this.fighterDisplay, this.callback.bind(this) );
	};
	callback() {
		this.callbackDone = true;
	};
	getAttackModifier( enemyFighter ) {
		let ourFightingStyle = this.fighter.fightingStatistics.baseFightingStatistics.fightingStyle
		let theirFightingStyle = enemyFighter.fightingStatistics.baseFightingStatistics.fightingStyle
		let damageModifier = battleMatrix.damageModifier(ourFightingStyle, theirFightingStyle);
		damageModifier *=	this.fighter.fightingStatistics.currentFightingStatistics.tirednessModifier;
		return damageModifier;
	};
	getAttackPercentage( ) {
		let height = this.fighterDisplay.y ;
		let heightGained = gameElements.startY - height;
		let percentage = (heightGained * 100) / gameElements.heightRequired ;
		if ( percentage > 100 ) { percentage = 100.00; 
		}else if ( percentage < 0.00 ) { percentage = 0.00; 
		}else {
			percentage = percentage.toFixed( 2 );
		}; 
		return percentage ;
	};
	getDamage(enemyFighter ) {
		let percentageOfAttack = this.getAttackPercentage(  ) ;
		let damageModifier = this.getAttackModifier(enemyFighter) * ( percentageOfAttack / 100 ) ;
		let baseDamage = this.fighter.fightingStatistics.currentFightingStatistics.damage;
		let totalDamage = Math.round(baseDamage*damageModifier*100)/100;
		
		let defence = enemyFighter.defenceGained / enemyFighter.defenceTarget ;
		if ( defence > 0.9 ) { defence = 0.9; };
		let totalDefence = ( totalDamage * defence ) ;

		logMessage( '-------'+this.name+'------------------------------------------------', 'logPerformStateEndingAction' ) ;
		logMessage( 'Get Damage Summary: '+ this.name+': ' , 'logPerformStateEndingAction' ) ;
		logMessage( '	percentageOfAttack: '+ percentageOfAttack , 'logPerformStateEndingAction' ) ;
		logMessage( '	damageModifier: '+ damageModifier , 'logPerformStateEndingAction' ) ;
		logMessage( '	baseDamage: '+ baseDamage , 'logPerformStateEndingAction' ) ;
		logMessage( '	totalDamage: '+ totalDamage , 'logPerformStateEndingAction' ) ;
		logMessage( '	defence: '+ defence , 'logPerformStateEndingAction' ) ;
		logMessage( '	totalDefence: '+ totalDefence , 'logPerformStateEndingAction' ) ;
		logMessage( '	Result: '+ (totalDamage - totalDefence) , 'logPerformStateEndingAction' ) ;
		logMessage( '-------------------------------------------------------------------------' , 'logPerformStateEndingAction' ) ;
		
		let result = totalDamage - totalDefence;
		
		return result;
	};
};

class HomeAttackingState extends BaseAttackingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HomeAttackingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	getNextPhase( enemyFighter ){
		// start animation on display with call back 
		if ( this.callbackDone ) {
		// this does not work
			let damageToBeDone = 0; //this.getDamage(enemyFighter );
			let enemyEnergyRemaining = enemyFighter.fightingStatistics.currentFightingStatistics.hp - damageToBeDone ;
			if( enemyEnergyRemaining <= 0 ){
				return fightPhase.fallingWinning;
			}else{
				return fightPhase.counterDefending;
			};
		}else{
			return fightPhase.attacking;
		};
	};//class HomeAttackingState 
	performStateEndingAction(enemyFighter){
			let damage = this.getDamage(enemyFighter);
			// set enemy stat level 
			enemyFighter.fightingStatistics.currentFightingStatistics.hp -= damage;
			logMessage( 'PerformStateEndingAction: '+ this.name+', Damage: ' +damage, 'logPerformStateEndingAction' ) ;
			logMessage( '     Enemy hitpoints remaining: '+enemyFighter.fightingStatistics.currentFightingStatistics.hp, 'logPerformStateEndingAction' ) ;
			// call update on display let display take care of the animation 
			this.display.backGroundDisplay.awayFighterHealthBar.setCurrent( enemyFighter.fightingStatistics.currentFightingStatistics.hp ) ;
	}; 
};
// like home but update the home health bar no the away one
class AwayAttackingState extends BaseAttackingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'AwayAttackingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	getNextPhase( enemyFighter ){
		// start animation on display with call back 
		if ( this.callbackDone ) {
			let damageToBeDone = this.getDamage(enemyFighter );
			let enemyEnergyRemaining = enemyFighter.fightingStatistics.currentFightingStatistics.hp - damageToBeDone ;
			if( enemyFighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
				return fightPhase.fallingWinning;
			}else{
				return fightPhase.counterDefending;
			};
		}else{
			return fightPhase.attacking;
		};
	};
	performStateEndingAction(enemyFighter){
			let damage = this.getDamage(enemyFighter);
			// set enemy stat level 
			enemyFighter.fightingStatistics.currentFightingStatistics.hp -= damage;
			logMessage( 'PerformStateEndingAction: '+ this.name+', Damage: ' +damage, 'logPerformStateEndingAction' ) ;
			logMessage( '     Enemy hitpoints remaining: '+enemyFighter.fightingStatistics.currentFightingStatistics.hp, 'logPerformStateEndingAction' ) ;
			// call update on display let display take care of the animation 
			this.display.backGroundDisplay.homeFighterHealthBar.setCurrent( enemyFighter.fightingStatistics.currentFightingStatistics.hp ) ;
	}; 
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fightPhase.counterAttacking//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HomeCounterAttackingState extends BaseAttackingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HomeCounterAttackingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	getNextPhase( enemyFighter ){
		// start animation on display with call back 
		if ( this.callbackDone ) {
			if ( enemyFighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
				return fightPhase.fallingWinning;
			}else{
				return fightPhase.fallingHurt;
			};
		}else{
			return fightPhase.counterAttacking;
		}
	};
	performStateEndingAction(enemyFighter){
			let damage = this.getDamage(enemyFighter);
			// set enemy stat level 
			enemyFighter.fightingStatistics.currentFightingStatistics.hp -= damage;
			logMessage( 'PerformStateEndingAction: '+ this.name+', Damage: ' +damage, 'logPerformStateEndingAction' ) ;
			logMessage( '     Enemy hitpoints remaining: '+enemyFighter.fightingStatistics.currentFightingStatistics.hp, 'logPerformStateEndingAction' ) ;
			// call update on display let display take care of the animation 
			this.display.backGroundDisplay.awayFighterHealthBar.setCurrent( enemyFighter.fightingStatistics.currentFightingStatistics.hp ) ;
	}; 
};
// like home but update the home health bar no the away one
class AwayCounterAttackingState extends BaseAttackingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'AwayCounterAttackingState';
		logMessage( 'Create state: ' + this.name, 'logCreateState' ) ;
	};
	getNextPhase( enemyFighter ){
		// start animation on display with call back 
		if ( this.callbackDone ) {
			if ( enemyFighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
				return fightPhase.fallingWinning;
			}else{
				return fightPhase.fallingHurt;
			};
		}else{
			return fightPhase.counterAttacking;
		};
	};
	performStateEndingAction(enemyFighter){
			let damage = this.getDamage(enemyFighter);
			// set enemy stat level 
			enemyFighter.fightingStatistics.currentFightingStatistics.hp -= damage;
			logMessage( 'PerformStateEndingAction: '+ this.name+', Damage: ' +damage, 'logPerformStateEndingAction' ) ;
			logMessage( '     Enemy hitpoints remaining: '+enemyFighter.fightingStatistics.currentFightingStatistics.hp, 'logPerformStateEndingAction' ) ;
			// call update on display let display take care of the animation 
			this.display.backGroundDisplay.homeFighterHealthBar.setCurrent( enemyFighter.fightingStatistics.currentFightingStatistics.hp ) ;
	}; 
};
