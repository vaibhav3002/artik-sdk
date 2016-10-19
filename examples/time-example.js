
const artik = require('../lib/artik-sdk');
const a5 = require('../src/platform/artik520');

var module = artik.time();
var alarm = null;

var end = 1;
var valtime = 0;

var hostname = "fr.pool.ntp.org";

process.on('SIGINT', () => {
    console.log("Cancel alarm callback");
    if (alarm)
	alarm.cancel();
});


var loop = () => {
    var str = module.get_time_str(a5.ARTIK_A5_TIME.DFORMAT_DATE, a5.ARTIK_A5_TIME.ZONE.GMT2);

    console.log("Launch time : %s", str);

    delete str;

    var new_date = module.get_time();
    var b = new Date();
    console.log("get a raw date : "+new_date+" -- "+new_date.toUTCString()+" && nativ "+b);
    console.log("Did you manage the set time ? "+module.set_time(new_date));
    new_date = module.get_time();
    new_date.setUTCSeconds(new_date.getUTCSeconds()+5);
    try {
	alarm = module.create_alarm_date(a5.ARTIK_A5_TIME.ZONE.GMT2, new_date, function() {
	    console.log("hello call at the end of alarm delay.");
	});
	console.log("the alarm : "+alarm);
    }
    catch (err) {
	console.log("[ERROR] create_alarm : "+err);
	process.kill(process.pid);
    }
    console.log("get cust a raw date : "+new_date);
    while (end) {
	valtime = alarm.get_delay();
	if (end != 0 && end != valtime) {
	    end = valtime;    		
	    console.log("end = "+end+" seconds before end");
	}
    }
    
    clearInterval(loop);    
    console.log("Release time ");
}


loop();
var ret;
ret = module.sync_ntp(hostname);
console.log("sync_ntp result: " + ret);
