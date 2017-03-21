//replace with import when ready
var Finsemble = require('finsemble/lib/FrontEnd');

var baseService = Finsemble.baseService;
var RouterClient = Finsemble.Clients.RouterClient;
var StorageClient = Finsemble.Clients.StorageClient;
var launcherClient = Finsemble.Clients.launcherClient;

/**
 * @namespace
 * @property {Object} 
 * @property {string}
 */
function TestService() {
	var self = this;

	this.initialize = function (cb) {
		cb();
	};

};

//define the rest of your service's functionality here.
TestService.prototype = new baseService();
var testService = new TestService("TestService");


testService.setOnConnectionComplete(function (callback) {
	linker.initialize(function () {
		callback();
	});
});



testService.start();


window.testService = testService;

