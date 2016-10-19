/* Global Include */
var testCase   = require('mocha').describe;
var pre        = require('mocha').before;
var assertions = require('mocha').it;
var assert     = require('chai').assert;
var validator  = require('validator');
var artik      = require('../lib/artik-sdk');


var network;

testCase('Network', function() {
	pre(function() {
		network = artik.network();
	});

	testCase('#get_online_status()', function() {
		assertions('Online Status - Should return 1 when it is online', function(done) {
			network.get_online_status(function(response) {
				console.log("Response: " + response);
				assert.equal(JSON.parse(response).online_status, 1);
				done();
			});
		});
	});

	testCase('#get_current_public_ip()', function() {
		assertions('Get Current Public Ip - Should return a valid IP', function(done) {
				var ip = network.get_current_public_ip();
				console.log("IP Address: " + ip);
				assert( validator.isIP(ip), true );
				done();
			});
		});
});
