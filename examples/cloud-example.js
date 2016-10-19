/* Cloud API Test Using Sync Calls */

const artik = require('../lib/artik-sdk');

var auth_token = '';
var device_id = '';
var user_id = '';
var message = '';
var action = '';

var cloud = artik.cloud(auth_token);


console.log("Get Current User Profile - response: " + cloud.get_current_user_profile());

console.log("Get Device Token - response: " + cloud.get_device_token(device_id));

console.log("Get Device without properties - response: " + cloud.get_device(device_id, false));

console.log("Get Device with properties - response: " + cloud.get_device(device_id, true));

console.log("Get User Device Types - response: " + cloud.get_user_device_types(100, false, 0, user_id));

console.log("Get User Devices without properties - response: " + cloud.get_user_devices(100, false, 0, user_id));

console.log("Get User Devices with properties - response: " + cloud.get_user_devices(100, true, 0, user_id));


console.log("Send action - response: " + cloud.send_action(device_id, action));

console.log("Send message - response: " + cloud.send_message(device_id, message));

console.log("Update Device Token - response: " + cloud.update_device_token(device_id));

console.log("Delete Device Token - response: " + cloud.delete_device_token(device_id));
