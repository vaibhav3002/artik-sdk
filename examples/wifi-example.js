var wifi = new (require('../src/wifi'))();

var ssid = '<enter a SSID here>';
var pwd = '<passphrase of the SSID>';

wifi.on('started', function() {
	console.log('onstarted');
	console.log(wifi.get_scan_result());

	wifi.scan_request();
});

wifi.on('connected', function() {
	console.log('on connect');
});

wifi.on('scan', function(list) {
	console.log('onscan');
	console.log(list);
	wifi.disconnect();
	wifi.connect(ssid, pwd, true);
});

process.on('SIGINT', function () {
    process.exit(0);
});
