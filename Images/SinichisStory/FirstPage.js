var init = function () {
}

var generate = function () {
	let skill = generateStat();
	let jump = generateStat();
	let fitness = generateStat();
	let recovery = generateStat();
	let hp = generateStat();
	
	console.log( skill );
	
	setCookie ( "sinichiSkill", skill, 2 ) ;
	setCookie ( "sinichiJump", jump, 2 ) ;
	setCookie ( "sinichiFitness", fitness, 2 ) ;
	setCookie ( "sinichiRecovery", recovery, 2 ) ;
	setCookie ( "sinichiHP", hp, 2 ) ;
	console.log( document.cookie ) ;

	let skillCell = document.getElementById( "Skill" );
	let jumpCell = document.getElementById( "Jump" );
	let fitnessCell = document.getElementById("Fitness");
	let recoveryCell = document.getElementById("Recovery");
	let hpCell = document.getElementById("HP");
	
	var sinichi = sinichiStats();
	console.log( sinichi ) ;
	
	skillCell.innerHTML = sinichi.skill;
	jumpCell.innerHTML = sinichi.jump;
	fitnessCell.innerHTML = sinichi.fitness;
	recoveryCell.innerHTML = sinichi.recovery;
	hpCell.innerHTML = sinichi.hp;
	
	var button = document.getElementById( "control" ) ;
	button.onclick = navigate;
	button.innerHTML = "Begin adventure";
};

var navigate = function () {
	window.location.href = "Tannoy.html" ;
};