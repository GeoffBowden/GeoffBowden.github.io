class BackGroundDisplay {
	constructor( stage, image ) {
		this.stage = stage;	
		this.canvas = stage.canvas;
		this.groundIndicator = null;	
		this.skyIndicator = null;
		this.scene = null;
		this.header = null;
		this.playerScore = null;		
		this.opponentScore = null;
		this.homeFighterHealthBar  = null;
		this.awayFighterHealthBar = null;
		this.initialised = false;

		this.createBackDrop( image ) ;
		this.createGameDisplay() ;
	}; //constructor
	clear(){
		this.homeFighterHealthBar.clear();
		this.awayFighterHealthBar.clear();
	};
	createBackDrop( image ) { //event ){ 
		let img = image; //event.srcElement;
		var data = {
			images: [img],
			frames: systemSettings.backdropSettings.defaultAnimation.frames, // { width:600, height:350},
			animations: systemSettings.backdropSettings.defaultAnimation.animations //{ run:[0,7] } 
		};
		var spriteSheet = new createjs.SpriteSheet(data);
		var animation = new createjs.Sprite(spriteSheet, "run");
		this.scene = animation;
	}; // 

	createGameDisplay() {
		const indicatorOpacity = 0.35;
		const headerHieght = 20 ;
			
		//  draw the ground (squaratis should be stood on this when at rest!
		this.groundIndicator = new createjs.Shape() ;
		this.groundIndicator.alpha = indicatorOpacity;
		let groundY = systemSettings.gameSettings.groundHeight?systemSettings.gameSettings.groundHeight:21 ;
		this.groundIndicator.graphics.beginFill("#CB7704").drawRect(0, this.canvas.height-groundY, this.canvas.width, groundY ) ;
		//this.stage.addChildAt(  this.groundIndicator, 1  ) ;

		// draw the sky, this is how high squaratika need to jump before they can attack
		this.skyIndicator = new createjs.Shape() ;
		this.skyIndicator.alpha = indicatorOpacity;
		let skyHeight = systemSettings.gameSettings.ceilingHeight?systemSettings.gameSettings.ceilingHeight:47 ;
		this.skyIndicator.graphics.beginFill("#7AF0F8").drawRect(0, headerHieght, this.canvas.width, skyHeight - headerHieght) ;
		//this.stage.addChildAt(  this.skyIndicator, 1  ) ;
		
		//constructor ( canvas, stage, y[, height, index, color, backgroundColor] )
		this.header = new Header( this.canvas, this.stage, 0, headerHieght, 3, "GhostWhite", "DarkSlateGray" ) ;
		this.header.showText('Click to Start') ;
		//constructor (stage, index, [x, y, width, height, foregroundColor, backgroundColor, alpha] )
		this.playerScore = new OnScreenCounter(this.stage, 5, 0, headerHieght, 16, headerHieght ) ;
		//constructor                                                     (stage,       index,                           [x, y, width, height, foregroundColor, backgroundColor, alpha] )
		this.opponentScore = new OnScreenCounter(this.stage, /*this.header.minIndex*/2, this.canvas.width-16, headerHieght, 16, headerHieght ) ; 
		
		//constructor( stage,  index, maximum[, x, y, width, height, foregroundColor, backgroundColor] ) 
		this.homeFighterHealthBar = new HealthIndicator( this.stage, 5, 10, 2, 45, 7, 300 ) ;
		this.awayFighterHealthBar = new HealthIndicator( this.stage, 5, 10, this.canvas.width - 9, 45, 7, 300 ) ;
		this.initialised = true;
	};
	
}; // back ground display