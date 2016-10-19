const artik = require('../lib/artik-sdk');

console.log("Request module sensor\n");
var module_sensor = artik.sensor();

var  list_of_device_sensor = module_sensor.list();

for (var i = 0; i < list_of_device_sensor.length; ++i)
    console.log("sensor[%s] of type(%s):index(%d)\n", list_of_device_sensor[i].get_name(), list_of_device_sensor[i].get_type(), list_of_device_sensor[i].get_index());

var acce_sensor = module_sensor.get_accelerometer_sensor(0);
var humid_sensor = module_sensor.get_humidity_sensor(0);
var photolight_sensor = module_sensor.get_light_sensor(0);
var envtemp_sensor = module_sensor.get_temperature_sensor(0);
var proximity_sensor = module_sensor.get_proximity_sensor(0);
var flame_sensor = module_sensor.get_flame_sensor(0);

var i = 0;

function push_timeout(a, b) {
   setTimeout(a, b);
}

function my_loop() {
    console.log("Request ACCELERO sensor\n");
    console.log("Function 'get_speed_x' : %d\n", acce_sensor.get_speed_x());
    console.log("Function 'get_speed_y' : %d\n", acce_sensor.get_speed_y());
    console.log("Function 'get_speed_z' : %d\n", acce_sensor.get_speed_z());
    console.log("Release ACCELERO sensor\n");

    console.log("Function 'get_wet' : %d%\n", humid_sensor.get_humidity());
    console.log("Release HUMIDITY sensor\n");

    console.log("Request LIGHT sensor\n");
    console.log("Function 'get_intensity' : %d%\n", photolight_sensor.get_intensity());
    console.log("Release PHOTO_LIGHT sensor\n");

    console.log("Request TEMP sensor\n");
    console.log("Function 'get_celcius' : %d°C\n", envtemp_sensor.get_celcius());
    console.log("Function 'get_fahrenheit' : %d°F\n", envtemp_sensor.get_fahrenheit());
    console.log("Release ENV_TEMP sensor\n");

    console.log("Request Proximity sensor\n");
    console.log("Function 'get_presence' : %d\n", proximity_sensor.get_presence());
    console.log("Release Proximity sensor\n");

    console.log("Request Flame sensor\n");
    console.log("Function 'get_signals' : %d\n", flame_sensor.get_signals());
    console.log("Release Flame sensor\n");

    if (i != -1 && i < 15) {
	push_timeout(my_loop, 1000);
	++i;
    }
}

process.on('SIGINT', function () {
    i = -1;
});

push_timeout(my_loop, 1000);
//delete acce_sensor;
//delete humid_sensor;
//delete photolight_sensor;
//delete envtemp_sensor;
//delete obastacle_sensor;
//delete obastacle_sensor;
