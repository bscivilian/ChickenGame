// Play.js

var playState = {
	
	create: function() {
		
		// Set play canvas background color
		game.stage.backgroundColor = '#124184';
		
		// Initialize game variables
		score = 0;
		timerVal = 2;

		// AUDIO Declarations
		blaster = game.add.audio('blaster');
		bgMusic = game.add.audio('bgMusic');
		badTap = game.add.audio('badTap');

		// TEXT declarations
		
			// Total Score text
			scoreText = game.add.text(10, 10, 'Total score: 0', { fontSize: '32px', fill: '#000' });
		
			// Tap response text initialization
			shoutOutText = game.add.text(0, 0, "");
		
		// Add SPRITES
		
			// Set finger tap area
			tapArea = game.add.sprite(0,gHeight-400, 'tapArea');
			game.physics.enable(tapArea, Phaser.Physics.ARCADE);
			tapArea.width = gWidth;
			tapArea.height = 400;
			tapArea.inputEnabled = true;

			// Set tap bubbles
			tapBubble = game.add.sprite(randPosX, randPosY, 'tapBubble');
			game.physics.enable(tapBubble, Phaser.Physics.ARCADE);
			tapBubble.body.collideWorldBounds = true; // keep bubbles within stage
			tapBubble.width = randSizeXY;
			tapBubble.height = randSizeXY;
			tapBubble.anchor.set(0.5);
			tapBubble.inputEnabled = true;

			// Set tug of war path
			rail = game.add.sprite(game.world.centerX,200, 'rail');
			rail.width = 10;
			rail.height = gHeight-750;

			// Set chicken leg
			chicken = game.add.sprite(game.world.centerX,gHeight*.4, 'chicken');
			game.physics.enable(chicken, Phaser.Physics.ARCADE);
			chicken.width = gWidth*.2;
			chicken.height = chicken.width/1.29;
			chicken.anchor.set(0.5);

		// ACTIONS and EVENTS
			
			// Start the background music
			bgMusic.play();
		
			// Start the timer loop for bubble appear/disappear
			timerPos = game.time.events.loop(Phaser.Timer.SECOND * timerVal, this.newBubble.bind(this), this);	
		
			// Get current time for very first tapBubble
			nowTime = this.time.now;
		
			// When player taps bubble, kill it and update score
			tapBubble.events.onInputDown.add(this.updateScore, this);
			tapArea.events.onInputDown.add(this.noScore, this);
	},

	update: function() {

	//	game.physics.arcade.collide(tapArea, tapBubble);

	},

	newBubble: function() {
		
		tapBubble.kill(); // Destroy bubble
		
		nowTime = game.time.now; // Get time the bubble was killed
		
		// Set new random position and size for next bubble
		randPosX = game.rnd.integerInRange(0, gWidth);
		randPosY = game.rnd.integerInRange(gHeight-300, gHeight)
		randSizeXY = game.rnd.integerInRange(minBall, maxBall);

		// Create new bubble and its physics
		tapBubble = game.add.sprite(randPosX, randPosY, 'tapBubble');
		game.physics.enable(tapBubble, Phaser.Physics.ARCADE);
		tapBubble.body.collideWorldBounds = true;
		tapBubble.width = randSizeXY;
		tapBubble.height = randSizeXY;
		tapBubble.anchor.set(0.5);
		tapBubble.inputEnabled = true;
		tapBubble.events.onInputDown.add(this.updateScore, this);
		
		// Slowly increase bubble speed by 1/10 second up to point
		timerVal = timerPos.delay;
		if(timerVal >= 800) {
			timerPos.delay -= 100;
		}
	},
	
	noScore: function() {
		
		shoutOutText.kill(); // Destroy response text
		badTap.play();
		chicken.body.velocity.y -= .5;
		// Update tap response text
			shoutOutText = game.add.text(game.world.centerX, 100, "", {
				font: "52px Arial",
				fill: "#fff",
				align: "center"
			});
			shoutOutText.anchor.set(0.5);
			shoutOutText.text = scoreResponse[7];
	},

	updateScore: function() {
		
		shoutOutText.kill(); // Destroy response text
		
		blaster.play(); // Play bubble pop effect

		tapBubble.kill(); // Destroy bubble
		
		tapTime = game.time.now; // Get time the bubble was popped

		tapScore = tapTime-nowTime; // Calculate speed of bubble pop
		
		// Determine speed score for response text and +/- chicken leg velocity
		switch (true) {
			case (tapScore <= 375):
				tmpY = 6;
				chicken.body.velocity.y += 3;
				break;
			case (tapScore <= 550 && tapScore > 375):
				tmpY = 5;
				chicken.body.velocity.y += 2;
				break;
			case (tapScore <= 750 && tapScore > 550):
				tmpY = 4;
				chicken.body.velocity.y += 1;
				break;
			case (tapScore <= 850 && tapScore > 750):
				tmpY = 3;
				chicken.body.velocity.y -= 1;
				break;
			case (tapScore <= 1050 && tapScore > 850):
				tmpY = 2;
				chicken.body.velocity.y -= 2;
				break;
			case (tapScore <= 1300 && tapScore > 1050):
				tmpY = 1;
				chicken.body.velocity.y -= 3;
				break;
			case (tapScore > 1300):
				tmpY = 0;
				chicken.body.velocity.y = 0;
				break;		
		}

		// If chicken leg crosses threshold, end game
		if(chicken.position.y >= gHeight-550) {
			bgMusic.stop(); // Stop background music
			this.endGame();
		}

		//  Update the total score and give tap response text
		
			// Update Total Score and Text
			score += scoreValues[tmpY]; 
			scoreText.text = ' Total Score: ' + score; 
		
			// Update tap response text
			shoutOutText = game.add.text(game.world.centerX, 100, "", {
				font: "52px Arial",
				fill: "#fff",
				align: "center"
			});
			shoutOutText.anchor.set(0.5);
			shoutOutText.text = scoreValues[tmpY] + "pts \n" + scoreResponse[tmpY];
			game.add.tween(shoutOutText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true); // Fade out response text
		
		this.newBubble(); // Create a new tap bubble	
	},

	endGame: function() {	
		
		// Call win game state
		game.state.start('win');
	},

	render: function() {

	}
}