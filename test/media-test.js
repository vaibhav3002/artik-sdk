/* Global Includes */
var testCase   = require('mocha').describe;
var pre        = require('mocha').before;
var preEach    = require('mocha').beforeEach;
var post       = require('mocha').after;
var postEach   = require('mocha').afterEach;
var assertions = require('mocha').it;
var assert     = require('chai').assert;
var validator  = require('validator');
var exec = require('child_process').execSync;
var artik      = require('../lib/artik-sdk');


/* Test Specific Includes */
var media = artik.media();
var sound_file = '/usr/share/sounds/alsa/Front_Center.wav';

/* Test Case Module */
testCase('Media', function() {

	pre(function() {
	});

	testCase('#play_sound_file', function() {

		assertions('Play the sound file', function() {
			media.play_sound_file(sound_file, function(response, status) {
				console.log('Finished playing');
			});
		});

	});


	post(function() {
	});

});
