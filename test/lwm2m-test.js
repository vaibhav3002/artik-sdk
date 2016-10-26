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
var lwm2m = new(require('../src/lwm2m.js'))();

var server_id = 123;
var server_uri = 'coaps://coaps-api.artik.cloud:5686';
var lifetime = 30;
var dtls_psk_id = process.env.DEVICE_ID;
var dtls_psk_key = process.env.DEVICE_TOKEN;

var objects = {
    device: {
        manufacturer: 'Samsung',
        model: 'Artik',
        serial: '1234567890',
        fwVersion: '1.0',
        hwVersion: '1.0',
        swVersion: '1.0',
        deviceType: 'Hub',
        powerSource: 0,
        powerVoltage: 5000,
        powerCurrent: 1500,
        batteryLevel: 100,
        memoryTotal: 1000000,
        memoryFree: 200000,
        timeZone: 'Europe/Paris',
        utcOffset: '+01:00',
        bindingModes: 'U'
    }
};


/* Test Case Module */
testCase('Lwm2m', function() {

	pre(function() {
		lwm2m.on('started', function() {
		});
	});

	testCase('client_connect()', function() {
		assertions('Connect to the LWM2M Server', function(done) {
			lwm2m.client_connect(server_id, server_uri, dtls_psk_id, lifetime, JSON.stringify(objects), dtls_psk_id, dtls_psk_key);
			done();
		});
	});

	testCase('client_read_resource()', function() {
		assertions('Reads the resource', function(done) {
            var buf = lwm2m.client_read_resource("/3/0/0");
			assert.equal(buf, "Samsung");
			done();
		});
	});

	testCase('client_write_resource()', function() {
		assertions('Write the resource', function(done) {
			var resource_uri = "/3/0/3";
            var buf = new Buffer("2.0");
            lwm2m.client_write_resource(resource_uri, buf);
            var reg = lwm2m.client_read_resource(resource_uri);
			assert.equal(reg, "2.0");
			done();
		});
	});


	post(function() {
	});

});
