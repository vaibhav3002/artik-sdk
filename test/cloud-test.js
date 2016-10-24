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
var auth_token = process.env.AUTH_TOKEN;
var device_id  = process.env.DEVICE_ID;
var message    = process.env.MESSAGE;
var action     = process.env.ACTION;
var cloud      = artik.cloud(auth_token);
var user_id;


/* Test Case Module */
testCase('Cloud', function() {

	this.timeout(5000);

	pre(function() {
	});

	testCase('#get_current_user_profile()', function() {

		assertions('Get User Profile - Should return Artik Cloud User profile', function(done) {
			if (!auth_token)
				this.skip();

			var response = cloud.get_current_user_profile();
			assert.notInclude(response, "error");
			user_id = JSON.parse(response).data.id;
			done();
		});

		assertions('Get User Profile Callback - Returns user profile response in the callback', function(done) {

			if (!auth_token)
				this.skip();

			cloud.get_current_user_profile( function(response) {
				console.log(response);
				assert.notInclude( response, "error");
				done();
			});
		});
	});

	testCase('#get_device_token()', function() {

		assertions('Get Device Token - Should return the artik cloud device token ', function(done) {

			if (!auth_token || !device_id)
				this.skip();

			assert.notInclude(cloud.get_device_token(device_id), "error");
			done();
		});

		assertions('Get Device Token Callback - Should return the callback with artik cloud device token', function(done) {

			if (!auth_token || !device_id)
				this.skip();

			cloud.get_device_token(device_id, function(response) {
				console.log(response);
				assert.notInclude(response, "error");
				done();
			});
		});

	});

	testCase('#get_device()', function() {

		assertions('Get Device without properties ', function(done) {

			if (!auth_token || !device_id)
				this.skip();
			assert.notInclude(cloud.get_device(device_id, false), "error");
			done();
		});

		assertions('Get Device with properties ', function(done) {

			if (!auth_token || !device_id)
				this.skip();

			assert.notInclude(cloud.get_device(device_id, true), "error");
			done();
		});

		assertions('Get Device without properties - Calllback', function(done) {

			if (!auth_token || !device_id)
				this.skip();

			cloud.get_device(device_id, false, function(response) {
				console.log(response);
				assert.notInclude(response, "error");
				done();
			});
		});

		assertions('Get Device with properties - Calllback', function(done) {

			if (!auth_token || !device_id)
				this.skip();

			cloud.get_device(device_id, true, function(response) {
				console.log(response);
				assert.notInclude(response, "error");
				done();
			});
		});

	});

	testCase('#get_user_device_types()', function() {

		assertions('Get User Device Types ', function(done) {

			if (!auth_token || !user_id)
				this.skip();
			assert.notInclude(cloud.get_user_device_types(100, false, 0, user_id), "error");
			done();
		});

		assertions('Get User Device Types - Calllback', function(done) {

			if (!auth_token || !user_id)
				this.skip();

			cloud.get_user_device_types(100, false, 0, user_id, function(response) {
				console.log(response);
				assert.notInclude(response, "error");
				done();
			});
		});

	});

	testCase('#send_action()', function() {

		assertions('Send Actions to a device via Cloud', function(done) {

			if (!auth_token || !device_id || !action)
				this.skip();

			assert.notInclude(cloud.send_action(device_id, action), "error");
			done();

		});

		assertions('Send Actions to a device via Cloud - Calllback', function(done) {

			if (!auth_token || !device_id ||  !action)
				this.skip();

			cloud.get_send_action(device_id,action, function(response) {
				console.log(response);
				assert.notInclude(response, "error");
				done();
			});
		});

	});


	testCase('#send_message()', function() {

		assertions('Send Messages to Cloud from Device ', function(done) {

			if (!auth_token || !device_id || !message)
				this.skip();

			assert.notInclude(cloud.send_message(device_id, message), "error");
			done();

		});

		assertions('Send Messages to Cloud from Device - Calllback', function(done) {

			if (!auth_token || !device_id ||  !message)
				this.skip();

			cloud.get_send_message(device_id, message, function(response) {
				console.log(response);
				assert.notInclude(response, "error");
				done();
			});
		});

	});

	testCase('#delete_device_token()', function() {

		assertions('Delete Device Token', function(done) {

			if (!auth_token || !device_id)
				this.skip();

			assert.notInclude(cloud.delete_device_token(device_id), "error");
			done();

		});

		assertions('Delete Device Token - Calllback', function(done) {

			if (!auth_token || !device_id )
				this.skip();

			cloud.delete_device_token(device_id, function(response) {
				console.log(response);
				assert.notInclude(response, "error");
				done();
			});
		});

	});

	testCase('#update_device_token()', function() {

		assertions('Update Device Token', function(done) {

			if (!auth_token || !device_id)
				this.skip();

			assert.notInclude(cloud.update_device_token(device_id), "error");
			done();

		});

		assertions('Update Device Token - Calllback', function(done) {

			if (!auth_token || !device_id )
				this.skip();

			cloud.update_device_token(device_id, function(response) {
				console.log(response);
				assert.notInclude(response, "error");
				done();
			});
		});

	});



});
