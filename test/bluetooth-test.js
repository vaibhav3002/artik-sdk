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
var bt;
var remote_addr = process.env.BT_ADDR;


/* Test Case Module */
testCase('Bluetooth', function() {

	pre(function() {
	});

	testCase('#on(started)', function() {

		assertions('Return callback event when the bluetooth interface is started', function(done) {
			bt = new (require('../src/bluetooth'))();
			this.timeout(10000);
			bt.on('started', function() {
				console.log('onstarted');
				done();
			});

		});

	});

	testCase('#start_scan(), on(scan)', function() {

		assertions('Return callback event when the bluetooth scan request is performed', function(done) {
			this.timeout(20000);

			if (!remote_addr || !remote_addr.length)
				this.skip();

			bt.on('scan', function(device) {
				console.log('scanned');
				assert.isNotNull(device);
				device = JSON.parse(device);
				if (device.address == remote_addr) {
					console.log("Remote device found");
					bt.stop_scan();
					done();
				}
			});

			bt.start_scan();
		});

	});

	testCase('#start_bond(), on(bond)', function() {

		assertions('Return callback event when the bluetooth interface is bonded to remote device', function(done) {

		    if (!remote_addr || !remote_addr.length)
			    this.skip();

			this.timeout(10000);
			bt.on('bond', function(paired) {
				console.log('bonded');
				done();
			});
			bt.start_bond(remote_addr);
		});

	});

	testCase('#connect(), on(connect)', function() {

		assertions('Return callback event when the bluetooth interface is connected to remote device', function(done) {

		    if (!remote_addr || !remote_addr.length)
			    this.skip();

			this.timeout(10000);
			bt.on('connect', function(connected) {
				console.log('connected');
				done();
			});

			bt.connect(remote_addr);
		});

	});

	post(function() {
	});

});
