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
		//stage.addChildAt(  this.foreground, index?index:0  ) ;
		//stage.addChildAt(  this.background, index?index:0  ) ;
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
	setCurrent( current, useAnimation ){
		if (useAnimation){
			//  calculate how much to change health indicator by to show new value in 5 changes
			let numberOfChanges = systemSettings.healthIndicatorPhases; // not really a game element setting
			current = ( current>this.maximum )?this.maximum: this.current;
			let diff = current - this.current ;
			let change = Math.round((diff/numberOfChanges ) /100 )* 100;
			// here need to get a closure with setting 
			this.foreground.addEventListener( 'tick', getHealthAdjustementFunction( change ) );
		}else{
			this._setCurrent( current );
		};
	}; // setCurrent
	getHealthAddustmentFunction ( delta ){
		var change = delta;
		var times = 0;
		adjust = function () {
			times += 1;
			if( times <= systemSettings.healthIndicatorPhases ) {
				let newValue = this.current - delta;
				this._setCurrent(  newValue );
			} else {
				if (!( typeof this.foreground._eventListeners == 'undefined' || this.foreground._eventListeners.length == 0 ) ){
					for(var i = 0, len = this.foreground._eventListeners.length; i < len; i++) {
						var e = this.foreground._eventListeners[i];
						this.foreground.removeEventListener(e.event, e.callback);
					};
				};
			};
			this.foreground._eventListeners = [];
		};//adust
		return adjust;
	}; //get health adjust...
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

