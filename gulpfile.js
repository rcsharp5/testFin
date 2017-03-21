var gulp = require('gulp');
var path = require("path");
var Finsemble = require('Finsemble');
var configPath = __dirname + '/configs/finConfig.json';
gulp.task('default',["devServer"], function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  return ;
});


gulp.task('devServer', function(done) {
 	var exec = require('child_process').exec;
	//This runs essentially runs 'PORT=80 node server/server.js'
	var serverExec = exec('node ' + path.join(__dirname, '/server/server.js'), { env: { 'PORT': 80, NODE_ENV: "dev" } });
	serverExec.stdout.on("data", function (data) {
		//Prints server output to your terminal.
		console.log("SERVER STDOUT:", data);
		if (data.indexOf("listening on port") > -1) {
			//Once the server is up and running, we launch openfin.
			Finsemble.launchFinsemble();
			done();
		}
	});
	//Prints server errors to your terminal.
	serverExec.stderr.on("data", function (data) {
		console.log('ERROR:' + data);
	});
});