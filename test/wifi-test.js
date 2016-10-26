/* Global Includes */
var testCase   = require('mocha').describe;
var pre        = require('mocha').before;
var preEach    = require('mocha').beforeEach;
var post       = require('mocha').after;
var postEach   = require('mocha').afterEach;
var assertions = require('mocha').it;
var assert     = require('chai').assert;
var validator  = require('validator');
var exec       = require('child_process').execSync;
var artik      = require('../lib/artik-sdk');


/* Test Specific Includes */
var wifi;
var ssid = process.env.WIFI_SSID;
var pwd  = process.env.WIFI_PASSWORD;


/* Test Case Module */
testCase('Wifi', function() {

	pre(function() {
	});

	testCase('#on(started)', function() {

		assertions('Return callback event when the wifi interface is started', function(done) {
			wifi = new (require('../src/wifi'))();
			this.timeout(10000);
			wifi.on('started', function() {
				console.log('onstarted');
				done();
			});

		});

	});

	testCase('#scan_request(), on(scan)', function() {

		assertions('Return callback event when the wifi scan request is performed', function(done) {
			this.timeout(10000);
			wifi.on('scan', function(list) {
				console.log('onscan');
				assert.isNotNull(list);
				done();
			});

			wifi.scan_request();
		});

	});

	testCase('#connect(), on(connected)', function() {


		assertions('Return callback event when the wifi interface is connected to AP', function(done) {

		if (!ssid || !pwd)
			this.skip();

			this.timeout(10000);
			wifi.on('connected', function() {
				console.log('onstarted');
				done();
			});

			wifi.disconnect();
			wifi.connect(ssid, pwd, true);

		});

	});


	post(function() {
	});

});
