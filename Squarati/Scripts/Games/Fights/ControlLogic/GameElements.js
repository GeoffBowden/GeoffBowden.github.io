// game elements   
var gameElements = {
	skyHeight: 47,
	startY: 230,
	heightRequired: 230 - 47, // 183
	gravityPelsPerTimeout: 5,
	timeoutLengthInMS: 100,
	basicNumberOfJumps: 10 ,  
	basicRequiredRecoveryPoints: 10000, // gained at 1000 per 1/10 second
	basicRequiredRestingPoints: 10000,     // gained at 1000 per 1/10 second
	basicRequiredDefencePoints: 10000, // gained by mouse moving or computer difficulty algorithm
	basicRecoveryPerTick: 800,
	bonusRecoveryPerTick: 150,
	basicRestingPerTick: 800,
	bonusRestingPerTick: 150,
	enemySkill: 0.38,
	
	log: logMessage, // alternate way of calling - do not use
	logMoveToNextState: false,
	logUpdateFighterStatus: false,
	logPerformStateEndingAction: false,
	logCreateState: true,
	logGetNextPhase: false,
	logForcedNextPhase: false,
	logClicks: false
};

var logMessage = function( message, log) {
	if ( gameElements[log] ) {
		console.log( message ) ;
	};
};