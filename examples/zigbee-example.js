const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

var zb = new (require('../src/zigbee'))();
var join_duration = 0x3C; //60 sec
var zb_device_type = []; //get zigbee type
var input_lenght = process.argv.length;

for(i=2;i<input_lenght;i++){
  switch(process.argv[i]){
  	case 'ON_OFF_SWITCH' :
		zb_device_type.push(zb.ON_OFF_SWITCH);
		break;
	case 'LEVEL_CONTROL_SWITCH' :
		zb_device_type.push(zb.LEVEL_CONTROL_SWITCH);
		break;
  	case 'ON_OFF_LIGHT' :
		zb_device_type.push(zb.ON_OFF_LIGHT);
		break;
	case 'DIMMABLE_LIGHT' :
		zb_device_type.push(zb.DIMMABLE_LIGHT);
		break;
	default:
		zb_device_type.push(zb.ON_OFF_LIGHT);
		break
  	}
}

var usage_print = function(){
	console.log("Usage");
	console.log("h : usage");
	console.log("1 : Easy network form");
	console.log("2 : Network leave");
	console.log("3 : Network find & join");
	console.log("4 : Get my network status");
	console.log("5 : On/Off");
	console.log("6 : Manual form");
	console.log("Ctrl+C : quit\n");
}

var easy_device_onoff = function(){
	var data = zb.device_find_by_cluster(zb.ZCL_ON_OFF_CLUSTER_ID);
	try {
		var result =JSON.parse(data);
		var count = result.length;
		for(i=0;i<count;i++){
			var array = [];
			var endpoint = result[i];
			array = array.concat(endpoint.endpoint_id);
			array = array.concat(endpoint.device_id);
			array = array.concat(endpoint.server_cluster);
			array = array.concat(endpoint.client_cluster);
			console.log('on_off send :' + zb.onoff_command(array, zb.ZIGBEE_ONOFF_TOGGLE));
	    }
	} catch (e) {
    	console.log(data);
	}
}

var manual_form_request = function(){
	var channel = 25;
	var tx_power = zb.ZIGBEE_TX_POWER_8;
	var pan_id = 0x1234;

	var network =[channel, tx_power, pan_id];
	console.log(zb.network_form_manually(network));
	console.log('Join duration set is :' + zb.network_permitjoin(join_duration));
}

zb.on('started', function() {
	zb.initialize(zb_device_type);
	console.log(zb.network_start());
});
zb.on('event', function(data) {
	try{
		var result = JSON.parse(data);

		var response_type = result[0].response_type;
		if(response_type == 'ZIGBEE_RESPONSE_NOTIFICATION')
			console.log(result[1].noti_type);
		if(response_type == 'ZIGBEE_RESPONSE_NETWORK_NOTIFICATION'){
			if(result[1].network_type == 'ZIGBEE_NETWORK_FIND_FORM'){
				console.log('Join duration set is :' + zb.network_permitjoin(join_duration));
				console.log('Network Form finished');
			}
			else
				console.log(result[1].network_type);
		}
		if(response_type == 'ZIGBEE_RESPONSE_ONOFF_INFO'){
			console.log("ZIGBEE ONOFF endpoint [%d] command [%d]: [%d] -> [%d]",
									result[1].endpoint_id, result[1].command,
									result[1].prev_value, result[1].curr_value);
			var onoff_result = zb.onoff_get_value(result[1].endpoint_id);
			if(onoff_result == zb.ZIGBEE_ONOFF_ON)
				console.log('ZIGBEE ONOFF Get Value [ON]');
			else if(onoff_result == zb.ZIGBEE_ONOFF_OFF)
				console.log('ZIGBEE ONOFF Get Value [OFF]');
			else
				console.log('ZIGBEE ONOFF Get Value [ERR]');
		}
	} catch(e){
		console.log(data);
	}
});

rl.setPrompt('Zigbee> ');
rl.prompt();

rl.on('line', (line) => {
  switch(line.trim()) {
    case 'h':
		usage_print();
      	break;
	case '1':
		console.log('Wait for network form finish message');
		zb.network_form();
		break;
	case '2':
		console.log(zb.network_leave());
		break;
	case '3':
		console.log('Wait for success or fail message');
		zb.network_join();
		break;
	case '4':
		console.log(zb.network_request_my_network_status());
		console.log(zb.device_request_my_node_type());
		break;
	case '5':
		easy_device_onoff();
		break;
	case '6':
		manual_form_request();
		break;
    default:
      console.log('Please enter number or h' + line.trim());
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Bye Bye!');
  process.exit(0);
});
