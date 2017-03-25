var FSBL = require('finsemble');
var path = require('path');
var testClient = require('../../clients/testClient.js');

FSBL.addClient('TestClient', testClient);
FSBL.useClients(['WindowClient', 'TestClient']);

FSBL.initialize();

var myComponent = {};
module.exports = myComponent;