var loadBaseGameclass = function (callback) {
    if ( !window.__loadGameClass ) {
       loadjscssfile( 'Scripts/Games/Fights/Common/gameClass.js') ;
       window.__loadGameClass = "true";
    };
	callback() ;
};

var globalCallBack;

var loadHvsCOneOnOneCode = function( callback ){
    if (!window.__loadHvsCOneOnOneCode){
        window.__loadHVsCOneOnOneCode = "true";
		globalCallBack = callback;
        loadBaseGameclass ( loadHvsCOneOnOneCodePart2 ) ;
    };
};

var loadHvsCOneOnOneCodePart2= function(){
        loadjscssfile( 'Scripts\\Games\\Fights\\HvsCOneOnOne\\HvsC_OneOnOne.js', globalCallBack);
}