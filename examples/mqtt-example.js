var mqtt = new(require('../src/mqtt.js'))();

var client_id = 'artik_mqtt_client';
var host = 'api.artik.cloud';
var port = 8883;
var akc_device_id = '< Artik Cloud Device ID >';
var akc_device_token = '< Artik Cloud Device token >';
var akc_msg = '{ "state": true }';  // Change for a message supported by 
                                    //  the device's manifest
var ca_cert = '/etc/ssl/certs/ca-bundle.crt';

mqtt.on('started', function() {
    console.log('on started');
    mqtt.create_client(client_id, akc_device_id, akc_device_token,
            false, 0, true);
    mqtt.tls_set(ca_cert);
    mqtt.connect_server(host, port);
});

mqtt.on('connected', function(result) {
    console.log('on connected: ' + result);

    /* Subscribe to receive actions ¨*/
    mqtt.subscribe(0, '/v1.1/actions/' + akc_device_id);

    /* Publish a message */
    mqtt.publish(0, false, '/v1.1/messages/' + akc_device_id, new Buffer(akc_msg));
});

mqtt.on('disconnected', function(result) {
    console.log('on disconnected: ' + result);
    mqtt.destroy_client();
    process.exit(0);
});

mqtt.on('published', function(mid) {
    console.log('on published: ' + mid);
});

mqtt.on('message', function(mid, topic, buffer, qos, retain) {
    console.log('Received message');
    console.log('\tmid: ' + mid);
    console.log('\tqos: ' + qos);
    console.log('\tretain: ' + retain);
    console.log('\ttopic: ' + topic);
    console.log('\tdata: ' + buffer);
});

mqtt.on('subscribed', function(mid) {
    console.log('on subscribed: ' + mid);
});

mqtt.on('unsubscribed', function(mid) {
    console.log('on unsubscribed: ' + mid);
});

process.on('SIGINT', function () {
    mqtt.disconnect();
});


