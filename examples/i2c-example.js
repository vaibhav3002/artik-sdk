/*
 * This test only works if the CW2015 Linux driver is unbound first:
 * artik520 : $ echo 1-0062 > /sys/bus/i2c/drivers/cw201x/unbind
 * artik1020: $ echo 0-0062 > /sys/bus/i2c/drivers/cw201x/unbind
 * artik710 : $ echo 8-0062 > /sys/bus/i2c/drivers/cw201x/unbind
 */



const artik = require('../lib/artik-sdk');

const name = artik.get_platform_name();

if(name == 'Artik 520') {
	console.log('Running I2C test on Artik 520');
	var cw2015 = artik.i2c(1, 2000, '8', 0x62);
} else if(name == 'Artik 1020') {
	console.log('Running I2C test on Artik 1020');
	var cw2015 = artik.i2c(0, 2000, '8', 0x62);
} else if(name == 'Artik 710') {
	console.log('Running I2C test on Artik 710');
	var cw2015 = artik.i2c(8, 2000, '8', 0x62);
}

if (cw2015.request()) {
  console.log('Failed to request cw2015');
} else {
  console.log('Version: ' + Buffer(cw2015.read_register(0, 1)).toString('hex'));
  var reg = cw2015.read_register(8, 1);
  console.log('Config: 0x' + Buffer(reg).toString('hex'));
  reg = new Buffer([0xff], 'hex');
  console.log('Writing 0x' + Buffer(reg).toString('hex') + ' to config register');
  cw2015.write_register(8, reg, 1);
  reg = cw2015.read_register(8, 1);
  console.log('Config: 0x' + Buffer(reg).toString('hex'));

  cw2015.release();
}
