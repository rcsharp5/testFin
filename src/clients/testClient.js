var Finsemble = require('finsemble');
var RouterClient = Finsemble.Clients.RouterClient;
var BaseClient = Finsemble.Clients.BaseClient;
var util = Finsemble.Utils;
var console = new util.Console("BaseClient"); // Finsemble console
var Validate = Finsemble.Validate; // Finsemble args validator

/**
 * 
 * The launcher client handles spawning windows for the application.
 * @constructor
 */
function testClient(params) {
	BaseClient.call(this, params);
	Validate.args(params, "object=") && params && Validate.args2("params.onReady", params.onReady, "function=");
	console.log('holaaa!');
	return this;
};


var clientInstance = new testClient({
	onReady: function (cb) {
		cb();
	},
	name: "testClient"
});
clientInstance.requiredServices = [];

module.exports = clientInstance;