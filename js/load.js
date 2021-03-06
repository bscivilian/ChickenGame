// Load.js

var loadState = {
	
	// Preload all game assets
	preload: function() {
		
		preLoadBar = game.add.sprite(game.world.centerX, game.world.centerY+100, 'preLoadBar');
		preLoadBar.anchor.set(0.5);
    	this.load.setPreloadSprite(preLoadBar);
	
		// Load graphic assets
		game.load.image('tapBubble', 'assets/tapButton.png');
		game.load.image('tapArea', 'assets/tapArea.png');
		game.load.image('rail', 'assets/tapArea.png');
		game.load.image('chicken', 'assets/chicken-leg-vector.png');
		game.load.image('startGameButton', 'assets/startgame.png');
		game.load.image('restartGameButton', 'assets/restartgame.png');
	
		// Load audio assets
		game.load.audio('blaster', 'assets/blaster.mp3');
		game.load.audio('bgMusic', 'assets/sd-ingame1.wav');
		game.load.audio('badTap', 'assets/sounds/badTap.mp3');
		game.load.audio('under500', 'assets/sounds/under500.mp3');
		game.load.audio('over500', 'assets/sounds/over500.mp3');
		
		// Show loading progress
		var loadingLabel = game.add.text(game.world.centerX, game.world.centerY, 'Loading...', { font: '50px Arial', fill: '#ffffff'});
		loadingLabel.anchor.set(0.5, 0.5);	
	},
	
	create: function() {
		
		// Call menu state after 2 seconds
		setTimeout(function () { game.state.start("menu"); }, 1000);
	}
};