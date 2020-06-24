
class OnScreenCounter {
	constructor (stage, index, x, y, width, height, foregroundColor, backgroundColor, alpha ) {
		this.alignment = alignmentOption.left ; // unimplemented
		//----------------------------------------
		this.x = x?x:0;
		this.y = y?y:0 ;
		this.height = height?height:18; ;
		this.width = width?width:12 ;
		this.foregroundColor = foregroundColor?foregroundColor:"White";
		this.backgroundColor = backgroundColor?backgroundColor:"Black";
		this._score = 0;
		//----------------------------------------
		this.stage = stage ;
		this.text = new createjs.Text("0",this.height+"px Arial", this.foregroundColor);
		this.text.textAlign = alignmentOption.centre;
		this.text.x = this.x + this.width/2;
		this.text.y = this.y;
		this.background = new createjs.Shape() 
		this.background.alpha = alpha?alpha:0.2;
		this.background.graphics.beginFill(this.backgroundColor).drawRect(this.x, this.y, this.width, this.height);
		//this.stage.addChildAt( this.text, index?index:0 );
		//this.stage.addChildAt( this.background, index?index:0) ;
	};// constructor 
	set score( integerValue ) {
		this._score = integerValue;
		this.text.text = integerValue;
	};
    get score () { return this._score; };
	
	increment( delta ) {
		this._score += delta?delta:1;
		this.text.text = this._score;
	};
	decrement( delta ) {
		this._score -= delta?delta:1;
		this.text.text = this._score;
	};

};