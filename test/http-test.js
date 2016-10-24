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
var http = artik.http();
var headers = [
	"user-agent", "Artik browser",
	"Accept-Language", "en-US,en;q=0.8"
];
var body = "name=samsung&project=artik";


/* Test Case Module */
testCase('HTTP', function() {

	pre(function() {
	});

	testCase('#post()', function() {

		assertions('HTTP POST - Should return valid response if the URL is valid', function(done) {
			http.post("https://httpbin.org/post", headers, body, function(response, status) {
				console.log("POST - status " + status + " - response: " + response);
				assert.equal(status, 200);
				assert.isNotNull(response);
				done();
			});

		});

		assertions('HTTP POST - Should return HTTP 404 response if the URL is invalid', function(done) {
			http.post("https://httpbin.org/postNull", headers, body, function(response, status) {
				console.log("POST - status " + status + " - response: " + response);
				assert.equal(status, 404);
				done();
			});

		});

	});

	testCase('#put()', function() {

		assertions('HTTP PUT - Should return valid response if the URL is valid', function(done) {
			http.put("https://httpbin.org/put", headers, body, function(response, status) {
				console.log("PUT - status " + status + " - response: " + response);
				assert.equal(status, 200);
				assert.isNotNull(response);
				done();
			});
		});

	});

	testCase('#del()', function() {
		assertions('HTTP Delete - Should return valid response if the URL is valid', function(done) {

			http.del("https://httpbin.org/delete", headers, function(response, status) {
				console.log("DELETE - status " + status + " - response: " + response);
				assert.equal(status, 200);
				assert.isNotNull(response);
				done();
			});

		});
	});

	testCase('#get()', function() {

		assertions('HTTP Get - Should return valid response if the URL is valid', function(done) {

			http.get("https://httpbin.org/get", headers, function(response, status) {
				console.log("GET - status " + status + " - response: " + response);
				assert.equal(status, 200);
				assert.isNotNull(response);
				done();
			});

		});

		assertions('HTTP Get - Should return HTTP 404 response if the URL is invalid', function(done) {

			http.get("https://httpbin.org/getNull", headers, function(response, status) {
				console.log("GET - status " + status + " - response: " + response);
				assert.equal(status, 404);
				done();
			});

		});

		assertions('HTTP Get - Should return valid response if the network is down', function(done) {

			this.timeout(10000);

			console.log("Disabling Wifi");
			exec("ifconfig wlan0 down");

			http.get("https://httpbin.org/get", headers, function(response, status) {
				console.log("GET - status " + status + " - response: " + response);
				assert.equal(status, 200);
				exec("ifconfig wlan0 up; sleep 1; pkill dhclient; sleep 1; dhclient wlan0");
				done();
			});

		});

	});


});
