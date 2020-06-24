/*
attack type
-
*/
const powerSource = {
	concentration: 'concentration',
	psychic: 'psychic',
	telekenetic: 'telekenetic',
	magic: 'magic',
	religious: 'religious',
	supernatural: 'supernatural'
};
Object.freeze(powerSource);

const damageVariant = {
	concussion : 'concussion',
	pain: 'pain',
	confusion: 'confusion',
	soul: 'soul'
};
Object.freeze( damageVariant );


/***********************************************************************************************
Battle Modifier is a matrix of the attackers powerSource and damageVariants
The philosophy of this grew out of the different ways of fighting in folk lore and myth and 
a healthy dose of dungeons and dragons and MERP middle earth role playing game.
Attacker Type 	--	Examples
Withcraft 		-	Hex
Rage			-	Nordic/Celtic beserker
Focus			-	Eastern meditation kung-fu martial arts and power points and nerve holds - Shamanic Meditation
Clerical 		-	Religious attacks causing fear and confusion like a hex but backed up with god
Confusion		- 	Psychic strenght draining attacks
Colour			- 	Magical Aura Attacks
Soul Reaver		-	Magical or clerical type of attacks
Telekenesis
Fire
Air				-	Air blasts are magical or telekinetic
Mind
Shamanic		-	Summon strength of animal spirits - works well with the pet idea that came later
Sonic			-	Singing or clap
Hypnosis		-	
Weapons			-
Magical			-	Lightening maybe religious
main types 
Supernatural - ghosts zombies 
characters							
The Bishop - Inno Domine Sancti Boingee
Wendy Woo - The wicked witch of the not quite west as its also rather northerly in a southerly way 
The ErzBischoff
							Tooth > Tongue > Claw > Tooth >> Fist
							Magic > Religious > Supernatural > Magic
							Concetration > Psychic > Telekenetic > Contecetration
							Concussion  Pain Confusion Soul
							Soul > confusion  > Pain
							Pain > Concussion > Soul

Final Attacks were:
powerSource		damageVariant
concentration	concussion 	- e.g. Beserker Rage, Focussed Punch like Bruce Lee
concentration	pain		- e.g. Nerve Pinch
concentration	confusion	- e.g. Hypnotism
concentration	soul		- None
psychic			concussion  - None
psychic			pain		
psychic			confusion	
psychic			soul		
telekenetic		concussion 	- Sonic Boom, Wind Attack Breeze Blast 
telekenetic		pain		- Electric, Fire ?
telekenetic		confusion	- None
telekenetic		soul		- None
magic			concussion 	- Wind Wand, Fiery Blast, Electeic Pulse
magic			pain		
magic			confusion	
magic			soul		
religious		concussion 	
religious		pain		
religious		confusion	
religious		soul		
supernatural	concussion 	
supernatural	pain		
supernatural	confusion	
supernatural	soul		

Final Matrix
	C	P	T	M	R	S	
C 	1.0	1.2	1.0	1.0	1.1	1.0	concentration			
P	1.0	1.0	1.2	1.0	1.0	1.1	psychic		
T	1.2	1.0	1.0	1.1	1.0	1.0	Telekenetic		
M	1.0	1.1	1.0	1.0	1.4	1.0	Magic
R	1.1	1.0	1.0	1.0	1.0	1.4	Religious
S	1.0	1.0	1.1	1.4	1.0	1.0	Supernatural

Mod Matrix
	c		p		f		s
c	1.00	1.00	1.10	1.00	concussion
p	1.05	1.00	1.15	1.10	pain
f	1.10	1.05	1.00	1.00	confusion
s	1.15	1.10	1.10	1.00	soul
************************************************************************************************/
class BattleMatrix{
	constructor() {
		this.dm 
	};
	damageModifier( attackersFightingStyle, defendersFightingStyle ){
		let modifier = 0.0 ;
		if ( attackersFightingStyle.powerSource && attackersFightingStyle.damageVariant &&
			 defendersFightingStyle.powerSource && defendersFightingStyle.damageVariant ){
			switch ( attackersFightingStyle.powerSource ) {
				case powerSource.concentration: modifier = this.applyConcentrationTo( defendersFightingStyle ) ; 
				break ;
				case powerSource.psychic: modifier = this.applyPyschicTo( defendersFightingStyle ) ;
				break ;
				case powerSource.telekenetic: modifier = this.applyTelekeneticTo( defendersFightingStyle ) ;
				break ;
				case powerSource.magic: modifier = this.applyMagicTo( defendersFightingStyle ) ;
				break ;
				case powerSource.religious: modifier = this.applyReligiousTo( defendersFightingStyle ) ;
				break ;
				case powerSource.supernatural: modifier = this.applySupernaturalTo( defendersFightingStyle ) ;
				break ;
				default: throw "unknown fighting style";
			 };
		};
		return modifier * this.getDamageVariantModifier( attackersFightingStyle, defendersFightingStyle );  
	};
	//	C	P	T	M	R	S	
	//C	1.0	1.2	1.0	1.0	1.1	1.0	concentration			
	applyConcentrationTo( defendersFightingStyle ) { 
		switch( defendersFightingStyle.powerSource ) {
			case powerSource.concentration: return 1.00 ; 
			break ;
			case powerSource.psychic: return 1.20 ;
			break ;
			case powerSource.telekenetic: return 1.00 ;
			break ;
			case powerSource.magic: return 1.00 ;
			break ;
			case powerSource.religious: return 1.10 ;
			break ;
			case powerSource.supernatural: return 1.00 ;
			break ;
			default: return 1.00 
		};
		return 1.00;
	};
	//	C	P	T	M	R	S	
	//P	1.0	1.0	1.2	1.0	1.0	1.1	psychic		
	applyPyschicTo( defendersFightingStyle ) { 
		switch( defendersFightingStyle.powerSource ) {
			case powerSource.concentration: return 1.00 ; 
			break ;
			case powerSource.psychic: return 1.00 ;
			break ;
			case powerSource.telekenetic: return 1.20 ;
			break ;
			case powerSource.magic: return 1.00 ;
			break ;
			case powerSource.religious: return 1.00 ;
			break ;
			case powerSource.supernatural: return 1.10 ;
			break ;
			default: return 1.00 
		};
		return 1.00 
	};
	//	C	P	T	M	R	S	
	//T	1.2	1.0	1.0	1.1	1.0	1.0	Telekenetic		
	applyTelekeneticTo( defendersFightingStyle ) { 
		switch( defendersFightingStyle.powerSource ) {
			case powerSource.concentration: return 1.20 ; 
			break ;
			case powerSource.psychic: return 1.00 ;
			break ;
			case powerSource.telekenetic: return 1.00 ;
			break ;
			case powerSource.magic: return 1.10 ;
			break ;
			case powerSource.religious: return 1.00 ;
			break ;
			case powerSource.supernatural: return 1.00 ;
			break ;
			default: return 1.00 
		};
		return 1.00 
	};
	//	C	P	T	M	R	S	
	//M	1.0	1.1	1.0	1.0	1.4	1.0	Magic
	applyMagicTo( defendersFightingStyle ) { 
		switch( defendersFightingStyle.powerSource ) {
			case powerSource.concentration: return 1.00 ; 
			break ;
			case powerSource.psychic: return 1.10 ;
			break ;
			case powerSource.telekenetic: return 1.00 ;
			break ;
			case powerSource.magic: return 1.00 ;
			break ;
			case powerSource.religious: return 1.40 ;
			break ;
			case powerSource.supernatural: return 1.00 ;
			break ;
			default: return 1.00 
		};
		return 1.00 
	};
	//	C	P	T	M	R	S	
	//R	1.1	1.0	1.0	1.0	1.0	1.4	Religious
	applyRelgiousTo( defendersFightingStyle ) { 
		switch( defendersFightingStyle.powerSource ) {
			case powerSource.concentration: return 1.10 ; 
			break ;
			case powerSource.psychic: return 1.00 ;
			break ;
			case powerSource.telekenetic: return 1.00 ;
			break ;
			case powerSource.magic: return 1.00 ;
			break ;
			case powerSource.religious: return 1.00 ;
			break ;
			case powerSource.supernatural: return 1.40 ;
			break ;
			default: return 1.00 
		};
		return 1.00 
	};
	//	C	P	T	M	R	S	
	//S	1.0	1.0	1.1	1.4	1.0	1.0	Supernatural
	applySupernaturalTo( defendersFightingStyle ) { 
		switch( defendersFightingStyle.powerSource ) {
			case powerSource.concentration: return 1.00 ; 
			break ;
			case powerSource.psychic: return 1.00 ;
			break ;
			case powerSource.telekenetic: return 1.10 ;
			break ;
			case powerSource.magic: return 1.40 ;
			break ;
			case powerSource.religious: return 1.00 ;
			break ;
			case powerSource.supernatural: return 1.00 ;
			break ;
			default: return 1.00 
		};
		return 1.00 
	};

	getDamageVariantModifier( attackersFightingStyle, defendersFightingStyle ){
		switch ( attackersFightingStyle.damageVariant ) {
			case damageVariant.concussion : return this.applyConcussionToDefendersVariant( defendersFightingStyle );
			break ;
			case damageVariant.pain: return this.applyPainToDefendersVariant( defendersFightingStyle );
			break;
			case damageVariant.confusion: return this.applyConfusionToDefendersVariant( defendersFightingStyle );
			break;
			case damageVariant.soul: return this.applySoulToDefendersVariant( defendersFightingStyle );
			break;
			default: throw "unknown damage variant";
		}; // end switch 
	};
	//	c		p		f		s
	//c	1.00	1.00	1.10	1.00	concussion
	applyConcussionToDefendersVariant( defendersFightingStyle ) {
		switch( defendersFightingStyle.damageVariant ) {
			case damageVariant.concussion : return 1.0;
			break ;
			case damageVariant.pain: return 1.0;
			break;
			case damageVariant.confusion: return 1.1;
			break;
			case damageVariant.soul: return 1.0;
			break;
			default: return 1.0 ;
		};
	};
	//	c		p		f		s
	//p	1.05	1.00	1.15	1.10	pain
	applyPainToDefendersVariant( defendersFightingStyle ){
		switch( defendersFightingStyle.damageVariant ) {
			case damageVariant.concussion : return 1.05;
			break ;
			case damageVariant.pain: return 1.0;
			break;
			case damageVariant.confusion: return 1.15;
			break;
			case damageVariant.soul: return 1.10;
			break;
			default: return 1.0 ;
		};
	};
	//	c		p		f		s
	//f	1.10	1.05	1.00	1.00	confusion
	applyConfusionToDefendersVariant( defendersFightingStyle ){
		switch( defendersFightingStyle.damageVariant ) {
			case damageVariant.concussion : return 1.1;
			break ;
			case damageVariant.pain: return 1.05;
			break;
			case damageVariant.confusion: return 1.0;
			break;
			case damageVariant.soul: return 1.0;
			break;
			default: return 1.0 ;
		};
	};
	//	c		p		f		s
	//s	1.15	1.10	1.10	1.00	soul
	applySoulToDefendersVariant( defendersFightingStyle ){
		switch( defendersFightingStyle.damageVariant ) {
			case damageVariant.concussion : return 1.15;
			break ;
			case damageVariant.pain: return 1.10;
			break;
			case damageVariant.confusion: return 1.10;
			break;
			case damageVariant.soul: return 1.0;
			break;
			default: return 1.0 ;
		};
	};
}; // class

