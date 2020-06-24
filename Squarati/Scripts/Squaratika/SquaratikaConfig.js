
Object.freeze( gameElements ) ;
// needs to be read from an api -- currently mimicked by resources site with fallback for development on local
// needs a central calling service as mimicked urls willl have to end it .json unlike real api calls
// will be read a json and the toObject called which means that this is all documentational  code only
class Animations {
	constructor () {
		this.happy = [0,7],
		this.pain = [8,15],
		this.resting = [16,23],
		this.sad = [24,31]
	};
};

class Animation {
	constructor() {
		this.images = [];
		this.type = "spriteSheet";
		this.frames = {width:100, height:100};
		this.animations = new animations () ;
		}
};

class FightingStyle{
	constructor() {
		this.name = 'Squaretokan';
		this.powerSource = 'concentration';
		this.damageVariant ='concussion';
	};
};

class BaseFightingStatistics {
	constructor() {
		this.fightingStyle = new FightingStyle() ;
		this.damage= 10000;
		this.defence= 10000;
		this.hp = 35000;
		this.jumping= 10000;
		this.resting= 10000;
		this.recovery= 10000;
		this.constitution= 20000;
	}
};

class CurrentFightingStatistics {
	constructor() {
		this.damage= 10000;
		this.defence= 10000;
		this.hp = 35000;
		this.jumping= 10000;
		this.resting= 10000;
		this.recovery= 10000;
		this.constitution= 20000;
		this.tirednessModifier= 1.0 
	}
};

class FightingStatistics {
	constructor () {
		this.baseFightingStatistics = new BaseFightingStatistics() ;
		this.currentFightingStatistics = new CurrentFightingStatistics();
	};
};

class GameStatistics {
	constructor () {
		this.talentLimit =  1.15;
		this.learningSpeed =  1.0;
		this.belt =  "White";
	};
};

class Squaratika {
	constructor() {
		this.name = "";
		this.spriteMap = "";
		this.animation = new Animation() ;// animations object			
		this.style = new FightingStyle();
		this.fightingStatistics = new FightingStatistics() ;
		this.gameStatistics = new GameStatistics();
	} // ctor
};


// these need linking into gameElements object
var getRecoveryLevels = function( homeRecovery, awayRecovery ){
	const basic = gameElements.basicRequiredRecoveryPoints;
	let tot = homeRecovery + awayRecovery;
	let small = (homeRecovery<awayRecovery)?homeRecovery:awayRecovery;
	let m = (basic*tot)/small;
	homeRecoveryTarget = (awayRecovery*m)/tot;
	awayRecoveryTarget = (homeRecovery*m)/tot;
	////
	if ( homeRecoveryTarget > 40000 ) {
		awayRecoveryTarget -= 2000;
	} else if ( homeRecoveryTarget > 30000 ) {
		awayRecoveryTarget -= 1000;
	};
	if( homeRecoveryTarget > 20000 ) {
		homeRecoveryTarget = 20000 ;
	};

	if ( awayRecoveryTarget > 40000 ) {
		homeRecoveryTarget -= 2000;
	} else if ( awayRecoveryTarget > 30000 ) {
		homeRecoveryTarget -= 1000;
	};
	if( awayRecoveryTarget > 20000 ) {
		awayRecoveryTarget = 20000 ;
	};
	////
	return {
		homeRecoveryTarget: homeRecoveryTarget,
		homeRecoverySeconds: homeRecoveryTarget/basic,
		awayRecoveryTarget: awayRecoveryTarget,
		awayRecoverySeconds: awayRecoveryTarget/basic
	};
};

//
var getRestingLevels = function( homeResting, awayResting ){
	const basic = gameElements.basicRequiredRestingPoints;
	let tot = homeResting + awayResting;
	let small = (homeResting<awayResting)?homeResting:awayResting;
	let m = (basic*tot)/small;
	homeRestingTarget = (awayResting*m)/tot;
	awayRestingTarget = (homeResting*m)/tot;
	////
	if ( homeRestingTarget > 40000 ) {
		awayRestingTarget -= 2000;
	} else if ( homeRestingTarget > 30000 ) {
		awayRestingTarget -= 1000;
	};
	if( homeRestingTarget > 20000 ) {
		homeRestingTarget = 20000 ;
	};

	if ( awayRestingTarget > 40000 ) {
		homeRestingTarget -= 2000;
	} else if ( awayRestingTarget > 30000 ) {
		homeRestingTarget -= 1000;
	};
	if( awayRestingTarget > 20000 ) {
		awayRestingTarget = 20000 ;
	};
	////
	return {
		homeRestingTarget: homeRestingTarget,
		homeRestingSeconds: homeRestingTarget/basic,
		awayRestingTarget: awayRestingTarget,
		awayRestingSeconds: awayRestingTarget/basic
	};
};

// for now set defence levels as simply proportional
// a proportion of basic required defence based on your skill vs that of the opponent.
var getDefenceLevels = function ( homeDefence, awayDefence ){
	let defenceRequired = gameElements.basicRequiredDefencePoints*2; // will be dividing this by 2 defences
	let totalDefence = homeDefence + awayDefence ;
	let homeDefenceTarget = defenceRequired * awayDefence / totalDefence;
	let awayDefenceTarget = defenceRequired * homeDefence / totalDefence;
	return {
		homeDefenceTarget: homeDefenceTarget,
		awayDefenceTarget: awayDefenceTarget,
	};
};

// gets a number of pixels jumped from relative skills 
var getJumpHeights = function( homeJumping, awayJumping, heightRequired ) {
	const basicJumpsRequired = gameElements.basicNumberOfJumps ;
	heightRequired = heightRequired?heightRequired: gameElements.heightRequired; // 230 - 47 ; // start y - target y == skyheight
	let tot = homeJumping + awayJumping;
	let homeJump = basicJumpsRequired ;
	let awayJump = basicJumpsRequired;
	let small = (homeJumping<awayJumping)?homeJumping:awayJumping;
	let m = (basicJumpsRequired * tot)/small;
	homeJumps = (awayJumping * m )/tot;
	awayJumps = (homeJumping * m)/tot;
	
	if ( homeJumps > 40 ) {
		awayJumps -= 2;
	} else if ( homeJumps > 30 ) {
		awayJumps -= 1;
	};
	if( homeJumps > 20 ) {
		homeJumps = 20 ;
	};

	if ( awayJumps > 40 ) {
		homeJumps -= 2;
	} else if ( awayJumps > 30 ) {
		homeJumps -= 1;
	};
	if( awayJumps > 20 ) {
		awayJumps = 20 ;
	};
	return {
		homeJumps: homeJumps,
		homeJumpHeight: heightRequired/homeJumps,
		awayJumps: awayJumps,
		awayJumpHeight: heightRequired/awayJumps
	};
}; // getJumpHeight
