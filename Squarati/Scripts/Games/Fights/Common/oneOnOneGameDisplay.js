
class GameDisplayClass {
	constructor ( contentDiv, callback ) {
        this.name = "abstract game display class";
        this.callback = callback;
		this.contentDiv = contentDiv;
		this.contentDiv.innerHTML = '<canvas id="game" class="disable-dbl-tap-zoom fight-ring" height="350" width="600">No show</canvas>';
        this.canvas = document.getElementById( 'game' ) ;
		this.canvas.style.border = "Solid 1px Black";
		this.canvas.addEventListener('touchstart', this.preventZoom.bind( this ) ); 
		this.canvas.addEventListener('touchend', this.zoomOff.bind( this ) );
	};
	zoomOff(ev){
		ev.preventDefault();
		ev.currentTarget.click();
	};
	preventZoom(e) {
		var t2 = e.timeStamp;
		var t1 = e.currentTarget.dataset.lastTouch || t2;
		var dt = t2 - t1;
		var fingers = e.touches.length;
		e.currentTarget.dataset.lastTouch = t2;

		if (!dt || dt > 500 || fingers > 1) return; // not double-tap
		//alert( "zoom" ) ;
		e.preventDefault();
		e.stopPropagation();
		//e.target.click();
		return false;
	};	
};

class OneOnOneGameDisplay extends GameDisplayClass {
	constructor (contentDiv, callback, homePlayer, awayPlayer, backgroundImageLocation ) {
		super ( contentDiv, callback ) ;

		this.stage = new createjs.Stage( 'game' );
		//this.stage.enableMouseOver(20); // 10 updates per second
		
		this.homePlayer = homePlayer;
		this.awayPlayer = awayPlayer;
		
		let backgroundLocation = '';
		if ( !backgroundImageLocation ) {
			backgroundLocation =  systemSettings.backdropSettings.folder+systemSettings.backdropSettings.defaultImageFileNames[0];
		}else {
			backgroundLocation = backgroungImageLocation;
		};
	
		let manifest = [
			{src: backgroundLocation, id: 'backgroundImage' },
			{src: homePlayer.spriteMap, id: 'homePlayerImage'},
			{src: homePlayer.leftHandImageLocation, id: 'homePlayerLeftHandImage'},
			{src: homePlayer.rightHandImageLocation, id: 'homePlayerRightHandImage'},
			{src: awayPlayer.spriteMap, id: 'awayPlayerImage'},
			{src: awayPlayer.leftHandImageLocation, id: 'awayPlayerLeftHandImage'},
			{src: awayPlayer.rightHandImageLocation, id: 'awayPlayerRightHandImage'},
			{src: systemSettings.fingerTapAnimation.fileName, id: 'tapAnimation' },
			{src: systemSettings.fingerHorizontalSwipeAnimation.fileName, id: 'horizontalSwipeAnimation' },
			{src: systemSettings.fingerVerticalSwipeAnimation.fileName, id: 'verticalSwipeAnimation' }
			];
		this.internalError = false;
		this.loader = new createjs.LoadQueue( false ) ;
		this.loader.addEventListener( 'complete', this.handleManifestLoaded.bind( this ) ) ;
		this.loader.addEventListener('error', this.handleManifestLoadError.bind( this ) );		
		this.loader.loadManifest( manifest, true, systemSettings.resourcesUri );
	}; // constructor
	handleManifestLoaded( event ) {
		if ( !this.internalError ) {
			let img = this.loader.getResult('backgroundImage') ;
			img.crossOrigin = 'Anonymous'  ;
			this.backGroundDisplay = new BackGroundDisplay(this.stage, img ) ;
			this.backGroundDisplay.homeFighterHealthBar.maximum = this.homePlayer.fightingStatistics.currentFightingStatistics.hp;
			this.backGroundDisplay.homeFighterHealthBar.setCurrent ( this.homePlayer.fightingStatistics.currentFightingStatistics.hp, false );
			this.backGroundDisplay.awayFighterHealthBar.maximum = this.awayPlayer.fightingStatistics.currentFightingStatistics.hp;
			this.backGroundDisplay.awayFighterHealthBar.setCurrent ( this.awayPlayer.fightingStatistics.currentFightingStatistics.hp, false );
			
			let bodyImage = this.loader.getResult( 'homePlayerImage' );
			bodyImage.crossOrigin = 'Anonymous';
			let leftHand = this.loader.getResult( 'homePlayerLeftHandImage' );
			leftHand.crossOrigin = 'Anonymous';
			let rightHand = this.loader.getResult( 'homePlayerRightHandImage' );
			rightHand.crossOrigin = 'Anonymous';
			this.homeFighterDisplay = new FighterDisplay( this.stage,  this.homePlayer, 100, gameElements.startY, bodyImage, leftHand, rightHand );

			bodyImage = this.loader.getResult( 'awayPlayerImage' );
			bodyImage.crossOrigin = 'Anonymous';
			leftHand = this.loader.getResult( 'awayPlayerLeftHandImage' );
			leftHand.crossOrigin = 'Anonymous';
			rightHand = this.loader.getResult( 'awayPlayerRightHandImage' );	
			rightHand.crossOrigin = 'Anonymous';
			this.awayFighterDisplay = new FighterDisplay( this.stage, this.awayPlayer, 400, gameElements.startY, bodyImage, leftHand, rightHand );
			
			let tapAnimationSpriteSheet = this.getSpriteSheetFromAnimationConfig( 'tapAnimation', systemSettings.fingerTapAnimation.animation );
			this.tapAnimation = new createjs.Sprite( tapAnimationSpriteSheet, 'tap' ) ;
			this.tapAnimation.x = systemSettings.fingerTapAnimation.x;
			this.tapAnimation.y = systemSettings.fingerTapAnimation.y;
			
			let horizontalSwipeSpriteSheet = this.getSpriteSheetFromAnimationConfig( 'horizontalSwipeAnimation', systemSettings.fingerHorizontalSwipeAnimation.animation ) ;
			this.horizontalSwipeAnimation = new createjs.Sprite( horizontalSwipeSpriteSheet, 'swipe' ) ;
			this.horizontalSwipeAnimation.x = systemSettings.fingerHorizontalSwipeAnimation.x ;
			this.horizontalSwipeAnimation.y = systemSettings.fingerHorizontalSwipeAnimation.y;
			
			let verticalSwipeSpriteSheet = this.getSpriteSheetFromAnimationConfig( 'verticalSwipeAnimation', systemSettings.fingerHorizontalSwipeAnimation.animation ) ;
			this.verticalSwipeAnimation = new createjs.Sprite( verticalSwipeSpriteSheet, 'swipe' ) ;
			this.verticalSwipeAnimation.x = systemSettings.fingerVerticalSwipeAnimation.x ;
			this.verticalSwipeAnimation.y = systemSettings.fingerVerticalSwipeAnimation.y;

			this.stage.addChild( 
				this.backGroundDisplay.scene 
			,	this.backGroundDisplay.groundIndicator
			,	this.backGroundDisplay.skyIndicator
				
			,	this.backGroundDisplay.header.background
			,	this.backGroundDisplay.header.text
			
			,	this.backGroundDisplay.homeFighterHealthBar.background
			,	this.backGroundDisplay.homeFighterHealthBar.foreground
			,	this.backGroundDisplay.awayFighterHealthBar.background
			,	this.backGroundDisplay.awayFighterHealthBar.foreground
				
			,	this.backGroundDisplay.playerScore.background
			,	this.backGroundDisplay.playerScore.text
			,	this.backGroundDisplay.opponentScore.background
			,	this.backGroundDisplay.opponentScore.text
				
			,	this.homeFighterDisplay.playerAnimation
			,	this.homeFighterDisplay.leftHand
			,	this.homeFighterDisplay.rightHand
				
			,	this.awayFighterDisplay.playerAnimation
			,	this.awayFighterDisplay.leftHand
			,	this.awayFighterDisplay.rightHand		
				);
			
			this.start() ;
			if ( this.callback ) { this.callback( this.stage ) ; };
		}
	};
	handleManifestLoadError( event ) {
		this.internalError = true ;
		alert( 'load error' );
		this.callback = null ;
		console.log( event ) ;
	};
	// create instruction spritesheets //////////////
	getSpriteSheetFromAnimationConfig( manifestName, configObject ) {
			let animationFile = this.loader.getResult( manifestName );
			animationFile.crossOrigin = "Anonymous";
			let animationConfig = rfdc()( configObject );
			animationConfig.images = [animationFile];
			let animationSpriteSheet = new createjs.SpriteSheet( animationConfig ) ;
			return animationSpriteSheet ;
	}; // animation config
	// heading functions ///////////////////////////////////
	setHeading( heading, alpha ){
		this.backGroundDisplay.header.text.text = heading ;
		this.backGroundDisplay.header.text.alpha = alpha;
	};
	fadeOutHeading( callback ) {
		this.backGroundDisplay.header.callback = callback;
		this.backGroundDisplay.header.fadeOption = fadeOption.out;
	};
	fadeInHeading( callback ) {
		this.backGroundDisplay.header.callback = callback;
		this.backGroundDisplay.header.fadeOption = fadeOption.in;
	};
	setHeadingBackgroundColor( color ) {
		this.backGroundDisplay.header.setBackGroundColor( color );
	};
	/////////////////////////////////////////////////////////////////////////
	showFingerTapAnimation() {
		this.stage.addChild( this.tapAnimation  ); 
	};
	hideFingerTapAnimation(){
		this.stage.removeChild( this.tapAnimation ); 
	};
	////
	showFingerHorizontalSwipeAnimation() {
		this.stage.addChild( this.horizontalSwipeAnimation  ); 
	};
	hideFingerHorizontalSwipeAnimation() {
		this.stage.removeChild( this.horizontalSwipeAnimation ); 
	};
	////
	showFingerVerticalSwipeAnimation() {
		this.stage.addChild( this.verticalSwipeAnimation  ); 
	};
	hideFingerVerticalSwipeAnimation() {
		this.stage.removeChild( this.verticalSwipeAnimation ); 
	};
	/////////////////////////////////////////////////////////////////////////
	clear() {
		this.backGroundDisplay.clear();
		myStage.enableDOMEvents(false);
		success = createjs.Ticker.removeEventListener("tick", this.handleAnimationTick30fps.bind(this) ) ;
		if ( !success ) { 
			alert ( 'event listener not removed' ) ; 
		};
        this.canvas.clearRect( 0, 0, this.canvas.width(), this.canvas.hieght());
		this.contentDiv.innerHTML = '';
	}; // clear
	
	start() {
		// start the show/
		createjs.Ticker.addEventListener("tick", this.handleAnimationTick30fps.bind(this) ); 
	}; // start
	handleAnimationTick30fps(event ) {
		this.stage.update(event);
	};
	
	///////this display thing //////
	updateHomeHealthBar( value ) {
	};
	updateAwayHealthBar( value ) {
	};
	///// do attack display /////
	///// do counter attacked display /////
	animateAttack(attackingFighter, callback, animation) {
		if ( animation == undefined || animation == null ) {
			this.setHeadingBackgroundColor( 'Red' ) ;
			this.setHeading( 'Attacking', 1 ) 
			this.fadeOutHeading(callback);
		}else{
			throw 'one on one game display.animateAttack - handle animation not yet implemented' ;
		}
	};
	showDefendingInstructions ( fighter ){
		// this will show an animation and fade it out based on ticks
		// no call back needed 
		this.showFingerVerticalSwipeAnimation();
	};
	showRestingInstructions ( fighter ){
		// this will show an animation and fade it out based on ticks
		// no call back needed 
		this.showFingerHorizontalSwipeAnimation();
	};	
	showRecoveryInstructions ( fighter ){
		// this will show an animation and fade it out based on ticks
		// no call back needed 
		this.showFingerHorizontalSwipeAnimation();
	};	
}; // game display class


