var websocket = require('../src/websocket');
var artik = require('../lib/artik-sdk');

var auth_token = '';
var device_id = '';
var message_data = '';
var host = "api.artik.cloud"; 
var uri = "/v1.1/websocket?ack=true";
var port = 443;
var ssl_connection = 2;
var use_se = false;
var register_message = '{"sdid":"' + device_id + '","Authorization":"bearer ' + auth_token + '","type":"register"}';
var test_send_message = '{\"data\": ' + message_data + ',"sdid": "' + device_id +  '","type": "message"}';

var conn = new websocket(host, uri, port, ssl_connection, use_se);

conn.open_stream();

conn.on('connected', function(result) {
	console.log("Connect result: " + result);
	conn.write_stream(register_message);
});

conn.on('receive', function(message) {
        console.log("received: " + message);
        conn.write_stream(test_send_message);
});

process.on('SIGINT', function () {
    console.log("Close stream");
    conn.close_stream();
    process.exit(0);
});


