// health indicator

class HealthIndicator {
	constructor( stage,  index, maximum, x, y, width, height, foregroundColor, backgroundColor ) {
		this._current = 0.0 ;
		this.maximum = maximum;
		this.stage = stage;
		this.x = x?x:0;
		this.y =  y?y:0;
		this.width = (width>4)?width:5;
		this.height = (height>9)?height:300;
		this.foregroundColor = foregroundColor?foregroundColor:"FloralWhite";
		this.backgroundColor = backgroundColor?backgroundColor:"IndianRed";
		
		this.gaugeHeight = 1;
		this.gaugeRange = this.height - 2;
		
		this.foreground = new createjs.Shape();
		this.foreground.graphics.beginFill(this.foregroundColor).drawRect( this.x+1, this.y+this.height-1, this.width-2, -this.gaugeHeight );

		this.background = new createjs.Shape();
		this.background.graphics.beginFill(this.backgroundColor).drawRect(this.x, this.y, this.width, this.height );
		
		this.target = 0;
		this.change = 0;
		this.foreground.addEventListener( 'tick', this.animate.bind(this) );
	};
	_setCurrent( current ){
		this.foreground.graphics.beginFill(this.backgroundColor).drawRect( this.x+1, this.y+this.height-1, this.width-2, -this.gaugeHeight );
		//this.stage.update();
		this._current = current;
		this.gaugeHeight = ( this._current / this.maximum )*this.gaugeRange; 
		if ( this.gaugeHeight < 1 ) { this.gaugeHeight = 1; };
		if ( this.gaugeHeight > this.gaugeRange ){ this.gaugeHeight = this.gaugeRange; };
		this.foreground.graphics.beginFill(this.foregroundColor).drawRect( this.x+1, this.y+this.height-1, this.width-2, -this.gaugeHeight );
	};
	setCurrent( newValue, useAnimation ){
		if (useAnimation){
			//  calculate how much to change health indicator by to show new value in 5 changes
			let numberOfChanges = systemSettings.animationSettings.healthIndicatorPhases; // not really a game element setting

			newValue = ( newValue>this.maximum )?this.maximum: newValue;
			if ( newValue < 0 ) {
				newValue = 0;
			}
			let diff = newValue - this.current ;
			this.change = Math.round((diff/numberOfChanges )*10000)/ 10000;
			this.target = newValue ;
		}else{
			this.change = 0;
			this._setCurrent( newValue );
		};
	}; // setCurrent
	animate() {
		if ( this.change != 0 ) {
			if ( Math.abs( this.change ) >= Math.abs( this.current - this.target ) ){
			  this._setCurrent( this.target ) ;
			  this.change = 0;
			  this.target = 0;
			} else {
				let next = this.current + this.change ;
				this._setCurrent ( next ) ;
			};			
		};
	};
	clear() {
		this.foreground.removeEventListener( 'tick', this.animate );
	};
	//getter
	get current () { return this._current; };
	// rubbish that does not work
	minIndex () {
		return this.stage.getChildIndex( this.background );
	};
	maxIndex () {
		return this.stage.getChildIndex( this.foreground );
	};	
};

