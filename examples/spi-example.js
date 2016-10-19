const artik = require('../lib/artik-sdk');

const name = artik.get_platform_name();

if(name == 'Artik 520') {
	console.log('Running SPI test on Artik 520');
	const a5 = require('../src/platform/artik520');
	var spi = artik.spi(a5.ARTIK_A5_SPI.BUS.BUS1,
					  a5.ARTIK_A5_SPI.CS.CS0,
					  a5.ARTIK_A5_SPI.MODE.MODE0,
					  a5.ARTIK_A5_SPI.BITS.BITS8,
					  500000);
} else if(name == 'Artik 1020') {
	console.log('Running SPI test on Artik 1020');
	const a10 = require('../src/platform/artik1020');
	var spi = artik.spi(a10.ARTIK_A10_SPI.BUS.BUS1,
						  a10.ARTIK_A10_SPI.CS.CS0,
						  a10.ARTIK_A10_SPI.MODE.MODE0,
						  a10.ARTIK_A10_SPI.BITS.BITS8,
						  500000);
} else if(name == 'Artik 710') {
	console.log('Running SPI test on Artik 710');
	const a7 = require('../src/platform/artik710.js');
	var spi = artik.spi(a7.ARTIK_A710_SPI.BUS.BUS0,
						  a7.ARTIK_A710_SPI.CS.CS0,
						  a7.ARTIK_A710_SPI.MODE.MODE0,
						  a7.ARTIK_A710_SPI.BITS.BITS8,
						  500000);
}


if (spi.request()) {
	console.log('Failed to request spi');
} else {

	console.log('Starting Loopback Test...Make sure you have connected MOSI and MISO with a wire');
	var tx_buf = new Buffer([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9] , 'hex');
	var rx_buf = new Buffer([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0],  'hex');

	/* Transfer Data */
	console.log("Sending " + tx_buf.length + " bytes on the spi bus");
	rx_buf = spi.read_write(tx_buf, tx_buf.length);

	/* Compare the received data */
	if (tx_buf.equals(rx_buf))
		console.log("SPI Test Passed");
	else
		console.log("SPI Test Failed");

	spi.release();
}
