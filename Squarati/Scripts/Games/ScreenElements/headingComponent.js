


// this component draws a rectangle with centre aligned text

class Header {
	constructor ( canvas, stage, y, height, index, color, backgroundColor ){
		this.stage = stage;
		this.canvas = canvas;
		this.index = index ;
		this.text = new createjs.Text ( "Start", (height?height:20)+"px Arial", color?color:"CornSilk" );

		this.text.textAlign = alignmentOption.centre;
		this.text.x = canvas.width / 2;
		this.text.y = y?y:0;
		this.height = height?height:20;
		// add a background box at the same index, inserting behind text
		this.background = new createjs.Shape();
		this.background.alpha = 0.2;
		this.background.graphics.beginFill(backgroundColor?backgroundColor:"DarkOrchid").drawRect(0, this.text.y, canvas.width, this.height);
		
		this.text.addEventListener( 'tick', this.fadeOut.bind(this) ) ;
		this.fadeOption = fadeOption.none;
		this.fadeSpeed = 2.0;
		
		this.callback = null ;
	};
	clear ( ){
		if ( !this.text.removeEventListener( 'tick', this.fadeOut.bind(this) )  ) { alert( 'heading tick function not removed' ); };
	};
	showText( text ) {
		if ( text != undefined && text != null) {
			this.text.text = text ;
		};
	};	
	setColor ( color ) {
		this.text.color = color ;
	};
	setBackGroundColor (color) {
		this.background.graphics.beginFill(color?color:"DarkOrchid").drawRect(0, this.text.y, this.canvas.width, this.height);
	};
	minIndex () {
		let res = this.stage.getChildIndex( this.background );
		if ( res == -1 ) { res = this.index; }
		return 
	};
	maxIndex () {
		return this.stage.getChildIndex( this.text );
	};
	fadeOut( ) {
		switch( this.fadeOption ){
			case fadeOption.in : { 
				if(this.text.alpha<1) {
					this.text.alpha += 0.04*this.fadeSpeed; 
					if ( this.text.alpha >= 1 ){
						this.doCallBack() ;
					};
				}; 
			}break;
			case fadeOption.out: { 
				if (this.text.alpha>0) {
					this.text.alpha -= 0.04*this.fadeSpeed; 
					if ( this.text.alpha <= 0 ) {
						this.doCallBack() ;
					};
				}; 
			}break;
		};
	};
	doCallBack () {
		if (this.callback ) { this.callback(); };
	};
}; // Header
