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

	var FSBL = __webpack_require__(1);
	var path = __webpack_require__(2);
	var testClient = __webpack_require__(4);
	
	FSBL.addClient('TestClient', testClient);
	FSBL.useClients(['WindowClient', 'TestClient']);
	
	FSBL.initialize();
	
	var myComponent = {};
	module.exports = myComponent;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["FSBL"] = factory();
		else
			root["FSBL"] = factory();
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
	
		var Utils = __webpack_require__(1);
		var Validate = __webpack_require__(3);
		
		var FronEndLib =function(){
			var self = this;
			var onlineClients = [];
			var clients = [];
			var status = "offline";
			var windowName = fin.desktop.Window.getCurrent().name;
			this.RouterClient = __webpack_require__(4);
			
		
			this.baseService = __webpack_require__(9);
			this.Utils = Utils;
			this.Validate = Validate;
			this.Clients = {
				RouterClient: this.RouterClient,
				StorageClient: __webpack_require__(10),
				LauncherClient: __webpack_require__(12),
				LinkerClient: __webpack_require__(13),
				WindowClient: __webpack_require__(14),
				WorkspaceClient: __webpack_require__(15),
				DialogManager: __webpack_require__(16),
				BaseClient: __webpack_require__(11)
			};
			this.addClient =function(name, obj){
				if (!this.Clients[name]) {
					this.Clients[name] = obj;
				}
			};
			this.useClients=function(clientList){
				for(var i =0;i<clientList.length;i++){
					if(this.Clients[clientList[i]] && clients.indexOf(clients[i]) === -1){
						clients.push(clientList[i]);
					}
				}
			};
			this.useAllClients=function(){
				for(var key in this.Clients){
					if(clients.indexOf(key) === -1){
						if(!this.Clients[key].initialize){continue;}//hack for now
						clients.push(key);
					}
				}
			};
		
			this.initialize = function(cb){
				this.RouterClient.addListener(windowName + "FSBLClient",function(err,data){
					if(err){return console.error(err);}
					self.setClientOnline(data.data);
				});
				if(clients.length === 0) {return cb;}
				this.addEventListener("onReady",cb);
				for(var i=0;i<clients.length;i++){
					console.log("clients[i]",clients[i]);
					this.Clients[clients[i]].initialize();
				}
			};
			
			this.setClientOnline = function (clientName) {
				Validate.args(clientName, "string");
				console.log('Client Online: ' + clientName);
				if (onlineClients.indexOf(clientName) === -1) {
					onlineClients.push(clientName);
				}
				console.log(onlineClients.length ,clients.length);
				if (onlineClients.length ===clients.length) {
					status = "online";
		
					if (this.listeners.onReady) {				
						for (var i = 0; i < this.listeners.onReady.length; i++){
							this.listeners.onReady[i]();										
						}
						this.listeners.onReady = [];
					}
				}
			};
			this.listeners = {};
			this.addEventListener = function (listenerType, callback) {
				console.log("adding listen",callback);
				Validate.args(listenerType, "string", callback, "function");
		
				if (!this.listeners[listenerType]) {
					this.listeners[listenerType] = [];
					if(status === 'online' && listenerType === 'onReady'){
						callback();
					}
					this.listeners[listenerType].push(callback);
				} else if (status === 'online' && listenerType === 'onReady'){			
					callback();
				} else {
					this.listeners[listenerType].push(callback);
				}
			};
		
		};
		
		var fronEndLib =new FronEndLib();
		module.exports  =fronEndLib;
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		var SystemSettings = __webpack_require__(2);
		
		module.exports = {
			/**
			 * @introduction
			 * <h2>Finsemble Utility Functions</h2>
			 * 
			 * @class Utils
			 */
		
			retrieveMonitorDimensions: function (callback) {
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
							callback(null,dims);
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
			Console: function (name) {
				var schema = "FSBL-Console";
				var consoleName;
		
				/**
				 * Pass through function for console.error, with Finsemble info inserted to front and end of output.
				 * All output ignored unless SystemSetting.diagLevel() >= 1
				 * 
				 */
				this.error = function () {
					var myLevel = 1;
					if (myLevel <= SystemSettings.diagLevel()) {
						var args = [].slice.call(arguments); //Convert to a real array
						var preface = consoleName + " Error: ";
						args.unshift(preface);
						var suffix = " (timestamp " + Math.round((window.performance.now() * 1000)) / 1000 + ')';
						args.push(arguments, suffix);
						window.console.error.apply(console, args);
					}
				};
		
				/**
				 * Pass through function for console.warn, with Finsemble info inserted to front and end of output.
				 * All output ignored unless SystemSetting.diagLevel() >= 2
				 * 
				 */
				this.warn = function () {
					var myLevel = 2;
					if (myLevel <= SystemSettings.diagLevel()) {
						var args = [].slice.call(arguments); //Convert to a real array
						var preface = consoleName + " Warn: ";
						args.unshift(preface);
						var suffix = " (timestamp " + Math.round((window.performance.now() * 1000)) / 1000 + ')';
						args.push(arguments, suffix);
						window.console.warn.apply(console, args);
					}
				};
		
				/**
				 * Pass through function for console.info, with Finsemble info inserted to front and end of output.
				 * All output ignored unless SystemSetting.diagLevel() >= 3
				 * 
				 */
				this.info = function () {
					var myLevel = 3;
					if (myLevel <= SystemSettings.diagLevel()) {
						var args = [].slice.call(arguments); //Convert to a real array
						var preface = consoleName + " Info: ";
						args.unshift(preface);
						var suffix = " (timestamp " + Math.round((window.performance.now() * 1000)) / 1000 + ')';
						args.push(arguments, suffix);
						window.console.info.apply(console, args);
					}
				};
		
				/**
				 * Pass through function for console.log (but redirected to console.info), with Finsemble info inserted to front and end of output.
				 * All output ignored unless SystemSetting.diagLevel() >= 3
				 * 
				 */
				this.log = function () {
					var myLevel = 3;
					if (myLevel <= SystemSettings.diagLevel()) {
						var args = [].slice.call(arguments); //Convert to a real array
						var preface = consoleName + " Log: ";
						args.unshift(preface);
						var suffix = " (timestamp " + Math.round((window.performance.now() * 1000)) / 1000 + ')';
						args.push(arguments, suffix);
						window.console.info.apply(console, args);
					}
				};
		
				/**
				 * Pass through function for console.debug, with Finsemble info inserted to front and end of output.
				 * All output ignored unless SystemSetting.diagLevel() >= 4
				 * 
				 */
				this.debug = function () {
					var myLevel = 4;
					if (myLevel <= SystemSettings.diagLevel()) {
						var args = [].slice.call(arguments); //Convert to a real array
						var preface = consoleName + " Debug: ";
						args.unshift(preface);
						var suffix = " (timestamp " + Math.round((window.performance.now() * 1000)) / 1000 + ')';
						args.push(arguments, suffix);
						window.console.debug.apply(console, args);
					}
				};
		
				/**
				 * Pass through function to console.debug, with Finsemble info inserted to front and end of output.
				 * All output ignored unless SystemSetting.diagLevel() >= 5
				 * 
				 */		
				this.debug2 = function () {
					var myLevel = 5;
					if (myLevel <= SystemSettings.diagLevel()) {
						var args = [].slice.call(arguments); //Convert to a real array
						var preface = consoleName + " Debug2: ";
						args.unshift(preface);
						var suffix = " (timestamp " + Math.round((window.performance.now() * 1000)) / 1000 + ')';
						args.push(arguments, suffix);
						window.console.debug.apply(console, args);
					}
				};
		
				/**
				 * Pass through function to console.debug, with Finsemble info inserted to front and end of output.
				 * All output ignored unless SystemSetting.diagLevel() >= 6
				 * 
				 */				
				this.debug3 = function () {
					var myLevel = 6;
					if (myLevel <= SystemSettings.diagLevel()) {
						var args = [].slice.call(arguments); //Convert to a real array
						var preface = consoleName + " Debug3: ";
						args.unshift(preface);
						var suffix = " (timestamp " + Math.round((window.performance.now() * 1000)) / 1000 + ')';
						args.push(arguments, suffix);
						window.console.debug.apply(console, args);
					}
				};
		
				/**
				 * Pass through function to console.debug, with Finsemble info inserted to front and end of output.
				 * All output ignored unless SystemSetting.diagLevel() >= 7
				 * 
				 */				
				this.debug4 = function () {
					var myLevel = 7;
					if (myLevel <= SystemSettings.diagLevel()) {
						var args = [].slice.call(arguments); //Convert to a real array
						var preface = consoleName + " Debug4: ";
						args.unshift(preface);
						var suffix = " (timestamp " + Math.round((window.performance.now() * 1000)) / 1000 + ')';
						args.push(arguments, suffix);
						window.console.debug.apply(console, args);
					}
				};
		
				consoleName = name;
			},
		
			/**
			 * @param {any} name
			 * @param {any} payload
			 * @memberof Utils
			 */
			msgWrapper: function (name, payload) {
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
			getMonitorInfo: function (force) {
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
			getMonitorDimensions: function () {
				return new Promise(
					function (resolve, reject) {
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
					}
				);
			},
		
			getMyMonitorDimensions: function (windowBounds) {
				//returns the dimensions of the monitor that the window is on.
				//@todo: this.
			},
		
			/**	 
			 *	@returns {string} Transforms an array of strings into a camelcased string.
			 * @memberof Utils
			 */
			camelCase: function () {
				var str = '';
				for (var i = 0; i < arguments.length; i++) {
					str += ' ' + arguments[i];
				}
				return str
					.replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
					.replace(/\s/g, '')
					.replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
			},
		
			/**
			 * Convenience method for cloning an object.
			 * @param  {any} from The thing you want to copy
			 * @param {any} to Where you want your copy to end up.
			 * @return {any} to Where you want your copy to end up.
			 */
			clone: function (from, to) {
				if (from === null || typeof from !== "object") { return from; }
				// if (from.constructor != Object && from.constructor != Array) return from;
				if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
					from.constructor == String || from.constructor == Number || from.constructor == Boolean)
				{ return new from.constructor(from); }
		
				to = to || new from.constructor();
		
				for (var n in from) {
					to[n] = typeof to[n] === "undefined" ? module.exports.clone(from[n], null) : to[n];
				}
		
				return to;
			},
		
			getUniqueName: function (baseName) {
				if (!baseName) {
					baseName = "RouterClient";
				}
				var uuid = baseName + "." + Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 10000);
				return uuid;
			},
		
		};
	
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		
		/**
		 * @introduction
		 * <h2>Finsemble system wide settings for use by all components and services</h2>
		 * 
		 * @class SystemSettings
		 */
		
		/**
		 * Constructor for Finsemble SystemSettings
		 *
		 * @constructor
		 */	
		var SystemSettings = function () {
		
			var currentDiagLevel = 5;
		
			/**
			 * Returns diagnostic level
			 *
			 *@returns current diagnostic level
			 */	
			this.diagLevel = function () {
				return currentDiagLevel; 
			};
		
			/**
			 * Returns true if parameter validation is enabled
			 *
			 *@returns true if enable
			 */
			this.validationEnabled = function () {
				return (currentDiagLevel >= 4); 
			};
		};
		
		module.exports = new SystemSettings();
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		var SystemSettings = __webpack_require__(2);
		
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
		var Validate = function () {
		
			function warningMsg(paramDescript, thisArg, thisArgType) {
		
				function getErrorObject() {
					try { throw Error(''); } catch (err) { return err; }
				}
		
				var err = getErrorObject();
		
				var caller_line1 = err.stack.split("\n")[5];
				var index1 = caller_line1.indexOf("at ");
				var msgPart1 = caller_line1.slice(index1 + 2, caller_line1.length);
		
				var caller_line2 = err.stack.split("\n")[6];
				var index2 = caller_line2.indexOf("at ");
				var msgPart2 = caller_line2.slice(index2 + 2, caller_line2.length);
		
				console.warn("parameter validation failed: parameter " + paramDescript + " is of type '" + typeof (thisArg) + "' but should be of type '" + thisArgType + "' in" + msgPart1 + " called by" + msgPart2);
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
				if (SystemSettings.validationEnabled()) {
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
						console.warn("validate.args requires even number of parameters: " + JSON.stringify(arguments));
					}
				}
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
				if (SystemSettings.validationEnabled()) {
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
						console.warn("validate.args requires even number of parameters: " + JSON.stringify(arguments));
					}
				}
				return returnCode; // always return turn when validation is disable due debug lebel turned off 
			};
		};
		
		module.exports = new Validate();
	
	/***/ },
	/* 4 */
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
		
		var RouterClientConstructor = __webpack_require__(5);
		
		module.exports = new RouterClientConstructor("RouterSingleton");
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		
		"use strict";
		var RouterTransport = __webpack_require__(6);
		var Utils = __webpack_require__(1);
		var Validate = __webpack_require__(3); // Finsemble args validator
		var console = new Utils.Console("RouterClient"); // Finsemble console
		
		/**
		 * @introduction
		 *
		 * <h2>Router Client</h2>
		 *
		 * This modules contains the RouterClient for sending and receiving events between Finsemble components and services.
		 * See <a href=tutorial-eventRouter.html>Event Router Tutorial</a> for an overview of the router's functionality.
		 *
		 * The RouterClientConstructor() returns one instance of a router client; however FSBL.RouterClient is always 
		 * initialized with an instance of the router exported by the RouterClient module (making it essentially a singleton
		 * when referenced in the same window). Still, there are no restriction on the number of router clients created
		 * within the same window. 
		 *
		 * Although it's transparent, the router uses the <a href="http://cdn.openfin.co/jsdocs/stable/fin.desktop.module_InterApplicationBus.html">OpenFin Bus</a> and SharedWorker threads for transporting events between router clients and the router service. 
		 *
		 * **Event Callbacks**: Note all router callbacks are in the form of `callback(error, event)`
		 *
		 * @example
		 *
		 * // user FSBL.RouterClient or create an instance of Router Client
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
		var RouterClientConstructor = function (thisClientName, transportName) {
			Validate.args(thisClientName, "string", transportName, "string=");
		
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
					"error":error
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
		
				if (typeof(transportName) === 'undefined') {
					transport = RouterTransport.getRecommendedTransport(incomingMessageHandler, clientName, "RouterService");
				} else {
					transport = RouterTransport.getTransport(transportName, incomingMessageHandler, clientName, "RouterService");
				}
		
				// catch "window closing" event so can cleanup	
				var finWindow = fin.desktop.Window.getCurrent();
				finWindow.addEventListener("closed", destructor); // this is the correct event to catch but currently doesn't work on mac
		
				console.info("starting " + clientName + " with transport " + transport.identifier() );
			}
		
			// provides unique id within one router client for queries
			function clientID() {
				return clientName + "." + (++clientIDCounter);
			}
		
			// returns true if this routerClient originated the message
			function originatedHere() {
				return this.header.origin ===  this.header.lastClient;
			}
		
			// invoke client callbacks in the input array (that are attached to a specific channel and listener type) 
			function invokeListenerCallbacks(map, message) {
				var clientCallbackArray = map[message.header.channel];
				if (clientCallbackArray === undefined) {
					console.warn("no handler defined for incoming message" + JSON.stringify(message));
				} else {
					message.originatedHere = originatedHere;// add local function to test origin
					for (var i = 0; i < clientCallbackArray.length; i++) { // for each callback defined for the channel
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
					} else { // invoke the callback with error since  flag in message (from router service)
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
					mapPubSubServers[topic.toString()] = { "subscribeCallback":subscribeCallback, "publishCallback": publishCallback, "unsubscribeCallback":unsubscribeCallback };
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
		
				if (callbacks === undefined) { // if undefined then may be a matching RegEx topic
					for (var key in mapPubSubServerRegEx) {
						if (mapPubSubServerRegEx[key].test(subscribeMessage.header.topic)) {
							callbacks = mapPubSubServers[key];
							var initialState = mapPubSubServerState[subscribeMessage.header.topic]; // may already be initial state defined from publish
							if (initialState === undefined) { // if there isn't already state defined then use default from regEx
								initialState = mapPubSubServerState[key]; // initialize the state from RegEx topic	
							}	
							mapPubSubServerState[subscribeMessage.header.topic] = initialState; 
							break;
						}
					}
				}
		
				if (callbacks === undefined) { // if still undefined
					console.warn("no pubsub server defined for incoming subscribe message: " + JSON.stringify(subscribeMessage));
				} else {
					if (subscribeMessage.header.error) { // the router service uses the subscribe message in this case to return a pubsub error (ToDO: consider a generic error message)
						console.warn("pubsub error received from router service: " + JSON.stringify(subscribeMessage.header.error));
					} else {
						subscribeMessage.sendNotifyToSubscriber = sendNotifyToSubscriber; // add callback function to message so pubsub server can respond with Notify message
						if (callbacks.subscribeCallback) {
							callbacks.subscribeCallback(null, subscribeMessage); // invoke the callback (no error)
						} else { // since no subscribe callback defined, use default functionality
							subscribeMessage.sendNotifyToSubscriber(null,mapPubSubServerState[subscribeMessage.header.topic]); // must invoke from message to set this properly 
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
		
				if (callbacks === undefined) { // if undefined then may be a matching RegEx topic
					for (var key in mapPubSubServerRegEx) {
						if (mapPubSubServerRegEx[key].test(unsubscribeMessage.header.topic)) {
							callbacks = mapPubSubServers[key];
							break;
						}	
					}
				}
		
				if (callbacks === undefined) { // if still undefined
					console.warn("no pubsub server defined for incoming unsubscribe message: " + JSON.stringify(unsubscribeMessage));
				} else {
					unsubscribeMessage.removeSubscriber = removeSubscriber; // add callback function to message for pubsub server (but must always remove)
					if (callbacks.unsubscribeCallback) {
						callbacks.unsubscribeCallback(null, unsubscribeMessage); // invoke the callback (no error)
					} else { // since no unsubscribe callback defined, use default functionality
						unsubscribeMessage.removeSubscriber();
					}
				}
			}
		
			// callback function for invokePublishPubSubCallback to send Notify 	
			function sendNotifyToAllSubscribers(err, notifyData) {
				if (!err) {
					mapPubSubServerState[this.header.topic] = notifyData; // store new state
					var listOfSubscribers = pubsubListOfSubscribers[this.header.topic];
					if (typeof(listOfSubscribers) !== 'undefined') { // confirm subscribers to send to, if none then nothing to do
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
		
				if (callbacks === undefined) { // if undefined then may be a matching RegEx topic
					for (var key in mapPubSubServerRegEx) {
						if (mapPubSubServerRegEx[key].test(publishMessage.header.topic)) {
							callbacks = mapPubSubServers[key];
							break;
						}	
					}
				}
		
				if (callbacks === undefined) { // if still undefined
					console.warn("no pubsub server defined for incoming publish message: " + JSON.stringify(publishMessage));
				} else {
					publishMessage.sendNotifyToAllSubscribers = sendNotifyToAllSubscribers; // add callback function to message so pubsub server can respond to publish
					if (callbacks.publishCallback) {
						callbacks.publishCallback(null, publishMessage); // invoke the callback (no error)
					} else { // since no pubish callback defined, use default functionality
						publishMessage.sendNotifyToAllSubscribers(null,publishMessage.data); // must call from publish message (like a callback) so 'this' is properly set
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
						notifyMessage.originatedHere = originatedHere;// add local function to test origin
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
				console.debug2("Incoming Message: " + incomingMessage.header.type);
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
				console.debug2("Outgoing Message: " + JSON.stringify(message.header.type));
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
				Validate.args(thisClientName, "string");
				clientName = Utils.getUniqueName(newClientName);
				console.info("Route Client name set to " + clientName);
			};
		
			/**
			 * Add listener for incoming transmit events on specified channel.
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
			this.addListener = function(channel, eventHandler) {
				console.debug("addListener to channel " + channel);
				Validate.args(channel, "string", eventHandler, "function");
				var firstChannelClient = addListenerCallBack(mapListeners, channel, eventHandler);
				if (firstChannelClient) {
					sendToRouterService(new AddListenerMessage(channel));
				}
			};
		
			/**
			 * Transmit event to all listeners on the specified channel.
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
				Validate.args(toChannel, "string", event, "any");
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
				Validate.args(channel, "string", eventHandler, "function");
				var lastChannelListener = removeListenerCallBack(mapListeners, channel, eventHandler);
				if (lastChannelListener) {
					sendToRouterService(new RemoveListenerMessage(channel));
				}
			};
		
			/** 
			 * Add query server to the specified channel (only one server allowed per channel)
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
				Validate.args(channel, "string", queryEventHandler, "function");
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
			 * Send a query to server listening on specified channel.
			 * 
			 * @param {any} serverChannel
			 * @param {object=} queryEvent event message sent to server
			 * @param {function} responseEventHandler
			 */
			this.query = function (serverChannel, queryEvent, responseEventHandler) {
				console.debug("query to server channel " + serverChannel + " passing event: " + JSON.stringify(queryEvent));
				Validate.args(serverChannel, "string", queryEvent, "any=", responseEventHandler, "function");
				var newQueryID = clientID();
				addQueryResponseCallBack(mapQueryResponses, newQueryID, responseEventHandler);
				sendToRouterService(new QueryMessage(newQueryID, serverChannel, queryEvent));
			};
		
			/**
			 * Remove query server from specified channel.
			 * 
			 * @param {string} serverChannel
			 */
			this.removeServer = function (serverChannel) {
				console.debug("removeServer from server channel " + serverChannel);
				Validate.args(serverChannel, "string");
				var status = removeServerCallBack(mapServers, serverChannel);
				if (status) {
					sendToRouterService(new RemoveServerMessage(serverChannel));
				}
			};
		
			/**
			 * Add a PubSub server for specified topic. Only one PubSub server allowed per topic value; however, the topic value
			 * may be a regular-expression representing a set of related topics, in which case the PubSub server will server all matching topics.
			 * When a regEx topic is used, the same default functionality is provides for each matching topic -- the difference
			 * is only one SubPub server is needed to cover a set of related topics, plus the same callback handers can be used (if provided).
			 *
			 * Note an exact topic match will take precedence over a regEx match, but otherwise results are unpredictable for overlapping RegEx topics.
			 * 
			 * @param {string} topic topic for this server, or a topic RegEx (e.g. '/abc.+/') to handle a set of topics
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
				Validate.args(topic, "any", initialState, "object=", params, "object=");
				params = params || {};
				Validate.args2("params.subscribeCallback", params.subscribeCallback, "function=", "params.publishCallback", params.publishCallback, "function=") &&
					Validate.args2("params.unsubscribeCallback", params.unsubscribeCallback, "function=");
		
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
			 * @param {string} topic for server being removed (may be RegEx)
			 */
			this.removePubSubServer = function (topic) {
				console.debug("removePubSubServer for topic " + topic);
				Validate.args(topic, "any");
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
				Validate.args(topic, "string", notifyCallback, 'function');
				var subscribeID = clientID();
				addSubscriberCallBack(mapSubscribersID, subscribeID, notifyCallback, topic);
				sendToRouterService(new SubscribeMessage(subscribeID, topic));
				return { "subscribeID": subscribeID, "topic": topic}; 
			};
			
			/**
			 * Publish to a PubSub Server, which will trigger a corresponding Notify to be sent to all subscribers. 
			 * 
			 * @param {string} topic
			 * @param {object} event
			 */
			this.publish = function (topic, event) {
				Validate.args(topic, "string", event, 'any');
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
				Validate.args(subscribeIDStruct, "object") && Validate.args2("subscribeIDStruct.subscribeID", subscribeIDStruct.subscribeID, "string");
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
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		
		// This routerTransport file is shared between router clients and the router service.  It supports
		// the addition of new transports without any change to the router code. Each transport is 
		// point-to-point between a router client and the router service (i.e. hub and spoke).  Each router
		// client can use a different transport (i.e. the router service connects to them all). 
		
		"use strict";
		var Utils = __webpack_require__(1);
		var console = new Utils.Console("RouterTransport"); // Finsemble console
		
		var openfinAppConfig; // config used to determine if cross-domain
		if (window.location.hostname === "localhost") { // if localhost then using desktop-local config
			console.debug("desktop-local config");
			openfinAppConfig = __webpack_require__(7);
		} else { // else using desktop-app config
			console.debug("desktop-app config");
			openfinAppConfig = __webpack_require__(8);
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
			addTransport: function (transportName, transportConstructor) {
				this.activeTransports[transportName] = transportConstructor;
				console.info("RouterTransport added: " + transportName);
			},
		
			/**
			 * Gets array of active transports
			 * 
			 * @returns array transport names/identifier
			 */
			getActiveTransports: function () {
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
			getRecommendedTransport: function (incomingMessageHandler, source, destination) {
				var newTransport; // return variable
		
				// Will tell you if the window is in an iframe or not (for future)
				function isInIframe () {
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
		
					var isSameHost = (window.location.hostname === parser.hostname);
					console.debug("Transport crossDomain host comparison:" + window.location.hostname + "==" + parser.hostname);
		
					var isSameProtocol = (window.location.protocol === parser.protocol);
					console.debug("Transport crossDomain protocol comparison:" + window.location.protocol + "==" + parser.protocol);
		
					var wport = (window.location.port === undefined) ? window.location.port : 80;
					var pport = (parser.port === undefined) ? parser.port : 80;
					var isSamePort = (wport === pport);
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
			getTransport: function (transportName, incomingMessageHandler, source, destination) {
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
				console.debug2("IncomingTransport: " + JSON.stringify(incomingTransportInfo) + " Message: " + JSON.stringify(eventMessage));
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
				console.debug2("OutgoingTransport: " + " Transport: " + JSON.stringify(transport) + " Message: " + JSON.stringify(eventMessage));
				routerThread.port.postMessage([transport,eventMessage]);
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
		
			if (source === "RouterService") {  // send first message though shared worker to identify router service
				routerThread.port.postMessage({data:"connect",source:"RouterService"});
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
				console.debug2("IncomingTransport: " + JSON.stringify(incomingTransportInfo) + " Message: " + JSON.stringify(eventMessage));
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
		
				console.debug2("OutgoingTransport: " + destTopic + " Message: " + JSON.stringify(eventMessage));
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
	/* 7 */
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
				"arguments": "--noerrdialogs  --v=1 --force-device-scale-factor=1",
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
	/* 8 */
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
				"arguments": "--v=1 --force-device-scale-factor=1",
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
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		
		// This file contains the Fensemble router service, which routes event messages between 
		// other services and components.  All event messages flow though here (never peer to peer).
		
		var FSBLUtils = __webpack_require__(1);
		var serviceObj = function (params) {
			if (params) {
				this.name = params[0];
			}
			var self = this;
			this.name = name;
			this.servicesNeeded = ["routerService"];// All the services that are required before the connection to the service manager is complete.
			this.onlineServices = [];
			this.__parent = null;//Should be service manager
			this.clients = [];
			this.beforeEach = [];//A list of fucntions that are called before every message
			this.afterEach = [];//A list of fucntions that are called after every message
			this.status = "offline";//The services status
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
				if (typeof (func) === "function") {
					this.beforeEach.push(func);
				}
			};
			//Add a function to be processed after every message
			this.addAfter = function (func) {
				if (typeof (func) === "function") {
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
					if (self.servicesNeeded.length > 0) { self.checkServicesNeeded(); };
				}],
				serviceList: [function (msg) {
					self.onlineServices = msg.payload;
					if (self.servicesNeeded.length > 0) { self.checkServicesNeeded(); };
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
			if (!this.listeners[eventName])
			{ this.listeners[eventName] = []; }
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
		
			if (this.route) {
		
			} else {
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
				if (!this.__parent) { this.__parent = window.opener; }
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
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		
		var Utils = __webpack_require__(1);
		var console = new Utils.Console("StorageClient"); // Finsemble console
		var Validate = __webpack_require__(3); // Finsemble args validator
		
		/**
		 * 
		 * Public API for The Storage Service
		 * StorageClient.[storageType].action(name,[data],cb);
		 */
		var RouterClient = __webpack_require__(4);
		var BaseClient = __webpack_require__(11);
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
		var StorageClient = function (params) {
			Validate.args(params, "object=") && params && Validate.args2("params.onReady", params.onReady, "function=");
			var self = this;
			BaseClient.call(this, params);
			this.RouterClient = RouterClient;
			var defaultStorage = null;
			//should probably come from some config;
			var storageTypes = ["localStorage"];
			this.startup =function(){
			
			};
			function loadStorageTypes() {
				function loadType(type) {
					if (!self[type]) { self[type] = {}; }
					self[type]["save"] = function (name, data, cb) { self.save(type, name, data, cb); };
					self[type]["get"] = function (name, cb) { self.get(type, name, cb); };
					self[type]["delete"] = function (name, cb) { self.delete(type, name, cb); };
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
				Validate.args(storageType, "any", name, "string", data, "any", cb, "function=");
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
				Validate.args(storageType, "string", name, "string", cb, "function=");
				self.RouterClient.query('Storage.get', { storageType: storageType, name: name }, function (err, response) {
					console.log('clienterr', err);
					if (cb) {
						cb(err, response);
					}
				});
			};
		
			this.getMultiple = function(storageType,query,cb){
				if (arguments.length < 3 && typeof query === "function") {
					cb = arguments[1];
					query = arguments[0];
					storageType = defaultStorage;
				} 
				self.RouterClient.query('Storage.getMultiple', {storageType:storageType,query:query}, function (err, response) {
					console.log('clienterr', err,response);
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
				Validate.args(storageType, "any", name, "string", cb, "function=");
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
			onReady: function (cb) {
				storageClient.startup();
				console.log("storage online");
				cb();
			},
			name:"storageClient"
		});
		storageClient.requiredServices = [];
		//storageClient.initialize();
		module.exports = storageClient;
		
		
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		
		var Utils = __webpack_require__(1);
		var console = new Utils.Console("BaseClient"); // Finsemble console
		var Validate = __webpack_require__(3); // Finsemble args validator
		
		var Client = function (params) {
			Validate.args(params, "object=");
			var self = this;
			var status = "offline";
			var onReady;
			this.name ;
			if (params) {
				onReady = params.onReady;
				this.name = params.name;
			}
			this.finWindow = fin.desktop.Window.getCurrent();
			this.clientName = this.finWindow.name;//The current window
		
			this.routerClient = __webpack_require__(4);
			this.requiredServices = [];
			this.onlineServices = [];
		
			this.addServices = function (services) {
				Validate.args(services, "any");
		
				if (!services) { return; }
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
				window.console.log("services",this.name,this.onlineServices);
				var self = this;
				if (status === "online") { return; }
				if (this.requiredServices.length === 0) {
					
					if (onReady) {
						return onReady(function () {
							status = "online";
							self.routerClient.transmit(self.clientName + "FSBLClient",self.name);
						});
					}
				}
			};
			this.initialize = function () {
				window.console.log("client started", this.name);
		
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
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		var RouterClient = __webpack_require__(4);
		var BaseClient = __webpack_require__(11);
		var util = __webpack_require__(1);
		var console = new util.Console("BaseClient"); // Finsemble console
		var Validate = __webpack_require__(3); // Finsemble args validator
		
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
			Validate.args(params, "object=") && params && Validate.args2("params.onReady", params.onReady, "function=");
		
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
				Validate.args(cb, "function");
		
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
				Validate.args(cb, "function");
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
				Validate.args(component, "string", params, "object", cb, "function=");
				params.component = component;
				if (!params.customData) {
					params.customData = {};
				}
				if (!params.customData.monitorDimensions) {
		
					return util.retrieveMonitorDimensions(function(err,dims){
						window.console.log("dims",dims);
						params.customData.monitorDimensions = dims.monitorDimensions;
						window.console.log("params",params);
						callSpawn(params,cb);
					});
				}
				callSpawn(params,cb);
				
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
			* @param {function=} cb Callback
			*/
			this.getWindow = function (windowName, cb) {
				Validate.args(windowName, "string", cb, "function=");
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
				Validate.args(windowName, "string", cb, "function=");
				RouterClient.query('Launcher.isWindowOpen', windowName, function (err, response) {
					if (cb) {
						cb(err, response);
		
					}
				});
			};
			
			this.getActiveDescriptors = function (cb) {
				Validate.args(cb, "function");
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
			* @param {number} params.height
			* @param {object} [params.window]
			*/
			this.moveWindowCenter = function (params) {
				Validate.args(params, "object") && Validate.args2("params.monitorDimensions", params.monitorDimensions, "object", "params.width", params.width, "number", "params.height", params.height, "number", "params.window", params.window, "object");
				if (!params.monitorDimensions) { return; }
				var centerTop = (params.monitorDimensions.height - params.height) / 2;
				var centerLeft = (params.monitorDimensions.width - params.width) / 2;
				window.console.log(params,centerTop,centerLeft+ params.monitorDimensions.left);
				if (!params.window) {
					return fin.desktop.Window.getCurrent().moveTo(centerLeft + params.monitorDimensions.left, centerTop);
				}
				console.log("move this window");
				return params.window.moveTo(centerLeft+ params.monitorDimensions.left, centerTop,function(){
					params.window.bringToFront();
				});
			};
			return this;
		};
		
		
		var launcherClient = new LauncherClient({
			onReady: function (cb) {
				cb();
			},
			name: "launchClient"
		});
		launcherClient.requiredServices = [];
		//launcherClient.initialize();
		
		module.exports = launcherClient;
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		var Utils = __webpack_require__(1);
		var console = new Utils.Console("BaseClient"); // Finsemble console
		var Validate = __webpack_require__(3); // Finsemble args validator
		var BaseClient = __webpack_require__(11);
		/**
		 * 
		 * Public API for The Linker Service
		 * The linker client acts as an API between components and the Linker Service. The linker client allows for sharing of data between components.
		 *  @example
		 *
		 * // Save a key value pair to local storage
		 * FSBL.LinkerClient.openLinkerWindow(callback)
		 * FSBL.LinkerClient.updateLink(msg, callback)
		 * FSBL.LinkerClient.getGroups()
		 * FSBL.LinkerClient.getGroup("group1")
		 * FSBL.LinkerClient.getLinks(callback)
		 * FSBL.LinkerClient.subscribe("group1","symbol",callback)
		 * FSBL.LinkerClient.unSubscribe("group1","symbol",callback)
		 * FSBL.LinkerClient.publish("group1","symbol","aapl")
		 * 
		 * @todo catch refesh events so that we can close down the linker window if open
		 * @constructor
		 */
		var LinkerClient = function (params) {
			Validate.args(params, "object=") && params && Validate.args2("params.onReady", params.onReady, "function=");
			BaseClient.call(this, params);
			var self = this;
			var links = {};
			this.onLinksUpdate = [];
			this.groups = {};
			var linkOptions = {};
			var retryCount = 0;
			var linkerWindow = null;
			var listenerList = {};
			var loading = false;
		
			/** 
			 * Create a new linker group
			 * @param {string} groupName -  The name of the new group
			 * @param {LinkerClient~groupCB} [cb] -  callback to be called on success
			 * 
			 * @example
			 * LinkerClient.createGroup("groupname",callback)
			 */
			this.createGroup = function (groupName, cb) {
				Validate.args(groupName, "string", cb, "function");
				this.routerClient.query('Linker.createGroup', { groupName: groupName }, function (err, response) {
					if (cb) {
						return cb(err, response);
					}
					return;
				});
			};
			/** 
			 * Update a groups info. Currenlty, only the name is used.
			 * 
			 * @param {LinkerClient~group} previousGroup - The old group 
			 * @param {LinkerClient~group} newGroup -  The name of the new group
			 * @param {LinkerClient~groupCB} [cb]
			 * @example
			 *
			 * LinkerClient.createGroup({name:"group1",receive:[],transmit:[]},{name:"group2",receive:[],transmit:[]},callback)
			 *
			 */
			this.updateGroup = function (previousGroup, newGroup, cb) {
				Validate.args(previousGroup, "object", newGroup, "object", cb, "function");
				this.routerClient.query('Linker.updateGroup', { previousGroup: previousGroup, newGroup: newGroup }, function (err, response) {
					if (cb) {
						return cb(err, response);
					}
					return;
				});
		
			};
			/** 
			 * Register a client to a groups. Clients will receive all transmits for a registered group.
			 * 
			 * @param {LinkerClient~group} group - The old group 
			 * @param {string} client -  The window name of the client
			 * @param {LinkerClient~linksCB} [cb] Returns all the links for the client
			 * @example
			 *
			 * LinkerClient.registerGroup({name:"group1",receive:[],transmit:[]},"windowNameHere",callback)
			 *
			 */
			this.registerGroup = function (group, client, cb) {
				Validate.args(group, "string", client, "string", cb, "function");
				var params = {
					client: client ? client : self.clientName,
					group: group
				};
				this.routerClient.query("Linker.registerGroup", params, function (err, response) {
					if (cb) {
						return cb(err, response);
					}
					return;
				});
			};
		
			/** 
			 * Removes a client from a groups. 
			 * 
			 * @param {LinkerClient~group} group - The old group 
			 * @param {string} client -  The window name of the client
			 * @param {LinkerClient~linksCB} [cb] Returns all the links for the client
			 * @example
			 *
			 * LinkerClient.unRegisterGroup({name:"group1",receive:[],transmit:[]},"windowNameHere",callback)
			 *
			 */
			this.unRegisterGroup = function (group, client, cb) {
				Validate.args(group, "string", client, "string", cb, "function");
				var params = {
					client: client ? client : self.clientName,
					group: group
				};
				this.routerClient.query("Linker.unRegisterGroup", params, function (err, response) {
					if (cb) {
						return cb(err, response);
					}
					return;
				});
			};
		
			/** 
			 * Get a new linker group
			 * @param {string} groupName -  The name of the new group
			 * @param {LinkerClient~groupCB} [cb] -  callback to be called on success
			 * 
			 * @example
			 * LinkerClient.createGroup("groupname",callback)
			 */
			this.getGroup = function (groupName, cb) {
				Validate.args(groupName, "string", cb, "function");
				this.routerClient.query('Linker.getGroup', { groupName: groupName }, function (err, response) {
					if (cb) {
						cb(err, response);
					}
				});
			};
			/** 
			 * Get a new linker group
			 * @param {LinkerClient~groupsCB} [cb] -  callback to be called on success
			 * 
			 * @example
			 * LinkerClient.getGroups(callback)
			 */
			this.getGroups = function (cb) {
				Validate.args(cb, "function");
				this.routerClient.query('Linker.getGroups', {}, function (err, response) {
					console.log("got groups", response);
					if (cb) {
						cb(err, response);
					}
				});
			};
			/** 
			 * Get all links for a window
			 * @param {LinkerClient~linksCB} [cb] -  callback to be called on success
			 * 
			 * @example
			 * LinkerClient.getLinks(callback)
			 */
			this.getLinks = function (client, cb) {
				Validate.args(client, "string", cb, "function");
				this.routerClient.query('Linker.getLinks', { client: client }, function (err, response) {
					console.log("links....", response);
					if (err) {
						console.error(JSON.stringify(err));
					}
					if (retryCount < 4 && err) {
						retryCount++;
						return setTimeout(function () {
							self.getLinks(client, cb);
						}, 100);
					}
					links = response.data;
					retryCount = 0;
					if (cb) {
						cb(err, response.data);
					}
				});
			};
		
			/** 
		 * Get all links for a window
		 * @param {Object} msg
		 * @param {String} msg.client
		 * @param {String} msg.dataType
		 * @param {String} msg.group
		 * @param {boolean} msg.value
		 * @param {LinkerClient~linksCB} [cb] -  callback to be called on success
		 * 
		 * @example
		 * LinkerClient.updateLink(msg,callback)
		 */
			this.updateLink = function (msg, cb) {
				Validate.args(msg, "object", cb, "function");
				this.routerClient.query('Linker.updateLink', msg, function (err, response) {
					if (cb) {
						cb(err, response);
					}
				});
			};
			/** 
		* Opens the linker popup and sends the current windows information
		* @param {function} [cb] -  callback to be called on success
		* 
		* @example
		* LinkerClient.openLinkerWindow(cb)
		@todo use some config to tell where the top is.
		*/
		
			this.openLinkerWindow = function (cb) {
				Validate.args(cb, "function");
				if (loading) { return; }
				if (linkerWindow) {
					return linkerWindow.isShowing(function (showing) {
						if (showing) {
							return linkerWindow.hide();
						}
						console.log("show linker", showing);
						linkerWindow.show();
						linkerWindow.focus();
					});
				}
				loading = true;
				var linkWindowName = this.clientName + "linkerWindow";
				console.log("linkWindowName", linkWindowName);
				fin.desktop.Window.getCurrent().getBounds(function (bounds) {
					FSBL.Clients.LauncherClient.spawn("linkerWindow", {
						options: {
							name: linkWindowName,
							customData: { window: self.clientName, windowBounds: bounds, linkOptions: linkOptions, uuid: fin.desktop.Application.getCurrentApplication().uuid }
						}
					},
						function (err, msg) {
							console.log("msg", msg);
							linkerWindow = fin.desktop.Window.wrap(msg.data.uuid, msg.data.name);
							loading = false;
						});
				});
			};
		
			/** 
			* Add a listener to the specified group and data type
			* @param {String}  groupName -  the name of the group subscribing to
			* @param {String}  dataType - The data type be subscribed to
			* @param {function} [cb] -callback to be called on success
			* @todo verify group and data type
			* @example
			* LinkerClient.subscribe("group1","symbol",cb)
			*/
			this.subscribe = function (groupName, dataType, cb) {
				Validate.args(groupName, "string", dataType, "string", cb, "function");
				this.routerClient.addListener(groupName + dataType, cb);
			};
		
			/** 
			* remove a listener to the specified group and data type
			* @param {String}  groupName -  the name of the group subscribing to
			* @param {String}  dataType - The data type be subscribed to
			* @param {function} [cb] -callback to be called on success
			* 
			* @example
			* LinkerClient.subscribe("group1","symbol",cb)
			*/
			this.unSubscribe = function (groupName, dataType) {
				Validate.args(groupName, "string", dataType, "string");
				this.routerClient.removeListener(groupName + dataType);
			};
		
			/** 
			* Publish data to all listeners for a group and data typre
			* @param {String}  groupName - the name of the group subscribing to
			* @param {String}  dataType - The data type sending
			* @param {any}  data - the data being transmitted
			* @param {function} [cb] - callback to be called on success
			* @todo verify Publish
			* @example
			* LinkerClient.subscribe("group1","symbol",cb)
			*/
			this.publish = function (dataType, data) {
				Validate.args(dataType, "string", data, "any");
				for (var group in links) {
					if (links[group][dataType] || links[group].all) {
						console.log("send data through linker");
						this.routerClient.transmit(group + "." + dataType, { type: dataType, data: data });
						this.routerClient.transmit(group, { type: dataType, data: data });
					}
				}
			};
			//if there are any updates sent for linkers, like through the linker window, this gets the new info.
			function handleLinkerUpdates(err, msg) {
				if (err) {
					return console.log(err);
				}
				self.getLinks(self.clientName, function (err, response) {
					updateListeners();
					updateGroups();
					msg.sendQueryResponse(err, response);
				});
			}
		
			/** 
			* registers a client for a specific data type that is sent to a group.
			* @param {String} dataType
			* @param {function} [func] -  a function to be called once the linker receives the specific data.
			* 
			* @example
			* LinkerClient.registerListener("symbol",func)
			*/
			this.registerListener = function (dataType, func) {
				Validate.args(dataType, "string", func, "function");
				console.log("datatype--", dataType);
				if (listenerList[dataType]) {
					return listenerList[dataType].push(func);
				}
				listenerList[dataType] = [func];
			};
			//Need to do this better. Get newest items so we don't create it every time
			//This looks to see if there is a listener for a specific data type
			//@todo
			function handleListeners(err, data) {
				var listeners = listenerList[data.data.type];
				if (listeners && listeners.length > 0) {
					for (var i = 0; i < listeners.length; i++) {
						listeners[i](data.data.data);
					}
				}
			}
			//add new listeners for groups when groups are updated
			function updateListeners() {
				//loop through links and see if we need to setup new listeners
				for (var group in links) {
					if (links[group].all) {
						self.routerClient.addListener(group, handleListeners);
		
						continue;
					}
					for (var type in links[group]) {
						if (links[group][type].receive) {
							self.routerClient.addListener(type, handleListeners);
						}
					}
				}
			}
			//when groups are updated, update this object with the latest data
			function updateGroups(err, response) {
				var l = links;
				if (response) {
					self.groups = response.data;
				} else {
		
				}
				self.getLinks(self.clientName, function (err, l2) {
					for (var i = 0; i < self.onLinksUpdate.length; i++) {
						self.onLinksUpdate[i](err, self.groups, links);
					}
				});
		
			}
			// load all linkages and register listeners for updated data.
			this.loadLinks = function () {
				this.routerClient.addServer(this.finWindow.name + ".linker", handleLinkerUpdates);
				this.routerClient.addListener("Linker.UpdateGroups", updateGroups);
				self.getLinks(self.clientName, function (err, response) {
					updateListeners();
				});
		
				this.getGroups(updateGroups);
		
				this.finWindow.getOptions(function (options) {
					if (options.customData && options.customData.linker) {
						linkOptions = options.customData.linker;//load defaults
					}
				});
			};
			return this;
		};
		
		var linkerClient = new LinkerClient({
			onReady: function (cb) {
				linkerClient.loadLinks();
				console.log("linkerClient Online");
				cb();
			},
			name: "linkerClient"
		});
		linkerClient.requiredServices = ["linkerService"];
		//linkerClient.initialize();
		module.exports = linkerClient;
		
		
		/**
		 * Linker group
		* @typedef {Object} LinkerClient~group
		* @property  {string}  name
		* @property  {Array} receive
		* @property  {Array} transmit
		 */
		/**
		 * Linker links
		* @typedef {Object} LinkerClient~links
		* @property  {LinkerClient~linkGroup}  group
		 */
		/**
		 * Linker link group
		* @typedef {Object} LinkerClient~linkGroup
		* @property  {LinkerClient~dataType}  dataType
		 */
		
		/**
		 * Linker data Type
		* @typedef {Object} LinkerClient~dataType
		* @property  {LinkerClient~links} link
		 */
		/**
		 * Linker link
		* @typedef {Object} LinkerClient~links
		* @property  {boolean} receive
		* @property  {boolean} transmit
		 */
		
		/**
		* @callback LinkerClient~groupCB
		* @param {Object} err
		* @param {LinkerClient~group} responseMessage
		*/
		/**
		* @callback LinkerClient~groupsCB
		* @param {Object} err
		* @param {LinkerClient~group[]} responseMessage
		*/
		/**
		* @callback LinkerClient~linksCB
		* @param {Object} err
		* @param {LinkerClient~links} responseMessage
		*/
	
	
	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
		var RouterClient = __webpack_require__(4);
		var StorageClient = __webpack_require__(10);
		//var WindowManagerDom = require('../components/windowManager/windowManager');
		var WorkspaceClient = __webpack_require__(15);
		window.console.log("WorkspaceClient",WorkspaceClient);
		var util = __webpack_require__(1);
		var BaseClient = __webpack_require__(11);
		var console = new util.Console("BaseClient"); // Finsemble console
		var Validate = __webpack_require__(3); // Finsemble args validator
		/**
		 *
		 *@introduction
		  ## WindowClient
		  ----------
		 * The WindowClient is primarily responsible for managing the windowState (the window's bounds) and appState (data inside of your component). It also injects the windowManager component, which contains controls for minimizing, maximizing, closing, and restoring your window. The reference below is provided in case you'd like to manually trigger events.
		 *
		 * This is the API reference, if you're looking for information about the windowManager or how to disable certain aspects of the finsemble header bar, please see the [WindowManager tutorial]{@tutorial windowManagerComponent} for more information.
		
		 * **Note:** The documentation below extensively uses the term <code>hash</code>. This is not the same as something like <code>MD5</code>. We use it to mean  "The camelCased concatenation of more than one string."
		 *
		 * ### Reference  
		 * <pre class="language-js line-numbers"><code>
		 * //'Hashes' are simply the camelCased concatenation of two or more strings. By default, we use the following 'hashes' throughout the code. 
		 * var workspaceHash = util.camelCase('workspaceName');
		 * var windowHash = util.camelCase(workspaceHash, 'windowName');
		 * var containerHash = util.camelCase(windowHash, containerName);
		 * 	</code></pre>
		 * 
		 * @constructor
		 * @summary You don't need to ever invoke the constructor. This is done for you when WindowClient is added to the FSBL object.
		 * @returns {WindowClient}
		 */
		function WindowClient(params) {
			Validate.args(params, "object=") && params && Validate.args2("params.onReady", params.onReady, "function=");
		
			/** @alias WindowClient# */
			BaseClient.call(this, params);
		
			var self = this;
			//We store the options that the window is created with in this property.
			this.options = {};
			//The hash we use to save data with.
			this.windowHash = '';
			//Window's title.
			this.title = null;
			//This is the bottom edge of the toolbar. The window's position will be offset by this much.
			//@todo move this value to a config.
			this.toolbarBottom = 32;
			//default value. The window assigns the containers it cares about before starting.
			this.containers = [];
			//window state for restoration purposes.
			this.appState = {};
			//where we store appState for the window.
			this.appState[fin.desktop.Window.getCurrent().name] = {};	
			/**
			 * @private
			 * @returns {windowHash}
			 */
			this.getWindowHash = function () {
				return self.windowHash;
			};
			/**
			 * This function does two things:
			 *
			 * 1. It sets the window's title in the windowManager component, and
			 * 2. It sets the title in the DOM.
			 *
			 * This is useful if you like to keep the window's title in sync with a piece of data (e.g., a Symbol);
			 * @param {String} title Window title.
			 * @example <caption>The code shows how you would change your window title.</caption>
			 *	//something happens above, like a symbol change.
			 *  FSBL.WindowClient.setWindowTitle("My component - " + data.symbol);
			 */
			this.setWindowTitle = function (title) {
				Validate.args(title, "string");
				this.title = title;
				document.title = title;
				var titleUpdateChannel = finWindow.name + '.titleUpdate';
				RouterClient.transmit(titleUpdateChannel, title);
			};
		
			/**
			 * Retrieves the window's title.
			 * @returns {String} title
			 * @example
			 * var windowTitle = FSBL.WindowClient.getWindowTitle();
			 */
			this.getWindowTitle = function () {
				return this.title;
			};
			/**
			 * This function retrieves the dimensions of the monitor that the window is on. It's currently used in the {@link launcherClient}.
			 * @private
			 */
			this.retrieveMonitorDimensions = function (callback) {
				util.retrieveMonitorDimensions(function (err, dims) {
					self.options.defaultLeft = dims.defaultLeft;
					self.options.defaultTop = dims.defaultLeft;
					self.options.monitorDimensions = dims.monitorDimensions;
					if(callback){callback(err);}
				}); 
			};
		
			/**
			 * Sets initial state for the window. This data is modified on subsequent saves.
			 * @private
			 */
			this.setInitialWindowState = function (callback) {
				self.windowHash = util.camelCase('activeWorkspace', finWindow.name);
				finWindow.getOptions(function (options) {
					self.options = options;
					//self.retrieveMonitorDimensions();
					self.retrieveMonitorDimensions(function(){
					
						console.log("self.options", self.options);
						if (!self.options.customData.persists) {
							console.log("dont save....");
							return callback();
						}
						console.log("save.... windowstate" + JSON.stringify(self.options.customData));
						StorageClient.localStorage.save(self.windowHash, self.options);
						callback();
		
					});
				});
			};
		
		
			/**
			 * 
			 * Saves the window's state. Rarely called manually, as it's called every time your window moves.
			 * @param {Object} bounds
			 * @example <caption>The code below is the bulk of our listener for the <code>bounds-changed</code> event from the openFin window. Every time the <code>bounds-changed</code> event is fired (when the window is resized or moved), we save the window's state. The first few lines just prevent the window from being dropped behind the toolbar.</caption>
			 *finWindow.addEventListener('bounds-changed', function (bounds) {
			 * 	if (bounds.top < 45) {
			 *		finWindow.moveTo(bounds.left, 45);
			 *		return;
			 *	}
			 *	self.saveWindowState(bounds);
			 *});
			 */
			this.saveWindowState = function (bounds) {
				Validate.args(bounds, "object") && Validate.args2("bounds.top", bounds.top, "number");
				if (!self.options.customData.persists) {
					return;
				}
				//This response has the following shape:
				self.options.defaultTop = bounds.top;
				self.options.defaultLeft = bounds.left;
				self.options.defaultWidth = bounds.width;
				self.options.defaultHeight = bounds.height;
				console.log('saving window state', self.options);
				StorageClient.localStorage.save(self.windowHash, self.options);
				RouterClient.transmit('WorkspaceService.setActiveWorkspaceDirty', null, null);
			};
			/**
			 * This function is fired every time the window's bounds change. It does three things:
			 * 1. Figures out which monitor the window is on (if it changes monitors),
			 * 2. Prevents the window from being dropped behind the toolbar.
			 * 3. Persists the window's state so that it can be restored later.
			 * @private
			 */
			this.boundsChangedListener = function (bounds) {
				//if the window's left edge leaves the monitor's boundary
				if (bounds.left > self.options.monitorDimensions.right || bounds.left < self.options.monitorDimensions.left) {
					self.retrieveMonitorDimensions();
				}
		
				if (bounds.top < self.toolbarBottom) {
					finWindow.moveTo(bounds.left, self.toolbarBottom);
				}
				self.saveWindowState(bounds);
			};
			/**
			 * This event is fired when a window is resized or moved.
			 * @private
			 */
			this.listenForBoundsChanged = function () {
				if (typeof (finWindow) === 'undefined') {
					window.finWindow = fin.desktop.Window.getCurrent();
				}
				finWindow.getOptions(function (opts) {
					if (opts.customData.componentType !== 'Toolbar') {
						finWindow.addEventListener('bounds-changed', self.boundsChangedListener);
					}
				});
			};
			/**
			 * Minmizes window.
			 * @example
			 * FSBL.WindowClient.minimize();
			 */
			this.minimize = function () {
				finWindow.minimize(function () { }, function (err) { console.error(err); });
			};
			/**
			 * Restores window from a maximized state.
			 * @example
			 * FSBL.WindowClient.restore();
			 */
			this.restore = function () {
				finWindow.removeEventListener('bounds-changed', this.boundsChangedListener);
				finWindow.setBounds(
					this.options.cachedLeft,
					this.options.cachedTop,
					this.options.cachedWidth,
					this.options.cachedHeight,
					function () {
						finWindow.addEventListener('bounds-changed', self.boundsChangedListener);
					}, function (err) { console.error(err); });
			};
			/**
			 * Maximizes the window. Also takes into account the application toolbar.
			 * @todo, when fixed components are a thing, make sure that maximize doesn't sit on top of them either.
			 * @example
			 * FSBL.WindowClient.maximize();
			 */
			this.maximize = function () {
				finWindow.removeEventListener('bounds-changed', this.boundsChangedListener);
				var monitorDimensions = this.options.monitorDimensions;
				this.options.cachedLeft = this.options.defaultLeft;
				this.options.cachedTop = this.options.defaultTop;
				this.options.cachedWidth = this.options.defaultWidth;
				this.options.cachedHeight = this.options.defaultHeight;
				finWindow.setBounds(
					monitorDimensions.left,
					this.toolbarBottom,
					monitorDimensions.width,
					monitorDimensions.height,
					function () {
						finWindow.addEventListener('bounds-changed', self.boundsChangedListener);
					},
					function (err) { console.error(err); }
				);
			};
			/**	 
			 * Closes Window.
			 * @param {boolean} removeFromWorkspace whether to remove the window from the workspace.
			 * Defaults are to remove the window from the workspace if the user presses the X button, but not if the window is closed via an app-level request (e.g., we need to switch workspaces, so all windows need to close).
			 * @example
			 *	//Close window and remove from workspace (e.g., user closes the window).
			 *	FSBL.WindowClient.close(true);
			 *	//Close window and keep in workspace (e.g., application requests that all windows close themselves).
			 *	FSBL.WindowClient.close(false);
			 */
			this.close = function (removeFromWorkspace) {
				Validate.args(removeFromWorkspace, "boolean");
				console.log("close Called");
				this.deregisterWithDockingManager();
				RouterClient.disconnectAll();
				if (removeFromWorkspace) {
					WorkspaceClient.removeWindow({
						name: finWindow.name
					}, function (err, response) {
						console.log("close sending1");
						finWindow.close(true);
					});
				} else {
					console.log("close sending2");
					finWindow.close(true);
				}
		
			};
		
			/**
			 * This function injects the header bar into all frameless windows that request it. This should only be used if you've decided not to use the provided <code>WindowClient.start()</code> method.
			 *
			 * **NOTE:** If you are using the finsemble windowManager component, you do not need to call this function.
			 */
			this.injectDOM = function () {
				//for the aesthetics.
				if (document.getElementById('fsbl-header-bar')) { return; }
				var template = document.createElement('div');
				//template.id = "FSBLHeader";
				//template.setAttribute("id", "FSBLHeader");
				template.innerHTML = "<div id='FSBLHeader'></div>";
				document.body.insertBefore(template.firstChild, document.body.firstChild);
				document.body.style.marginTop = '24px';
				injectFSBL();
			};
			/**
			 * Injects the windowManager into the window.
			 * @private
			 */
			function injectFSBL() {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.src = '/components/windowManager/windowManager.js';
				var head = document.getElementsByTagName('head')[0];
				head.appendChild(script);
		
			}
			/**
			 * Given a field, this function retrieves app state.
			 * @param {object} params
			 * @param {string} params.field field
			 * @param {function} cb Callback
			 * @example <caption>The example below shows how we retrieve data to restore the layout in our charts.</caption>	 
			 *FSBL.WindowClient.getAppState({
			 *	 field: 'myChartLayout',
			 *}, function (err, state) {
			   *	if (state === null) {
			 *		return;
			 *	}
			 *	stx.importLayout(state);
			 *});
			 **/
			this.getAppState = function (params, cb) {
				Validate.args(params, "object", cb, "function") && Validate.args2("params.field", params.field, "string");
				params.windowName = fin.desktop.Window.getCurrent().name;
				var hash = self.getContainerHash(params.windowName);
				StorageClient.localStorage.get(hash, function (err, response) {
					if (response.data && params.field) {
						var data = JSON.parse(response.data);
						console.log('Found', hash, data);
						self.appState[params.windowName] = data;
						cb(err, data[params.field]);
					} else {
						cb(err, response.data);
					}
				});
			};
		
			/**
			 * Checks to see if this save makes the workspace 'dirty'. We use this when deciding whether to prompt the user to save their workspace.
			 * @private
			 * @param {object} params
			 * @param {string} params.field field
			 * @param {string} params.windowName windowName
			 * @param {function} cb Callback
			 */
			this.compareSavedState = function (params) {
				if (!WorkspaceClient || WorkspaceClient.workspaceIsDirty) { return; };
				var hash = util.camelCase(WorkspaceClient.activeWorkspace.name, finWindow.name, params.windowName);
				StorageClient.localStorage.get(hash, function (err, response) {
					console.log('comparing saved state', response.data);
					if (response.data !== JSON.stringify(params.value)) {
						RouterClient.transmit('WorkspaceService.setActiveWorkspaceDirty', null, null);
					}
				});
			};
			/**
			 * Given a field, this function sets and persists app state.
			 * @param {object} params
			 * @param {string} params.field field
			 * @param {function=} cb Callback
			 * @example <caption>The example below shows how we save our chart layout when it changes.</caption>
			 * var s = stx.exportLayout(true);
			 * //saving layout'
			 * FSBL.WindowClient.setAppState({ field: 'myChartLayout', value: s });
			 **/
			this.setAppState = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && Validate.args2("params.field", params.field, "string");
				params.windowName = fin.desktop.Window.getCurrent().name;
				var hash = self.getContainerHash(params.windowName);
				self.appState[params.windowName][params.field] = params.value;
				this.compareSavedState(params);
				StorageClient.localStorage.save(hash, self.appState[params.windowName], function (err, response) {
					if (cb) { cb(err, response); }
				});
			};
			/**
			 * Gets containerHash given a containerId.
			 * @private
			 */
			this.getContainerHash = function (windowName) {
				return util.camelCase(self.windowHash, windowName);
			};
			/**
			 * This function is critical if you want docking and snapping to work. It transmits a message to the LauncherService, which registers it as a dockable window.
			 *
			 * **NOTE:** If you are using the finsemble windowManager component, you do not need to call this function.
			 * @example
			 * FSBL.WindowClient.registerWithDockingManager();
			 */
			this.registerWithDockingManager = function () {
				var application = fin.desktop.Application.getCurrent();
				application.getManifest(function (manifest) {
					var uuid = manifest.startup_app.uuid;
					var windowName = fin.desktop.Window.getCurrent().name;
					RouterClient.transmit('register-docking-window', {
						name: windowName,
						uuid: uuid
					});
				});
			};
			/**
			 * This function is critical if you don't want to keep references of windows in the LauncherService after they close. It simply notifies the LauncherService that the window is no longer dockable. It's invoked when the window is closed.
			 * **NOTE:** If you are using the finsemble windowManager component, you do not need to call this function.
			 * @example
			 * FSBL.WindowClient.deregisterWithDockingManager();
			 */
			this.deregisterWithDockingManager = function () {
				var windowName = fin.desktop.Window.getCurrent().name;
				RouterClient.transmit('deregister-docking-window', {
					name: windowName
				});
			};
		
			/**
			 * Helper function to display devtools if you disable context-menus on your chromium windows. You must call this function if you want the hotkey to work.
			 * @since 3/17/2017, only the Toolbar uses this.
			 */
			this.enableDevToolsHotkey = function () {
				if (window.location.hostname === 'localhost') {
					window.addEventListener('keydown', function (e) {
						if (e.keyCode === 68 && e.shiftKey && e.ctrlKey) {
							var application = fin.desktop.Application.getCurrent();
							application.getManifest(function (manifest) {
								var uuid = manifest.startup_app.uuid;
								var windowName = fin.desktop.Window.getCurrent().name;
								fin.desktop.System.showDeveloperTools(uuid, windowName);
							}, function (err) {
								console.error(err);
							});
						}
					});
				}
			};
			/**
			 * This function is invoked inside of {@link WindowClient#start|WindowClient.start()}. It adds listeners for 'close' (when the workspace is switched), 'bringToFront', 'restore', and 'move' (used in AutoArrange).
			 *
			 * **NOTE:** If you are using the finsemble windowManager component, you do not need to call this function.
			 * @example
			 * FSBL.WorkspaceClient.addWorkspaceListeners();
			 */
			this.addWorkspaceListeners = function () {
				RouterClient.addListener('WorkspaceService.' + finWindow.name, function (err, response) {
					switch (response.data.command) {
						case 'close':
							self.close(false);
							break;
						case 'bringToFront':
							finWindow.isShowing(function (isShowing) {
								if (isShowing) {
									finWindow.bringToFront(
										function () {
											console.debug('bringToFront successfull');
										}, function (err) {
										console.error('bringToFront failed: ' + err);
									});
								}
							});
							break;
						case 'restore':
							fin.desktop.Window.getCurrent().restore(
								function () {
									console.debug('restore successfull');
								}, function (err) {
								console.error('restore failed: ' + err);
							});
							break;
						case 'move':
							fin.desktop.Window.getCurrent().animate(
								{
									position: {
										left: response.data.left,
										top: response.data.top,
										duration: 250
									},
									size: {
										width: response.data.width,
										height: response.data.height,
										duration: 250
									}
								},
								{},
								function () {
									console.debug('successfully moved.');
								}, function (err) {
									console.error('Animate failed: ' + err);
								});
							break;
					}
				});
			};
		
			/**
			 * Kicks off all of the necessary methods for the app. It
			 * 1. Injects the header bar into the window.
			 * 2. Sets up listeners to handle close and move requests from the appplication.
			 * 3. Adds a listener that saves the window's state every time it's moved or resized.
			 * @param {object} params
			 * See the [WindowManager tutorial]{@tutorial windowManagerComponent} for more information.
			 */
			this.start = function (callback) {
				Validate.args(callback, "function");
				self.setInitialWindowState(function () {
					if (self.options.customData.FSBLHeader) {
						self.injectDOM();
						self.registerWithDockingManager();
					}
					self.addWorkspaceListeners();
					self.listenForBoundsChanged();
					if (callback) {
						callback();
					}
				});
			};
		
			var finWindow = fin.desktop.Window.getCurrent();
			return self;
		};
		
		var windowClient = new WindowClient({
			onReady: function (cb) {
				console.log("starting Window client");
				windowClient.start(cb);
			},
			name: "windowClient"
		});
		windowClient.requiredServices = ["workspaceService", "storageService"];
		//windowClient.initialize();
		
		module.exports = windowClient;
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		var RouterClient = __webpack_require__(4);
		var BaseClient = __webpack_require__(11);
		var Utils = __webpack_require__(1);
		var console = new Utils.Console("BaseClient"); // Finsemble console
		var Validate = __webpack_require__(3); // Finsemble args validator
		var WindowClient = __webpack_require__(14);
		/**
		 * @introduction
		 * ## WorkspaceClient
		 * ----------
		 * The workspace client manages all calls to load, save, rename, and delete workspaces. Before reading this, please check out [Understanding Workspaces]{@tutorial workspaces}.
		 *
		 * @constructor
		 * @summary You don't need to ever invoke the constructor. This is done for you when WindowClient is added to the FSBL object.
		 */
		function WorkspaceClient(params) {
			Validate.args(params, "object=") && params && Validate.args2("params.onReady", params.onReady, "function=");
			/** @alias WorkspaceClient# */
			BaseClient.call(this, params);
		
			var self = this;
			//Whether the workspace differs from its source in storage.
			this.workspaceIsDirty = false;
			//Where we'll keep a list of all of the available workspaces.
			this.workspaces = [];
			//Where we'll store the activeWorkspace.
			this.activeWorkspace = {};
			/**
			 * Adds window to active workspace.
			 * @param {object} params
			 * @param {string} params.name Window name
			 * @param {function} cb Callback
			 * @todo This function probably shouldn't even exist. Just make <code>addToWorkspace</code> a param in the windowDescriptor.
			 * @example <caption>This method adds a window to a workspace. By default, spawning a window does not add it to the workspace. It is often used in conjunction with the {@link LauncherClient}.</caption>
			 FSBL.LauncherClient.spawn({ windowDescriptor: windowDescriptor }, function (err, response) {
					if (windowDescriptor.addToWorkspace) {
						FSBL.WorkspaceClient.addWindow('AdvancedChart', response.data.name);
					}
				});
			 */
			this.addWindow = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && params && Validate.args2("params.name", params.name, "string");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				RouterClient.query('WorkspaceService.addWindow', params, cb);
			};
			/**
			 * AutoArranges windows.
			 * @param {function=} cb Callback
			 * @example
			 * FSBL.WorkspaceClient.autoArrange(null, function(err, response){
			 * 		//do something after the autoarrange, maybe make all of the windows flash or notify the user that their monitor is now tidy.
			 * });
			 */
			this.autoArrange = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && Validate.args2("params.monitorDimensions", params.monitorDimensions, "object");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				RouterClient.query('WorkspaceService.autoArrange', params, cb);
			};
			/**
			 * Brings all windows to the front.
			 * @param {object} params
			 * @param {object} params.monitorDimensions The dimensions of the monitor where windows should be brought forward.
			 * @param {function} [cb] Callback.
			 * @todo rename to something like <code>bringToFront</code> and put the 'Only affects visible windows' bit in the documentation.
			 * @example
			 * FSBL.WorkspaceClient.bringWindowsToFront();
			 */
			this.bringWindowsToFront = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && Validate.args2("params.monitorDimensions", params.monitorDimensions, "object");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				if (!params) {
					params = {
						monitorDimensions: WindowClient.options.customData.monitorDimensions
					};	
				}
				
				RouterClient.query('WorkspaceService.bringWindowsToFront', params, cb);
			};
		
			/**
			 * Gets the currently active workspace.
			 * @param {function} cb Callback
			 * @example <caption>This function is useful for setting the initial state of a menu or dialog. It is used in the toolbar component to set the initial state.</caption>
			 *
			FSBL.WorkspaceClient.getActiveWorkspace(function (err, response) {
				//setState is a React component method.
				self.setState({
					workspaces: response.data
				});
			});
			 */
			this.getActiveWorkspace = function (cb) {
				Validate.args(cb, "function");
				RouterClient.query('WorkspaceService.getActiveWorkspace', null, cb);
			};
		
			/**
			 * Returns the list of saved workspaces.
			 * @param {function} cb Callback
			 * @example <caption>This function is useful for setting the initial state of a menu or dialog.</caption>
			 *
			FSBL.WorkspaceClient.getWorkspaces(function (err, response) {
				//setState is a React component method.
				self.setState({
					workspaces: response.data
				});
			});
			 */
			this.getWorkspaces = function (cb) {
				Validate.args(cb, "function");
				RouterClient.query('WorkspaceService.getWorkspaces', null, cb);
			};
		
			/**
			 * Removes a workspace. Either the workspace object or its name must be provided.
			 * @param {object} params
			 * @param {Boolean}	[params.persist=false] Whether to persist the change.
			 * @param {Object} 	[params.workspace] Workspace
			 * @param {string} 	[params.name] Workspace Name
			 * @param {function=} cb Callback to fire after 'WorkspaceService.update' is transmitted.	 
			 * @example <caption>This function removes 'My Workspace' from the main menu and the default storage tied to the applicaton.</caption>
			 * FSBL.WorkspaceClient.remove({	 
				name: 'My Workspace',
				persist: true
			  }, function(err, response){
			 		//You typically won't do anything here. If you'd like to do something when a workspace change happens, we suggest listening on the `WorkspaceService.update` channel.
			  });
			 */
		
			this.remove = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && !(params.name || params.workspace) && Validate.args2("params.name", params.name, "string");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				var defaultParams = {
					persist: false,
					workspace: null,
					name: null
				};
				//sets defaults for undefined params.
				params.prototype = Object.create(defaultParams);
				RouterClient.query('WorkspaceService.remove', params, cb);
			};
			/**
			 * Removes window from active workspace.
			 * @param {object} params
			 * @param {string} params.name Window name
			 * @param {function=} [cb] Callback
			 * @example <caption>This method removes a window from a workspace. It is rarely called by the developer. It is called when a window that is using the window manager is closed. That way, the next time the app is loaded, that window is not spawned.</caption>
			 *FSBL.WorkspaceClient.removeWindow({name:windowName}, function(err, response){
				 //do something after removing the window.
			 });
			 */
			this.removeWindow = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && Validate.args2("params.name", params.name, "string");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				RouterClient.query('WorkspaceService.removeWindow', params, cb);
			};
		
			/**
			 * Renames the workspace with the provided name. Also removes all references in storage to the old workspace's name.
			 * @param {object} params
			 * @param {string} params.oldName Name of workspace to rename.
			 * @param {string} params.newName What to rename the workspace to.
			 * @param {boolean=} [params.removeOldWorkspace=true] Whether to remove references to old workspace after renaming.
			 * @param {boolean=} [params.overwriteExisting=false] Whether to overwrite an existing workspace.
			 * @param {function=} cb Callback	 
			 * @example <caption>This method is used to rename workspaces. It is used in the main Menu component.</caption>
			 * FSBL.WorkspaceClient.rename({	 
				oldName: 'My Workspace',
				newName: 'The best workspace',
				removeOldWorkspace: true,
			  }, function(err, response){
			 		//Do something.
			  });
			 */
			this.rename = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && Validate.args2("params.oldName", params.oldName, "string", "params.newName", params.newName, "string");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				if (!params.overwriteExisting && this.workspaceIsAlreadySaved(params.newName)) { 
					cb(new Error('WorkspaceAlreadySaved'), params);
					return;
				}
				RouterClient.query('WorkspaceService.rename', params, cb);
			};
		
			/**
			 * Makes a clone of the workspace.
			 * @param {object} params
			 * @param {string} params.name Name of workspace to clone.	 
			 * @param {function} cb Callback	 
			 * @example <caption>This method is used to clone workspaces. </caption>
			 * FSBL.WorkspaceClient.clone({	 		
				name: 'The best workspace'
			  }, function(err, response){
			 		//Do something.
			  });
			 */
			this.clone = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && Validate.args2("params.name", params.name, "string");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				RouterClient.query('WorkspaceService.clone', params, cb);
			};
			
			/**
			 * Saves the currently active workspace. It does not overwrite the saved instance of the workspace. It simply overwrites the <code>activeWorkspace</code> key in storage.
			 * @param {function} cb Callback
			 * @example
			 * <caption>This function persists the currently active workspace.</caption>
			 * FSBL.WorkspaceClient.save(function(err, response){
			 		//Do something.
			  });
			 */
			this.save = function (cb) {
				Validate.args(cb, "function=");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				RouterClient.query('WorkspaceService.save', null, cb);
			};
			/**
			 * Helper that tells us whether a workspace is saved.
			 * @private
			 */
			this.workspaceIsAlreadySaved = function (workspaceName) {
				Validate.args(workspaceName, "string");
				var savedWorkspaceIndex = -1;
				for (var i = 0; i < self.workspaces.length; i++) {
					if (workspaceName === self.workspaces[i].name) {
						return true;
					}
				}
				return false;
			};
			/**
			 * 
			 * Saves the currently active workspace with the provided name. 
			 * @param {object} params
			 * @param {string} params.name new name to save workspace under.
			 * @param {string} [params.force=false] Whether to overwrite a workspace already saved with the provided name.	 
			 * @param {function} cb Callback
			 * @example <caption>This function persists the currently active workspace with the provided name.</caption>
			 * FSBL.WorkspaceClient.saveAs({	 
				name: 'My Workspace',		
			  }, function(err, response){
			 		//Do something.
			  });
			 */
			this.saveAs = function (params, cb) {
				Validate.args(params, "object", cb, "function=") && Validate.args2("params.name", params.name, "string");
				cb = cb || function noop() { }; // cb is optional but not for underlying query
				
				if (!params.force && this.workspaceIsAlreadySaved(params.name)) { 
					cb(new Error('WorkspaceAlreadySaved'), null);
					return;
				}
				RouterClient.query('WorkspaceService.saveAs', params, cb);
			};
		
			/**
			 * Switches to a workspace. 
			 * @param {object} params	 
			 * @param {string} 	params.name Workspace Name
			 * @param {function} cb Callback
			 * @example <caption>This function loads the workspace 'My Workspace' from the storage tied to the application.</caption>
			 * FSBL.WorkspaceClient.switchTo({	 
				name: 'My Workspace',		
			  }, function(err, response){
			 		//Do something.
			  });
			 */
			this.switchTo = function (params, cb) {
				Validate.args(params, "object", cb, "function") && Validate.args2("params.name", params.name, "string");
				RouterClient.query('WorkspaceService.switchTo', params, cb);
			};
		
			/**
			 * Checks to see if the workspace is dirty. If it's already dirty, the window doesn't need to compare its state to the saved state.
			 * @param {Function} cb Callback
			 */
			this.isWorkspaceDirty = function (cb) {
				Validate.args(cb, "function");
				RouterClient.query('WorkspaceService.isActiveWorkspaceDirty', null, cb);
			};
		
			/**
			 * Initializes listeners and sets default data on the WorkspaceClient object.
			 * @private
			 */
			this.start = function(cb){
				
				/**
				 * Initializes the workspace's state.
				 */
				RouterClient.addListener('WorkspaceService.update', function(err, response){
					self.workspaceIsDirty = response.data.activeWorkspace.isDirty;
					self.workspaces = response.data.workspaces;
					self.activeWorkspace = response.data.activeWorkspace;
				});
		
				self.getActiveWorkspace(function (err, response) {
					self.activeWorkspace = response.data;
					self.workspaceIsDirty = response.data.isDirty;
					self.getWorkspaces(function (err, response) {
						self.workspaces = response.data;
						cb();
					});							
				});						
				
			};
			return this;
		};
		
		var workspaceClient = new WorkspaceClient({
			onReady: function (cb) {
				console.log("starting workspace client");
				workspaceClient.start(cb);
			},
			name: "workspaceClient"
		});
		workspaceClient.requiredServices = ["workspaceService", "storageService"];
		//workspaceClient.initialize();
		
		module.exports = workspaceClient;
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		
		"use strict";
		var RouterClient = __webpack_require__(4);
		var LauncherClient = __webpack_require__(12);
		var WindowClient = __webpack_require__(14);
		var Utils = __webpack_require__(1);
		var Validate =  __webpack_require__(3);
		var console = new Utils.Console("DialogManager"); // Finsemble console
		var BaseClient = __webpack_require__(11);
		
		/**
		 *
		 * @introduction
		 * <h2>Dialog Manager Client</h2>
		 * This client interfaces to the Finsemble Diaglog Manager Service.
		 *
		 * Returns an instance of the DialogManagerClient, which spawns new user-dialog windows and receiving back a response.
		 *
		 * @param {object=} params optional parameters
		 * @param {function=} params.onReady callback function indicating when client is ready
		 * @param {string=} params.name client name for diagnostics/logging
		 * @constructor
		 *
		 */
		var DialogManagerClient = function (params) {
			Validate.args(params, "object=") && params && Validate.args2("params.onReady", params.onReady, "function=");
		
			BaseClient.call(this, params);
			/////////////////////////////////////////////
			// Public Functions -- Dialog Parent Side
			/////////////////////////////////////////////
		
			/**
			 * Spawns a Dialog window. 
			 * 
			 * @param {params} params the window descriptor representing a component or URL for the dialog
			 * @param {object} inputParams parameters pass to dialog (using the event router) -- generally what is supported depends on dialog URL
			 * @param {function} responseCallback called when response received back from dialog window (typically on dialog completion)
			 *
			 * @return dialogID can be used to kill a spawned dialog prematurely
			 *
			 * @todo support paramter to make the dialog modal
			 */
			this.spawnDialog = function (params, inputParams, dialogResponseCallback) {
				console.debug("spawning dialog");
				Validate.args(params, "object", inputParams, "object", dialogResponseCallback, "function");
				var componentName;
				var responseChannel = Utils.getUniqueName("DialogChannel");
				params.customData = { inputParams, responseChannel: responseChannel };
				if (typeof params.name === "undefined") {
					params.name = "dialogTemplate";
				}				
				params.customData.monitorDimensions = WindowClient.options.monitorDimensions;
				LauncherClient.spawn(params.name, { options: params }, function (err, response) {
					if (err) {
						dialogResponseCallback(err, response.data);
					} else {
						RouterClient.addListener(responseChannel, function cb(err, response) {
							console.debug("dialogResponse: " + JSON.stringify(response.data));
							dialogResponseCallback(err, response.data);
							RouterClient.removeListener(responseChannel, cb);
						});
					}
				});
				return 0;
			};
		
			/**
			 * Cancels an active dialog prematurely (normally a dialog will terminal on completion, returning a response).
			 * 
			 * @param {any} dialogID identifies dialog to be terminated
			 *
			 * @todo implement when launcher supports kill function
			 */
			this.killSpawnedDialog = function (dialogID) { };
		
			/////////////////////////////////////////////
			// Public Functions -- Dialog Client Side
			/////////////////////////////////////////////
		
			/**
			 * Called within dialog to get the paramters passed in spawnDialog's "inputParams" 
			 * 
			 * @param {any} dialogID identifies dialog to be terminated
			 *
			 * @return {object} inputParams parameters pass to dialog 
			 */	
			this.getParamtersFromInDialog = function () {
				var inputParams = WindowClient.options.customData.inputParams;
				console.debug("getParamtersFromInDialog: " + JSON.stringify(inputParams));
				return inputParams;
			};
		
			/**
			 * Called within dialog to pass back dialog response and terminal window 
			 * 
			 * @param {any} responseParameters parameters returned to parent (i.e. window that spawned the dialog) 
			 *
			 */	
			this.respondAndExitFromInDialog = function (responseParameters) {
				Validate.args(responseParameters, "any");
				console.debug("sendResponseFromInDialog: " + JSON.stringify(responseParameters));
				var responseChannel = WindowClient.options.customData.responseChannel;
				RouterClient.transmit(responseChannel, responseParameters);
				fin.desktop.Window.getCurrent().close(true);
			};
		
		};
		
		// instance of dialogManagerClient that is exported by this module
		var dialogManagerClient = new DialogManagerClient({
			onReady: function (cb) {
				console.log("dialogClient online");
				cb();
			},
			name: "dialogManagerClient"
		});
		dialogManagerClient.requiredServices = ["launcherService"]; // service required by this client
		//dialogManagerClient.initialize(); // intialize this client's base service
		
		module.exports = dialogManagerClient;
		
	
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=FSBL.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Finsemble = __webpack_require__(1);
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=testComponent.js.map