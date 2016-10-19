const artik = require('../lib/artik-sdk');

const name = artik.get_platform_name();

if(name == 'Artik 520') {
	console.log('Running PWM test on Artik 520');
	const a5 = require('../src/platform/artik520');
	var pwm = artik.pwm(a5.ARTIK_A5_PWM.PWMIO.XPWMIO1, "pwm-test", 400000, a5.ARTIK_A5_PWM.POLR.NORMAL, 200000);
} else if(name == 'Artik 1020') {
	console.log('Running PWM test on Artik 1020');
	const a10 = require('../src/platform/artik1020');
	var pwm = artik.pwm(a10.ARTIK_A10_PWM.PWMIO.XPWMIO1, "pwm-test", 400000, a10.ARTIK_A10_PWM.POLR.NORMAL, 200000);
} else if(name == 'Artik 710') {
	console.log('Running PWM test on Artik 710');
	const a7 = require('../src/platform/artik710');
	var pwm = artik.pwm(a7.ARTIK_A710_PWM.PWMIO.XPWMIO1, "pwm-test", 400000, a7.ARTIK_A710_PWM.POLR.NORMAL, 200000);
}

var dc = 150000;

pwm.request();
console.log("[%s] :  request.", pwm.get_name());

var intervalFunc = setInterval(function() {
    if (dc >= 400000)
		dc = 150000;
    console.log("[%s] :  Change duty cycle .", pwm.get_name());
    pwm.set_duty_cycle(dc);
    dc += 50000;
}, 800);


process.on('SIGINT', function () {
    pwm.release();
    console.log("[%s] :  release.", pwm.get_name());
    clearInterval(intervalFunc);
    process.kill(process.pid);
});

