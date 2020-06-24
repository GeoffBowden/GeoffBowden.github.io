// makes calls to the squaratika api
// this is currently modelled using the resources structure
// and actual 
var SquaratikaAPI = function () {
	// "Sinichi", "MrVanillaBadGuy"
	this.getSquaratikaConfig = function (  squaratikaName ) {
		// if url begins with the word file then 
		let api = null ;
		if ( document.URL.lastIndexOf( 'file:', 0 ) === 0 ){
			api = simulateGetConfig;
		}
		else {  
			throw 'Not yet implement SquaratikaAPI.js line 13' ;
			api = getConfigFromResourcesSite;
		}
		return api( squaratikaName ) ;
	}; //  getSqaratika config
	
	var getConfigFromResourcesSite = function (squaratikaName) {
	//CORS FAILED ATTEMPT TO GET RESOURCE BUT WILL BE THE ACTUAL WAY TO DO IT AFTER RELEASE
		const uri = "https://GeoffBowden.github.io/Squaratika/API/V1/";
		let fullRequestUri = uri + squaratikaName  ;
		fullRequestUri += ".json";
		//const myHeaders = new Headers();
		// THIS HAS BEEN A COMPLETE BLOODY FAILURE DUE TO CORS
		// add a fallback which just returns objects.
		const myRequest = new Request(fullRequestUri, {
			method: 'GET',
			mode: 'cors',
			data:'json',
			headers: {
			  'Content-Type': 'application/json'
			  // 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow",
			cache: 'default'
		});
		console.log( fullRequestUri );
		//"https://geoffbowden.github.io/Squaratika/API/V1/Sinichi.json"
		//"https://raw.githubusercontent.com/GeoffBowden/GeoffBowden.github.io/master/Squaratika/API/V1/Sinichi.json"
		fetch("https://raw.githubusercontent.com/GeoffBowden/GeoffBowden.github.io/master/Squaratika/API/V1/Sinichi.json", {
			method: 'GET',
			mode: 'cors',
			headers: {
			  'Content-Type': 'application/json',
			  'Content-Security-Policy': 'default-src https:',
			  'Accept': 'application/json',
			  'Accept-Language': 'en-us,en;q=0.5',
			  'Accept-Encoding': 'gzip,deflate'
			}
		})  .then(response => response.json())
			.then(data => console.log(data));
		return JSONparse( response.json );
	}; // Get config from resources site
	
	var simulateGetConfig = function (squaratikaName) {
		switch ( squaratikaName ) {
			case 'Sinichi' :  return 	{
														name: "Sinichi",
														spriteMap: "Images/Squarateka/Sinichi/spriteMap.png",
														leftHandImageLocation: "Images/Squarateka/Shared/BoxingGloves/left_boxing_glove.png",
														rightHandImageLocation:"Images/Squarateka/Shared/BoxingGloves/right_boxing_glove.png",
														animation: {
															images: [],
															type: "spriteSheet",
															frames: {width:100, height:100},
															animations: {
																	happy:[0,7],
																	pain: [8,15],
																	resting:[16,23],
																	sad: [24,31]
															}	// animations object			
														}, //animation
														fightingStatistics: {
															baseFightingStatistics: {
																fightingStyle:{
																	name: 'Squaretokan',
																	powerSource: 'concentration',
																	damageVariant: 'concussion'
																},
																damage: 10000,
																defence: 10000,
																hp : 35000,
																jumping: 10000, 
																resting: 10000,
																recovery: 10000,
																constitution: 20000
															}, 
															currentFightingStatistics: {
																damage: 10000,
																defence: 10000,
																hp : 35000,
																jumping: 10000, 
																resting: 10000,
																recovery: 10000,
																constitution: 20000,
																tirednessModifier: 1.0 
															}
														},
														gameStatistics: {
															talentLimit: 1.15,
															learningSpeed: 1.0,
															belt: "White"
														}
													}
			break;
			case 'MrVanillaBadGuy' : return	{
																		name: "Mr Vanilla BadGuy",
																		spriteMap: "Images/Squarateka/BadGuy/spriteMap.png",
																		leftHandImageLocation: "Images/Squarateka/Shared/BoxingGloves/left_boxing_glove.png",
																		rightHandImageLocation:"Images/Squarateka/Shared/BoxingGloves/right_boxing_glove.png",
																		animation: {
																			images: [],
																			type: "spriteSheet",
																			frames: {width:100, height:100},
																			animations: {
																					happy:[0,7],
																					pain: [8,15],
																					resting:[16,23],
																					sad: [24,31]
																			}	// animations object			
																		}, //animation
																		fightingStatistics: {
																			baseFightingStatistics: {
																				fightingStyle:{
																					name: 'Squaretokan',
																					powerSource: 'concentration',
																					damageVariant: 'concussion'
																				},
																				damage: 10000,
																				defence: 10000,
																				hp : 35000,
																				jumping: 10000, 
																				resting: 10000,
																				recovery: 10000,
																				constitution: 20000
																			}, 
																			currentFightingStatistics: {
																				damage: 10000,
																				defence: 10000,
																				hp : 35000,
																				jumping: 10000, 
																				resting: 10000,
																				recovery: 10000,
																				constitution: 20000,
																				tirednessModifier: 1.0 
																			}
																		},
																		gameStatistics: {
																			talentLimit: 1.0,
																			learningSpeed: 1.0,
																			belt: "White"
																		}
																	}	
		break;
			default: throw 'Unknown Squaratika';
		}// switch 
	}; // simulate get config
	
} // class Squaratika API