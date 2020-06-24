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
		
		totalDamage = totalDamage - ( totalDamage * defence ) ;
		
		return totalDamage;
	};
};

class HomeAttackingState extends BaseAttackingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'HomeAttackingState';
	};
	getNextPhase( enemyFighter ){
		// start animation on display with call back 
		if ( this.callbackDone ) {
		// this does not work
			let damageToBeDone = this.getDamage(enemyFighter );
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
			// call update on display let display take care of the animation 
			this.display.backGroundDisplay.awayFighterHealthBar.setCurrent( enemyFighter.fightingStatistics.currentFightingStatistics.hp ) ;
	}; 
};
// like home but update the home health bar no the away one
class AwayAttackingState extends BaseAttackingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'AwayAttackingState';
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
	};
	getNextPhase( enemyFighter ){
		// start animation on display with call back 
		if ( this.callbackDone ) {
			if ( enemyFighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
				return fightPhase.fallingWinner;
			}else{
				return fightPhase.fallingHurt;
			};
		}else{
			return fightPhase.attacking;
		}
	};
	performStateEndingAction(enemyFighter){
			let damage = this.getDamage(enemyFighter);
			// set enemy stat level 
			enemyFighter.fightingStatistics.currentFightingStatistics.hp -= damage;
			// call update on display let display take care of the animation 
			this.display.backGroundDisplay.awayFighterHealthBar.setCurrent( enemyFighter.fightingStatistics.currentFightingStatistics.hp ) ;
	}; 
};
// like home but update the home health bar no the away one
class AwayCounterAttackingState extends BaseAttackingFightState {
	constructor(display, fighterDisplay, fighter ){ 
		super(display, fighterDisplay, fighter );
		this.name = 'AwayCounterAttackingState';
	};
	getNextPhase( enemyFighter ){
		// start animation on display with call back 
		if ( this.callbackDone ) {
			if ( enemyFighter.fightingStatistics.currentFightingStatistics.hp <= 0 ){
				return fightPhase.fallingWinner;
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
			// call update on display let display take care of the animation 
			this.display.backGroundDisplay.homeFighterHealthBar.setCurrent( enemyFighter.fightingStatistics.currentFightingStatistics.hp ) ;
	}; 
};
