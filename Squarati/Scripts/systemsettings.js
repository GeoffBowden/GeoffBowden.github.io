var systemSettings = {
    resourcesUri: "https://GeoffBowden.github.io/",
	backdropSettings: {
		folder: "Images/Fight/Backdrops/",
		defaultImageFileNames: ["AnimatedCastleSpriteSheet.png"],
		defaultAnimation: {
			images: [],
			type: "spriteSheet",
			frames: {width:600, height:350},
			animations: {
					run:[0,7]
			}	// animations object			
		} //default backdrop
	},  // back drop settings
	gameSettings: {
		groundHeight: 21,
		ceilingHeight: 60
	},
	animationSettings: {
		fps: 30,
		fadePhases: 25, //(1/0.04 = 25 ms 1/25 = 0.04)
		healthIndicatorPhases: 5
	}
}; // system settings object


