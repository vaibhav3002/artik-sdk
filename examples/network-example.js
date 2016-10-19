const artik = require('../lib/artik-sdk');

var network = artik.network();

console.log("Your IP is " + network.get_current_public_ip());

network.get_online_status(function(response) {
	console.log("Status : " + JSON.parse(response).online_status);
});
