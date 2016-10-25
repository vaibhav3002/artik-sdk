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
var pwm;
var dc = 150000;

/* Test Case Module */
testCase('PWM', function() {

	pre(function() {
		const name = artik.get_platform_name();

		if(name == 'Artik 520') {
			console.log('Running PWM test on Artik 520');
			const a5 = require('../src/platform/artik520');
			pwm = artik.pwm(a5.ARTIK_A5_PWM.PWMIO.XPWMIO1, "pwm-test", 400000, a5.ARTIK_A5_PWM.POLR.NORMAL, 200000);
		} else if(name == 'Artik 1020') {
			console.log('Running PWM test on Artik 1020');
			const a10 = require('../src/platform/artik1020');
			pwm = artik.pwm(a10.ARTIK_A10_PWM.PWMIO.XPWMIO1, "pwm-test", 400000, a10.ARTIK_A10_PWM.POLR.NORMAL, 200000);
		} else if(name == 'Artik 710') {
			console.log('Running PWM test on Artik 710');
			const a7 = require('../src/platform/artik710');
			pwm = artik.pwm(a7.ARTIK_A710_PWM.PWMIO.XPWMIO1, "pwm-test", 400000, a7.ARTIK_A710_PWM.POLR.NORMAL, 200000);
		}
		pwm.request();
	});

	testCase('#set_duty_cycle()', function() {

		assertions('Set the duty cylcle on the PWM port', function() {
			for (dc = 150000; dc < 400000; dc++)
				pwm.set_duty_cycle(dc);
		});

	});

	post(function() {
		pwm.release();
	});

});
