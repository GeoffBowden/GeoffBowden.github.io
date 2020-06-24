class GameClass{
	constructor ( ) {
        this.name = "abstact game class";
        this.gameData = {} ;
    };
    endGame (){
        this.callback ( this.gameData );
    };
}; //gameClass


