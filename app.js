const fs = require('fs')
, lame = require('lame')
, Speaker = require('speaker');

const exec = require('child_process').exec;
const five = require('johnny-five');
const chipio = require('chip-io');

var playing = false;

// Scans mp3 folder, loads track names into array
var tracks = [];
var nextTrack = 0;
var files = fs.readdirSync('./mp3/');

console.log ('files: ', files);
files.forEach(file => {
  if (file.search('.mp3') > 0)  tracks.push(file);
});
console.log ('tracks: ', tracks);

/*
decoder.on('format', function() {
mpg123Util.setVolume(decoder.mh, 0.5);
var vol = mpg123Util.getVolume(decoder.mh);
console.log(vol);
});
*/

// Helper to execute shell commands
function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
}

// Initializes jonny-five
var board = new five.Board({
io: new chipio()
});

// When board is ready...
board.on('ready', function() {

  // Creates buttons and adds event listeners on the XIO-P1 and P3 pins
  var buttonShutDown = new five.Button('XIO-P1');
  
    buttonShutDown.on('press', function() {
    console.log('Shutdown button pressed');
    execute('sudo shutdown -h now', function(callback){
      console.log('shutting down...');
    });
  });

  var buttonSensor   = new five.Button('CSID1');
  buttonSensor.on('press', function() {
    var decoder = new lame.Decoder()
      , speaker = new Speaker();

    console.log('Sensor tripped!');

    // play MP3
    if (!playing) {
      playing = true;
      console.log('Playing...', tracks[nextTrack]);

      fs.createReadStream('mp3/' + tracks[nextTrack])
        .pipe(decoder).pipe(speaker)
        .on('finish', () => {
            console.log('Finish.');
            playing = false;
      });

      nextTrack++;
      if (nextTrack >= tracks.length)
        nextTrack = 0;    
    };
  });

  buttonSensor.on('release', function() {
    console.log('Sensor reset!');
  });

});
