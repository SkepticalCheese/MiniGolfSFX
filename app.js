//app deps

/* Commands to install node modules
	npm init
	npm install -save chip-io johnny-five
	npm install -save child_process
	npm install -save player

	If last step fails, make sure you have the ALSA backend installed by running:
	sudo apt-get install libasound2-dev
*/

const exec = require('child_process').exec;
const five = require('johnny-five');
const chipio = require('chip-io');
var Player = require('player');

// create a player instance from playlist 
var player = new Player([
	__dirname + '/mp3/O-canada.MP3'
   ]);

// event: on error 
player.on('error', function(err){
	// when error occurs 
	console.log(err);
   });
  

// Helpers to execute shell comands
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
}

function shutDownChip () {
	execute('sudo shutdown -h now', function(callback){
		console.log('shutting down...');
	});
};

function playMp3 () {
	// play MP3
	player.play();
	console.log('Started playing...');
};

// Initialize jonny-five
var board = new five.Board({
  io: new chipio()
});

board.on('ready', function() {
	// Creates buttons on the XIO-P1 and P3 pins
	var buttonShutDown = new five.Button('XIO-P1');
	var buttonSensor   = new five.Button('XIO-P3');

	// adds event listeners for 'up' events
	buttonShutDown.on('press', function() {
		console.log('Shutdown button pressed');
		shutDownChip();
	});

	buttonSensor.on('press', function() {
		console.log('Sensor tripped');
		playMp3();
	});
});

/***
Commands to setup forever on boot and rotate log
    as root:
    copy MiniGolfSFX to /etc/init.d 
	chmod 755 /etc/init.d/MiniGolfSFX 
	sh /etc/init.d/MiniGolfSFX start/stop
	update-rc.d MiniGolfSFX defaults
	update-rc.d -f MiniGolfSFX remove

	Copy MiniGolfSFX to /etc/logrotate.d/

***/
