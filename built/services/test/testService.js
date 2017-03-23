(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Finsemble = __webpack_require__(1);
	var baseService = Finsemble.baseService;
	
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
	
	TestService.prototype = new baseService();
	var testService = new TestService("TestService");
	
	
	testService.setOnConnectionComplete(function (callback) {
		testService.initialize(function () {
			callback();
		});
	});
	
	testService.start();
	window.testService = testService;
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["FrontEnd"] = factory();
		else
			root["FrontEnd"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		module.exports = {
			baseService: __webpack_require__(1),
			Clients: {
				RouterClient: __webpack_require__(3),
				StorageClient: __webpack_require__(9),
				launcherClient: __webpack_require__(11)
			}
		};
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		
		// This file contains the Fensemble router service, which routes event messages between 
		// other services and components.  All event messages flow though here (never peer to peer).
		
		var FSBLUtils = __webpack_require__(2);
		var serviceObj = function serviceObj(params) {
			if (params) {
				this.name = params[0];
			}
			var self = this;
			this.name = name;
			this.servicesNeeded = ["routerService"]; // All the services that are required before the connection to the service manager is complete.
			this.onlineServices = [];
			this.__parent = null; //Should be service manager
			this.clients = [];
			this.beforeEach = []; //A list of fucntions that are called before every message
			this.afterEach = []; //A list of fucntions that are called after every message
			this.status = "offline"; //The services status
			this.onConnectionComplete = null;
			//Turn the the service online. This only happens when all servicesNeeded are online.
			//Also, the online is only sent to the parent once all of the 'onConnectionComplete' functions are complete
			this.setOnline = function () {
				if (self.servicesNeeded.length === 0 && self.status !== "online") {
					if (self.onConnectionComplete) {
						return self.onConnectionComplete(function () {
							self.status = "online";
							self.sendOnlineToParent();
						});
					}
					self.status = "online";
					self.sendOnlineToParent();
				}
			};
			this.setOnConnectionComplete = function (func) {
				self.onConnectionComplete = func;
			};
			//Add a function to be processed before every message
			this.addBefore = function (func) {
				if (typeof func === "function") {
					this.beforeEach.push(func);
				}
			};
			//Add a function to be processed after every message
			this.addAfter = function (func) {
				if (typeof func === "function") {
					this.afterEach.push(func);
				}
			};
			//Add a service to services needed list. This service will wait for all services in this list to be complete.
			this.addNeededServices = function (services) {
				if (!Array.isArray(services)) {
					services = [services];
				}
				for (var i = 0; i < services.length; i++) {
					if (this.servicesNeeded.indexOf(services[i]) === -1) {
						this.servicesNeeded.push(services[i]);
					}
				}
			};
			//Clear the services needed list
			this.clearServicesNeeded = function () {
				this.servicesNeeded = [];
			};
			//Check to see if services are online and remove them from the services needed if they are 
			this.checkServicesNeeded = function () {
				for (var i = 0; i < self.servicesNeeded.length; i++) {
					if (self.onlineServices.indexOf(self.servicesNeeded[i]) > -1) {
						self.servicesNeeded.splice(i, 1);
						i--;
					}
				}
				self.setOnline();
			};
			//Base listeners
			this.listeners = {
				serviceOnline: [function (msg) {
					self.onlineServices.push(msg.payload);
					if (self.servicesNeeded.length > 0) {
						self.checkServicesNeeded();
					};
				}],
				serviceList: [function (msg) {
					self.onlineServices = msg.payload;
					if (self.servicesNeeded.length > 0) {
						self.checkServicesNeeded();
					};
				}],
				windowConnect: [function (msg) {
					self.sendHandShake();
				}],
				onConnectionComplete: []
			};
		};
		//Processes all messages
		serviceObj.prototype.receiveMessage = function (msg) {
			for (var i = 0; i < this.beforeEach.length; i++) {
				this.beforeEach[i](msg);
			}
			var eventName = msg.name;
			if (eventName && this.listeners[eventName].length > 0) {
				for (var i = 0; i < this.listeners[eventName].length; i++) {
					if (typeof this.listeners[eventName][i] === "function") {
						this.listeners[eventName][i](msg);
					}
				}
			}
			for (var i = 0; i < this.afterEach.length; i++) {
				this.afterEach[i](msg);
			}
		};
		//Listen for a new message type
		serviceObj.prototype.addListener = function (eventName, cb) {
			if (!this.listeners[eventName]) {
				this.listeners[eventName] = [];
			}
			this.listeners[eventName].push(cb);
		};
		//remove a listener
		serviceObj.prototype.removeListener = function (eventName, func) {
			if (this.listeners[eventName] && this.listeners[eventName].length > 0) {
				for (var i = 0; i < this.listeners[eventName].length; i++) {
					if (this.listeners[eventName][i] === func) {
						this.listeners[eventName].splice(i, 1);
						break;
					}
				}
			}
		};
		//log a message to the parent.
		serviceObj.prototype.log = function (message) {
			var msg = new FSBLUtils.msgWrapper('debug', JSON.stringify(message));
			this.sendToParent(msg);
		};
		//Broadcast a message to all connected clients.
		serviceObj.prototype.broadcast = function (message) {
		
			if (this.route) {} else {
				for (var i = 0; i < this.clients.length; i++) {
					port = this.clients[i];
					port.postMessage(message);
				}
			}
		};
		//Send a message to the parent
		serviceObj.prototype.sendToParent = function (message) {
			message.location = this.name;
			if (typeof window !== 'undefined') {
				if (!this.__parent) {
					this.__parent = window.opener;
				}
				return this.__parent.postMessage(message, "*");
			}
			this.__parent.postMessage(message);
		};
		//Set this service online
		serviceObj.prototype.sendOnlineToParent = function () {
			var msg = new FSBLUtils.msgWrapper("online", {
				status: true
			});
			this.sendToParent(msg);
		};
		//Tell the parent that this service received the connection
		serviceObj.prototype.sendHandShake = function () {
			var msg = new FSBLUtils.msgWrapper("handshake", {
				status: true
			});
			var self = this;
			this.sendToParent(msg);
			if (this.servicesNeeded.length > 0) {
				this.getActiveServiceList();
			} else {
				this.setOnline();
			}
		};
		//Get a list of all active services
		serviceObj.prototype.getActiveServiceList = function () {
			var msg = new FSBLUtils.msgWrapper("getActiveServices");
			this.sendToParent(msg);
		};
		//Start this service.
		serviceObj.prototype.start = function () {
			var service = this;
			if (typeof window !== 'undefined') {
				window.addEventListener("message", function (msg) {
					service.receiveMessage(msg.data);
				});
		
				this.__parent = window.opener;
			} else {
				self.onerror = function (e) {
					var msg = new FSBLUtils.msgWrapper("debug", e);
					service.sendToParent(msg);
				};
		
				self.onconnect = function (e) {
					var port = e.ports[0];
					service.clients.push(port);
		
					port.onmessage = function (msg) {
						service.receiveMessage(msg.data);
					};
					if (service.clients.length === 1) {
						service.__parent = port;
						service.sendHandShake();
					}
				};
			}
		};
		
		module.exports = serviceObj;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		
		module.exports = {
			/**
		  * @introduction
		  * <h2>Finsemble Utility Functions</h2>
		  * 
		  * @class Utils
		  */
		
			retrieveMonitorDimensions: function retrieveMonitorDimensions(callback) {
				var dims = {};
				this.getMonitorInfo().then(function (monitorInfo) {
					var availableMonitors = [monitorInfo.primaryMonitor].concat(monitorInfo.nonPrimaryMonitors);
					fin.desktop.Window.getCurrent().getBounds(function (bounds) {
						dims.defaultLeft = bounds.left;
						dims.defaultTop = bounds.top;
						findMonitor();
					});
					function findMonitor() {
						for (var i = 0; i < availableMonitors.length; i++) {
							var monitor = availableMonitors[i].availableRect;
							monitor.width = monitor.right - monitor.left;
							monitor.height = monitor.bottom - monitor.top;
							if (dims.defaultLeft >= monitor.left && dims.defaultLeft <= monitor.right) {
								dims.monitorDimensions = monitor;
								break;
							}
						}
						if (callback) {
							callback(null, dims);
						}
					}
				});
			},
			/**
		 * finsemble console for displaying diagnostic messages (a transparent replacement for window.console)
		 * @param {string} name prefix for all console output
		 * @memberof Utils
		 * @constructor
		 */
			Console: function Console(name) {
				var schema = "FSBL-Console";
				var consoleName;
				var currentLevel = 2;
		
				/**
		   * gets console display level -- the higher the number the more is displayed 
		   * @returns level
		   */
				this.getLevel = function () {
					return currentLevel;
				};
		
				/**
		   * sets console display level -- the higher the number the more is displayed 
		   * @default "4"
		   * @param {number} newLevel: the new display level
		   */
				this.setLevel = function (newLevel) {
					currentLevel = newLevel;
				};
		
				/**
		   * outputs to console an error message (level == 1)
		   * 
		   * @param {any} message: error message to display
		   */
				this.error = function (message) {
					var myLevel = 1;
					if (myLevel <= currentLevel) {
						var theMessage = consoleName + " Error " + new Date().toTimeString() + ': ' + message;
						window.console.error(theMessage);
						fin.desktop.System.log('error', theMessage);
					}
				};
		
				/**
		   * outputs to console a warning message (level == 2)
		   * 
		   * @param {any} message
		   */
				this.warn = function (message) {
					var myLevel = 2;
					if (myLevel <= currentLevel) {
						var theMessage = consoleName + " Warning " + new Date().toTimeString() + ': ' + message;
						window.console.warn(theMessage);
						fin.desktop.System.log('warning', theMessage);
					}
				};
		
				/**
		   * outputs to console a info message (level == 3)
		   * 
		   * @param {any} message
		   */
				this.info = function (message) {
					var myLevel = 3;
					if (myLevel <= currentLevel) {
						var theMessage = consoleName + " Info " + new Date().toTimeString() + ': ' + message;
						window.console.info(theMessage);
					}
				};
		
				/**
		   * outputs to console a info message (level == 3)
		   * 
		   * @param {any} message
		   */
				this.log = function (message) {
					var myLevel = 3;
					if (myLevel <= currentLevel) {
						var theMessage = consoleName + " Log " + new Date().toTimeString() + ': ' + message;
						window.console.info(theMessage);
					}
				};
		
				/**
		   * outputs to console a debug message (level == 4+)
		   * 
		   * @param {any} message
		   * @param {any} level
		   */
				this.debug = function (message, level) {
					var myLevel = parseInt(level, 10) || 4;
					if (myLevel <= currentLevel) {
						var theMessage = consoleName + " Debug: " + message + " (timestamp " + Math.round(window.performance.now() * 1000) / 1000 + ')';
						window.console.debug(theMessage);
					}
				};
		
				consoleName = name;
			},
		
			/**
		  * @param {any} name
		  * @param {any} payload
		  * @memberof Utils
		  */
			msgWrapper: function msgWrapper(name, payload) {
				this.name = name;
				this.payload = payload;
			},
		
			monitorInfo: null,
			/**
		  * returns monitor infor
		  * 
		  * @param {any} force
		  * @returns object
		  */
			getMonitorInfo: function getMonitorInfo(force) {
				return new Promise(function (resolve, reject) {
					fin.desktop.System.getMonitorInfo(function (monitorInfo) {
						module.exports.monitorInfo = monitorInfo;
						resolve(monitorInfo);
					});
				});
			},
		
			/**
		  * get the dimensions of a monitor 
		  * 
		  * @returns height and weight
		  * @memberof Utils
		  */
			getMonitorDimensions: function getMonitorDimensions() {
				return new Promise(function (resolve, reject) {
					var monitorDimensions = {
						height: null,
						width: null
		
					};
					console.log('getting data');
					fin.desktop.System.getMonitorInfo(function (monitorInfo) {
						console.log('got monitorInfo');
						//top bar is 45..
						monitorDimensions.height = monitorInfo.primaryMonitor.availableRect.bottom - monitorInfo.primaryMonitor.availableRect.top - 32;
						monitorDimensions.width = monitorInfo.primaryMonitor.availableRect.right;
						monitorDimensions.left = monitorInfo.primaryMonitor.availableRect.left;
						monitorDimensions.top = monitorInfo.primaryMonitor.availableRect.top;
						resolve(monitorDimensions);
					});
				});
			},
		
			getMyMonitorDimensions: function getMyMonitorDimensions(windowBounds) {
				//returns the dimensions of the monitor that the window is on.
				//@todo: this.
			},
		
			/**	 
		  *	@returns {string} Transforms an array of strings into a camelcased string.
		  * @memberof Utils
		  */
			camelCase: function camelCase() {
				var str = '';
				for (var i = 0; i < arguments.length; i++) {
					str += ' ' + arguments[i];
				}
				return str.replace(/\s(.)/g, function ($1) {
					return $1.toUpperCase();
				}).replace(/\s/g, '').replace(/^(.)/, function ($1) {
					return $1.toLowerCase();
				});
			},
		
			/**
		  * Convenience method for cloning an object.
		  * @param  {any} from The thing you want to copy
		  * @param {any} to Where you want your copy to end up.
		  * @return {any} to Where you want your copy to end up.
		  */
			clone: function clone(from, to) {
				if (from === null || (typeof from === "undefined" ? "undefined" : _typeof(from)) !== "object") {
					return from;
				}
				// if (from.constructor != Object && from.constructor != Array) return from;
				if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function || from.constructor == String || from.constructor == Number || from.constructor == Boolean) {
					return new from.constructor(from);
				}
		
				to = to || new from.constructor();
		
				for (var n in from) {
					to[n] = typeof to[n] === "undefined" ? module.exports.clone(from[n], null) : to[n];
				}
		
				return to;
			},
		
			getUniqueName: function getUniqueName(baseName) {
				if (!baseName) {
					baseName = "RouterClient";
				}
				var uuid = baseName + "." + Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 10000);
				return uuid;
			}
		
		};
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		
		/**
		 * @introduction
		 * <h2>Router Client Instance</h2>
		 * Exports a single shared instance of the router client.  See {@link RouterClientConstructor} for the complete API definition with examples.
		 *
		 * Example:
		 *
		 *	// get a shared instance of RouterClient (shared within the containing component or service)
		 *	var RouterClient = require('./routerClientInstance');
		 *
		 * @namespace RouterClientInstance
		 * @shouldBePublished false
		 */
		
		"use strict";
		
		var RouterClientConstructor = __webpack_require__(4);
		
		module.exports = new RouterClientConstructor("RouterSingleton");
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		
		"use strict";
		
		var RouterTransport = __webpack_require__(5);
		var Utils = __webpack_require__(2);
		var console = new Utils.Console("RouterClient"); // Finsemble console
		
		var Validate = __webpack_require__(8); // Finsemble args validator
		var validate = new Validate(console);
		
		/**
		 * @introduction
		 * <h2>Router Client Constructor</h2>
		 * This modules contains the RouterClient for sending and receiving events between Finsembe components and services. The constructor returns one instance
		 * of a router client. The related {@link RouterClientInstance} Module behaves like a RouteClient singleton, always returning the same instance
		 * of the router client (within the same component/service window).
		 *
		 * The router client interfaces to the Finsemble router service, which routes event messages between all clients. Although it's transparent, the router uses the <a href="http://cdn.openfin.co/jsdocs/stable/fin.desktop.module_InterApplicationBus.html">OpenFin Bus</a> and SharedWorker threads for transporting events between clients. 
		 *
		 * More examples are shown in the <a href=tutorial-eventRouter.html>Event Router Tutorial</a>.
		 *
		 * @example
		 *
		 * // create an instance of Router Client
		 * RouterClientConstructor = require('./routerClientConstructor');
		 * RouterClient = new RouterClientConstructor("clientname");
		 *
		 * // add a listener for incoming event on the specified channel
		 * RouterClient.addListener("myListenChannel",eventHandler);
		 * //
		 * // transmit event to all listeners on specified channel
		 * RouterClient.transmit("myListenChannel", transmitEvent);
		 * 
		 * // add server for incoming events on the specified channel
		 * RouterClient.addServer("myServerChannel",eventHandler);
		 *
		 * // query the server on the specified channel
		 * RouterClient.query("myServerChannel",queryEvent, responseEventHandler);
		 *
		 * // create Subscribe-Publish server for specified topic
		 * RouterClient.addPubSubServer("myTopic");
		 *
		 * // create Subscribe-Publish server for specified wildcard topic (i.g. using RegEx), specifiying all the optional callback
		 * RouterClient.addPubSubServer(\/topicA*\/, { "State": "start" }, { subscribeCallback:subscribeCallback, publishCallback:publishCallback, unsubscribeCallback:unsubscribeCallback } );
		 *
		 * // subscribe to the specified PubSub server for specified topic
		 * RouterClient.subscribe("myTopic",notifyEventHandler);
		 *
		 * // publish to the specified PubSub server for specified topic
		 * RouterClient.publish("myTopic",publishEvent);
		 *
		 * @constructor
		 * @publishedName RouterClient
		 * @param {string} thisClientName router client name for human readable messages
		 * @param {string} transportName router transport name (usually this is autoconfigured internally but can be selected for testing or special configurations)
		 */
		var RouterClientConstructor = function RouterClientConstructor(thisClientName, transportName) {
			validate.args(thisClientName, "string", transportName, "string=");
		
			///////////////////////////
			// Private Data
			///////////////////////////	
			var mapListeners = {};
			var mapServers = {};
			var mapPubSubServers = {};
			var mapPubSubServerState = {};
			var mapPubSubServerRegEx = {};
			var pubsubListOfSubscribers = {};
			var mapSubscribersID = {};
			var mapSubscribersTopic = {};
			var mapQueryResponses = {};
			var clientIDCounter = 1000;
			var clientName;
			var transport;
			var self = this;
		
			/////////////////////////////////////////////////////////////////////
			// Private Message Contructors for Communicating with RouterService
			/////////////////////////////////////////////////////////////////////
			function AddListenerMessage(channel) {
				this.header = {
					"origin": clientName,
					"type": "addListener",
					"channel": channel
				};
			}
			function TransmitMessage(toChannel, data) {
				this.header = {
					"origin": clientName,
					"type": "transmit",
					"channel": toChannel
				};
				this.data = data;
			}
			function RemoveListenerMessage(channel) {
				this.header = {
					"origin": clientName,
					"type": "removeListener",
					"channel": channel
				};
			}
			function AddServerMessage(channel) {
				this.header = {
					"origin": clientName,
					"type": "addServer",
					"channel": channel
				};
			}
			function QueryMessage(queryID, channel, data) {
				this.header = {
					"origin": clientName,
					"type": "query",
					"queryID": queryID,
					"channel": channel
				};
				this.data = data;
			}
			function QueryResponseMessage(queryID, error, data) {
				this.header = {
					"origin": clientName,
					"type": "queryResponse",
					"queryID": queryID,
					"error": error
				};
				this.data = data;
			}
			function RemoveServerMessage(channel) {
				this.header = {
					"origin": clientName,
					"type": "removeServer",
					"channel": channel
				};
			}
			function SubscribeMessage(subscribeID, topic) {
				this.header = {
					"origin": clientName,
					"type": "subscribe",
					"subscribeID": subscribeID,
					"topic": topic
				};
			}
			function UnsubscribeMessage(subscribeID, topic) {
				this.header = {
					"origin": clientName,
					"type": "unsubscribe",
					"subscribeID": subscribeID,
					"topic": topic
				};
			}
			function PublishMessage(topic, data) {
				this.header = {
					"origin": clientName,
					"type": "publish",
					"topic": topic
				};
				this.data = data;
			}
			function NotifyMessage(subscribeID, topic, error, data) {
				this.header = {
					"origin": clientName,
					"type": "notify",
					"subscribeID": subscribeID,
					"topic": topic,
					"error": error
				};
				this.data = data;
			}
			function AddPubSubServerMessage(topic) {
				this.header = {
					"origin": clientName,
					"type": "addPubSubServer",
					"topic": topic
				};
			}
			function RemovePubSubServerMessage(topic) {
				this.header = {
					"origin": clientName,
					"type": "removePubSubServer",
					"topic": topic
				};
			}
			function JoinGroupMessage(group) {
				this.header = {
					"origin": clientName,
					"type": "joinGroup",
					"group": group
				};
			}
			function LeaveGroupMessage(group) {
				this.header = {
					"origin": clientName,
					"type": "leaveGroup",
					"group": group
				};
			}
			function GroupTransmitMessage(group, toChannel, message, data) {
				this.header = {
					"origin": clientName,
					"type": "groupTransmit",
					"group": group,
					"channel": toChannel
				};
				this.data = data;
			}
		
			//////////////////////
			// Private Functions
			//////////////////////
		
			// router client is being terminated so cleanup	
			function destructor(event) {
				console.info("shutting down on event: " + JSON.stringify(event));
				self.disconnectAll(); // this will let the router know the client is terminating
				console.debug("shutting down complete");
			}
		
			// called once on router-client creation
			function constructor(thisClientName, transportName) {
				clientName = Utils.getUniqueName(thisClientName);
		
				if (typeof transportName === 'undefined') {
					transport = RouterTransport.getRecommendedTransport(incomingMessageHandler, clientName, "RouterService");
				} else {
					transport = RouterTransport.getTransport(transportName, incomingMessageHandler, clientName, "RouterService");
				}
		
				// catch "window closing" event so can cleanup	
				var finWindow = fin.desktop.Window.getCurrent();
				//finWindow.addEventListener("closed", destructor); // this is the correct event to catch but currently doesn't work on mac
				window.onbeforeunload = destructor; // this works for mac
		
				console.info("starting " + clientName + " with transport " + transport.identifier());
			}
		
			// provides unique id within one router client for queries
			function clientID() {
				return clientName + "." + ++clientIDCounter;
			}
		
			// returns true if this routerClient originated the message
			function originatedHere() {
				return this.header.origin === this.header.lastClient;
			}
		
			// invoke client callbacks in the input array (that are attached to a specific channel and listener type) 
			function invokeListenerCallbacks(map, message) {
				var clientCallbackArray = map[message.header.channel];
				if (clientCallbackArray === undefined) {
					console.warn("no handler defined for incoming message" + JSON.stringify(message));
				} else {
					message.originatedHere = originatedHere; // add local function to test origin
					for (var i = 0; i < clientCallbackArray.length; i++) {
						// for each callback defined for the channel
						console.debug("invoke listener callback for incoming transmit: " + JSON.stringify(message));
						clientCallbackArray[i](null, message); // invoke the callback; the error parameter is always null for this case
					}
				}
			}
		
			function sendQueryResponse(err, responseData) {
				console.debug("send query response: " + JSON.stringify(responseData));
				sendToRouterService(new QueryResponseMessage(this.header.queryID, err, responseData));
			}
		
			// invoke server-listener callback (attached to a specific channel) 
			function invokeServerCallback(map, queryMessage) {
				var serverCallback = map[queryMessage.header.channel];
				if (serverCallback === undefined) {
					console.warn(2, "no server defined for incoming query message: " + JSON.stringify(queryMessage));
				} else {
					if (!queryMessage.header.error) {
						queryMessage.originatedHere = originatedHere; // add local function to test origin
						queryMessage.sendQueryResponse = sendQueryResponse; // add callback function to message so server can respond to query
						console.debug("invoke server callback for incoming query: " + JSON.stringify(queryMessage));
						serverCallback(null, queryMessage); // invoke the callback (no error)
					} else {
						// invoke the callback with error since  flag in message (from router service)
						serverCallback(queryMessage.header.error, null);
						console.debug("server callback with RouterService error: " + JSON.stringify(queryMessage.header));
						delete map[queryMessage.header.channel]; // this is a bad server (e.g. duplicate) so remove it
					}
				}
			}
		
			// add a callbackHandler into the query-response map for the given queryID
			function addQueryResponseCallBack(map, queryID, responseCallback) {
				map[queryID] = responseCallback;
			}
		
			// invoke query-response callback (that is attached to a specific channel and listener type) 
			function invokeQueryResponseCallback(map, responseMessage) {
				var clientCallback = map[responseMessage.header.queryID];
				if (clientCallback === undefined) {
					console.warn("no handler defined for query response: " + JSON.stringify(responseMessage));
				} else {
					if (!responseMessage.header.error) {
						console.debug("invoke queryResponse callback for query: " + JSON.stringify(responseMessage));
						clientCallback(null, responseMessage); // invoke the callback passing the response message
					} else {
						console.debug("queryResponse callback with RouterService error: " + JSON.stringify(responseMessage.header));
						clientCallback(responseMessage.header.error, responseMessage); // error from router service so pass it back instead of a message
					}
					delete map[responseMessage.header.queryID];
				}
			}
		
			// add server callbackHandler for the given channel
			function addServerCallBack(map, channel, callback) {
				var status = false;
				var clientCallback = map[channel];
				if (clientCallback === undefined) {
					map[channel] = callback;
					status = true;
				}
				return status;
			}
		
			// support function for sendNotifyToSubscriber -- maintains local list of subscribers for pubsub server
			function addToSubpubListOfSubscribers(pubsubListOfSubscribers, topic, subscribeID) {
				if (!(topic in pubsubListOfSubscribers)) {
					pubsubListOfSubscribers[topic] = [subscribeID];
				} else {
					pubsubListOfSubscribers[topic].push(subscribeID);
				}
			}
		
			// support function for addPubSubServer -- add pubsub server callbackHandler for the given channel
			function addPubSubServerCallBack(topic, subscribeCallback, publishCallback, unsubscribeCallback) {
				var status = false;
				var callbacks = mapPubSubServers[topic.toString()];
				if (callbacks === undefined) {
					if (topic instanceof RegExp) {
						mapPubSubServerRegEx[topic.toString()] = topic;
						console.debug("RegEx added for topic " + topic.toString()); // Note: topic may be a RegEx, so use toString() where applicable
					}
					mapPubSubServers[topic.toString()] = { "subscribeCallback": subscribeCallback, "publishCallback": publishCallback, "unsubscribeCallback": unsubscribeCallback };
					status = true;
				}
				return status;
			}
		
			// callback function for invokeSubscribePubSubCallback to notify new subscriber
			function sendNotifyToSubscriber(err, notifyData) {
				sendToRouterService(new NotifyMessage(this.header.subscribeID, this.header.topic, err, notifyData));
				if (!err) {
					// add new subscriber to list
					addToSubpubListOfSubscribers(pubsubListOfSubscribers, this.header.topic, this.header.subscribeID);
					console.debug("subscription added pubsub server: " + JSON.stringify(this));
				} else {
					console.debug("subscribe rejected by pubsub server: " + JSON.stringify(this));
				}
			}
		
			// for incoming subscribe: invoke notify callback for pubsub server
			function invokeSubscribePubSubCallback(subscribeMessage) {
				var callbacks = mapPubSubServers[subscribeMessage.header.topic];
		
				if (callbacks === undefined) {
					// if undefined then may be a matching RegEx topic
					for (var key in mapPubSubServerRegEx) {
						if (mapPubSubServerRegEx[key].test(subscribeMessage.header.topic)) {
							callbacks = mapPubSubServers[key];
							var initialState = mapPubSubServerState[subscribeMessage.header.topic]; // may already be initial state defined from publish
							if (initialState === undefined) {
								// if there isn't already state defined then use default from regEx
								initialState = mapPubSubServerState[key]; // initialize the state from RegEx topic	
							}
							mapPubSubServerState[subscribeMessage.header.topic] = initialState;
							break;
						}
					}
				}
		
				if (callbacks === undefined) {
					// if still undefined
					console.warn("no pubsub server defined for incoming subscribe message: " + JSON.stringify(subscribeMessage));
				} else {
					if (subscribeMessage.header.error) {
						// the router service uses the subscribe message in this case to return a pubsub error (ToDO: consider a generic error message)
						console.warn("pubsub error received from router service: " + JSON.stringify(subscribeMessage.header.error));
					} else {
						subscribeMessage.sendNotifyToSubscriber = sendNotifyToSubscriber; // add callback function to message so pubsub server can respond with Notify message
						if (callbacks.subscribeCallback) {
							callbacks.subscribeCallback(null, subscribeMessage); // invoke the callback (no error)
						} else {
							// since no subscribe callback defined, use default functionality
							subscribeMessage.sendNotifyToSubscriber(null, mapPubSubServerState[subscribeMessage.header.topic]); // must invoke from message to set this properly 
						}
					}
				}
			}
		
			// support function for removeSubscriber callback --  remove one subscribeID from array for the given subscription topic
			function removeFromSubpubListOfSubscribers(pubsubListOfSubscribers, topic, subscribeID) {
				var removed = false;
				if (topic in pubsubListOfSubscribers) {
					var list = pubsubListOfSubscribers[topic];
					for (var i = 0; i < list.length; i++) {
						if (subscribeID === list[i]) {
							list.splice(i, 1);
							if (list.length === 0) {
								delete pubsubListOfSubscribers[topic];
							}
							removed = true;
							console.debug("removeListener to " + topic + " from " + JSON.stringify(subscribeID));
							break;
						}
					}
				}
				if (!removed) {
					console.warn("tried to remove non-existance listener on " + topic + " from " + JSON.stringify(subscribeID));
				}
			}
		
			// callback function for invokeUnsubscribePubSubCallback to remove the subscriber from the subscription	
			function removeSubscriber() {
				removeFromSubpubListOfSubscribers(pubsubListOfSubscribers, this.header.topic, this.header.subscribeID);
			}
		
			// for incoming unsubscribe: invoke unsubscribe callback for pubsub servier
			function invokeUnsubscribePubSubCallback(unsubscribeMessage) {
				var callbacks = mapPubSubServers[unsubscribeMessage.header.topic];
		
				if (callbacks === undefined) {
					// if undefined then may be a matching RegEx topic
					for (var key in mapPubSubServerRegEx) {
						if (mapPubSubServerRegEx[key].test(unsubscribeMessage.header.topic)) {
							callbacks = mapPubSubServers[key];
							break;
						}
					}
				}
		
				if (callbacks === undefined) {
					// if still undefined
					console.warn("no pubsub server defined for incoming unsubscribe message: " + JSON.stringify(unsubscribeMessage));
				} else {
					unsubscribeMessage.removeSubscriber = removeSubscriber; // add callback function to message for pubsub server (but must always remove)
					if (callbacks.unsubscribeCallback) {
						callbacks.unsubscribeCallback(null, unsubscribeMessage); // invoke the callback (no error)
					} else {
						// since no unsubscribe callback defined, use default functionality
						unsubscribeMessage.removeSubscriber();
					}
				}
			}
		
			// callback function for invokePublishPubSubCallback to send Notify 	
			function sendNotifyToAllSubscribers(err, notifyData) {
				if (!err) {
					mapPubSubServerState[this.header.topic] = notifyData; // store new state
					var listOfSubscribers = pubsubListOfSubscribers[this.header.topic];
					if (typeof listOfSubscribers !== 'undefined') {
						// confirm subscribers to send to, if none then nothing to do
						for (var i = 0; i < listOfSubscribers.length; i++) {
							sendToRouterService(new NotifyMessage(listOfSubscribers[i], this.header.topic, err, notifyData));
						}
					}
				} else {
					console.debug("income publish rejected by pubsub server: " + JSON.stringify(err));
				}
			}
		
			// for incoming Publish: invoke publish callback for pubsub servier
			function invokePublishPubSubCallback(publishMessage) {
				var callbacks = mapPubSubServers[publishMessage.header.topic];
		
				if (callbacks === undefined) {
					// if undefined then may be a matching RegEx topic
					for (var key in mapPubSubServerRegEx) {
						if (mapPubSubServerRegEx[key].test(publishMessage.header.topic)) {
							callbacks = mapPubSubServers[key];
							break;
						}
					}
				}
		
				if (callbacks === undefined) {
					// if still undefined
					console.warn("no pubsub server defined for incoming publish message: " + JSON.stringify(publishMessage));
				} else {
					publishMessage.sendNotifyToAllSubscribers = sendNotifyToAllSubscribers; // add callback function to message so pubsub server can respond to publish
					if (callbacks.publishCallback) {
						callbacks.publishCallback(null, publishMessage); // invoke the callback (no error)
					} else {
						// since no pubish callback defined, use default functionality
						publishMessage.sendNotifyToAllSubscribers(null, publishMessage.data); // must call from publish message (like a callback) so 'this' is properly set
					}
				}
			}
		
			// for incoming Notify: invoke notify callback (that are attached to a specific channel and listener type) 
			function invokeNotifyCallback(mapSubscribersID, notifyMessage) {
				var notifyCallback = mapSubscribersID[notifyMessage.header.subscribeID];
				if (notifyCallback === undefined) {
					console.warn("no subscription handler defined for incoming notify: " + JSON.stringify(notifyMessage));
				} else {
					if (!notifyMessage.header.error) {
						notifyMessage.originatedHere = originatedHere; // add local function to test origin
						notifyCallback(null, notifyMessage); // invoke the callback passing the response message
					} else {
						notifyCallback(notifyMessage.header.error, notifyMessage); // error from router service so pass it back instead of a message
					}
				}
			}
		
			// outgoing Unsubscribe: remove subscriber callbackHandler for the given channel
			function removeSubscriberCallBack(mapSubscribersID, subscribeID) {
				var status = false;
				var notifyCallback = mapSubscribersID[subscribeID];
				if (notifyCallback !== undefined) {
					delete mapSubscribersID[subscribeID];
					status = true;
				}
				return status;
			}
		
			// for outgoing addSubscriber -- add a callback Handler for the subscribe
			function addSubscriberCallBack(mapSubscribersID, subscribeID, notifyCallback, topic) {
				mapSubscribersID[subscribeID] = notifyCallback;
				mapSubscribersTopic[subscribeID] = topic;
			}
		
			// for removePubSubServer: remove server callbackHandler for the given channel
			function removeServerCallBack(map, channel) {
				var status = false;
				var clientCallback = map[channel];
				if (clientCallback !== undefined) {
					delete map[channel];
					status = true;
				}
				return status;
			}
		
			// for addListener: add a callbackHandler into the specified map (which depends on listener type) for the given channel
			function addListenerCallBack(map, channel, callback) {
				var firstChannelClient = false;
				var clientCallbackArray = map[channel];
				if (clientCallbackArray === undefined) {
					map[channel] = [callback];
					firstChannelClient = true;
				} else {
					clientCallbackArray.push(callback);
				}
				return firstChannelClient;
			}
		
			// for removeListener: remove a callbackHandler from the specified map (which depends on listener type) for the given channel
			function removeListenerCallBack(map, channel, callback) {
				var lastChannelClient = false;
				var clientCallbackArray = map[channel];
				if (clientCallbackArray !== undefined) {
					var index = clientCallbackArray.indexOf(callback);
					if (index > -1) {
						clientCallbackArray.splice(index, 1);
						if (clientCallbackArray.length === 0) {
							lastChannelClient = true;
						}
					} else {
						console.warn("no listener defined for channel: " + channel);
					}
				}
				return lastChannelClient;
			}
		
			// route incoming message to appropriate callback, which depends on the message type and channel
			function routeIncomingMessage(incomingMessage) {
				console.debug("Incoming Message: " + incomingMessage.header.type, 5);
				switch (incomingMessage.header.type) {
					case "transmit":
						invokeListenerCallbacks(mapListeners, incomingMessage);
						break;
					case "query":
						invokeServerCallback(mapServers, incomingMessage);
						break;
					case "queryResponse":
						invokeQueryResponseCallback(mapQueryResponses, incomingMessage);
						break;
					case "notify":
						invokeNotifyCallback(mapSubscribersID, incomingMessage);
						break;
					case "publish":
						invokePublishPubSubCallback(incomingMessage);
						break;
					case "subscribe":
						invokeSubscribePubSubCallback(incomingMessage);
						break;
					case "unsubscribe":
						invokeUnsubscribePubSubCallback(incomingMessage);
						break;
					default:
				}
			}
		
			// *** all incoming messages from underlying transport arrive here ***
			// although incoming transport information is available, it is not passed on because not needed 
			function incomingMessageHandler(incomingTransportInfo, message) {
				// ToDo: good place to put a function to validate incoming message/data
				message.header.lastClient = clientName; // add last client for diagnostics
				routeIncomingMessage(message);
			}
		
			// *** all outbound messages exit here though the appropriate transport ***
			function sendToRouterService(message) {
				console.debug("Outgoing Message: " + JSON.stringify(message.header.type), 5);
				transport.send(message);
			}
		
			/////////////////////////////////////////////
			// Public Functions -- The Router Client API
			/////////////////////////////////////////////
		
			/**
		  * Set route client name to human readable form for better diagnotics.  An random id is concatenated on the end to ensure uniqueness.
		  * 
		  * @param {string} newClientName
		  * @example
		  *
		  * RouterClient.setClientName("MyComponent");
		  */
			this.setClientName = function (newClientName) {
				validate.args(thisClientName, "string");
				clientName = Utils.getUniqueName(newClientName);
				console.info("Route Client name set to " + clientName);
			};
		
			/**
		  * Add listener for incoming event on specified channel.
		  * 
		  * @param {string} channel
		  * @param {function} eventHandler
		  * @example
		  *
		  * RouterClient.addListener("SomeChannelName", function (error, message) {
		  * 		// process incoming channel message		
		  * });
		  *
		  */
			this.addListener = function (channel, eventHandler) {
				console.debug("addListener to channel " + channel);
				validate.args(channel, "string", eventHandler, "function");
				var firstChannelClient = addListenerCallBack(mapListeners, channel, eventHandler);
				if (firstChannelClient) {
					sendToRouterService(new AddListenerMessage(channel));
				}
			};
		
			/**
		  * Transmit event to specified channel.
		  * 
		  * @param {string} toChannel
		  * @param {any} event -- object or primitive type to be transmitted
		  * @example
		  *
		  * RouterClient.transmit("SomeChannelName", channelMessage);
		  *
		  */
			this.transmit = function (toChannel, event) {
				console.debug("transmit to channel " + toChannel + " event: " + JSON.stringify(event));
				validate.args(toChannel, "string", event, "any");
				sendToRouterService(new TransmitMessage(toChannel, event));
			};
		
			/**
		  * Remove event listener from specified channel.
		  * 
		  * @param {string} channel
		  * @param {function} eventHandler for the listener
		  */
			this.removeListener = function (channel, eventHandler) {
				console.debug("removelistener to channel " + channel);
				validate.args(channel, "string", eventHandler, "function");
				var lastChannelListener = removeListenerCallBack(mapListeners, channel, eventHandler);
				if (lastChannelListener) {
					sendToRouterService(new RemoveListenerMessage(channel));
				}
			};
		
			/** 
		  * Add event server to the specified channel (only one server allowed per channel)
		  * 
		  * @param {string} channel
		  * @param {function} queryEventHandler
		  * @example
		  *
		  * RouterClient.addServer("ServerChannelName", function (error, queryMessage) {
		  *	if (error) {
		  *		console.log('addServer failed: ' + JSON.stringify(error));
		  *	} else {
		  *		// process income query message
		  *		// then send query response
		  *		queryMessage.sendQueryResponse(null, queryMessage.data);
		  *	}
		  * });
		  *
		  */
			this.addServer = function (channel, queryEventHandler) {
				console.debug("addServer for channel " + channel);
				validate.args(channel, "string", queryEventHandler, "function");
				var status = addServerCallBack(mapServers, channel, queryEventHandler);
				if (status) {
					sendToRouterService(new AddServerMessage(channel));
				} else {
					console.warn("Server already locally defined for channel " + channel);
					queryEventHandler({
						"RouteClient QueryError": "Server already locally defined for channel"
					}, null); // immediately invoke callback passing error
				}
			};
		
			/**
		  * Send query to server listening on specified channel.
		  * 
		  * @param {any} serverChannel
		  * @param {object=} queryEvent event message sent to server
		  * @param {function} responseEventHandler
		  */
			this.query = function (serverChannel, queryEvent, responseEventHandler) {
				console.debug("query to server channel " + serverChannel + " passing event: " + JSON.stringify(queryEvent));
				validate.args(serverChannel, "string", queryEvent, "any=", responseEventHandler, "function");
				var newQueryID = clientID();
				addQueryResponseCallBack(mapQueryResponses, newQueryID, responseEventHandler);
				sendToRouterService(new QueryMessage(newQueryID, serverChannel, queryEvent));
			};
		
			/**
		  * Remove event server from specified channel.
		  * 
		  * @param {string} serverChannel
		  */
			this.removeServer = function (serverChannel) {
				console.debug("removeServer from server channel " + serverChannel);
				validate.args(serverChannel, "string");
				var status = removeServerCallBack(mapServers, serverChannel);
				if (status) {
					sendToRouterService(new RemoveServerMessage(serverChannel));
				}
			};
		
			/**
		  * Add a PubSub server to specified topic. Generally only one PubSub server allowed per topic;
		  * however a topic may be a regular-expression, in which case the PubSub server will server all matching topics.
		  * When a regEx topic is used, the same default functionality is provides for each matching topic -- the difference
		  * is only on SubPub service is need to cover a set of related topics, plus the same callback hander can be used (if provided).
		  *
		  * Note an exact topic match will take precedence over a regEx match, but otherwise results are unpredictable for overlapping topics.
		  * 
		  * @param {string} topic topic for this server, or a topic RegEx (e.g. '/abc.+/') to handle a set of topcis
		  * @param {object} initialState for the topic (defaults to empty struct)
		  * @param {object=} params optional parameters
		  * @param {function=} params.subscribeCallback allows server know of the subscription and accept or reject it (default is to accept)
		  * @param {function=} params.publishCallback allows server to use the publish data to form a new state (default is the publish data becomes the new state)
		  * @param {function=} params.unsubscribeCallback allows server to know of the unsubscribe, but it must be accepted
		  *
		  * @example
		  *
		  * function subscribeCallback(error, subscribe) {
		  * 		if (subscribe) {
		  * 			// must make this callback to accept or reject the subscribe (default is to accept). First parm is err and second is the initial state
		  * 			subscribe.sendNotifyToSubscriber(null, { "NOTIFICATION-STATE": "One" });
		  * 		}
		  * }
		  * function publishCallback(error, publish) {
		  * 		if (publish) {
		  * 			// must make this callback to send notify to all subscribers (if error parameter set then notify will not be sent)
		  * 			publish.sendNotifyToAllSubscribers(null, publish.data); 
		  * 		}
		  * }
		  * function unsubscribeCallback(error, unsubscribe) {
		  * 		if (unsubscribe) {
		  * 			// must make this callback to acknowledge the unsubscribe 
		  * 			unsubscribe.removeSubscriber();
		  * 		}
		  * }
		  * RouterClient.addPubSubServer("topicABC", { "State": "start" }, { subscribeCallback:subscribeCallback, publishCallback:publishCallback, unsubscribeCallback:unsubscribeCallback } );
		  *
		  *   or
		  *
		  * RouterClient.addPubSubServer("topicABC", { "State": "start" });
		  *
		  *   or
		  *
		  * RouterClient.addPubSubServer(\/topicA*\/, { "State": "start" });
		  *
		  */
			this.addPubSubServer = function (topic, initialState, params) {
				console.debug("addPubSubServer for topic " + topic);
				validate.args(topic, "any", initialState, "object=", params, "object=");
				params = params || {};
				validate.args2("params.subscribeCallback", params.subscribeCallback, "function=", "params.publishCallback", params.publishCallback, "function=") && validate.args2("params.unsubscribeCallback", params.unsubscribeCallback, "function=");
		
				var status = addPubSubServerCallBack(topic, params.subscribeCallback, params.publishCallback, params.unsubscribeCallback);
				if (status) {
					initialState = initialState || {};
					mapPubSubServerState[topic.toString()] = initialState;
					sendToRouterService(new AddPubSubServerMessage(topic.toString()));
				} else {
					console.warn("PubSub Server already locally defined for topic " + topic);
					notifyEventHandler({
						"error": "PubSub Server already locally defined for topic"
					}, null); // immediately invoke callback passing error
				}
			};
		
			/**
		  * Remove pubsub server from specified topic.
		  * 
		  * @param {string} topic
		  */
			this.removePubSubServer = function (topic) {
				console.debug("removePubSubServer for topic " + topic);
				validate.args(topic, "string");
				var status = removeServerCallBack(mapPubSubServers, topic);
				if (status) {
					delete mapPubSubServerState[topic.toString()]; // remove corresponding state
					delete mapPubSubServerRegEx[topic.toString()]; // may be a RegEx
					sendToRouterService(new RemovePubSubServerMessage(topic));
				} else {
					console.warn("removePubSubServer failed -- could not find server for topic " + topic);
				}
			};
		
			/**
		  * Subscribe to a PubSub Server.
		  * 
		  * @param {string} topic
		  * @param {function} notifyCallback
		  * @returns subscribe object used for unsubscribing
		  */
			this.subscribe = function (topic, notifyCallback) {
				console.debug("subscribe for topic " + topic);
				validate.args(topic, "string", notifyCallback, 'function');
				var subscribeID = clientID();
				addSubscriberCallBack(mapSubscribersID, subscribeID, notifyCallback, topic);
				sendToRouterService(new SubscribeMessage(subscribeID, topic));
				return { "subscribeID": subscribeID, "topic": topic };
			};
		
			/**
		  * Publish to a PubSub Server, which will trigger a corresponding Notify to be sent to all subscribers. 
		  * 
		  * @param {string} topic
		  * @param {object} event
		  */
			this.publish = function (topic, event) {
				validate.args(topic, "string", event, 'any');
				console.debug("publish to topic " + topic + " event: " + JSON.stringify(event));
				sendToRouterService(new PublishMessage(topic, event));
			};
		
			/**
		  * Unsubscribe from PubSub server.
		  * 
		  * @param {object} subscribeIDStruct
		  */
			this.unsubscribe = function (subscribeIDStruct) {
				console.debug("unsubscribe to topic " + subscribeIDStruct.topic + " for subscriberID " + subscribeIDStruct.subscribeID);
				validate.args(subscribeIDStruct, "object") && validate.args2("subscribeIDStruct.subscribeID", subscribeIDStruct.subscribeID, "string");
				var deletedSubscriber = removeSubscriberCallBack(mapSubscribersID, subscribeIDStruct.subscribeID);
				if (deletedSubscriber) {
					sendToRouterService(new UnsubscribeMessage(subscribeIDStruct.subscribeID, subscribeIDStruct.topic));
				} else {
					console.warn("unsubscribe failed -- could not find subscribeID for topic " + subscribeIDStruct.topic);
				}
			};
		
			/**
		  * @todo
		  * Removes all listeners, servers, and subscribers for this router client -- typically called when client component is shutting down (but RouterService is staying up).
		  */
			this.disconnectAll = function () {
				console.debug("disconnectAll");
		
				for (var channel in mapListeners) {
					console.debug("removing listener on " + channel);
					sendToRouterService(new RemoveListenerMessage(channel));
					delete mapListeners[channel];
				}
		
				for (var serverChannel in mapServers) {
					console.debug("removing server on " + serverChannel);
					sendToRouterService(new RemoveServerMessage(serverChannel));
					delete mapServers[serverChannel];
				}
		
				for (var topic in mapPubSubServers) {
					console.debug("removing pubsub server on " + topic);
					sendToRouterService(new RemovePubSubServerMessage(topic));
					delete mapPubSubServers[topic.toString()]; // could be a RegEx
					delete mapPubSubServerState[topic.toString()]; // remove corresponding state
					delete mapPubSubServerRegEx[topic.toString()]; // may be a RegEx
				}
		
				for (var subscribeID in mapSubscribersID) {
					var stopic = mapSubscribersTopic[subscribeID];
					console.debug("removing subscriber on " + stopic);
					sendToRouterService(new UnsubscribeMessage(subscribeID, stopic));
					delete mapSubscribersID[subscribeID];
					delete mapSubscribersTopic[subscribeID];
				}
			};
		
			constructor(thisClientName, transportName); // on creation invoke to initialize
		};
		
		module.exports = RouterClientConstructor;
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		
		"use strict";
		
		var Utils = __webpack_require__(2);
		var console = new Utils.Console("RouterTransport"); // Finsemble console
		
		var openfinAppConfig; // config used to determine if cross-domain
		if (window.location.hostname === "localhost") {
			// if localhost then using desktop-local config
			console.debug("desktop-local config");
			openfinAppConfig = __webpack_require__(6);
		} else {
			// else using desktop-app config
			console.debug("desktop-app config");
			openfinAppConfig = __webpack_require__(7);
		}
		
		/**
		 * @introduction
		 * <h2>Router Transport</h2>
		 * **Service-Level Module**.  Manages and contains the point-to-point transports (i.e. Layer 2) supported by Finsemble.
		 * Each transport communicates betweew a Finsemble services or component (on one end) and the Finsemble router (on the other end).
		 *
		 * The OpenFinBus transport is used for cross-domain components (where SharedWorker fails).
		 *
		 * Requirements for adding a new transport:
		 * 1) create new transport object with same interface provided by SharedWorkerTransport and OpenFinTransport in this file.
		 * 2) call RouterTransport.addTransport() to make the transport available (see the bottom of this file)
		 *
		 * Integration into routerService.js is automatic.
		 *
		 * @namespace RouterTransport
		 */
		var RouterTransport = {
		
			activeTransports: {},
		
			/**
		  * Adds a new type of router transport to pass message between RouterClient and RouterService. 
		  * 
		  * @param {string} transportName identifies the new transport
		  * @param {object} transportConstructor returns an instance of the new transport
		  */
			addTransport: function addTransport(transportName, transportConstructor) {
				this.activeTransports[transportName] = transportConstructor;
				console.info("RouterTransport added: " + transportName);
			},
		
			/**
		  * Gets array of active transports
		  * 
		  * @returns array transport names/identifier
		  */
			getActiveTransports: function getActiveTransports() {
				var transportNames = [];
				for (var transportIdentifier in this.activeTransports) {
					transportNames.push(transportIdentifier);
				}
				return transportNames;
			},
		
			/**
		  * Get best client transport based on the run-time context. Will only return cross-domain transport if current context is inter-domain.  
		  * 
		  * @param {any} incomingMessageHandler
		  * @param {any} source
		  * @param {any} destination
		  * @returns the transport object
		  */
			getRecommendedTransport: function getRecommendedTransport(incomingMessageHandler, source, destination) {
				var newTransport; // return variable
		
				// Will tell you if the window is in an iframe or not (for future)
				function isInIframe() {
					try {
						return window.self !== window.top;
					} catch (e) {
						return true;
					}
				}
		
				// returns true if this window's location is in another domain 
				function crossDomain() {
					var parser = document.createElement('a');
					parser.href = openfinAppConfig.startup_app.url;
		
					var isSameHost = window.location.hostname === parser.hostname;
					console.debug("Transport crossDomain host comparison:" + window.location.hostname + "==" + parser.hostname);
		
					var isSameProtocol = window.location.protocol === parser.protocol;
					console.debug("Transport crossDomain protocol comparison:" + window.location.protocol + "==" + parser.protocol);
		
					var wport = window.location.port === undefined ? window.location.port : 80;
					var pport = parser.port === undefined ? parser.port : 80;
					var isSamePort = wport === pport;
					console.debug("Transport crossDomain port comparison:" + wport + "==" + pport);
		
					var isCrossDomain = !(isSameHost && isSamePort && isSameProtocol);
					console.debug("Transport crossDomain=" + isCrossDomain + " (" + isSameHost + ":" + isSameProtocol + ":" + isSamePort + ")");
					return isCrossDomain;
				}
		
				// returns the best transport to communicating with router service		
				function recommendedTransportName() {
					var recommendedName = "SharedWorker"; // default -- fast but doesn't work cross-domain
					if (crossDomain()) {
						recommendedName = "OpenFinBus"; // required for cross-domain event messaging between windows
					}
					return recommendedName;
				}
		
				var transportName = recommendedTransportName();
				var transportConstructor = this.activeTransports[transportName];
				if (transportConstructor) {
					newTransport = new transportConstructor(transportName, incomingMessageHandler, source, destination);
				}
				return newTransport;
			},
		
			/**
		  * Get a specific transport by name. The transport must be in list of the active transports (i.e. previously added).
		  * 
		  * @param {any} transportName
		  * @param {any} incomingMessageHandler
		  * @param {any} source
		  * @param {any} destination
		  * @returns the transport object
		  */
			getTransport: function getTransport(transportName, incomingMessageHandler, source, destination) {
				var transportConstructor = this.activeTransports[transportName];
				if (transportConstructor) {
					var newTransport = new transportConstructor(transportName, incomingMessageHandler, source, destination);
				}
				return newTransport;
			}
		};
		
		//////////////////////////////////////////////////////////////
		// Below all transports are defined then added to active list
		//////////////////////////////////////////////////////////////
		
		var RouterTransportImplementation = {}; // a convenience namespace for router-transport implementations
		
		/*
		 * Implements the SharedWorker Transport.
		 * 
		 * Required Functions (used by transport clients):
		 * 		send(eventMessage) -- transports the event 
		 * 		identifier() -- returns transport name/identifier
		 * 
		 *  @param {object=} name the name the transport will be reference by
		 *  @param {any} parentMessageHandlerParm callback for incoming event
		 */
		RouterTransportImplementation.SharedWorkerTransport = function (name, parentMessageHandlerParm, source) {
			var parentMessageHandler;
			var routerThread;
			var transportName;
			var console = new Utils.Console("SharedWorkerTransport." + source); // Finsemble console
		
			// receives incoming shared-worker messages then passes on to parent with correct "wrapper"
			function sharedWorkerMessageHandler(swMessage) {
				var port = swMessage.data[0];
				var eventMessage = swMessage.data[1];
				var incomingTransportInfo = { "transportID": transportName, "port": port };
				console.debug("IncomingTransport: " + JSON.stringify(incomingTransportInfo) + " Message: " + JSON.stringify(eventMessage), 5);
				parentMessageHandler(incomingTransportInfo, eventMessage);
			}
		
			//required function for parent (i.e. routeClient or routeService)
			this.send = function (transport, eventMessage) {
				// handle optional transport parm
				if (arguments.length === 1) {
					transport = null;
					eventMessage = arguments[0];
				} else {
					transport = arguments[0];
					eventMessage = arguments[1];
				}
				console.debug("OutgoingTransport: " + " Transport: " + JSON.stringify(transport) + " Message: " + JSON.stringify(eventMessage), 5);
				routerThread.port.postMessage([transport, eventMessage]);
			};
		
			//required function for parent (i.e. routeClient or routeService)
			this.identifier = function () {
				return transportName;
			};
		
			console.debug("SharedWorker Initializing: " + source);
			transportName = name;
			parentMessageHandler = parentMessageHandlerParm;
			routerThread = new SharedWorker("/common/routerSharedWorker.js", "Finsemble");
			routerThread.port.onmessage = sharedWorkerMessageHandler;
			routerThread.onerror = function (e) {
				console.error("RouteClient SharedWorker Error" + JSON.stringify(e));
			};
			routerThread.port.start();
		
			if (source === "RouterService") {
				// send first message though shared worker to identify router service
				routerThread.port.postMessage({ data: "connect", source: "RouterService" });
			}
		};
		
		/*
		 * Implements the OpenFin Bus Transport.
		 * 
		 * Required Functions (used by transport clients):
		 * 		send(event) -- transports the event 
		 * 		identifier() -- returns transport name/identifier
		 * 
		 *  @param {any} name -- the name the transport will be reference by
		 *  @param {any} parentMessageHandlerParm -- callback for incoming event
		 */
		RouterTransportImplementation.OpenFinTransport = function (name, parentMessageHandlerParm, source, destination) {
			var parentMessageHandler;
			var transportName;
			var console = new Utils.Console("OpenFinTransport." + source); // Finsemble console
		
			// receives incoming OpenFin bus messages then passes on to parent with correct "wrapper"
			function openFinMessageHandler(eventMessage, senderUuid, name) {
				var incomingTransportInfo = { "transportID": transportName, "senderUuid": senderUuid, "name": eventMessage.header.origin };
				console.debug("IncomingTransport: " + JSON.stringify(incomingTransportInfo) + " Message: " + JSON.stringify(eventMessage), 5);
				parentMessageHandler(incomingTransportInfo, eventMessage);
			}
		
			function subscribeFailure(reason) {
				console.error("OpenFinBus Subscribe Failure: " + reason);
			}
		
			//required function for the parent (i.e. routeClient or routeService)
			this.send = function (transport, eventMessage) {
				var destTopic;
		
				// handle optional transport parm
				if (arguments.length === 1) {
					destTopic = destination;
					eventMessage = arguments[0];
				} else {
					destTopic = transport.name;
					eventMessage = arguments[1];
				}
		
				console.debug("OutgoingTransport: " + destTopic + " Message: " + JSON.stringify(eventMessage), 5);
				fin.desktop.InterApplicationBus.send("ChartIQ", destTopic, eventMessage);
			};
		
			//required function for the parent (i.e. routeClient or routeService)
			this.identifier = function () {
				return transportName;
			};
		
			transportName = name;
			parentMessageHandler = parentMessageHandlerParm;
			console.debug("OpenFinBus Initializing: " + source);
			fin.desktop.InterApplicationBus.subscribe("ChartIQ", source, openFinMessageHandler, null, subscribeFailure);
		};
		
		// add the transports to the available/active list
		RouterTransport.addTransport("SharedWorker", RouterTransportImplementation.SharedWorkerTransport);
		RouterTransport.addTransport("OpenFinBus", RouterTransportImplementation.OpenFinTransport);
		
		module.exports = RouterTransport;
	
	/***/ },
	/* 6 */
	/***/ function(module, exports) {
	
		module.exports = {
			"FSBL": {
				"main_component": {
					"url": "http://localhost/components/toolbar/toolbar.html",
					"name": "Launcher"
				}
			},
			"devtools_port": 9090,
			"startup_app": {
				"name": "ChartIQ Local",
				"url": "http://localhost/components/serviceManager/serviceManager.html",
				"uuid": "ChartIQ",
				"applicationIcon": "http://localhost/components/assets/img/CIQ_Taskbar_Icon.png",
				"defaultTop": 0,
				"defaultLeft": 0,
				"showTaskbarIcon": true,
				"autoShow": true,
				"frame": false,
				"resizable": false,
				"maximizable": false,
				"delay_connection": true,
				"contextMenu": true,
				"cornerRounding": {
					"width": 4,
					"height": 4
				},
				"alwaysOnTop": false,
				"frameConnect": "main-window",
				"customData": {
					"finsemble": {
						"services": {
							"beforeLaunch": [],
							"workers": []
						}
					}
				}
			},
			"runtime": {
				"arguments": "--noerrdialogs  --v=1",
				"version": "stable"
			},
			"shortcut": {
				"company": "ChartIQ",
				"description": "ChartIQ Local",
				"icon": "http://localhost/components/assets/img/CIQ_Taskbar_Icon.ico",
				"name": "ChartIQ - LOCAL",
				"target": [
					"desktop",
					"start-menu"
				],
				"force": false,
				"startMenuRootFolder": "ChartIQ Local"
			},
			"dialogSettings": {
				"logo": "http://localhost/components/assets/img/ciq-banner-100x25.png",
				"bgColor": 4280798349,
				"textColor": 4293521652,
				"progressBarBgColor": 4294967295,
				"progressBarFillColor": 4282684881,
				"progressBarBorderColor": 4293521652
			},
			"supportInformation": {
				"company": "ChartIQ",
				"product": "ChartIQ Desktop",
				"email": "support@chartiq.com"
			},
			"fileName": "ChartIQ-local-installer"
		};
	
	/***/ },
	/* 7 */
	/***/ function(module, exports) {
	
		module.exports = {
			"FSBL": {
				"main_component": {
					"url": "http://finsemble.chartiq.com/components/toolbar/toolbar.html",
					"name": "Launcher"
				}
			},
			"devtools_port": 9090,
			"startup_app": {
				"name": "ChartIQ",
				"url": "http://finsemble.chartiq.com/components/serviceManager/serviceManager.html",
				"uuid": "ChartIQ",
				"applicationIcon": "http://finsemble.chartiq.com/components/assets/img/CIQ_Taskbar_Icon.png",
				"defaultTop": 0,
				"defaultLeft": 0,
				"showTaskbarIcon": true,
				"autoShow": false,
				"frame": false,
				"resizable": false,
				"maximizable": false,
				"delay_connection": true,
				"cornerRounding": {
					"width": 4,
					"height": 4
				},
				"alwaysOnTop": true,
				"frameConnect": "main-window"
			},
			"runtime": {
				"arguments": "--v=1",
				"version": "stable"
			},
			"shortcut": {
				"company": "ChartIQ",
				"description": "ChartIQ",
				"icon": "http://finsemble.chartiq.com/components/assets/img/CIQ_Taskbar_Icon.ico",
				"name": "ChartIQ",
				"target": [
					"desktop",
					"start-menu"
				],
				"force": false,
				"startMenuRootFolder": "ChartIQ"
			},
			"dialogSettings": {
				"logo": "http://finsemble.chartiq.com/components/assets/img/ciq-banner-100x25.png",
				"bgColor": 4280798349,
				"textColor": 4293521652,
				"progressBarBgColor": 4294967295,
				"progressBarFillColor": 4282684881,
				"progressBarBorderColor": 4293521652
			},
			"supportInformation": {
				"company": "ChartIQ",
				"product": "ChartIQ Desktop",
				"email": "support@chartiq.com"
			},
			"fileName": "ChartIQ-installer"
		};
	
	/***/ },
	/* 8 */
	/***/ function(module, exports) {
	
		"use strict";
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		
		/**
		 * @introduction
		 * <h2>Finsemble Vaidate Functions</h2>
		 * 
		 * @class Validate
		 */
		
		/**
		 * Constructor for Finsemble argment validator.
		 *
		 * Validatation logic is ONLY RAN when the console diagnotics level is set to debug (i.e. 4 or above)
		 * A failed validation will generate a warning message, but nothing more; however application logic can check the validation results.
		 *
		 * @param {string} console Finsemble console object used to display messages and check diagnotic level
		 * @memberof Utils
		 * @constructor
		 */
		var Validate = function Validate(console) {
		
			function warningMsg(paramDescript, thisArg, thisArgType) {
		
				function getErrorObject() {
					try {
						throw Error('');
					} catch (err) {
						return err;
					}
				}
		
				var err = getErrorObject();
		
				var caller_line1 = err.stack.split("\n")[5];
				var index1 = caller_line1.indexOf("at ");
				var msgPart1 = caller_line1.slice(index1 + 2, caller_line1.length);
		
				var caller_line2 = err.stack.split("\n")[6];
				var index2 = caller_line2.indexOf("at ");
				var msgPart2 = caller_line2.slice(index2 + 2, caller_line2.length);
		
				console.warn("parameter validation failed: parameter " + paramDescript + " is of type '" + (typeof thisArg === "undefined" ? "undefined" : _typeof(thisArg)) + "' but should be of type '" + thisArgType + "' in" + msgPart1 + " called by" + msgPart2);
			}
		
			/**
		  * Confirm parameters are valid. A variable number of parameter pairs are supported. 
		  * @param {any} param1 is arg to validate
		  * @param {string} paramType1 is required type for parameter (if '=' suffix then parameter is optional). "any" represents any type (but not "undefined"). 
		  * @param {any=} param2 is next arg to validate
		  * @param {string=} paramType2 os required type for next arg 
		  * @return {boolean} returns turn if parameter list is valid; otherwise, false.
		  *
		  * @example
		  *
		  * var validate = new Validate(console); 
		  * validate.args(name, "string", age, "number")
		  *
		  * validate.args(topic, "string", initialState, "object="); // with optional paramter (represented by "=")
		  *
		  * validate.args(topic, "string", initialState, "any"); // with "any" type
		  *
		  * validate.args(subscribeIDStruct, "object") && validate.args(subscribeIDStruct.subscribeID, "string"); // only do second varidate if first test successful
		  *
		  * validate.args(subscribeIDStruct, "object", subscribeIDStruct.subscribeID, "string"); // only check second parm if first validated successful
		  *
		  * validate.args(topic, "any", initialState, "object=", params, "object="); // depending on logic, can break into seperate validations
		  * params = params || {}; 
		  * validate.args(params.subscribeCallback, "function=", params.publishCallback, "function=", params.unsubscribeCallback, "function=");
		  */
			this.args = function (param1, paramType1, param2, paramType2 /*.....optional more paramter pairs....*/) {
				var returnCode = true;
				/*if (console.getLevel() >= 4) {
		  	var parmCount = arguments.length;
		  	if ((parmCount + 1) % 2 !== 0) { // parameters must come in pairs (i.e. even number)
		  		for (var i = 0; i < parmCount; i = i + 2) {
		  			var optionalArg = false;
		  			var thisArg = arguments[i];
		  			var thisArgType = arguments[i + 1];
		  			if (thisArgType.slice(-1) === "=") { // if last char is "=" then optional argument
		  				thisArgType = thisArgType.slice(0, -1);
		  				optionalArg = true;
		  			}
		  			if (typeof (thisArg) !== thisArgType) { // confirms basic case -- the required type
		  				if (!optionalArg || typeof (thisArg) !== "undefined") { // but optional parms can be undefined
		  					if (typeof (thisArg) === "undefined" || thisArgType !== "any") { // but "any" type doesn't have to match but can't be undefined
		  						var parameterPosition = (i / 2) + 1;
		  						warningMsg(parameterPosition, thisArg, thisArgType);
		  						returnCode = false;
		  						break;
		  					}
		  				}
		  			}
		  		}
		  	} else {
		  		console.warn("verifyParmas requires even number of parameters: " + JSON.stringify(arguments));
		  	}
		  }*/
				return returnCode; // always return turn when validation is disable due debug lebel turned off 
			};
		
			/**
		  * Confirm parameters are valid. args2() has the same functionality as args() except a third "parameter description" is passed in for each argument varified
		  * Typically this for passing in a properties name for better diagnostic messages when varifying object properties.
		  * A variable number of parameter "triples"" are supported.
		  *
		  * @param {string} paramName1 is descriptive name of param1 (for diagnostic message)
		  * @param {any} param1 is arg to validate
		  * @param {string} paramType1 is required type for parameter (if '=' suffix then parameter is optional). "any" represents any type (but not "undefined").
		  * @param {string} paramName2 is descriptive name of param1 (for diagnostic message)
		  * @param {any} param2 is arg to validate
		  * @param {string} paramType2 is required type for parameter (if '=' suffix then parameter is optional). "any" represents any type (but not "undefined"). 
		  * @return {boolean} returns turn if parameter list is valid; otherwise, false.
		  *
		  * @example
		  *
		  * var validate = new Utils.Validate(console); 
		  * validate.args2("record.name", record.name, "string", "record.age", age, "number")
		  *
		  * // common case using args() and args2() together
		  * validate.args(topic, "any", initialState, "object=", params, "object=") &&
		  *   validate.args2("params.subscribeCallback", params.subscribeCallback, "function=", "params.publishCallback", params.publishCallback, "function=") &&
		  *   validate.args2("params.unsubscribeCallback", params.unsubscribeCallback, "function=");
		  */
			this.args2 = function (paramName1, param1, paramType1, paramName2, param2, paramType2 /*.....optional, more paramter sets of three....*/) {
		
				var returnCode = true;
				/*if (console.getLevel() >= 4) {
		  	var parmCount = arguments.length;
		  	if ((parmCount + 1) % 3 !== 0) { // parameters must come in sets of three 
		  		for (var i = 0; i < parmCount; i = i + 3) {
		  			var optionalArg = false;
		  			var thisArgName = arguments[i];
		  			var thisArg = arguments[i + 1];
		  			var thisArgType = arguments[i + 2];
		  			if (thisArgType.slice(-1) === "=") { // if last char is "=" then optional argument
		  				thisArgType = thisArgType.slice(0, -1);
		  				optionalArg = true;
		  			}
		  			if (typeof (thisArg) !== thisArgType) { // confirms basic case -- the required type
		  				if (!optionalArg || typeof (thisArg) !== "undefined") { // but optional parms can be undefined
		  					if (typeof (thisArg) === "undefined" || thisArgType !== "any") { // but "any" type doesn't have to match but can't be undefined
		  						var parameterPosition = (i / 2) + 1;
		  						warningMsg(thisArgName, thisArg, thisArgType);
		  						returnCode = false;
		  						break;
		  					}
		  				}
		  			}
		  		}
		  	} else {
		  		console.warn("verifyParmas requires even number of parameters: " + JSON.stringify(arguments));
		  	}
		  }*/
				return returnCode; // always return turn when validation is disable due debug lebel turned off 
			};
		};
		
		module.exports = Validate;
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var Utils = __webpack_require__(2);
		var console = new Utils.Console("StorageClient"); // Finsemble console
		var Validate = __webpack_require__(8); // Finsemble args validator
		var validate = new Validate(console);
		
		/**
		 * 
		 * Public API for The Storage Service
		 * StorageClient.[storageType].action(name,[data],cb);
		 */
		var RouterClient = __webpack_require__(3);
		var BaseClient = __webpack_require__(10);
		/**
		 *  @todo add clear method
		 *  @example
		 *
		 * // Save a key value pair to local storage
		 * FSBL.StorageClient.save("localStorage","testKey","testValue")
		 * // Save a key value pair to the default storage
		 * FSBL.StorageClient.save(,"testKey","testValue")
		 * // Get an value from local storage
		 * FSBL.StorageClient.get("localStorage","testKey",)
		 * // Get an value from the default storage
		 * FSBL.StorageClient.get(testKey")
		 * //Delete a value from local storage
		 * FSBL.StorageClient.delete("localStorage","testKey")
		 * //Delete a value from the default storage
		 * FSBL.StorageClient.delete("testKey")
		 * 
		 * 
		 * @constructor
		 */
		var StorageClient = function StorageClient(params) {
			validate.args(params, "object=") && params && validate.args2("params.onReady", params.onReady, "function=");
			var self = this;
			BaseClient.call(this, params);
			this.RouterClient = RouterClient;
			var defaultStorage = null;
			//should probably come from some config;
			var storageTypes = ["localStorage"];
			this.startup = function () {};
			function loadStorageTypes() {
				function loadType(type) {
					if (!self[type]) {
						self[type] = {};
					}
					self[type]["save"] = function (name, data, cb) {
						self.save(type, name, data, cb);
					};
					self[type]["get"] = function (name, cb) {
						self.get(type, name, cb);
					};
					self[type]["delete"] = function (name, cb) {
						self.delete(type, name, cb);
					};
				}
				for (var i = 0; i < storageTypes.length; i++) {
					loadType(storageTypes[i]);
				}
				defaultStorage = "localStorage";
			}
		
			/**
		  * Save a key value pair into storage.
		  * @param {(string|object)=} [storageType] -  The storage type to use. If ommitted, the default storage is used
		  * @param {string} name - The key to be stored under
		  * @param {any} data -  the value to be stored
		  * @param {function=} [cb] -  callback to be called on success
		  * 
		  * @example
		  * StorageClient.save("localStorage","testKey","testValue")
		  */
			this.save = function (storageType, name, data, cb) {
				//use the first storage if no type is given
				if (arguments.length < 4 && typeof data === "function") {
					cb = arguments[2];
					data = arguments[1];
					name = arguments[0];
					storageType = defaultStorage;
				}
				validate.args(storageType, "any", name, "string", data, "any", cb, "function=");
				self.RouterClient.query('Storage.save', { storageType: storageType, name: name, payload: data }, function (err, response) {
					if (cb) {
						cb(err, response);
					}
				});
			};
		
			/**
		  * Get a value from storage.
		  * @param {(string|object)=} [storageType] -  The storage type to use. If ommitted, the default storage is used
		  * @param {string} name - The key to pull from storage
		  * @param {function} [cb] -  callback to be called on success
		  * 
		  * @todo use default
		  * @example
		  * StorageClient.get("localStorage","testKey")
		  */
			this.get = function (storageType, name, cb) {
				if (arguments.length < 3 && typeof name === "function") {
					cb = arguments[1];
					name = arguments[0];
					storageType = defaultStorage;
				}
				validate.args(storageType, "string", name, "string", cb, "function=");
				self.RouterClient.query('Storage.get', { storageType: storageType, name: name }, function (err, response) {
					console.log('clienterr', err);
					if (cb) {
						cb(err, response);
					}
				});
			};
		
			this.getMultiple = function (storageType, query, cb) {
				if (arguments.length < 3 && typeof query === "function") {
					cb = arguments[1];
					query = arguments[0];
					storageType = defaultStorage;
				}
				self.RouterClient.query('Storage.getMultiple', { storageType: storageType, query: query }, function (err, response) {
					console.log('clienterr', err, response);
					if (cb) {
						cb(err, response);
					}
				});
			};
		
			/**
		  * Delete a value from storage.
		  * @param {(string|object)=} [storageType] -  The storage type to use. If ommitted, the default storage is used
		  * @param {string} name - The key to delete from storage
		  * @param {function} [cb] -  callback to be called on success
		  * @todo use default
		  * @example
		  * StorageClient.get("localStorage","testKey")
		  */
			this.delete = function (storageType, name, cb) {
				if (arguments.length < 3 && typeof name === "function") {
					cb = arguments[1];
					name = arguments[0];
					storageType = defaultStorage.keys[0];
				}
				validate.args(storageType, "any", name, "string", cb, "function=");
				self.RouterClient.query('Storage.delete', { storageType: storageType, name: name }, function (err, response) {
					if (cb) {
						cb(err, response);
					}
				});
			};
			//Load the storage types
			loadStorageTypes();
		};
		
		var storageClient = new StorageClient({
			onReady: function onReady(cb) {
				storageClient.startup();
				console.log("storage online");
				cb();
			},
			name: "storageClient"
		});
		storageClient.requiredServices = [];
		storageClient.initialize();
		module.exports = storageClient;
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var Utils = __webpack_require__(2);
		var console = new Utils.Console("BaseClient"); // Finsemble console
		var Validate = __webpack_require__(8); // Finsemble args validator
		var validate = new Validate(console);
		
		var Client = function Client(params) {
			validate.args(params, "object=");
			var self = this;
			var status = "offline";
			var onReady;
			this.name;
			if (params) {
				onReady = params.onReady;
				this.name = params.name;
			}
			this.finWindow = fin.desktop.Window.getCurrent();
			this.clientName = this.finWindow.name; //The current window
		
			this.routerClient = __webpack_require__(3);
			this.requiredServices = [];
			this.onlineServices = [];
		
			this.addServices = function (services) {
				validate.args(services, "any");
				if (!services) {
					return;
				}
				if (!Array.isArray(services)) {
					services = [services];
				}
				for (var i = 0; i < services.length; i++) {
					if (this.onlineServices.indexOf(services[i]) === -1) {
						this.onlineServices.push(services[i]);
					}
				}
				this.checkRequiredServices();
			};
			this.checkRequiredServices = function () {
				for (var i = 0; i < this.requiredServices.length; i++) {
		
					if (this.onlineServices.indexOf(this.requiredServices[i]) > -1) {
						this.requiredServices.splice(i, 1);
						i--;
					}
				}
				this.checkOnline();
			};
			this.checkOnline = function () {
				var self = this;
				if (status === "online") {
					return;
				}
				if (this.requiredServices.length === 0) {
		
					if (onReady) {
						return onReady(function () {
							status = "online";
							self.routerClient.transmit(self.clientName + "FSBLClient", self.name);
						});
					}
				}
			};
			this.initialize = function () {
				setup();
				this.checkRequiredServices();
			};
			function setup() {
				self.routerClient.query("ServiceManager.getServices", {}, function (err, event) {
					self.addServices(event.data);
				});
				self.routerClient.addListener("ServiceManager.serviceOnline", function (err, event) {
					self.addServices(event.data);
				});
			};
		};
		
		module.exports = Client;
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var RouterClient = __webpack_require__(3);
		var BaseClient = __webpack_require__(10);
		var util = __webpack_require__(2);
		var console = new util.Console("BaseClient"); // Finsemble console
		var Validate = __webpack_require__(8); // Finsemble args validator
		var validate = new Validate(console);
		
		/**
		 * Finsemble windowDescriptor. This is a superset of the Openfin Window object.
		 * @typedef {Object} windowDescriptor
		 * @property {string} url url to load.
		 * @property {number} defaultTop Top pixel of the window. The top left of the screen is 0.
		 * @property {number} defaultLeft Left edge of the window.
		 * @property {number} defaultWidth Window width.
		 * @property {number} defaultHeight Window height
		 * @property {boolean} [showTaskbarIcon=true] Whether to show the icon in the taskbar.
		 * @property {number} [minWidth=0] Minimum width that the window can be resized to.
		 * @property {number} [minHeight=0] Minimum height that the window can be resized to.
		 * @property {boolean} [autoShow=true] Whether the window should render in the background. If this option is set to false, you must tell the window to show itself at some point. You can use {@link WindowClient#show}.
		 * @property {boolean} [frame=false] Whether the window should be rendered with a sytem frame. 
		 * @property {boolean} [resizable=true] Whether the window can be resized.
		 * @property {boolean} [maximizable=true] Whether the window can be maximized.
		 * @property {boolean} [alwaysOnTop=false] Whether the window should always sit on top of other finsemble windows.
		 * @property {boolean} [fixedPosition=false] Whether the window should remain where it was spawned.
		 * @property {Object} [resizeRegion] 
		 * @property {number} [resizeRegion.size=10]
		 * @property {number} [resizeRegion.bottomCorner= 10]
		 */
		
		/**
		 * "Private" properties of the windowDescriptor
		 * @private @property @todo { boolean } [hoverFocus = false]
		 * @private @property {boolean} [saveWindowState=false] Openfin window state saving. Don't want to
		 * have them saving the window state since we are.Turning this to true is untested.Do not change.
		 */
		
		/**
		 * 
		 * The launcher client handles spawning windows for the application.
		 * @constructor
		 */
		function LauncherClient(params) {
			validate.args(params, "object=") && params && validate.args2("params.onReady", params.onReady, "function=");
		
			/** @alias LauncherClient# */
			var self = this;
			BaseClient.call(this, params);
		
			/**
		  * Get a list of available components. This is useful if you need to list all of your components (e.g., in a toolbar).
		  * @param {Function} cb Callback to be invoked after function is completed.
		  * @example <caption>Something like this could be done to retrieve the list of components inside of something like a Toolbar or a launcher.</caption>
		  * var self=this; 
		  * FSBL.LauncherClient.getComponentList(function(err, data){
		  *	self.setState({
		 	componentList: data
		  });
		  * });
		  */
			this.getComponentList = function (cb) {
				validate.args(cb, "function");
		
				RouterClient.query('Launcher.componentList', {}, function (err, response) {
					if (cb) {
						cb(err, response.data);
					}
				});
			};
			/**
		  * Get the defaults for an individual component.
		  * @param {String} componentType The type of the component you are looking for
		  * @param {Function} cb Callback to be invoked after function is completed.
		  * @example
		  * FSBL.launcherClient.getComponentInfo('Advanced Chart', function(err, data){
		  *	//do something with the default values for Advanced chart.
		  * });
		  */
			this.getComponentInfo = function (componentType, cb) {
				validate.args(cb, "function");
				console.log("getComponentInfo " + componentType);
				RouterClient.query('Launcher.componentList', {}, function (err, response) {
					window.console.log("got the info", err, response, cb);
					if (cb) {
						cb(err, response.data[componentType]);
					}
				});
			};
		
			/**
		  * Asks the Launcher service to spawn a window. The examples below show the basic functionality that the launcher offers. Please see the [Window Spawning]{@tutorial spawningWindows} tutorial for advanced functionality.
		  * @param {String} component - Type of the component to launch
		  * @param {Object} params Properties to merge with the default windowDescriptor.
		  * @param {Function=} cb Callback to be invoked after function is completed.'
		  *
		  * @example
		  * //Spawns an advanced chart with the default positioning.
		  * FSBL.LauncherClient.spawn("Advanced Chart");
		  * //Spawns an advanced chart in the center of the monitor from where the spawn call originated. If A component on monitor 3 invokes Spawn and passes in a <code>defaultLeft</code> of 'center', it will spawn on monitor 3.
		  * FSBL.LauncherClient.spawn("Advanced Chart", {
		  * 	defaultLeft: 'center',
		  * 	defaultTop: 'center'
		  * });
		  */
			this.spawn = function (component, params, cb) {
				params.component = component;
				if (!params.customData) {
					params.customData = {};
				}
				if (!params.customData.monitorDimensions) {
		
					return util.retrieveMonitorDimensions(function (err, dims) {
						window.console.log("dims", dims);
						params.customData.monitorDimensions = dims.monitorDimensions;
						window.console.log("params", params);
						callSpawn(params, cb);
					});
				}
				callSpawn(params, cb);
			};
			function callSpawn(params, cb) {
				RouterClient.query('Launcher.spawn', params, function (err, response) {
					if (cb) {
						setTimeout(function () {
							cb(err, response);
						}, 0);
					}
				});
			}
			/**
		 * Spawns a new openfin window.
		 * @param {string} windowName	The name of the window you are looking for
		 * @param {function} cb Callback
		 */
			this.getWindow = function (windowName, cb) {
				RouterClient.query('Launcher.getWindow', windowName, function (err, response) {
					if (cb) {
						cb(err, response);
					}
				});
			};
			/**
		 * Spawns a new openfin window.
		 * @param {string} windowName	The name of the window you are looking for
		 * @param {function} cb Callback
		 */
			this.isWindowOpen = function (windowName, cb) {
				RouterClient.query('Launcher.isWindowOpen', windowName, function (err, response) {
					if (cb) {
						cb(err, response);
					}
				});
			};
		
			this.getActiveDescriptors = function (cb) {
				RouterClient.query('Launcher.getActiveDescriptors', {}, function (err, response) {
					if (cb) {
						cb(err, response);
					}
				});
			};
			/**
		 * Spawns a new openfin window.
		 * @param {object} params	The name of the window you are looking for
		 * @param {object} params.monitorDimensions
		 * @param {number} params.width
		 * @param {number} params.hight
		 * @param {number} [params.widnow]
		 * @param {function} cb Callback
		 */
			this.moveWindowCenter = function (params) {
				if (!params.monitorDimensions) {
					return;
				}
				var centerTop = (params.monitorDimensions.height - params.height) / 2;
				var centerLeft = (params.monitorDimensions.width - params.width) / 2;
				window.console.log(params, centerTop, centerLeft + params.monitorDimensions.left);
				if (!params.window) {
					return fin.desktop.Window.getCurrent().moveTo(centerLeft + params.monitorDimensions.left, centerTop);
				}
				console.log("move this window");
				return params.window.moveTo(centerLeft + params.monitorDimensions.left, centerTop, function () {
					params.window.bringToFront();
				});
			};
			return this;
		};
		
		var launcherClient = new LauncherClient({
			onReady: function onReady(cb) {
				cb();
			},
			name: "launchClient"
		});
		launcherClient.requiredServices = [];
		launcherClient.initialize();
		
		module.exports = launcherClient;
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=FrontEnd.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=testService.js.map