var path = require('path');
var fs = require("fs");
var glob = require("glob");
var glob_entries = require('webpack-glob-entries');

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath).filter(function (file) {
		return fs.statSync(path.join(srcpath, file)).isFile();
	});
}
console.log(path.join(__dirname, "/services/**/*Service.js"))
var entry = glob_entries(path.join(__dirname, "/services/**/*Service.js"));
for (var key in entry) {
	console.log("key", key);
	var currentPath = entry[key];
	delete entry[key];
	var newKey = key.replace("Service", "");
	if (key !== "baseService")
	{ entry[newKey + "/" + newKey] = currentPath; }
}
console.log("entry",entry)
module.exports = {
	devtool: 'source-map',
	entry: entry,
    target: 'web',
	context: path.resolve(__dirname, '/services/'),
	module: {
		loaders: [{
			test: /\.json$/,
			loader: "json-loader"
		}]
	},
	output: {
		filename: "[name]Service.js",
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'built/'),
	},
	resolve: {
		moduleDirectories: ['./built/services/', './built/clients']
	},
	watch: false
};