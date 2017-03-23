var gulp = require('gulp');
var path = require("path");
var gulpWebpack = require('gulp-webpack');
var webpack = require("webpack");
var del = require('del');

var  Finsemble = require(path.join("finsemble/libs/Server.js"));
var configPath = __dirname + '/configs/finConfig.json';
gulp.task('default',["devServer"], function() {
  return ;
});

function copyStaticFiles() {
	
	return gulp.src([path.join(__dirname, '/src/services/**/*'),
	
	//ignores the js files in service, but copies over the html files.
		path.join('!' + __dirname, '/src/services/**/*.js')])
	//don't need JSX files in dist.
		.pipe(gulp.dest(path.join(__dirname, '/built/services')));
}

gulp.task('wipeServices',function (done) {
	wipe(path.join(__dirname, '/built/services/'), done);
})
function wipe(dir, cb) {
	del(dir, { force: true }).then(function () {
		if (cb) {
			cb();
		}
	});
}

function webpackIt(){
		return gulpWebpack(require('./webpack.config.js'), webpack)
		.pipe(gulp.dest(path.join(__dirname, '/built/services')));
}

gulp.task('devServer',["wipeServices"], function(done) {
	copyStaticFiles();
	webpackIt();
 	var exec = require('child_process').exec;
	//This runs essentially runs 'PORT=80 node server/server.js'
	var serverExec = exec('node ' + path.join(__dirname, '/server/server.js'), { env: { 'PORT': 80, NODE_ENV: "dev" } });
	serverExec.stdout.on("data", function (data) {
		//Prints server output to your terminal.
		console.log("SERVER STDOUT:", data);
		if (data.indexOf("listening on port") > -1) {
			//Once the server is up and running, we launch openfin.
			console.log("Finsemble",Finsemble.launchOpenfin)
			Finsemble.launchOpenfin(configPath);
			done();
		}
	});
	//Prints server errors to your terminal.
	serverExec.stderr.on("data", function (data) {
		console.log('ERROR:' + data);
	});
});