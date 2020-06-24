var quadrant = { 
	topRight: 'topRight',
	bottomRight: 'bottomRight',
	bottomLeft: 'bottomLeft',
	topLeft: 'topLeft',
	value: function( xMovement, yMovement ) {
		if ( xMovement >= 0 && yMovement <= 0 ) { return quadrant.topRight; };
		if ( xMovement >= 0 && yMovement > 0 ) { return quadrant.bottomRight; };
		if ( xMovement < 0 && yMovement >= 0 ) { return quadrant.bottomLeft; };
		if ( xMovement < 0 && yMovement < 0 ) { return quadrant.topLeft; };
	}
};

var octalRose = {
	none: 'none',
	north: 'north',
	northEast: 'northEast',
	east: 'east',
	southEast: 'southEast',
	south: 'south',
	southWest: 'southWest',
	west: 'west',
	northWest: 'northWest',
	direction: function ( xMovement, yMovement ) {
		if ( (xMovement == 0) && (yMovement == 0) ) { return octalRose.none; };   
		// -1.57 = north  		= -90deg
		// -7.85 = north east	= -45deg  
		//  0.0  = east 		=   0deg
		//  7.85 = south east 	=  45deg
		//  1.57 = south 		=  90deg
		// -7.85 = south west 	= -45deg
		//  0.0  = West			=   0deg
		//  7.85 = North west	=  45deg
		let radians = Math.atan( yMovement / xMovement );
		let degrees = radians * 180/Math.PI;
		
		
		switch ( quadrant.value( xMovement, yMovement )) {                         
			case ( quadrant.topRight ) : {  //-90 to 0 degrees going clockwise                     
				if ( degrees < -67.5 ) { return octalRose.north ; };
				if ( degrees < -22.5 ) { return octalRose.northEast ; };
				if ( degrees <= -0 ) { return octalRose.east ; };
				throw "angle not in top right quadrant";
			} break;
			case ( quadrant.bottomRight ) : {  // 0 to 90 degrees going clockwise  
				if ( degrees > 67.5 ) { return octalRose.south ; };
				if ( degrees > 22.5 ) { return octalRose.southEast ; };
				if ( degrees >= 0   ) { return octalRose.east ; };
				throw "angle not in bottom right quadrant";
			} break;
			case ( quadrant.bottomLeft ) : { // 90 to 0 degrees going clockwise
				if ( degrees > -22.5 ) { return octalRose.west ; };
				if ( degrees > -67.5 ) { return octalRose.southWest ; };
				if ( degrees >=-90.0 ) { return octalRose.south ; };	
				throw "angle not in bottom left quadrant";
			} break;
			case ( quadrant.topLeft ) : { // 0 to -90 degrees going clockwise
				if ( degrees < 22.5 ) { return octalRose.west ; };
				if ( degrees < 67.5 ) { return octalRose.northWest ; };
				if ( degrees <=90.0 ) { return octalRose.north ; };	
				throw "angle not in top left quadrant";
			} break;
			default: return octalRose.none; // or throw
		};
		return octalRose.none;
	}
};

class MovementCalculator{
	constructor	(){
		this.currentMovementDirection = octalRose.none;
		this.distanceTravelled = 0.0 ;
		this.totalDistance = 0.0;
	}
	clear(){
		this.distanceTravelled = 0.0 ;
		this.currentMovementDirection = octalRose.none;
		this.totalDistance = 0.0;
	};
};
// relies on north to south movement
// if mouse is moving north or south adds the distance moved to the score
class DefenceCalculator extends MovementCalculator{ 
	constructor() {
		super();
	};
	processEvent( mouseMoveEvent ) {
		let movementDirection = octalRose.direction( mouseMoveEvent.movementX, mouseMoveEvent.movementY ) ;
		let distance = mouseMoveEvent.movementY;
		if ( ( movementDirection = octalRose.north ) || ( movementDirection == octalRose.south ) ){
			if ( this.currentMovementDirection == octalRose.direction.none ) {
				this.currentMovementDirection = movementDirection;
				this.distanceTravelled = Math.abs( distance );
				this.totalDistance = this.distanceTravelled;
			} else {
				this.distanceTravelled += Math.abs( distance );
				if( movementDirection != this.currentMovementDirection ){
					this.totalDistance += this.distanceTravelled ;
					this.distanceTravelled = 0;
				};
			};
		};
	};
}; // Defence Calculator	
class RecoveryCalculator extends MovementCalculator{ 
	constructor() {
		super()
	};
	processEvent( mouseMoveEvent ) {
		let distance = mouseMoveEvent.movementX ;
		let movementDirection = octalRose.direction (distance, mouseMoveEvent.movementY );
		if ( movementDirection == octalRose.east || movementDirection == octalRose.west ){
			if ( this.currentMovementDirection == octalRose.direction.none ) {
				this.currentMovementDirection = movementDirection;
				this.distanceTravelled = Math.abs( distance );
				this.totalDistance = this.distanceTravelled;
			} else {
				this.distanceTravelled += Math.abs( distance );
				if( movementDirection != this.currentMovementDirection ){
					this.totalDistance += this.distanceTravelled ;
					this.distanceTravelled = 0;
				};
			};
		};
	};
}; // Recovery Calculator
