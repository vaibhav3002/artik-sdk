var gpio  = require('../src/gpio');
var artik = require('../lib/artik-sdk');
var button, red, green, blue;

const name = artik.get_platform_name();

if(name == 'Artik 520') {
	console.log('Running GPIO test on Artik 520');
	const a5 = require('../src/platform/artik520');
	red = new gpio(a5.ARTIK_A5_GPIO_XEINT0, 'red', 'out', 'digital', 'none', 0);
	green = new gpio(a5.ARTIK_A5_GPIO_XEINT1, 'green', 'out', 'digital', 'none', 0);
	blue = new gpio(a5.ARTIK_A5_GPIO_XEINT2, 'blue', 'out', 'digital', 'none', 0);
	button = new gpio(a5.ARTIK_A5_GPIO_XEINT3, 'button', 'in' , 'digital', 'both', 0);
} else if(name == 'Artik 1020') {
	console.log('Running GPIO test on Artik 1020');
	const a10 = require('../src/platform/artik1020');
	red = new gpio(a10.ARTIK_A10_GPIO_XEINT0, 'red', 'out', 'digital', 'none', 0);
	green = new gpio(a10.ARTIK_A10_GPIO_XEINT1, 'green', 'out', 'digital', 'none', 0);
	blue = new gpio(a10.ARTIK_A10_GPIO_XEINT2, 'blue', 'out', 'digital', 'none', 0);
	button = new gpio(a10.ARTIK_A10_GPIO_XEINT3, 'button', 'in' , 'digital', 'both', 0);
} else if(name == 'Artik 710') {
	console.log('Running GPIO test on Artik 710');
	const a7 = require('../src/platform/artik710');
	red = new gpio(a7.ARTIK_A710_GPIO_GPIO0, 'red', 'out', 'digital', 'none', 0);
	green = new gpio(a7.ARTIK_A710_GPIO_GPIO1, 'green', 'out', 'digital', 'none', 0);
	blue = new gpio(a7.ARTIK_A710_GPIO_GPIO2, 'blue', 'out', 'digital', 'none', 0);
	button = new gpio(a7.ARTIK_A710_GPIO_GPIO4, 'button', 'in' , 'digital', 'both', 0);
}

button.on('changed', function(val) {
	console.log("Button state: " + val);
});

button.request();

var color = 0;

console.log('Launch periodic interval');

setInterval(function () {

	console.log('Setting color');

	red.request();
	red.write(color & 1);
	red.release();

	green.request();
	green.write(color & 2);
	green.release();

	blue.request();
	blue.write(color & 4);
	blue.release();

	color = (color + 1) % 8;

},1000);

process.on('SIGINT', function () {
	console.log('exiting test');
	button.release();
	process.exit(0);
});


