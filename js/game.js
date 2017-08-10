// Game.js

// Set game height and width to device height and width
var gWidth = window.innerWidth;
var gHeight = window.innerHeight;

// Initialize game
var game = new Phaser.Game(gWidth, gHeight, Phaser.CANVAS, 'popeye-game');

// Global game variables
var counter;
var countdownText;
var tapBubble;
var timer;
var tapArea;
var preLoadBar;
var score;
var tapScore;
var shoutOutText;
var scoreText;
var rail;
var chicken;
var timerPos;
var timerVal;
var nowTime;
var tapTime;
var minBall = 80;
var maxBall = 200;
var randPosX = game.rnd.integerInRange(0, gWidth);
var randPosY = game.rnd.integerInRange(gHeight-300, gHeight)
var randSizeXY = game.rnd.integerInRange(minBall, maxBall);
var scoreResponse = ["Pathetic!", "So Slow Bro", "Eh, Fine", "Very Nice", "So Good!", "Amazing!", "Incredi-Fast!", "You missed!"];
var scoreValues = [0, 1, 2, 5, 10, 20, 50];
//var tmpX;

// Add game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

// call boot state
game.state.start('boot');