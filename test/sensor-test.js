/* Global Includes */
var testCase       = require('mocha').describe;
var pre            = require('mocha').before;
var preEach        = require('mocha').beforeEach;
var post           = require('mocha').after;
var postEach       = require('mocha').afterEach;
var assertions     = require('mocha').it;
var assert         = require('chai').assert;
var validator      = require('validator');
var exec           = require('child_process').execSync;
var artik          = require('../lib/artik-sdk');
var runManualTests = process.env.RUN_MANUAL_TESTS;


/* Test Specific Includes */
var module_sensor = artik.sensor();

var acce_sensor           = module_sensor.get_accelerometer_sensor(0);
var humid_sensor          = module_sensor.get_humidity_sensor(0);
var photolight_sensor     = module_sensor.get_light_sensor(0);
var envtemp_sensor        = module_sensor.get_temperature_sensor(0);
var proximity_sensor      = module_sensor.get_proximity_sensor(0);
var flame_sensor          = module_sensor.get_flame_sensor(0);


/* Test Case Module */
testCase('Sensors', function() {

	pre(function() {

	});

	testCase('#get_accelerometer_sensor()', function() {

		assertions('#get_speed_x() - get acceleration on X axis', function() {
			console.log(acce_sensor.get_speed_x());
			assert.notEqual(acce_sensor.get_speed_x(), -1);
		});

		assertions('#get_speed_x() - get acceleration on X axis', function() {
			console.log(acce_sensor.get_speed_x());
			assert.notEqual(acce_sensor.get_speed_x(), -1);
		});

		assertions('#get_speed_x() - get acceleration on X axis', function() {
			console.log(acce_sensor.get_speed_x());
			assert.notEqual(acce_sensor.get_speed_x(), -1);
		});

	});

	testCase('#get_humidity_sensor()', function() {

		assertions('#get_humidity() - returns humidity value', function() {
			assert.notEqual(humid_sensor.get_humidity(), -1);
		});
	});

	testCase('#get_light_sensor()', function() {

		assertions('#get_intensity() - returns light sensor intensity', function() {
			assert.notEqual(photolight_sensor.get_intensity(), -1);
		});

	});

	testCase('#get_temperature_sensor()', function() {

		assertions('#get_celcius() - returns temperature in Celsius', function() {
			assert.notEqual(envtemp_sensor.get_celcius(), -1);
		});

		assertions('#get_fahrenheit() - returns temperature in Fahrenheit', function() {
			assert.notEqual(envtemp_sensor.get_fahrenheit(), -1);
		});
	});

	testCase('#get_proximity_sensor()', function() {

		assertions('#get_presence() - returns presence', function() {
			assert.notEqual(proximity_sensor.get_presence(), -1);
		});

	});

	testCase('#get_flame_sensor()', function() {

		assertions('#get_signals() - returns signals', function() {
			assert.notEqual(flame_sensor.get_signals(), -1);
		});

	});


	post(function() {

	});

});
