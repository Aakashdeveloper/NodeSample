let os = require('os');
console.log(os.platform())
console.log(os.arch())
console.log(os.cpus().length + " core")
console.log(os.uptime()+ " second")

let up_sec = os.uptime()
let up_min = up_sec/60;
let up_hour = up_min/60;

up_sec = Math.floor(up_sec)
up_min = Math.floor(up_min)
up_hour = Math.floor(up_hour)

up_sec = up_sec%60;
up_min = up_min%60;
up_hour = up_hour%60;

console.log("up time: "+up_hour+" Hours "+up_min+" minutes and "+up_sec+" seconds" )



