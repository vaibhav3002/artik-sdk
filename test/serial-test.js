/* Global Includes */
var testCase     = require('mocha').describe;
var pre          = require('mocha').before;
var preEach      = require('mocha').beforeEach;
var post         = require('mocha').after;
var postEach     = require('mocha').afterEach;
var assertions   = require('mocha').it;
var assert       = require('chai').assert;
var validator    = require('validator');
var exec         = require('child_process').execSync;
var artik        = require('../lib/artik-sdk');
var artik_serial = require('../src/serial');


/* Test Specific Includes */
var loopback;

/* Test Case Module */
testCase('Serial', function() {

	pre(function() {
		const name = artik.get_platform_name();
		if(name == 'Artik 520') {
			console.log("Running SERIAL test on Artik 520");
			const a5 = require('../src/platform/artik520');
			loopback = new artik_serial(a5.ARTIK_A5_SERIAL.SCOM.XSCOM4,
											"serial-loopback",
											a5.ARTIK_A5_SERIAL.BAUD.B115200,
											a5.ARTIK_A5_SERIAL.PARITY.NONE,
											a5.ARTIK_A5_SERIAL.DATA.BIT8,
											a5.ARTIK_A5_SERIAL.STOP.BIT1,
											a5.ARTIK_A5_SERIAL.FLOWCTRL.NONE);
		} else if(name == 'Artik 1020') {
			console.log("Running SERIAL test on Artik 1020");
			const a10 = require('../src/platform/artik1020');
			loopback = new artik_serial(a10.ARTIK_A10_SERIAL.SCOM.XSCOM2,
											"serial-loopback",
											a10.ARTIK_A10_SERIAL.BAUD.B115200,
											a10.ARTIK_A10_SERIAL.PARITY.NONE,
											a10.ARTIK_A10_SERIAL.DATA.BIT8,
											a10.ARTIK_A10_SERIAL.STOP.BIT1,
											a10.ARTIK_A10_SERIAL.FLOWCTRL.NONE);
		} else if(name == 'Artik 710') {
			console.log("Running SERIAL test on Artik 710");
			const a7 = require('../src/platform/artik710');
			loopback = new artik_serial(a7.ARTIK_A710_SERIAL.UART.UART0,
											"serial-loopback",
											a7.ARTIK_A710_SERIAL.BAUD.B115200,
											a7.ARTIK_A710_SERIAL.PARITY.NONE,
											a7.ARTIK_A710_SERIAL.DATA.BIT8,
											a7.ARTIK_A710_SERIAL.STOP.BIT1,
											a7.ARTIK_A710_SERIAL.FLOWCTRL.NONE);
		}
		loopback.request();

	});

	testCase('#write(), read()', function() {

		assertions('Write the data to serial loopback port and read it back', function(done) {

			this.timeout(5000);

			console.log('Starting Loopback Test...Make sure you have connected the Tx and Rx of the Serial Port with a wire');
			var tx_buf = new Buffer([0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff], 'hex');

			/* Transfer Data */
			loopback.on('read', function(data) {
				var rx_buf = new Buffer(data, 'hex');
				assert.equal(tx_buf.length, rx_buf.length);
				assert.equal(tx_buf.equals(rx_buf), true);
				done();
			});

			console.log("Sending " + tx_buf.length + " bytes on the serial port");
			var written = loopback.write(tx_buf);
			console.log("Wrote " + written + " bytes");

		});

	});

	post(function() {
		loopback.release();
	});

});
