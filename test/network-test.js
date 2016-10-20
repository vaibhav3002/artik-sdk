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
var network = artik.network();


/* Test Case Module */
testCase('Network', function() {

	pre(function() {

	});

	testCase('#get_online_status()', function() {

		postEach('Enabling Wifi', function(done){
			this.timeout(15000);
			exec("ifconfig wlan0 up; sleep 1; pkill dhclient; sleep 1; dhclient wlan0;sleep 1");
			done();
		});


		assertions('Online Status - Should return 1 when it is online', function(done) {
			this.timeout(2000);
			network.get_online_status(function(response) {
				console.log("Response: " + response);
				assert.equal(JSON.parse(response).online_status, 1);
				done();
			});
		});

		assertions('Online Status - Should return 0 when it is offline', function(done) {

			console.log("Disabling WIFI Adapter");
			this.timeout(2000);
			exec("ifconfig wlan0 down");
			console.log("Check Online Status");

			network.get_online_status(function(response) {
				console.log("Response: " + response);
				assert.equal(JSON.parse(response).online_status, 0);
				exec("ifconfig wlan0 up; sleep 1; pkill dhclient; sleep 1; dhclient wlan0");
				done();
			});


		});

	});

	testCase('#get_current_public_ip()', function() {

		postEach('Enabling Wifi', function(done) {
			this.timeout(15000);
			exec("ifconfig wlan0 up; sleep 1; pkill dhclient; sleep 1; dhclient wlan0;sleep 1");
			done();
		});

		assertions('Get Current Public Ip - Should return a valid IP', function(done) {
				this.timeout(2000);
				var ip = network.get_current_public_ip();
				console.log("IP Address: " + ip);
				assert( validator.isIP(ip), true );
				done();
		});


		assertions('Get Current Public Ip - Should return null when there is no connectivity', function(done) {
				exec("ifconfig wlan0 down");
				try {
					var ip = network.get_current_public_ip();
					console.log("IP Address: " + ip);
					assert( ip, null );
				} catch (e) {
					console.log("Exception caught while getting ip");
					assert(false);
				}
				done();
		});


	});


});
