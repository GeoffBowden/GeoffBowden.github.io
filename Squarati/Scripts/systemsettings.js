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
	fingerTapAnimation: {
		fileName: "Images/Fight/Instructions/tap_animation_transparent.png",
		animation: {
			images: [],
			type: "spriteSheet",
			frames: {width:50, height:50},
			animations: {
					tap:[0,7]
			}
		},
		x : 275,
		y : 65
	},
	fingerHorizontalSwipeAnimation: {
		fileName: "Images/Fight/Instructions/finger_sideswipe_animation_transparent.png",
		animation: {
			images: [],
			type: "spriteSheet",
			frames: {width:50, height:50},
			animations: {
					swipe:[0,7]
			}
		},
		x : 275,
		y : 65
	},
	fingerVerticalSwipeAnimation: {
		fileName: "Images/Fight/Instructions/finger_up_down_rub_animation_transparent.png",
		animation: {
			images: [],
			type: "spriteSheet",
			frames: {width:50, height:50},
			animations: {
					swipe:[0,7]
			}
		},
		x : 275,
		y : 65
	},
	gameSettings: {
		groundHeight: 21,
		ceilingHeight: 60
	},
	animationSettings: {
		fps: 30,
		fadePhases: 25, //(1/0.04 = 25 ms 1/25 = 0.04)
		healthIndicatorPhases: 10
	}
}; // system settings object


