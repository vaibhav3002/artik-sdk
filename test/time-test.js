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
var module   = artik.time();
var platform, format_date, time_zone;
var end      = 1;
var valtime  = 0;
var hostname = "0.pool.ntp.org";
var platform, str;

/* Test Case Module */
testCase('Time', function() {

	pre(function() {
		const name = artik.get_platform_name();

		if(name == 'Artik 520') {
			platform = require('../src/platform/artik520');
			format_date = platform.ARTIK_A5_TIME.DFORMAT_DATE;
			time_zone = platform.ARTIK_A5_TIME.ZONE.GMT2;
			str = module.get_time_str(platform.ARTIK_A5_TIME.DFORMAT_DATE, platform.ARTIK_A5_TIME.ZONE.GMT2);
		} else if(name == 'Artik 1020') {
			platform = require('../src/platform/artik1020');
			format_date = platform.ARTIK_A10_TIME.DFORMAT_DATE;
			time_zone = platform.ARTIK_A10_TIME.ZONE.GMT2;
			str = module.get_time_str(platform.ARTIK_A10_TIME.DFORMAT_DATE, platform.ARTIK_A10_TIME.ZONE.GMT2);
		} else if(name == 'Artik 710') {
			platform = require('../src/platform/artik710');
			format_date = platform.ARTIK_A710_TIME.DFORMAT_DATE;
			time_zone = platform.ARTIK_A710_TIME.ZONE.GMT2;
			str = module.get_time_str(platform.ARTIK_A710_TIME.DFORMAT_DATE, platform.ARTIK_A710_TIME.ZONE.GMT2);
		}

		exec("systemctl stop systemd-timesyncd.service");

	});

	testCase('#get_time()', function() {

		assertions('Returns the current time', function(done) {
			var new_date = module.get_time();
			console.log(new_date.toUTCString());
			assert.equal(new_date.toUTCString(), (new Date()).toUTCString());
			done();
		});

	});

	testCase('#set_time()', function() {

		assertions('Sets the system time', function(done) {
			var new_date  = module.get_time();
			console.log("Init Time " + new_date.toUTCString());
			new_date.setUTCSeconds(new_date.getUTCSeconds()+120);
			module.set_time(new_date);
			console.log("New time " + module.get_time().toUTCString());
			var diff = module.get_time().getUTCSeconds() - new_date.getUTCSeconds();
			console.log(diff);
			assert.equal(module.get_time().toUTCString(), new_date.toUTCString());
			done();
		});

	});

	testCase('#create_alarm_date()', function() {

		assertions('create alarm ', function(done) {

			this.timeout(10000);

			console.log("Set an alarm event in 5 seconds");
			var new_date = module.get_time();
			new_date.setUTCSeconds(new_date.getUTCSeconds()+5);

			module.create_alarm_date(time_zone, new_date, function() {
				console.log("Alarm Event");
				done();
			});

		});

	});

	testCase('#sync_ntp()', function() {


		pre(function() {

		});

		assertions('Syncs time with the NTP server', function() {

			var new_date  = module.get_time();
			new_date.setUTCSeconds(new_date.getUTCSeconds()+120);
			module.set_time(new_date);
			ret = module.sync_ntp(hostname);
			assert.equal((new Date()).toUTCString(), module.get_time().toUTCString());
		});

	});



});
