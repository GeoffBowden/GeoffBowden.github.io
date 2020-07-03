class FighterDisplay {
	constructor ( stage, config, x, y, bodyImage, leftHandImage, rightHandImage, scale ) {
		this.stage = stage ;
		this.spriteMap = bodyImage;
		this.leftHandImage = leftHandImage;
		this.rightHandImage = rightHandImage;
		this.animationConfig = config.animation;
		this.initialised = false;
		// all of this assumes that squaratis are 100 by 100 and that hands are 50 by 50
		//
		this.leftHand = this.handLoad( this.leftHandImage, x+(120*this.scale), y+(20*this.scale) ) ;
		this.rightHand = this.handLoad( this.rightHandImage, x-(70*this.scale), y+(20*this.scale) ) ;
		this.playerAnimation = this.loadFighterImage() ;
		this.scale = scale?scale:1; // not handled yet 
		this.x = x;
		this.y = y;
		
		//this.stage.addChild ( this.leftHand, this.rightHand, this.playerAnimation ) ;
	}; // construtor
	loadFighterImage(  ) {
		let config = this.animationConfig;
		config.images = [this.spriteMap];
		let spriteSheet = new createjs.SpriteSheet( config ) ;
		this.playerAnimation = new createjs.Sprite( spriteSheet, 'happy' ) ;
		this.initialised = true;
		return this.playerAnimation;
	};
	handLoad( img, x, y ) {
		let data = {
			images: [img],
			frames: { width:50, height:50, count: 1 }
		};
		let spriteSheet = new createjs.SpriteSheet( data ) ;
		let sprite = new createjs.Sprite( spriteSheet ) ;
		return sprite;
	};
	
	set x ( newX) {
		this._x = newX;
		this.middleX = + (50*this.scale);
		this.playerAnimation.regX = this.middleX;
		this.playerAnimation.x = this._x+this.middleX;
		
		this.leftHand.regX =  -70 ; 
		this.leftHand.x =  this._x+this.middleX ; //+ (120*this.scale);
		
		this.rightHand.regX = 120;
		this.rightHand.x =  this._x+this.middleX ; 
	};
	get x (){
		return (this._x)?this._x:0;
	};
	set y(newY) {
		this._y = newY;
		this.middleY = (50*this.scale);
		this.playerAnimation.regY = this.middleY;
		this.playerAnimation.y = this._y + this.middleY;

		this.leftHand.regY = -10 ; //this.middleY;
		this.leftHand.y = this._y+(20*this.scale);
		
		this.rightHand.regY = -10; //this.middleY;
		this.rightHand.y = this._y+(20*this.scale);
	};
	get y() {
		return (this._y)?this._y:0;
	}
	rotate( degs ) {
		this.playerAnimation.rotation = degs ;
		this.leftHand.rotation = degs ;
		this.rightHand.rotation = degs ;
	};
	happy(){
		let currentFrame = this.playerAnimation.currentFrame;
		this.playerAnimation.gotoAndPlay( "happy" );
		this.playerAnimation.gotoAndPlay( currentFrame );
	};
	pain(){
		let currentFrame = this.playerAnimation.currentFrame;
		this.playerAnimation.gotoAndPlay( "pain" );
		this.playerAnimation.gotoAndPlay( currentFrame );
	};
	resting(){
		let currentFrame = this.playerAnimation.currentFrame;
		this.playerAnimation.gotoAndPlay( "resting" );
		this.playerAnimation.gotoAndPlay( currentFrame );
	};
	sad(){
		let currentFrame = this.playerAnimation.currentFrame;
		this.playerAnimation.gotoAndPlay( "sad" );
		this.playerAnimation.gotoAndPlay( currentFrame );
	};
} ; // class fighter display