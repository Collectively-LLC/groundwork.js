/*! groundwork.js 1.1.1 | (c) 2016 Timshel / The Groundwork - BSD Licence https://opensource.org/licenses/BSD-3-Clause */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Groundwork"] = factory();
	else
		root["Groundwork"] = factory();
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Groundwork = __webpack_require__(2);
	
	var _Groundwork2 = _interopRequireDefault(_Groundwork);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = _Groundwork2.default; /*global module */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _defineProperty2 = __webpack_require__(23);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _DEFAULTS; /*global __LOG__, TAG*/
	/*eslint-disable no-param-reassign*/
	
	var _constants = __webpack_require__(24);
	
	var constants = _interopRequireWildcard(_constants);
	
	var _Auth = __webpack_require__(25);
	
	var _Auth2 = _interopRequireDefault(_Auth);
	
	var _Dictionary = __webpack_require__(26);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _Donation = __webpack_require__(235);
	
	var _Donation2 = _interopRequireDefault(_Donation);
	
	var _Event = __webpack_require__(271);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Http = __webpack_require__(49);
	
	var _Http2 = _interopRequireDefault(_Http);
	
	var _Profile = __webpack_require__(288);
	
	var _Profile2 = _interopRequireDefault(_Profile);
	
	var _Quickcard = __webpack_require__(290);
	
	var _Quickcard2 = _interopRequireDefault(_Quickcard);
	
	var _Subscription = __webpack_require__(293);
	
	var _Subscription2 = _interopRequireDefault(_Subscription);
	
	var _Supporter = __webpack_require__(294);
	
	var _Supporter2 = _interopRequireDefault(_Supporter);
	
	var _utils = __webpack_require__(228);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Map of resource modules to attach to Groundwork instances
	 */
	var RESOURCES = {
	  auth: _Auth2.default,
	  donations: _Donation2.default,
	  events: _Event2.default,
	  profiles: _Profile2.default,
	  quickcards: _Quickcard2.default,
	  subscriptions: _Subscription2.default,
	  supporters: _Supporter2.default
	};
	
	/**
	 * Default configuration for client
	 */
	var DEFAULTS = (_DEFAULTS = {}, (0, _defineProperty3.default)(_DEFAULTS, constants.API_URL, constants.DEFAULT_API_URL), (0, _defineProperty3.default)(_DEFAULTS, constants.OAUTH_CLIENT_ID, ''), (0, _defineProperty3.default)(_DEFAULTS, constants.FACEBOOK_APP_ID, ''), (0, _defineProperty3.default)(_DEFAULTS, constants.CONFIG_AUTH, {}), _DEFAULTS);
	
	/**
	 * Groundwork Client Library
	 *
	 * @desc
	 * For backwards compatability apiKey is aliased to oauth_client_id within the
	 * config dictionary. The clientId getter/setters remain next to the same
	 * getters/setters for apiKey. This allows code written for older versions of
	 * groundwork.js to continue to use oauth_client_id to configure an instance while
	 * new code is encouraged to use apiKey.
	 *
	 * @example
	 * let gw = new Groundwork({'apiKey': '1234'});
	 */
	
	var Groundwork = function () {
	  /**
	   * Constructor
	   * @param {Object} config - client configuration
	   */
	
	  function Groundwork() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Groundwork);
	
	    // display a deprecation warning for oauth_client_id in DEV only
	    (0, _utils.deprecate)(config.oauth_client_id, 'oauth_client_id is deprecated, please use apiKey instead');
	
	    // display a deprecation warning for api_url in DEV only
	    (0, _utils.deprecate)(config.api_url, 'api_url is deprecated, please use apiUrl instead');
	
	    // alias apiKey to OAUTH_CLIENT_ID
	    if (config.apiKey) {
	      config[constants.OAUTH_CLIENT_ID] = config.apiKey;
	      delete config.apiKey;
	    }
	
	    // alias apiUrl to API_URL
	    if (config.apiUrl) {
	      config[constants.API_URL] = config.apiUrl;
	      delete config.apiUrl;
	    }
	
	    /** @type {Dictionary} */
	    this.config = new _Dictionary2.default(DEFAULTS);
	    this.config.merge(config);
	
	    /** @type {Http} */
	    this.http = new _Http2.default(this.config);
	
	    // Attach resource modules and pass in config
	    for (var resource in RESOURCES) {
	      if (RESOURCES.hasOwnProperty(resource)) {
	        this[resource] = new RESOURCES[resource](this.config, this.http);
	      }
	    }
	  }
	
	  /**
	   * Getters / Setters
	   */
	
	  /**
	   * Get the version # of this build as deteremined by Webpack
	   * @return {String}
	   */
	
	
	  (0, _createClass3.default)(Groundwork, [{
	    key: 'version',
	    get: function get() {
	      return ("1.1.1");
	    }
	
	    /**
	     * Get OAUTH_CLIENT_ID
	     * @deprecated use apiKey instead
	     * @return {*}
	     */
	
	  }, {
	    key: 'clientId',
	    get: function get() {
	      (0, _utils.deprecate)(true, 'clientId is deprecated, please use apiKey instead');
	      return this.config.get(constants.OAUTH_CLIENT_ID);
	    }
	
	    /**
	     * Mutate OAUTH_CLIENT_ID within an instance of Groundwork
	     * @deprecated use apiKey instead
	     * @type {String}
	     */
	    ,
	    set: function set(id) {
	      (0, _utils.deprecate)(true, 'clientId is deprecated, please use apiKey instead');
	      this.config.set(constants.OAUTH_CLIENT_ID, id);
	    }
	
	    /**
	     * Get apiKey, alias for OAUTH_CLIENT_ID
	     * @return {*}
	     */
	
	  }, {
	    key: 'apiKey',
	    get: function get() {
	      return this.config.get(constants.OAUTH_CLIENT_ID);
	    }
	
	    /**
	     * Mutate apiKey within an instance of Groundwork
	     * Alias for OAUTH_CLIENT_ID
	     * @type {String}
	     */
	    ,
	    set: function set(id) {
	      this.config.set(constants.OAUTH_CLIENT_ID, id);
	    }
	
	    /**
	     * Get API_URL
	     * @return {*}
	     */
	
	  }, {
	    key: 'apiUrl',
	    get: function get() {
	      return this.config.get(constants.API_URL);
	    }
	
	    /**
	     * Mutate API_URL within an instance of Groundwork
	     * @type {String}
	     */
	    ,
	    set: function set(url) {
	      this.config.set(constants.API_URL, url);
	    }
	
	    /**
	     * Get API_VERSION
	     * @return {*}
	     */
	
	  }, {
	    key: 'apiVersion',
	    get: function get() {
	      return this.config.get(constants.API_VERSION);
	    }
	
	    /**
	     * Mutate API_VERSION within an instance of Groundwork
	     * @type {String}
	     */
	    ,
	    set: function set(version) {
	      if (!(0, _utils.isApiVersion)(version)) {
	        throw new Error('apiVersion must be formatted in either YYYY-MM-DD or with\nan optinal integer like 2028-03-23:12');
	      } else {
	        this.config.set(constants.API_VERSION, version);
	      }
	    }
	  }]);
	  return Groundwork;
	}();
	
	exports.default = Groundwork;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , hide      = __webpack_require__(13)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14)
	  , createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(18) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(15)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(21)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(18) && !__webpack_require__(19)(function(){
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Constants: Mostly keys for various objects within the library
	 */
	
	/**
	 * Auth Key
	 * @type {String}
	 */
	var AUTH_ACCESS_TOKEN = 'accessToken';
	
	/**
	 * Auth Key
	 * @type {String}
	 */
	var AUTH_GWID = 'gwid';
	
	/**
	 * Auth Key
	 * @type {String}
	 */
	var AUTH_TOKEN_TYPE = 'tokenType';
	
	/**
	 * Config Key
	 * @type {String}
	 */
	var API_URL = 'api_url';
	
	/**
	 * Config Key
	 * @type {String}
	 */
	var API_VERSION = 'api_version';
	
	/**
	 * Config Key
	 * @type {String}
	 */
	var CONFIG_AUTH = 'auth';
	
	/**
	 * Config Key
	 * @type {String}
	 */
	var FACEBOOK_APP_ID = 'facebook_app_id';
	
	/**
	 * Config Key
	 * @type {String}
	 */
	var OAUTH_CLIENT_ID = 'oauth_client_id';
	
	/** @type {String} */
	var DEFAULT_API_URL = 'https://api.thegroundwork.com';
	
	/** @type {RegExp} */
	var RE_API_VERSION = /^\d{4}[-]\d{2}[-]\d{2}(:\d+)?$/gm;
	
	exports.API_URL = API_URL;
	exports.API_VERSION = API_VERSION;
	exports.AUTH_ACCESS_TOKEN = AUTH_ACCESS_TOKEN;
	exports.AUTH_GWID = AUTH_GWID;
	exports.AUTH_TOKEN_TYPE = AUTH_TOKEN_TYPE;
	exports.CONFIG_AUTH = CONFIG_AUTH;
	exports.DEFAULT_API_URL = DEFAULT_API_URL;
	exports.FACEBOOK_APP_ID = FACEBOOK_APP_ID;
	exports.OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
	exports.RE_API_VERSION = RE_API_VERSION;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _constants = __webpack_require__(24);
	
	var constants = _interopRequireWildcard(_constants);
	
	var _Dictionary = __webpack_require__(26);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _Http = __webpack_require__(49);
	
	var _Http2 = _interopRequireDefault(_Http);
	
	var _merge = __webpack_require__(109);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _utils = __webpack_require__(228);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * API Endpoints
	 */
	var NAMESPACE = 'oauth';
	var ENDPOINT_TOKEN = 'token';
	
	/**
	 * Manage oauth and user tokens for the client. Once a successful auth token has
	 * been fetched it is stored in `this.config` for use in authenticated
	 * requests to the API.
	 */
	
	var Auth = function () {
	  /**
	   * Constructor
	   * @param {Dictionary} [config] - client configuration
	   * @param {Http} http - required
	   */
	
	  function Auth(config, http) {
	    (0, _classCallCheck3.default)(this, Auth);
	
	    /** @type {Dictionary} */
	    this.config = config && config instanceof _Dictionary2.default ? config : new _Dictionary2.default();
	
	    // Resource must have an Http instance
	    if (!http || http instanceof _Http2.default === false) {
	      throw new Error('Auth requires Http');
	    }
	
	    /** @type {Http} */
	    this.http = http;
	  }
	
	  /**
	   * If a response contains data, drop it into the user key in config
	   *
	   * @access private
	   * @param {Object} response
	   * @return {Object}
	   */
	
	
	  (0, _createClass3.default)(Auth, [{
	    key: 'storeAuthResponse',
	    value: function storeAuthResponse(response) {
	      if (response && response.status === 200) {
	        this.auth = (0, _merge2.default)({}, this.auth, response.data);
	      }
	      return response;
	    }
	
	    /**
	     * Make a POST to the token endpoint and pass the result to
	     * storeAuthResponse for handling. The Promise is then returned to the
	     * original caller for further chaining.
	     *
	     * @access private
	     * @param {Object} params sent to the endpoint
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'requestToken',
	    value: function requestToken(data) {
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_TOKEN);
	      return this.http.post(url, data).then(this.storeAuthResponse.bind(this));
	    }
	
	    /**
	     * Wipe out auth settings in config, which will prevent authenticated requests
	     * until a new one is fetchd
	     *
	     * @return {Object}
	     */
	
	  }, {
	    key: 'destroyToken',
	    value: function destroyToken() {
	      this.config.del(constants.CONFIG_AUTH);
	      return this.config.set(constants.CONFIG_AUTH, {});
	    }
	
	    /**
	     * Use email / password to fetch Rex token
	     *
	     * @param {String} email
	     * @param {String} password
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetchUsingPassword',
	    value: function fetchUsingPassword() {
	      var email = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var password = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      return this.requestToken({
	        email: email,
	        password: password,
	        grant_type: 'password'
	      });
	    }
	
	    /**
	     * Use Facebook to fetch Rex token
	     *
	     * @param {String} accessToken
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetchUsingFacebook',
	    value: function fetchUsingFacebook() {
	      var accessToken = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      return this.requestToken({
	        access_token: accessToken,
	        grant_type: 'facebook'
	      });
	    }
	
	    /**
	     * Use Google to fetch Rex token
	     *
	     * @param {String} accessToken
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetchUsingGoogle',
	    value: function fetchUsingGoogle() {
	      var accessToken = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      return this.requestToken({
	        access_token: accessToken,
	        grant_type: 'google'
	      });
	    }
	
	    /**
	     * Convenience method to get the Facebook APP Id registered with the client
	     *
	     * @return {String}
	     */
	
	  }, {
	    key: 'insertAuthKey',
	
	
	    /**
	     * Safely merge a key/val into the auth config object, used in setters
	     *
	     * @access private
	     * @param {String} key - key name
	     * @param {<any>} val - value to store, usually a string
	     * @return {undefined|Object}
	     */
	    value: function insertAuthKey(key, val) {
	      var auth = (0, _merge2.default)({}, this.auth);
	      if (!key || !val) {
	        return undefined;
	      }
	      auth[key] = val;
	      this.auth = auth;
	      return this.auth;
	    }
	
	    /**
	     * Set auth config object
	     *
	     * @param {Object} obj - obj to set
	     * @return {Object}
	     */
	
	  }, {
	    key: 'facebookAppId',
	    get: function get() {
	      return this.config.get(constants.FACEBOOK_APP_ID);
	    }
	
	    /**
	     * Return the entire authentication object
	     *
	     * @return {Object}
	     */
	
	  }, {
	    key: 'auth',
	    get: function get() {
	      return this.config.get(constants.CONFIG_AUTH);
	    }
	
	    /**
	     * Return the authorization token
	     *
	     * @return {String}
	     */
	    ,
	    set: function set(obj) {
	      this.config.set(constants.CONFIG_AUTH, (0, _merge2.default)({}, obj));
	      return this.auth;
	    }
	
	    /**
	     * Set token config object
	     *
	     * @type {String}
	     */
	
	  }, {
	    key: 'token',
	    get: function get() {
	      return this.auth[constants.AUTH_ACCESS_TOKEN];
	    }
	
	    /**
	     * Return the authorization token
	     *
	     * @return {String}
	     */
	    ,
	    set: function set(token) {
	      this.insertAuthKey(constants.AUTH_ACCESS_TOKEN, token);
	    }
	
	    /**
	     * Set gwid config object
	     *
	     * @type {String}
	     */
	
	  }, {
	    key: 'tokenType',
	    get: function get() {
	      return this.auth[constants.AUTH_TOKEN_TYPE];
	    }
	
	    /**
	     * Return the gwid
	     *
	     * @return {String}
	     */
	    ,
	
	
	    /**
	     * Set tokenType config object
	     *
	     * @type {String}
	     */
	    set: function set(type) {
	      this.insertAuthKey(constants.AUTH_TOKEN_TYPE, type);
	    }
	  }, {
	    key: 'gwid',
	    get: function get() {
	      return this.auth[constants.AUTH_GWID];
	    }
	
	    /**
	     * Return a string for use in an Authorization header: "{tokenType} {token}"
	     *
	     * @return {String}
	     */
	    ,
	    set: function set(gwid) {
	      this.insertAuthKey(constants.AUTH_GWID, gwid);
	    }
	  }, {
	    key: 'authorizationHeader',
	    get: function get() {
	      return this.tokenType + ' ' + this.token;
	    }
	  }]);
	  return Auth;
	}();
	
	exports.default = Auth;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringify = __webpack_require__(27);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _keys = __webpack_require__(29);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Simple dictionary for storing configuration key/val pairs
	 *
	 * @example
	 * let d = new Dictionary({foo: 1});
	 * d.get('foo'); // returns 1
	 * d.set('bar', 2); d.get('bar'); // returns 2
	 */
	
	var Dictionary = function () {
	  /**
	   * Constructor with or without default values
	   * @param {Object} [defaults] - initial values in dictionary
	   */
	
	  function Dictionary() {
	    var defaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Dictionary);
	
	    /**
	     * @type {Object}
	     */
	    this.dict = {};
	    if (defaults) {
	      this.merge(defaults);
	    }
	  }
	
	  /**
	   * Set or overwrite a value
	   * @param {string} key - name of value
	   * @param {*} val - value to store
	   * @return {Object|undefined}
	   */
	
	
	  (0, _createClass3.default)(Dictionary, [{
	    key: "set",
	    value: function set(key, val) {
	      if (!key || !val) {
	        return undefined;
	      }
	
	      this.dict[key] = val;
	      return this.data();
	    }
	
	    /**
	     * Get a value
	     * @param {string} key - name of value
	     * @return {*}
	     */
	
	  }, {
	    key: "get",
	    value: function get(key) {
	      if (key && this.dict[key]) {
	        return this.dict[key];
	      }
	      return undefined;
	    }
	
	    /**
	     * Delete a value
	     * @param {string} key - name of value
	     * @return {undefined}
	     */
	
	  }, {
	    key: "del",
	    value: function del(key) {
	      if (key && this.dict[key]) {
	        delete this.dict[key];
	        return this.data();
	      }
	      return undefined;
	    }
	
	    /**
	     * Predicate: check existence of key
	     * @param {string} key - name of value
	     * @return {boolean}
	     */
	
	  }, {
	    key: "has",
	    value: function has(key) {
	      return !!(key && this.dict[key]);
	    }
	
	    /**
	     * Return a list of keynames
	     * @return {Array<string>}
	     */
	
	  }, {
	    key: "keys",
	    value: function keys() {
	      return (0, _keys2.default)(this.dict);
	    }
	
	    /**
	     * Return a list of values
	     * @return {Array}
	     */
	
	  }, {
	    key: "values",
	    value: function values() {
	      var ret = [];
	      var data = this.data();
	
	      for (var k in data) {
	        if (data.hasOwnProperty(k)) {
	          ret.push(this.get(k));
	        }
	      }
	
	      return ret.filter(function (x) {
	        return x;
	      });
	    }
	
	    /**
	     * Merge an object into the existing dictionary. This will mutate the
	     * dictionary.
	     * @return {Object}
	     */
	
	  }, {
	    key: "merge",
	    value: function merge(obj) {
	      if (!obj) {
	        return this.data();
	      }
	
	      for (var k in obj) {
	        if (obj.hasOwnProperty(k)) {
	          this.set(k, obj[k]);
	        }
	      }
	
	      return this.data();
	    }
	
	    /**
	     * Return a JSON string representation of the dictionary
	     * @return {string}
	     */
	
	  }, {
	    key: "toString",
	    value: function toString() {
	      return (0, _stringify2.default)(this.data());
	    }
	
	    /**
	     * Return the raw dictionary object
	     * @return {Object}
	     */
	
	  }, {
	    key: "data",
	    value: function data() {
	      return this.dict;
	    }
	
	    /**
	     * Return the 'length' of the dictionary (# of keys)
	     * @return {Number}
	     */
	
	  }, {
	    key: "length",
	    value: function length() {
	      return this.keys().length;
	    }
	  }]);
	  return Dictionary;
	}();
	
	exports.default = Dictionary;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(10)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(31);
	module.exports = __webpack_require__(10).Object.keys;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(32)
	  , $keys    = __webpack_require__(34);
	
	__webpack_require__(48)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(33);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(35)
	  , enumBugKeys = __webpack_require__(47);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(36)
	  , toIObject    = __webpack_require__(37)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(44)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(33);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(37)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(43);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(42)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(45)('keys')
	  , uid    = __webpack_require__(46);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(10)
	  , fails   = __webpack_require__(19);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _defineProperty2 = __webpack_require__(23);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	var _constants = __webpack_require__(24);
	
	var constants = _interopRequireWildcard(_constants);
	
	var _Dictionary = __webpack_require__(26);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _axios = __webpack_require__(91);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _merge = __webpack_require__(109);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _utils = __webpack_require__(228);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {String} */
	var API_VERSION_HEADER = 'gw-api-version';
	
	/** @type {String} */
	/*global TAG, __LOG__, btoa*/
	
	var CLIENT_HEADER = 'gw-js-client';
	
	/** @type {Function} */
	var CLIENT_VERSION =  true ? ("1.1.1").replace(/[\s]*/g, '') : 'None';
	
	// Template for XHR responses
	/** @type {Object} */
	var GENERIC_RESPONSE = (0, _freeze2.default)({
	  config: {},
	  data: {},
	  headers: {},
	  status: 0,
	  statusText: ''
	});
	
	/**
	 * Core AJAX handling with the API
	 *
	 * @desc
	 * Under the hood XHR is handled via Axios - https://github.com/mzabriskie/axios
	 * which provides a simple Promise-based interface for JSON communication via
	 * XHR.
	 *
	 * Http also manages custom headers needed by The Groundwork API. `gw-version`
	 * is added to all requests. If the client has received an auth token, the
	 * appropriate `Authorization` header will be sent as well.
	 *
	 * All HTTP verb methods (get, put, post, delete) return a Promise for handling
	 * success and error states.
	 *
	 * @example
	 * let http = new Http();
	 * // make a GET request to `/foo`
	 * http.get('foo').then((response) => {
	 *    console.log(response)
	 *  ).catch((err) => {
	 *    console.log(error);
	 * });
	 *
	 */
	
	var Http = function () {
	  /**
	   * Constructor
	   * @param {Dictionary} config - client configuration
	   */
	
	  function Http(config) {
	    (0, _classCallCheck3.default)(this, Http);
	
	    /** @type {Dictionary} */
	    this.config = config && config instanceof _Dictionary2.default ? config : new _Dictionary2.default();
	
	    /** @type {Object} */
	    this.genericResponse = GENERIC_RESPONSE;
	
	    this.setupRequestInterceptors();
	  }
	
	  /**
	   * Create a mock Axios response, used in error messages returned from
	   * Promises that don't make it to the server (validation errors, etc.)
	   *
	   * @param {Object} [mock] - object to merge into genericResponse
	   * @return {Object}
	   */
	
	
	  (0, _createClass3.default)(Http, [{
	    key: 'generateMockResponse',
	    value: function generateMockResponse() {
	      var mock = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      return (0, _merge2.default)({}, this.genericResponse, mock);
	    }
	
	    /**
	     * Generate a 400 response. This is usually used to throw an error in a
	     * consistent format without hitting the API, such a schema validation error
	     *
	     * @param {Object} error - error object to return
	     * @param {Number} [code] - http code for error
	     * @param {String} [status] - error status message
	     * @return {Object}
	     */
	
	  }, {
	    key: 'generateErrorResponse',
	    value: function generateErrorResponse() {
	      var error = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var code = arguments.length <= 1 || arguments[1] === undefined ? 400 : arguments[1];
	      var status = arguments.length <= 2 || arguments[2] === undefined ? 'Invalid Data' : arguments[2];
	
	      return this.generateMockResponse({
	        status: code,
	        statusText: status,
	        data: {
	          error: error
	        }
	      });
	    }
	
	    /**
	     * Return a standardizes object to use in validation error messages
	     *
	     * @return {Object}
	     */
	
	  }, {
	    key: 'generateErrorObject',
	    value: function generateErrorObject() {
	      return {
	        valid: false,
	        fields: [],
	        msg: []
	      };
	    }
	
	    /**
	     * Predicate: checks presence of AUTH_ACCESS_TOKEN
	     *
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'hasAuthToken',
	    value: function hasAuthToken() {
	      var auth = this.config.get(constants.CONFIG_AUTH);
	      if (!auth) {
	        return false;
	      }
	      return !!auth[constants.AUTH_ACCESS_TOKEN];
	    }
	
	    /**
	     * Create a string auth token for use in Authorization headers
	     *
	     * @return {String|undefined}
	     */
	
	  }, {
	    key: 'generateAuthorizationHeader',
	    value: function generateAuthorizationHeader() {
	      var a = this.config.get(constants.CONFIG_AUTH);
	      if ((0, _utils.isEmpty)(a)) {
	        if (true) {
	          console.warn('No authorization token is set!'); // eslint-disable-line
	        }
	        return undefined;
	      }
	      return a[constants.AUTH_TOKEN_TYPE] + ' ' + a[constants.AUTH_ACCESS_TOKEN];
	    }
	
	    /**
	     * Generate a basic auth token for use in Authorization headers
	     *
	     * @return {String|undefined}
	     */
	
	  }, {
	    key: 'generateBasicAuthHeader',
	    value: function generateBasicAuthHeader() {
	      var id = this.config.get(constants.OAUTH_CLIENT_ID);
	      if (!id) {
	        if (true) {
	          console.warn('No oauth_client_id is set!'); // eslint-disable-line
	        }
	        return undefined;
	      }
	      return 'Basic ' + btoa(id + ':'); // eslint-disable-line
	    }
	
	    /**
	     * Generate an object of default headers
	     *
	     * Note: the `Authorization` header can be omit from a request by passing
	     * a `noauth` property in the requestConfig object.
	     *
	     * @example
	     * let http = new Http(new Dictionary({auth: authObject}));
	     * http.get('foo', { noauth: true }); // will not send Authorization header
	     *
	     * @param {Object} [requestConfig] - request config object
	     * @return {Object}
	     */
	
	  }, {
	    key: 'defaultHeaders',
	    value: function defaultHeaders() {
	      var requestConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var apiVersion = this.config.get(constants.API_VERSION);
	      var headers = (0, _defineProperty3.default)({}, CLIENT_HEADER, 'js-' + CLIENT_VERSION);
	
	      // Attach an API Version header
	      if (apiVersion) {
	        headers[API_VERSION_HEADER] = apiVersion;
	      }
	
	      // Add Authorization header if config.noauth is falsy & auth is truthy
	      if (!requestConfig.noauth && this.hasAuthToken()) {
	        headers.Authorization = this.generateAuthorizationHeader();
	      }
	
	      // Add Basic Auth header if config.noauth is truthy OR auth is falsy
	      if (!this.hasAuthToken() || requestConfig.noauth) {
	        headers.Authorization = this.generateBasicAuthHeader();
	      }
	
	      return headers;
	    }
	
	    /**
	     * Attach interceptors to requests/responses to do PRE/POST processing, such
	     * as attaching client headers and massaging messages
	     *
	     * @access private
	     * @return {void}
	     */
	
	  }, {
	    key: 'setupRequestInterceptors',
	    value: function setupRequestInterceptors() {
	      var defaults = this.defaultHeaders.bind(this);
	      _axios2.default.interceptors.request.use(function (config) {
	        var headers = config.headers ? (0, _merge2.default)(config.headers, defaults(config)) : defaults(config);
	
	        config.headers = headers; // eslint-disable-line
	        return config;
	      }, function (error) {
	        // Do something with request error
	        if (true) {
	          console.error('REQUEST_ERROR', error); // eslint-disable-line
	        }
	        return _promise2.default.reject(error);
	      });
	    }
	
	    /**
	     * Ensure the api_url is prepended to all requests
	     * @param {String} url
	     * @return {String}
	     */
	
	  }, {
	    key: 'assembleUrl',
	    value: function assembleUrl(url) {
	      return (0, _utils.urlJoin)(this.config.get(constants.API_URL), url);
	    }
	
	    /**
	     * GET
	     * @param {String} url
	     * @param {Object} [opts] - optional configuration for request
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'get',
	    value: function get(url) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      return _axios2.default.get(this.assembleUrl(url), opts);
	    }
	
	    /**
	     * POST
	     * @param {String} url
	     * @param {Object} data - payload sent to services
	     * @param {Object} [opts] - optional configuration for request
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'post',
	    value: function post(url, data) {
	      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      return _axios2.default.post(this.assembleUrl(url), data, opts);
	    }
	
	    /**
	     * PUT
	     * @param {String} url
	     * @param {Object} data - payload sent to services
	     * @param {Object} [opts] - optional configuration for request
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'put',
	    value: function put(url, data) {
	      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      return _axios2.default.put(this.assembleUrl(url), data, opts);
	    }
	
	    /**
	     * PATCH
	     * @param {String} url
	     * @param {Object} data - payload sent to services
	     * @param {Object} [opts] - optional configuration for request
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'patch',
	    value: function patch(url, data) {
	      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      return _axios2.default.patch(this.assembleUrl(url), data, opts);
	    }
	
	    /**
	     * DELETE
	     * @param {String} url
	     * @param {Object} [opts] - optional configuration for request
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'delete',
	    value: function _delete(url) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      return _axios2.default.delete(this.assembleUrl(url), opts);
	    }
	  }]);
	  return Http;
	}();
	
	exports.default = Http;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(66);
	__webpack_require__(70);
	module.exports = __webpack_require__(10).Promise;

/***/ },
/* 52 */
/***/ function(module, exports) {



/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(54)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(55)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , defined   = __webpack_require__(33);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(56)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(57)
	  , hide           = __webpack_require__(13)
	  , has            = __webpack_require__(36)
	  , Iterators      = __webpack_require__(58)
	  , $iterCreate    = __webpack_require__(59)
	  , setToStringTag = __webpack_require__(63)
	  , getPrototypeOf = __webpack_require__(65)
	  , ITERATOR       = __webpack_require__(64)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13);

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(60)
	  , descriptor     = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(63)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(13)(IteratorPrototype, __webpack_require__(64)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(15)
	  , dPs         = __webpack_require__(61)
	  , enumBugKeys = __webpack_require__(47)
	  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(20)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(62).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(14)
	  , anObject = __webpack_require__(15)
	  , getKeys  = __webpack_require__(34);
	
	module.exports = __webpack_require__(18) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9).document && document.documentElement;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(14).f
	  , has = __webpack_require__(36)
	  , TAG = __webpack_require__(64)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(45)('wks')
	  , uid        = __webpack_require__(46)
	  , Symbol     = __webpack_require__(9).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(36)
	  , toObject    = __webpack_require__(32)
	  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	var global        = __webpack_require__(9)
	  , hide          = __webpack_require__(13)
	  , Iterators     = __webpack_require__(58)
	  , TO_STRING_TAG = __webpack_require__(64)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(68)
	  , step             = __webpack_require__(69)
	  , Iterators        = __webpack_require__(58)
	  , toIObject        = __webpack_require__(37);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(55)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(56)
	  , global             = __webpack_require__(9)
	  , ctx                = __webpack_require__(11)
	  , classof            = __webpack_require__(71)
	  , $export            = __webpack_require__(8)
	  , isObject           = __webpack_require__(16)
	  , anObject           = __webpack_require__(15)
	  , aFunction          = __webpack_require__(12)
	  , anInstance         = __webpack_require__(72)
	  , forOf              = __webpack_require__(73)
	  , setProto           = __webpack_require__(77).set
	  , speciesConstructor = __webpack_require__(80)
	  , task               = __webpack_require__(81).set
	  , microtask          = __webpack_require__(83)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(64)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(84)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(63)($Promise, PROMISE);
	__webpack_require__(85)(PROMISE);
	Wrapper = __webpack_require__(10)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(86)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39)
	  , TAG = __webpack_require__(64)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(11)
	  , call        = __webpack_require__(74)
	  , isArrayIter = __webpack_require__(75)
	  , anObject    = __webpack_require__(15)
	  , toLength    = __webpack_require__(41)
	  , getIterFn   = __webpack_require__(76)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(15);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(58)
	  , ITERATOR   = __webpack_require__(64)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(71)
	  , ITERATOR  = __webpack_require__(64)('iterator')
	  , Iterators = __webpack_require__(58);
	module.exports = __webpack_require__(10).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(16)
	  , anObject = __webpack_require__(15);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(11)(Function.call, __webpack_require__(78).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(79)
	  , createDesc     = __webpack_require__(22)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(21)
	  , has            = __webpack_require__(36)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(18) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(15)
	  , aFunction = __webpack_require__(12)
	  , SPECIES   = __webpack_require__(64)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(11)
	  , invoke             = __webpack_require__(82)
	  , html               = __webpack_require__(62)
	  , cel                = __webpack_require__(20)
	  , global             = __webpack_require__(9)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(39)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , macrotask = __webpack_require__(81).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(39)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(13);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(9)
	  , core        = __webpack_require__(10)
	  , dP          = __webpack_require__(14)
	  , DESCRIPTORS = __webpack_require__(18)
	  , SPECIES     = __webpack_require__(64)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(64)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	module.exports = __webpack_require__(10).Object.freeze;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(16)
	  , meta     = __webpack_require__(90).onFreeze;
	
	__webpack_require__(48)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(46)('meta')
	  , isObject = __webpack_require__(16)
	  , has      = __webpack_require__(36)
	  , setDesc  = __webpack_require__(14).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(19)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(92);

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(93);
	var utils = __webpack_require__(94);
	var dispatchRequest = __webpack_require__(95);
	var InterceptorManager = __webpack_require__(104);
	var isAbsoluteURL = __webpack_require__(105);
	var combineURLs = __webpack_require__(106);
	var bind = __webpack_require__(107);
	var transformData = __webpack_require__(100);
	
	function Axios(defaultConfig) {
	  this.defaults = utils.merge({}, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || this.defaults.withCredentials;
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	var defaultInstance = new Axios(defaults);
	var axios = module.exports = bind(Axios.prototype.request, defaultInstance);
	
	axios.create = function create(defaultConfig) {
	  return new Axios(defaultConfig);
	};
	
	// Expose defaults
	axios.defaults = defaultInstance.defaults;
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(108);
	
	// Expose interceptors
	axios.interceptors = defaultInstance.interceptors;
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	module.exports = {
	  transformRequest: [function transformResponseJSON(data, headers) {
	    if (utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function processContentTypeHeader(val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });
	
	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponseJSON(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};


/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function executor(resolve, reject) {
	    try {
	      var adapter;
	
	      if (typeof config.adapter === 'function') {
	        // For custom adapter support
	        adapter = config.adapter;
	      } else if (typeof XMLHttpRequest !== 'undefined') {
	        // For browsers use XHR adapter
	        adapter = __webpack_require__(97);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(97);
	      }
	
	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(96)))

/***/ },
/* 96 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	var buildURL = __webpack_require__(98);
	var parseHeaders = __webpack_require__(99);
	var transformData = __webpack_require__(100);
	var isURLSameOrigin = __webpack_require__(101);
	var btoa = window.btoa || __webpack_require__(102);
	
	module.exports = function xhrAdapter(resolve, reject, config) {
	  var requestData = config.data;
	  var requestHeaders = config.headers;
	
	  if (utils.isFormData(requestData)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }
	
	  var request = new XMLHttpRequest();
	
	  // For IE 8/9 CORS support
	  // Only supports POST and GET calls and doesn't returns the response headers.
	  if (window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	    request = new window.XDomainRequest();
	  }
	
	  // HTTP basic authentication
	  if (config.auth) {
	    var username = config.auth.username || '';
	    var password = config.auth.password || '';
	    requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	  }
	
	  request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	  // Set the request timeout in MS
	  request.timeout = config.timeout;
	
	  // Listen for ready state
	  request.onload = function handleLoad() {
	    if (!request) {
	      return;
	    }
	    // Prepare the response
	    var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	    var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	    var response = {
	      data: transformData(
	        responseData,
	        responseHeaders,
	        config.transformResponse
	      ),
	      // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	      status: request.status === 1223 ? 204 : request.status,
	      statusText: request.status === 1223 ? 'No Content' : request.statusText,
	      headers: responseHeaders,
	      config: config
	    };
	
	    // Resolve or reject the Promise based on the status
	    ((response.status >= 200 && response.status < 300) ||
	     (!('status' in request) && response.responseText) ?
	      resolve :
	      reject)(response);
	
	    // Clean up request
	    request = null;
	  };
	
	  // Handle low level network errors
	  request.onerror = function handleError() {
	    // Real errors are hidden from us by the browser
	    // onerror should only fire if it's a network error
	    reject(new Error('Network Error'));
	
	    // Clean up request
	    request = null;
	  };
	
	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(103);
	
	    // Add xsrf header
	    var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;
	
	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName] = xsrfValue;
	    }
	  }
	
	  // Add headers to the request
	  if ('setRequestHeader' in request) {
	    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	        // Remove Content-Type if data is undefined
	        delete requestHeaders[key];
	      } else {
	        // Otherwise add header to the request
	        request.setRequestHeader(key, val);
	      }
	    });
	  }
	
	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }
	
	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }
	
	  if (utils.isArrayBuffer(requestData)) {
	    requestData = new DataView(requestData);
	  }
	
	  // Send the request
	  request.send(requestData);
	};


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};
	


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function InvalidCharacterError(message) {
	  this.message = message;
	}
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.code = 5;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(94);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 108 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseMerge = __webpack_require__(110);
	
	var _baseMerge2 = _interopRequireDefault(_baseMerge);
	
	var _createAssigner = __webpack_require__(222);
	
	var _createAssigner2 = _interopRequireDefault(_createAssigner);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Recursively merges own and inherited enumerable properties of source
	 * objects into the destination object, skipping source properties that resolve
	 * to `undefined`. Array and plain object properties are merged recursively.
	 * Other objects and value types are overridden by assignment. Source objects
	 * are applied from left to right. Subsequent sources overwrite property
	 * assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 */
	var merge = (0, _createAssigner2.default)(function (object, source, srcIndex) {
	  (0, _baseMerge2.default)(object, source, srcIndex);
	});
	
	exports.default = merge;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Stack = __webpack_require__(111);
	
	var _Stack2 = _interopRequireDefault(_Stack);
	
	var _arrayEach = __webpack_require__(162);
	
	var _arrayEach2 = _interopRequireDefault(_arrayEach);
	
	var _assignMergeValue = __webpack_require__(163);
	
	var _assignMergeValue2 = _interopRequireDefault(_assignMergeValue);
	
	var _baseMergeDeep = __webpack_require__(164);
	
	var _baseMergeDeep2 = _interopRequireDefault(_baseMergeDeep);
	
	var _isArray = __webpack_require__(184);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isObject = __webpack_require__(129);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _isTypedArray = __webpack_require__(216);
	
	var _isTypedArray2 = _interopRequireDefault(_isTypedArray);
	
	var _keysIn = __webpack_require__(218);
	
	var _keysIn2 = _interopRequireDefault(_keysIn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  var props = (0, _isArray2.default)(source) || (0, _isTypedArray2.default)(source) ? undefined : (0, _keysIn2.default)(source);
	  (0, _arrayEach2.default)(props || source, function (srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if ((0, _isObject2.default)(srcValue)) {
	      stack || (stack = new _Stack2.default());
	      (0, _baseMergeDeep2.default)(object, source, key, srcIndex, baseMerge, customizer, stack);
	    } else {
	      var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      (0, _assignMergeValue2.default)(object, key, newValue);
	    }
	  });
	}
	
	exports.default = baseMerge;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stackClear = __webpack_require__(112);
	
	var _stackClear2 = _interopRequireDefault(_stackClear);
	
	var _stackDelete = __webpack_require__(113);
	
	var _stackDelete2 = _interopRequireDefault(_stackDelete);
	
	var _stackGet = __webpack_require__(117);
	
	var _stackGet2 = _interopRequireDefault(_stackGet);
	
	var _stackHas = __webpack_require__(119);
	
	var _stackHas2 = _interopRequireDefault(_stackHas);
	
	var _stackSet = __webpack_require__(121);
	
	var _stackSet2 = _interopRequireDefault(_stackSet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `Stack` cache.
	Stack.prototype.clear = _stackClear2.default;
	Stack.prototype['delete'] = _stackDelete2.default;
	Stack.prototype.get = _stackGet2.default;
	Stack.prototype.has = _stackHas2.default;
	Stack.prototype.set = _stackSet2.default;
	
	exports.default = Stack;

/***/ },
/* 112 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}
	
	exports.default = stackClear;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assocDelete = __webpack_require__(114);
	
	var _assocDelete2 = _interopRequireDefault(_assocDelete);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? (0, _assocDelete2.default)(array, key) : data.map['delete'](key);
	}
	
	exports.default = stackDelete;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assocIndexOf = __webpack_require__(115);
	
	var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = (0, _assocIndexOf2.default)(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}
	
	exports.default = assocDelete;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eq = __webpack_require__(116);
	
	var _eq2 = _interopRequireDefault(_eq);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if ((0, _eq2.default)(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	exports.default = assocIndexOf;

/***/ },
/* 116 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}
	
	exports.default = eq;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assocGet = __webpack_require__(118);
	
	var _assocGet2 = _interopRequireDefault(_assocGet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? (0, _assocGet2.default)(array, key) : data.map.get(key);
	}
	
	exports.default = stackGet;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assocIndexOf = __webpack_require__(115);
	
	var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = (0, _assocIndexOf2.default)(array, key);
	  return index < 0 ? undefined : array[index][1];
	}
	
	exports.default = assocGet;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assocHas = __webpack_require__(120);
	
	var _assocHas2 = _interopRequireDefault(_assocHas);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? (0, _assocHas2.default)(array, key) : data.map.has(key);
	}
	
	exports.default = stackHas;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assocIndexOf = __webpack_require__(115);
	
	var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return (0, _assocIndexOf2.default)(array, key) > -1;
	}
	
	exports.default = assocHas;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _MapCache = __webpack_require__(122);
	
	var _MapCache2 = _interopRequireDefault(_MapCache);
	
	var _assocSet = __webpack_require__(160);
	
	var _assocSet2 = _interopRequireDefault(_assocSet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;
	
	  if (array) {
	    if (array.length < LARGE_ARRAY_SIZE - 1) {
	      (0, _assocSet2.default)(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new _MapCache2.default(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}
	
	exports.default = stackSet;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mapClear = __webpack_require__(123);
	
	var _mapClear2 = _interopRequireDefault(_mapClear);
	
	var _mapDelete = __webpack_require__(152);
	
	var _mapDelete2 = _interopRequireDefault(_mapDelete);
	
	var _mapGet = __webpack_require__(156);
	
	var _mapGet2 = _interopRequireDefault(_mapGet);
	
	var _mapHas = __webpack_require__(158);
	
	var _mapHas2 = _interopRequireDefault(_mapHas);
	
	var _mapSet = __webpack_require__(159);
	
	var _mapSet2 = _interopRequireDefault(_mapSet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `MapCache`.
	MapCache.prototype.clear = _mapClear2.default;
	MapCache.prototype['delete'] = _mapDelete2.default;
	MapCache.prototype.get = _mapGet2.default;
	MapCache.prototype.has = _mapHas2.default;
	MapCache.prototype.set = _mapSet2.default;
	
	exports.default = MapCache;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Hash = __webpack_require__(124);
	
	var _Hash2 = _interopRequireDefault(_Hash);
	
	var _Map = __webpack_require__(148);
	
	var _Map2 = _interopRequireDefault(_Map);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = { 'hash': new _Hash2.default(), 'map': _Map2.default ? new _Map2.default() : [], 'string': new _Hash2.default() };
	}
	
	exports.default = mapClear;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _nativeCreate = __webpack_require__(125);
	
	var _nativeCreate2 = _interopRequireDefault(_nativeCreate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}
	
	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = _nativeCreate2.default ? (0, _nativeCreate2.default)(null) : objectProto;
	
	exports.default = Hash;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getNative = __webpack_require__(126);
	
	var _getNative2 = _interopRequireDefault(_getNative);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = (0, _getNative2.default)(Object, 'create');
	
	exports.default = nativeCreate;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isNative = __webpack_require__(127);
	
	var _isNative2 = _interopRequireDefault(_isNative);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return (0, _isNative2.default)(value) ? value : undefined;
	}
	
	exports.default = getNative;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isFunction = __webpack_require__(128);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isHostObject = __webpack_require__(146);
	
	var _isHostObject2 = _interopRequireDefault(_isHostObject);
	
	var _isObjectLike = __webpack_require__(147);
	
	var _isObjectLike2 = _interopRequireDefault(_isObjectLike);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if ((0, _isFunction2.default)(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return (0, _isObjectLike2.default)(value) && ((0, _isHostObject2.default)(value) ? reIsNative : reIsHostCtor).test(value);
	}
	
	exports.default = isNative;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isObject = __webpack_require__(129);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = (0, _isObject2.default)(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	exports.default = isFunction;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
	  return !!value && (type == 'object' || type == 'function');
	}
	
	exports.default = isObject;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(131);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(134);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	__webpack_require__(66);
	module.exports = __webpack_require__(133).f('iterator');

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(64);

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(136);
	__webpack_require__(52);
	__webpack_require__(144);
	__webpack_require__(145);
	module.exports = __webpack_require__(10).Symbol;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(9)
	  , has            = __webpack_require__(36)
	  , DESCRIPTORS    = __webpack_require__(18)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(57)
	  , META           = __webpack_require__(90).KEY
	  , $fails         = __webpack_require__(19)
	  , shared         = __webpack_require__(45)
	  , setToStringTag = __webpack_require__(63)
	  , uid            = __webpack_require__(46)
	  , wks            = __webpack_require__(64)
	  , wksExt         = __webpack_require__(133)
	  , wksDefine      = __webpack_require__(137)
	  , keyOf          = __webpack_require__(138)
	  , enumKeys       = __webpack_require__(139)
	  , isArray        = __webpack_require__(141)
	  , anObject       = __webpack_require__(15)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(21)
	  , createDesc     = __webpack_require__(22)
	  , _create        = __webpack_require__(60)
	  , gOPNExt        = __webpack_require__(142)
	  , $GOPD          = __webpack_require__(78)
	  , $DP            = __webpack_require__(14)
	  , $keys          = __webpack_require__(34)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(143).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(79).f  = $propertyIsEnumerable;
	  __webpack_require__(140).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(56)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(9)
	  , core           = __webpack_require__(10)
	  , LIBRARY        = __webpack_require__(56)
	  , wksExt         = __webpack_require__(133)
	  , defineProperty = __webpack_require__(14).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(34)
	  , toIObject = __webpack_require__(37);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(34)
	  , gOPS    = __webpack_require__(140)
	  , pIE     = __webpack_require__(79);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 140 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(37)
	  , gOPN      = __webpack_require__(143).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(35)
	  , hiddenKeys = __webpack_require__(47).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(137)('asyncIterator');

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(137)('observable');

/***/ },
/* 146 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	exports.default = isHostObject;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) == 'object';
	}
	
	exports.default = isObjectLike;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getNative = __webpack_require__(126);
	
	var _getNative2 = _interopRequireDefault(_getNative);
	
	var _root = __webpack_require__(149);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Built-in method references that are verified to be native. */
	var Map = (0, _getNative2.default)(_root2.default, 'Map');
	
	exports.default = Map;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _checkGlobal = __webpack_require__(151);
	
	var _checkGlobal2 = _interopRequireDefault(_checkGlobal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : (0, _typeof3.default)(exports)] && exports && !exports.nodeType ? exports : null;
	
	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : (0, _typeof3.default)(module)] && module && !module.nodeType ? module : null;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = (0, _checkGlobal2.default)(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = (0, _checkGlobal2.default)(objectTypes[typeof self === 'undefined' ? 'undefined' : (0, _typeof3.default)(self)] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = (0, _checkGlobal2.default)(objectTypes[typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = (0, _checkGlobal2.default)(objectTypes[(0, _typeof3.default)(undefined)] && undefined);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();
	
	exports.default = root;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(150)(module), (function() { return this; }())))

/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 151 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}
	
	exports.default = checkGlobal;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Map = __webpack_require__(148);
	
	var _Map2 = _interopRequireDefault(_Map);
	
	var _assocDelete = __webpack_require__(114);
	
	var _assocDelete2 = _interopRequireDefault(_assocDelete);
	
	var _hashDelete = __webpack_require__(153);
	
	var _hashDelete2 = _interopRequireDefault(_hashDelete);
	
	var _isKeyable = __webpack_require__(155);
	
	var _isKeyable2 = _interopRequireDefault(_isKeyable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if ((0, _isKeyable2.default)(key)) {
	    return (0, _hashDelete2.default)(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return _Map2.default ? data.map['delete'](key) : (0, _assocDelete2.default)(data.map, key);
	}
	
	exports.default = mapDelete;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _hashHas = __webpack_require__(154);
	
	var _hashHas2 = _interopRequireDefault(_hashHas);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return (0, _hashHas2.default)(hash, key) && delete hash[key];
	}
	
	exports.default = hashDelete;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _nativeCreate = __webpack_require__(125);
	
	var _nativeCreate2 = _interopRequireDefault(_nativeCreate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return _nativeCreate2.default ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}
	
	exports.default = hashHas;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
	  return type == 'number' || type == 'boolean' || type == 'string' && value !== '__proto__' || value == null;
	}
	
	exports.default = isKeyable;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Map = __webpack_require__(148);
	
	var _Map2 = _interopRequireDefault(_Map);
	
	var _assocGet = __webpack_require__(118);
	
	var _assocGet2 = _interopRequireDefault(_assocGet);
	
	var _hashGet = __webpack_require__(157);
	
	var _hashGet2 = _interopRequireDefault(_hashGet);
	
	var _isKeyable = __webpack_require__(155);
	
	var _isKeyable2 = _interopRequireDefault(_isKeyable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if ((0, _isKeyable2.default)(key)) {
	    return (0, _hashGet2.default)(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return _Map2.default ? data.map.get(key) : (0, _assocGet2.default)(data.map, key);
	}
	
	exports.default = mapGet;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _nativeCreate = __webpack_require__(125);
	
	var _nativeCreate2 = _interopRequireDefault(_nativeCreate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (_nativeCreate2.default) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}
	
	exports.default = hashGet;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Map = __webpack_require__(148);
	
	var _Map2 = _interopRequireDefault(_Map);
	
	var _assocHas = __webpack_require__(120);
	
	var _assocHas2 = _interopRequireDefault(_assocHas);
	
	var _hashHas = __webpack_require__(154);
	
	var _hashHas2 = _interopRequireDefault(_hashHas);
	
	var _isKeyable = __webpack_require__(155);
	
	var _isKeyable2 = _interopRequireDefault(_isKeyable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if ((0, _isKeyable2.default)(key)) {
	    return (0, _hashHas2.default)(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return _Map2.default ? data.map.has(key) : (0, _assocHas2.default)(data.map, key);
	}
	
	exports.default = mapHas;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Map = __webpack_require__(148);
	
	var _Map2 = _interopRequireDefault(_Map);
	
	var _assocSet = __webpack_require__(160);
	
	var _assocSet2 = _interopRequireDefault(_assocSet);
	
	var _hashSet = __webpack_require__(161);
	
	var _hashSet2 = _interopRequireDefault(_hashSet);
	
	var _isKeyable = __webpack_require__(155);
	
	var _isKeyable2 = _interopRequireDefault(_isKeyable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if ((0, _isKeyable2.default)(key)) {
	    (0, _hashSet2.default)(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (_Map2.default) {
	    data.map.set(key, value);
	  } else {
	    (0, _assocSet2.default)(data.map, key, value);
	  }
	  return this;
	}
	
	exports.default = mapSet;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assocIndexOf = __webpack_require__(115);
	
	var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = (0, _assocIndexOf2.default)(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}
	
	exports.default = assocSet;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _nativeCreate = __webpack_require__(125);
	
	var _nativeCreate2 = _interopRequireDefault(_nativeCreate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = _nativeCreate2.default && value === undefined ? HASH_UNDEFINED : value;
	}
	
	exports.default = hashSet;

/***/ },
/* 162 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	exports.default = arrayEach;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eq = __webpack_require__(116);
	
	var _eq2 = _interopRequireDefault(_eq);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * This function is like `assignValue` except that it doesn't assign `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if (value !== undefined && !(0, _eq2.default)(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
	    object[key] = value;
	  }
	}
	
	exports.default = assignMergeValue;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assignMergeValue = __webpack_require__(163);
	
	var _assignMergeValue2 = _interopRequireDefault(_assignMergeValue);
	
	var _baseClone = __webpack_require__(165);
	
	var _baseClone2 = _interopRequireDefault(_baseClone);
	
	var _copyArray = __webpack_require__(191);
	
	var _copyArray2 = _interopRequireDefault(_copyArray);
	
	var _isArguments = __webpack_require__(178);
	
	var _isArguments2 = _interopRequireDefault(_isArguments);
	
	var _isArray = __webpack_require__(184);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isArrayLikeObject = __webpack_require__(179);
	
	var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);
	
	var _isFunction = __webpack_require__(128);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isObject = __webpack_require__(129);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _isPlainObject = __webpack_require__(215);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _isTypedArray = __webpack_require__(216);
	
	var _isTypedArray2 = _interopRequireDefault(_isTypedArray);
	
	var _toPlainObject = __webpack_require__(217);
	
	var _toPlainObject2 = _interopRequireDefault(_toPlainObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);
	
	  if (stacked) {
	    (0, _assignMergeValue2.default)(object, key, stacked);
	    return;
	  }
	  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined,
	      isCommon = newValue === undefined;
	
	  if (isCommon) {
	    newValue = srcValue;
	    if ((0, _isArray2.default)(srcValue) || (0, _isTypedArray2.default)(srcValue)) {
	      if ((0, _isArray2.default)(objValue)) {
	        newValue = srcIndex ? (0, _copyArray2.default)(objValue) : objValue;
	      } else if ((0, _isArrayLikeObject2.default)(objValue)) {
	        newValue = (0, _copyArray2.default)(objValue);
	      } else {
	        isCommon = false;
	        newValue = (0, _baseClone2.default)(srcValue);
	      }
	    } else if ((0, _isPlainObject2.default)(srcValue) || (0, _isArguments2.default)(srcValue)) {
	      if ((0, _isArguments2.default)(objValue)) {
	        newValue = (0, _toPlainObject2.default)(objValue);
	      } else if (!(0, _isObject2.default)(objValue) || srcIndex && (0, _isFunction2.default)(objValue)) {
	        isCommon = false;
	        newValue = (0, _baseClone2.default)(srcValue);
	      } else {
	        newValue = srcIndex ? (0, _baseClone2.default)(objValue) : objValue;
	      }
	    } else {
	      isCommon = false;
	    }
	  }
	  stack.set(srcValue, newValue);
	
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	  }
	  (0, _assignMergeValue2.default)(object, key, newValue);
	}
	
	exports.default = baseMergeDeep;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Stack = __webpack_require__(111);
	
	var _Stack2 = _interopRequireDefault(_Stack);
	
	var _arrayEach = __webpack_require__(162);
	
	var _arrayEach2 = _interopRequireDefault(_arrayEach);
	
	var _assignValue = __webpack_require__(166);
	
	var _assignValue2 = _interopRequireDefault(_assignValue);
	
	var _baseAssign = __webpack_require__(167);
	
	var _baseAssign2 = _interopRequireDefault(_baseAssign);
	
	var _baseForOwn = __webpack_require__(188);
	
	var _baseForOwn2 = _interopRequireDefault(_baseForOwn);
	
	var _copyArray = __webpack_require__(191);
	
	var _copyArray2 = _interopRequireDefault(_copyArray);
	
	var _copySymbols = __webpack_require__(192);
	
	var _copySymbols2 = _interopRequireDefault(_copySymbols);
	
	var _getTag = __webpack_require__(196);
	
	var _getTag2 = _interopRequireDefault(_getTag);
	
	var _initCloneArray = __webpack_require__(198);
	
	var _initCloneArray2 = _interopRequireDefault(_initCloneArray);
	
	var _initCloneByTag = __webpack_require__(199);
	
	var _initCloneByTag2 = _interopRequireDefault(_initCloneByTag);
	
	var _initCloneObject = __webpack_require__(213);
	
	var _initCloneObject2 = _interopRequireDefault(_initCloneObject);
	
	var _isArray = __webpack_require__(184);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isHostObject = __webpack_require__(146);
	
	var _isHostObject2 = _interopRequireDefault(_isHostObject);
	
	var _isObject = __webpack_require__(129);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!(0, _isObject2.default)(value)) {
	    return value;
	  }
	  var isArr = (0, _isArray2.default)(value);
	  if (isArr) {
	    result = (0, _initCloneArray2.default)(value);
	    if (!isDeep) {
	      return (0, _copyArray2.default)(value, result);
	    }
	  } else {
	    var tag = (0, _getTag2.default)(value),
	        isFunc = tag == funcTag || tag == genTag;
	
	    if (tag == objectTag || tag == argsTag || isFunc && !object) {
	      if ((0, _isHostObject2.default)(value)) {
	        return object ? value : {};
	      }
	      result = (0, _initCloneObject2.default)(isFunc ? {} : value);
	      if (!isDeep) {
	        return (0, _copySymbols2.default)(value, (0, _baseAssign2.default)(result, value));
	      }
	    } else {
	      return cloneableTags[tag] ? (0, _initCloneByTag2.default)(value, tag, isDeep) : object ? value : {};
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new _Stack2.default());
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);
	
	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? _arrayEach2.default : _baseForOwn2.default)(value, function (subValue, key) {
	    (0, _assignValue2.default)(result, key, baseClone(subValue, isDeep, customizer, key, value, stack));
	  });
	  return isArr ? result : (0, _copySymbols2.default)(value, result);
	}
	
	exports.default = baseClone;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eq = __webpack_require__(116);
	
	var _eq2 = _interopRequireDefault(_eq);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(0, _eq2.default)(objValue, value) || (0, _eq2.default)(objValue, objectProto[key]) && !hasOwnProperty.call(object, key) || value === undefined && !(key in object)) {
	    object[key] = value;
	  }
	}
	
	exports.default = assignValue;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _copyObject = __webpack_require__(168);
	
	var _copyObject2 = _interopRequireDefault(_copyObject);
	
	var _keys = __webpack_require__(170);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && (0, _copyObject2.default)(source, (0, _keys2.default)(source), object);
	}
	
	exports.default = baseAssign;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _copyObjectWith = __webpack_require__(169);
	
	var _copyObjectWith2 = _interopRequireDefault(_copyObjectWith);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return (0, _copyObjectWith2.default)(source, props, object);
	}
	
	exports.default = copyObject;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assignValue = __webpack_require__(166);
	
	var _assignValue2 = _interopRequireDefault(_assignValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index],
	        newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
	
	    (0, _assignValue2.default)(object, key, newValue);
	  }
	  return object;
	}
	
	exports.default = copyObjectWith;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseHas = __webpack_require__(171);
	
	var _baseHas2 = _interopRequireDefault(_baseHas);
	
	var _baseKeys = __webpack_require__(175);
	
	var _baseKeys2 = _interopRequireDefault(_baseKeys);
	
	var _indexKeys = __webpack_require__(176);
	
	var _indexKeys2 = _interopRequireDefault(_indexKeys);
	
	var _isArrayLike = __webpack_require__(180);
	
	var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
	
	var _isIndex = __webpack_require__(186);
	
	var _isIndex2 = _interopRequireDefault(_isIndex);
	
	var _isPrototype = __webpack_require__(187);
	
	var _isPrototype2 = _interopRequireDefault(_isPrototype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = (0, _isPrototype2.default)(object);
	  if (!(isProto || (0, _isArrayLike2.default)(object))) {
	    return (0, _baseKeys2.default)(object);
	  }
	  var indexes = (0, _indexKeys2.default)(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if ((0, _baseHas2.default)(object, key) && !(skipIndexes && (key == 'length' || (0, _isIndex2.default)(key, length))) && !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	exports.default = keys;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _getPrototypeOf = __webpack_require__(172);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var getPrototypeOf = _getPrototypeOf2.default;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) == 'object' && key in object && getPrototypeOf(object) === null;
	}
	
	exports.default = baseHas;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(173), __esModule: true };

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(174);
	module.exports = __webpack_require__(10).Object.getPrototypeOf;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(32)
	  , $getPrototypeOf = __webpack_require__(65);
	
	__webpack_require__(48)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(29);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = _keys2.default;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	exports.default = baseKeys;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseTimes = __webpack_require__(177);
	
	var _baseTimes2 = _interopRequireDefault(_baseTimes);
	
	var _isArguments = __webpack_require__(178);
	
	var _isArguments2 = _interopRequireDefault(_isArguments);
	
	var _isArray = __webpack_require__(184);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isLength = __webpack_require__(183);
	
	var _isLength2 = _interopRequireDefault(_isLength);
	
	var _isString = __webpack_require__(185);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if ((0, _isLength2.default)(length) && ((0, _isArray2.default)(object) || (0, _isString2.default)(object) || (0, _isArguments2.default)(object))) {
	    return (0, _baseTimes2.default)(length, String);
	  }
	  return null;
	}
	
	exports.default = indexKeys;

/***/ },
/* 177 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	exports.default = baseTimes;

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isArrayLikeObject = __webpack_require__(179);
	
	var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return (0, _isArrayLikeObject2.default)(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	exports.default = isArguments;

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isArrayLike = __webpack_require__(180);
	
	var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
	
	var _isObjectLike = __webpack_require__(147);
	
	var _isObjectLike2 = _interopRequireDefault(_isObjectLike);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return (0, _isObjectLike2.default)(value) && (0, _isArrayLike2.default)(value);
	}
	
	exports.default = isArrayLikeObject;

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getLength = __webpack_require__(181);
	
	var _getLength2 = _interopRequireDefault(_getLength);
	
	var _isFunction = __webpack_require__(128);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isLength = __webpack_require__(183);
	
	var _isLength2 = _interopRequireDefault(_isLength);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && !(typeof value == 'function' && (0, _isFunction2.default)(value)) && (0, _isLength2.default)((0, _getLength2.default)(value));
	}
	
	exports.default = isArrayLike;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseProperty = __webpack_require__(182);
	
	var _baseProperty2 = _interopRequireDefault(_baseProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = (0, _baseProperty2.default)('length');
	
	exports.default = getLength;

/***/ },
/* 182 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	exports.default = baseProperty;

/***/ },
/* 183 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	exports.default = isLength;

/***/ },
/* 184 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	exports.default = isArray;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isArray = __webpack_require__(184);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isObjectLike = __webpack_require__(147);
	
	var _isObjectLike2 = _interopRequireDefault(_isObjectLike);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || !(0, _isArray2.default)(value) && (0, _isObjectLike2.default)(value) && objectToString.call(value) == stringTag;
	}
	
	exports.default = isString;

/***/ },
/* 186 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	exports.default = isIndex;

/***/ },
/* 187 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
	
	  return value === proto;
	}
	
	exports.default = isPrototype;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseFor = __webpack_require__(189);
	
	var _baseFor2 = _interopRequireDefault(_baseFor);
	
	var _keys = __webpack_require__(170);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && (0, _baseFor2.default)(object, iteratee, _keys2.default);
	}
	
	exports.default = baseForOwn;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createBaseFor = __webpack_require__(190);
	
	var _createBaseFor2 = _interopRequireDefault(_createBaseFor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = (0, _createBaseFor2.default)();
	
	exports.default = baseFor;

/***/ },
/* 190 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	exports.default = createBaseFor;

/***/ },
/* 191 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	exports.default = copyArray;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _copyObject = __webpack_require__(168);
	
	var _copyObject2 = _interopRequireDefault(_copyObject);
	
	var _getSymbols = __webpack_require__(193);
	
	var _getSymbols2 = _interopRequireDefault(_getSymbols);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return (0, _copyObject2.default)(source, (0, _getSymbols2.default)(source), object);
	}
	
	exports.default = copySymbols;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getOwnPropertySymbols = __webpack_require__(194);
	
	var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Built-in value references. */
	var getOwnPropertySymbols = _getOwnPropertySymbols2.default;
	
	/**
	 * Creates an array of the own symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = getOwnPropertySymbols || function () {
	  return [];
	};
	
	exports.default = getSymbols;

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(195), __esModule: true };

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(136);
	module.exports = __webpack_require__(10).Object.getOwnPropertySymbols;

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Map = __webpack_require__(148);
	
	var _Map2 = _interopRequireDefault(_Map);
	
	var _Set = __webpack_require__(197);
	
	var _Set2 = _interopRequireDefault(_Set);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps and sets. */
	var mapCtorString = _Map2.default ? funcToString.call(_Map2.default) : '',
	    setCtorString = _Set2.default ? funcToString.call(_Set2.default) : '';
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for IE 11 providing `toStringTag` values for maps and sets.
	if (_Map2.default && getTag(new _Map2.default()) != mapTag || _Set2.default && getTag(new _Set2.default()) != setTag) {
	  getTag = function getTag(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';
	
	    if (ctorString) {
	      if (ctorString == mapCtorString) {
	        return mapTag;
	      }
	      if (ctorString == setCtorString) {
	        return setTag;
	      }
	    }
	    return result;
	  };
	}
	
	exports.default = getTag;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getNative = __webpack_require__(126);
	
	var _getNative2 = _interopRequireDefault(_getNative);
	
	var _root = __webpack_require__(149);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Built-in method references that are verified to be native. */
	var Set = (0, _getNative2.default)(_root2.default, 'Set');
	
	exports.default = Set;

/***/ },
/* 198 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);
	
	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	exports.default = initCloneArray;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _cloneBuffer = __webpack_require__(200);
	
	var _cloneBuffer2 = _interopRequireDefault(_cloneBuffer);
	
	var _cloneMap = __webpack_require__(202);
	
	var _cloneMap2 = _interopRequireDefault(_cloneMap);
	
	var _cloneRegExp = __webpack_require__(206);
	
	var _cloneRegExp2 = _interopRequireDefault(_cloneRegExp);
	
	var _cloneSet = __webpack_require__(207);
	
	var _cloneSet2 = _interopRequireDefault(_cloneSet);
	
	var _cloneSymbol = __webpack_require__(210);
	
	var _cloneSymbol2 = _interopRequireDefault(_cloneSymbol);
	
	var _cloneTypedArray = __webpack_require__(212);
	
	var _cloneTypedArray2 = _interopRequireDefault(_cloneTypedArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return (0, _cloneBuffer2.default)(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case float32Tag:case float64Tag:
	    case int8Tag:case int16Tag:case int32Tag:
	    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
	      return (0, _cloneTypedArray2.default)(object, isDeep);
	
	    case mapTag:
	      return (0, _cloneMap2.default)(object);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      return (0, _cloneRegExp2.default)(object);
	
	    case setTag:
	      return (0, _cloneSet2.default)(object);
	
	    case symbolTag:
	      return (0, _cloneSymbol2.default)(object);
	  }
	}
	
	exports.default = initCloneByTag;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Uint8Array = __webpack_require__(201);
	
	var _Uint8Array2 = _interopRequireDefault(_Uint8Array);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a clone of `buffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneBuffer(buffer) {
	  var Ctor = buffer.constructor,
	      result = new Ctor(buffer.byteLength),
	      view = new _Uint8Array2.default(result);
	
	  view.set(new _Uint8Array2.default(buffer));
	  return result;
	}
	
	exports.default = cloneBuffer;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _root = __webpack_require__(149);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Built-in value references. */
	var Uint8Array = _root2.default.Uint8Array;
	
	exports.default = Uint8Array;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _addMapEntry = __webpack_require__(203);
	
	var _addMapEntry2 = _interopRequireDefault(_addMapEntry);
	
	var _arrayReduce = __webpack_require__(204);
	
	var _arrayReduce2 = _interopRequireDefault(_arrayReduce);
	
	var _mapToArray = __webpack_require__(205);
	
	var _mapToArray2 = _interopRequireDefault(_mapToArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map) {
	  var Ctor = map.constructor;
	  return (0, _arrayReduce2.default)((0, _mapToArray2.default)(map), _addMapEntry2.default, new Ctor());
	}
	
	exports.default = cloneMap;

/***/ },
/* 203 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  map.set(pair[0], pair[1]);
	  return map;
	}
	
	exports.default = addMapEntry;

/***/ },
/* 204 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	exports.default = arrayReduce;

/***/ },
/* 205 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	exports.default = mapToArray;

/***/ },
/* 206 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var Ctor = regexp.constructor,
	      result = new Ctor(regexp.source, reFlags.exec(regexp));
	
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}
	
	exports.default = cloneRegExp;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _addSetEntry = __webpack_require__(208);
	
	var _addSetEntry2 = _interopRequireDefault(_addSetEntry);
	
	var _arrayReduce = __webpack_require__(204);
	
	var _arrayReduce2 = _interopRequireDefault(_arrayReduce);
	
	var _setToArray = __webpack_require__(209);
	
	var _setToArray2 = _interopRequireDefault(_setToArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set) {
	  var Ctor = set.constructor;
	  return (0, _arrayReduce2.default)((0, _setToArray2.default)(set), _addSetEntry2.default, new Ctor());
	}
	
	exports.default = cloneSet;

/***/ },
/* 208 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}
	
	exports.default = addSetEntry;

/***/ },
/* 209 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	exports.default = setToArray;

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Symbol2 = __webpack_require__(211);
	
	var _Symbol3 = _interopRequireDefault(_Symbol2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol3.default ? _Symbol3.default.prototype : undefined,
	    symbolValueOf = _Symbol3.default ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return _Symbol3.default ? Object(symbolValueOf.call(symbol)) : {};
	}
	
	exports.default = cloneSymbol;

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _root = __webpack_require__(149);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Built-in value references. */
	var _Symbol = _root2.default.Symbol;
	
	exports.default = _Symbol;

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _cloneBuffer = __webpack_require__(200);
	
	var _cloneBuffer2 = _interopRequireDefault(_cloneBuffer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = typedArray.buffer,
	      Ctor = typedArray.constructor;
	
	  return new Ctor(isDeep ? (0, _cloneBuffer2.default)(buffer) : buffer, typedArray.byteOffset, typedArray.length);
	}
	
	exports.default = cloneTypedArray;

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseCreate = __webpack_require__(214);
	
	var _baseCreate2 = _interopRequireDefault(_baseCreate);
	
	var _isFunction = __webpack_require__(128);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isPrototype = __webpack_require__(187);
	
	var _isPrototype2 = _interopRequireDefault(_isPrototype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  if ((0, _isPrototype2.default)(object)) {
	    return {};
	  }
	  var Ctor = object.constructor;
	  return (0, _baseCreate2.default)((0, _isFunction2.default)(Ctor) ? Ctor.prototype : undefined);
	}
	
	exports.default = initCloneObject;

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isObject = __webpack_require__(129);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = function () {
	  function object() {}
	  return function (prototype) {
	    if ((0, _isObject2.default)(prototype)) {
	      object.prototype = prototype;
	      var result = new object();
	      object.prototype = undefined;
	    }
	    return result || {};
	  };
	}();
	
	exports.default = baseCreate;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(172);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _isHostObject = __webpack_require__(146);
	
	var _isHostObject2 = _interopRequireDefault(_isHostObject);
	
	var _isObjectLike = __webpack_require__(147);
	
	var _isObjectLike2 = _interopRequireDefault(_isObjectLike);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var getPrototypeOf = _getPrototypeOf2.default;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!(0, _isObjectLike2.default)(value) || objectToString.call(value) != objectTag || (0, _isHostObject2.default)(value)) {
	    return false;
	  }
	  var proto = objectProto;
	  if (typeof value.constructor == 'function') {
	    proto = getPrototypeOf(value);
	  }
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}
	
	exports.default = isPlainObject;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _isLength = __webpack_require__(183);
	
	var _isLength2 = _interopRequireDefault(_isLength);
	
	var _isObjectLike = __webpack_require__(147);
	
	var _isObjectLike2 = _interopRequireDefault(_isObjectLike);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	    return (0, _isObjectLike2.default)(value) && (0, _isLength2.default)(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	exports.default = isTypedArray;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _copyObject = __webpack_require__(168);
	
	var _copyObject2 = _interopRequireDefault(_copyObject);
	
	var _keysIn = __webpack_require__(218);
	
	var _keysIn2 = _interopRequireDefault(_keysIn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return (0, _copyObject2.default)(value, (0, _keysIn2.default)(value));
	}
	
	exports.default = toPlainObject;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseKeysIn = __webpack_require__(219);
	
	var _baseKeysIn2 = _interopRequireDefault(_baseKeysIn);
	
	var _indexKeys = __webpack_require__(176);
	
	var _indexKeys2 = _interopRequireDefault(_indexKeys);
	
	var _isIndex = __webpack_require__(186);
	
	var _isIndex2 = _interopRequireDefault(_isIndex);
	
	var _isPrototype = __webpack_require__(187);
	
	var _isPrototype2 = _interopRequireDefault(_isPrototype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = (0, _isPrototype2.default)(object),
	      props = (0, _baseKeysIn2.default)(object),
	      propsLength = props.length,
	      indexes = (0, _indexKeys2.default)(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || (0, _isIndex2.default)(key, length))) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	exports.default = keysIn;

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Reflect = __webpack_require__(220);
	
	var _Reflect2 = _interopRequireDefault(_Reflect);
	
	var _iteratorToArray = __webpack_require__(221);
	
	var _iteratorToArray2 = _interopRequireDefault(_iteratorToArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var enumerate = _Reflect2.default ? _Reflect2.default.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);
	
	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}
	
	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function baseKeysIn(object) {
	    return (0, _iteratorToArray2.default)(enumerate(object));
	  };
	}
	
	exports.default = baseKeysIn;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _root = __webpack_require__(149);
	
	var _root2 = _interopRequireDefault(_root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Built-in value references. */
	var Reflect = _root2.default.Reflect;
	
	exports.default = Reflect;

/***/ },
/* 221 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];
	
	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}
	
	exports.default = iteratorToArray;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isIterateeCall = __webpack_require__(223);
	
	var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);
	
	var _rest = __webpack_require__(224);
	
	var _rest2 = _interopRequireDefault(_rest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return (0, _rest2.default)(function (object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = typeof customizer == 'function' ? (length--, customizer) : undefined;
	    if (guard && (0, _isIterateeCall2.default)(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	exports.default = createAssigner;

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _eq = __webpack_require__(116);
	
	var _eq2 = _interopRequireDefault(_eq);
	
	var _isArrayLike = __webpack_require__(180);
	
	var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
	
	var _isIndex = __webpack_require__(186);
	
	var _isIndex2 = _interopRequireDefault(_isIndex);
	
	var _isObject = __webpack_require__(129);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!(0, _isObject2.default)(object)) {
	    return false;
	  }
	  var type = typeof index === 'undefined' ? 'undefined' : (0, _typeof3.default)(index);
	  if (type == 'number' ? (0, _isArrayLike2.default)(object) && (0, _isIndex2.default)(index, object.length) : type == 'string' && index in object) {
	    return (0, _eq2.default)(object[index], value);
	  }
	  return false;
	}
	
	exports.default = isIterateeCall;

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _apply = __webpack_require__(225);
	
	var _apply2 = _interopRequireDefault(_apply);
	
	var _toInteger = __webpack_require__(226);
	
	var _toInteger2 = _interopRequireDefault(_toInteger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? func.length - 1 : (0, _toInteger2.default)(start), 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0:
	        return func.call(this, array);
	      case 1:
	        return func.call(this, args[0], array);
	      case 2:
	        return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return (0, _apply2.default)(func, this, otherArgs);
	  };
	}
	
	exports.default = rest;

/***/ },
/* 225 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0:
	      return func.call(thisArg);
	    case 1:
	      return func.call(thisArg, args[0]);
	    case 2:
	      return func.call(thisArg, args[0], args[1]);
	    case 3:
	      return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	exports.default = apply;

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _toNumber = __webpack_require__(227);
	
	var _toNumber2 = _interopRequireDefault(_toNumber);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = (0, _toNumber2.default)(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = value < 0 ? -1 : 1;
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? remainder ? value - remainder : value : 0;
	}
	
	exports.default = toInteger;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isFunction = __webpack_require__(128);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isObject = __webpack_require__(129);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if ((0, _isObject2.default)(value)) {
	    var other = (0, _isFunction2.default)(value.valueOf) ? value.valueOf() : value;
	    value = (0, _isObject2.default)(other) ? other + '' : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}
	
	exports.default = toNumber;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isApiVersion = exports.validEmail = exports.urlJoin = exports.only = exports.normalizeUrl = exports.mixin = exports.max = exports.isEmpty = exports.has = exports.epoch = exports.deprecate = undefined;
	
	var _getOwnPropertyDescriptor = __webpack_require__(229);
	
	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	var _getOwnPropertyNames = __webpack_require__(232);
	
	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);
	
	var _constants = __webpack_require__(24);
	
	var constants = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Utility Functions
	 */
	
	// For speed
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	 * Normalize URL strings (handle slashes, query params, etc)
	 * @param {String} [str=''] - url string to normalize
	 * @return {String}
	 */
	/*global __LOG__ */
	function normalizeUrl() {
	  var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	  return str.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/\#/g, '#').replace(/\:\//g, '://');
	}
	
	/**
	 * Checks if `path` is a direct property. (Courtesy of lodash)
	 *
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
	 * @example
	 *
	 * const object = { 'a': { 'b': { 'c': 3 } } };
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b.c');
	 * // => true
	 *
	 * _.has(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 */
	function has(object, path) {
	  return object != null && hasOwnProperty.call(object, path); // eslint-disable-line
	}
	
	/**
	 * Join an array of strings into a URL
	 * @param {...url<string>} url - fragments
	 * @return {String}
	 */
	function urlJoin() {
	  for (var _len = arguments.length, url = Array(_len), _key = 0; _key < _len; _key++) {
	    url[_key] = arguments[_key];
	  }
	
	  var joined = [].slice.call(url, 0).join('/');
	  return normalizeUrl(joined);
	}
	
	/**
	 * Check to see if an Object is Empty
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	function isEmpty(obj) {
	  // null and undefined are "empty"
	  if (obj == null) return true; // eslint-disable-line
	
	  // Assume if it has a length property with a non-zero value
	  // that that property is correct.
	  if (obj.length > 0) return false;
	  if (obj.length === 0) return true;
	
	  // Otherwise, does it have any properties of its own?
	  // Note that this doesn't handle
	  // toString and valueOf enumeration bugs in IE < 9
	  for (var key in obj) {
	    if (hasOwnProperty.call(obj, key)) return false;
	  }
	
	  return true;
	}
	
	/**
	 * Attempt to validate an email address with a variant on RFC5322
	 * @link http://tools.ietf.org/html/rfc5322#section-3.4
	 * @param {String} str
	 * @return {Boolean}
	 */
	function validEmail(str) {
	  var re = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/); // eslint-disable-line
	  return re.test(str);
	}
	
	/**
	 * Return an object with only the whitelisted properties
	 * @param {Array<string>} whitelist - names of properties to keep
	 * @param {Object} obj - object to filter
	 * @return {Object} - filtered object
	 */
	function only() {
	  var whitelist = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var obj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  return whitelist.reduce(function (ret, p) {
	    if (has(obj, p)) {
	      ret[p] = obj[p];
	    } // eslint-disable-line
	    return ret;
	  }, {});
	}
	
	/**
	 * Return the current DateTime in Epoch w/o milliseconds
	 *
	 * @example
	 * epoch(); // => 1440705061 instead of 1440705061191
	 * epoch(2015, 10, 13) // => 1447390800
	 *
	 * @param {...time<number>} time - year, month, day for a specific epoch
	 * @return {Number}
	 */
	function epoch() {
	  for (var _len2 = arguments.length, time = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    time[_key2] = arguments[_key2];
	  }
	
	  var year = time[0];
	  var month = time[1];
	  var day = time[2];
	
	  var d = time.length > 0 ? new Date(year, month, day) : new Date();
	  return Math.floor(d.getTime() / 1000);
	}
	
	/**
	 * Prevent a number from passing a threshold. NaNs are converted to 0
	 *
	 * @param {Number} num
	 * @param {Number} [maximum] - defaults to 50
	 * @return {Number}
	 */
	function max(num) {
	  var maximum = arguments.length <= 1 || arguments[1] === undefined ? 50 : arguments[1];
	  var n = Number(num);
	  var m = Number(maximum);
	
	  var r = n > m ? m : n;
	  if (isNaN(n)) {
	    r = 0;
	  }
	  return r;
	}
	
	/**
	 * Log a deprecation warning in console only in DEV mode
	 *
	 * @example
	 * const opts = {bar: 1};
	 * deprecate(opts.bar, 'opts.bar is deprecated!') // 'opts.bar is deprecated'
	 *
	 * const foo = 1;
	 * deprecate((typeof foo === String), 'String support is deprecated, given %s', foo)
	 * // 'String support is deprecated, given 1'
	 *
	 * @param {Boolean} pred - predicate or value should be "truthy" or "falsey"
	 * @param {String} format - warning message template
	 * @param {...args<any>} args - values to substitue into format
	 * @return {void}
	 */
	function deprecate(pred, format) {
	  if ((true) && pred) {
	    if (format === undefined) {
	      throw new Error('deprecate requires an error message');
	    }
	
	    var warning = void 0;
	
	    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
	      args[_key3 - 2] = arguments[_key3];
	    }
	
	    if (args.length) {
	      warning = args.reduce(function (prev, next) {
	        return prev.replace(/%s/g, next);
	      }, format);
	    } else {
	      warning = format;
	    }
	
	    console.warn(warning); // eslint-disable-line
	  }
	}
	
	/**
	 * Mixin properties from a source Class (or sources) into a target Class
	 *
	 * @example
	 * class Foo {}
	 * class Bar { hiBar() { return 'Hi from bar!'} }
	 * class Baz { hiBaz() { return 'Hi from baz!'} }
	 *
	 * mixin(Foo, Bar, Baz);
	 *
	 * const foo = new Foo();
	 * foo.hiBar() // => 'Hi from bar!'
	 * foo.hiBaz() // => 'Hi from baz!'
	 *
	 * @param  {Class} target - target to merge properties into
	 * @param  {...sources<Class>} sources - sources to merge properties from
	 * @return {void}
	 */
	function mixin(target) {
	  var tp = target.prototype;
	
	  for (var _len4 = arguments.length, sources = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    sources[_key4 - 1] = arguments[_key4];
	  }
	
	  sources.forEach(function (source) {
	    var sp = source.prototype;
	
	    (0, _getOwnPropertyNames2.default)(sp).forEach(function (name) {
	      if (name !== 'constructor') {
	        (0, _defineProperty2.default)(tp, name, (0, _getOwnPropertyDescriptor2.default)(sp, name));
	      }
	    });
	  });
	}
	
	/**
	 * Predicate that checks the value of a string against the API Version format
	 *
	 * @param {String} version - should be `YYYY-MM-DD` with an optional integer
	 * @return {Boolean}
	 */
	function isApiVersion() {
	  var version = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	  return Boolean(String(version).match(constants.RE_API_VERSION));
	}
	
	exports.deprecate = deprecate;
	exports.epoch = epoch;
	exports.has = has;
	exports.isEmpty = isEmpty;
	exports.max = max;
	exports.mixin = mixin;
	exports.normalizeUrl = normalizeUrl;
	exports.only = only;
	exports.urlJoin = urlJoin;
	exports.validEmail = validEmail;
	exports.isApiVersion = isApiVersion;

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(230), __esModule: true };

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(231);
	var $Object = __webpack_require__(10).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(37)
	  , $getOwnPropertyDescriptor = __webpack_require__(78).f;
	
	__webpack_require__(48)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(233), __esModule: true };

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(234);
	var $Object = __webpack_require__(10).Object;
	module.exports = function getOwnPropertyNames(it){
	  return $Object.getOwnPropertyNames(it);
	};

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(48)('getOwnPropertyNames', function(){
	  return __webpack_require__(142).f;
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getPrototypeOf = __webpack_require__(172);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(236);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(237);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _Payment2 = __webpack_require__(244);
	
	var _Payment3 = _interopRequireDefault(_Payment2);
	
	var _donation2 = __webpack_require__(270);
	
	var _donation3 = _interopRequireDefault(_donation2);
	
	var _utils = __webpack_require__(228);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {String} - API endpoint for resource */
	var ENDPOINT_DONATION = 'donations';
	
	/**
	 * Create and view donations
	 *
	 * list(opts) - get a filtered list of donations
	 * create(donation) - create a new donation
	 * fetch(id) - fetch a donation object
	 *
	 */
	
	var Donation = function (_Payment) {
	  (0, _inherits3.default)(Donation, _Payment);
	
	  function Donation() {
	    (0, _classCallCheck3.default)(this, Donation);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Donation).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Donation, [{
	    key: 'list',
	
	    /**
	     * Fetch a collection of Donation objects, filtering on gwid, subscription,
	     * quickCard and email.
	     *
	     * @param {Object} opts
	     * @param {String} [opts.gwid] - gwid to filter on
	     * @param {String} [opts.subscription] - sub id to filter on
	     * @param {String} [opts.quickCard] - quickcard id to filter on
	     * @param {String} [opts.email] - email to filter on
	     * @param {Number} [opts.page] - page number
	     * @param {Number} [opts.perPage] - donations per page
	     * @return {Promise}
	     */
	    value: function list() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var whitelist = ['gwid', 'subscription', 'quickCard', 'email', 'page', 'perPage'];
	
	      var params = (0, _utils.only)(whitelist, opts);
	      if (params.perPage) {
	        params.perPage = (0, _utils.max)(params.perPage); // Max of 50
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_DONATION);
	      return this.fetchCollection(url, params);
	    }
	
	    /**
	     * Fetch a single Donation object
	     *
	     * @param {String} id - donation id
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetch',
	    value: function fetch() {
	      var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_DONATION, id);
	      return this.fetchCollection(url);
	    }
	
	    /**
	     * POST a donation record to the API
	     *
	     * The passed in form object will be validated. If it fails, a mock response
	     * with any errors will be sent back in a rejected Promise. This is to present
	     * the least amount of surprise to the developer.
	     *
	     * Note: All of the values in the object passed to the method should have had
	     * their types coerced already or validation will fail.
	     *
	     * @example
	     * // validation fail
	     * supporter.create({}).catch((err) => console.log(err));
	     * // => { status: 400, data: { error: { valid: false, ... } } ... }
	     *
	     * @param {Object} [donation]
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'create',
	    value: function create() {
	      var donation = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var checkDonation = this.validatePayment(donation, _donation3.default);
	
	      // Return a mock error response with validation errors
	      if (checkDonation.valid === false) {
	        var response = this.http.generateErrorResponse(checkDonation);
	        return _promise2.default.reject(response);
	      }
	
	      var _donation = this.attachIdentity(donation);
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_DONATION);
	      return this.http.post(url, _donation);
	    }
	  }]);
	  return Donation;
	}(_Payment3.default);
	
	exports.default = Donation;

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(238);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(241);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(239), __esModule: true };

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(240);
	module.exports = __webpack_require__(10).Object.setPrototypeOf;

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(77).set});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(242), __esModule: true };

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(243);
	var $Object = __webpack_require__(10).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(60)});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	var _creditCard = __webpack_require__(245);
	
	var _creditCard2 = _interopRequireDefault(_creditCard);
	
	var _currencyFormatter = __webpack_require__(251);
	
	var _currencyFormatter2 = _interopRequireDefault(_currencyFormatter);
	
	var _numeral = __webpack_require__(261);
	
	var _numeral2 = _interopRequireDefault(_numeral);
	
	var _Http = __webpack_require__(49);
	
	var _Http2 = _interopRequireDefault(_Http);
	
	var _Dictionary = __webpack_require__(26);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _SchemaUtils = __webpack_require__(262);
	
	var _SchemaUtils2 = _interopRequireDefault(_SchemaUtils);
	
	var _utils = __webpack_require__(228);
	
	var _constants = __webpack_require__(24);
	
	var constants = _interopRequireWildcard(_constants);
	
	var _cloneDeep = __webpack_require__(264);
	
	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
	
	var _forEach = __webpack_require__(265);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _merge = __webpack_require__(109);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {String} - API endpoint for resource */
	var NAMESPACE = 'payments';
	
	/** @type {Object} - used to map validation errors to fields */
	var CC_MAP = (0, _freeze2.default)({
	  validCardNumber: 'ccNum',
	  validExpiryMonth: 'ccExpMonth',
	  validExpiryYear: 'ccExpYear',
	  validCvv: 'ccCvc',
	  isExpired: 'expiration'
	});
	
	var Payment = function () {
	  /**
	   * @param {Dictionary} [config] - configuration dictionary
	   * @param {Http} http
	   */
	
	  function Payment(config, http) {
	    (0, _classCallCheck3.default)(this, Payment);
	
	    /** @type {Dictionary} */
	    this.config = config && config instanceof _Dictionary2.default ? config : new _Dictionary2.default();
	
	    // Resource must have an Http instance
	    if (!http || http instanceof _Http2.default === false) {
	      throw new Error('Payment requires Http');
	    }
	
	    /** @type {Http} */
	    this.http = http;
	
	    /** @type {String} */
	    this.namespace = NAMESPACE;
	
	    /** @type {SchemaUtils} */
	    this.schemaUtils = _SchemaUtils2.default;
	  }
	
	  /**
	   * If a specific function argument is missing then send back a tuple with a
	   * rejected Promise containing an error message.
	   *
	   * @param {*} arg - value to check
	   * @param {String} name - name of argument being checked
	   * @return {Array}
	   */
	
	
	  (0, _createClass3.default)(Payment, [{
	    key: 'validateArg',
	    value: function validateArg(arg) {
	      var name = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      var out = [true];
	
	      if (arg === null || arg === undefined || arg === false) {
	        var response = this.http.generateErrorResponse({
	          valid: false,
	          fields: [name],
	          msg: ['Missing Argument: ' + name]
	        });
	        out = [false, _promise2.default.reject(response)];
	      }
	
	      return out;
	    }
	
	    /**
	     * Return a validation object with Booleans for each item of the card
	     *
	     * @param {Object} [payment] - payment object
	     * @return {Object}
	     */
	
	  }, {
	    key: 'validateCreditCard',
	    value: function validateCreditCard() {
	      var payment = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var ccNum = payment.ccNum;
	      var ccExpMonth = payment.ccExpMonth;
	      var ccExpYear = payment.ccExpYear;
	      var ccCvc = payment.ccCvc;
	
	      var card = {
	        cardType: _creditCard2.default.determineCardType(ccNum),
	        number: ccNum,
	        expiryMonth: String(ccExpMonth),
	        expiryYear: String(ccExpYear),
	        cvv: String(ccCvc)
	      };
	      return _creditCard2.default.validate(card);
	    }
	
	    /**
	     * If no ID is present, then send back a tuple with a rejected Promise with an
	     * error message
	     *
	     * @param {String} id
	     * @return {Array}
	     */
	
	  }, {
	    key: 'validateId',
	    value: function validateId() {
	      var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      var out = [true];
	
	      if (id.length === 0) {
	        var response = this.http.generateErrorResponse({
	          valid: false,
	          fields: ['id'],
	          msg: ['Missing ID']
	        });
	        out = [false, _promise2.default.reject(response)];
	      }
	      return out;
	    }
	
	    /**
	     * If code is not a valid country code for currencies then return an updated
	     * errors object we can give back to the user
	     *
	     * @param {String} code
	     * @param {Object} errors
	     * @return {Object}
	     */
	
	  }, {
	    key: 'validateCurrencyCode',
	    value: function validateCurrencyCode(code, errors) {
	      var errs = (0, _cloneDeep2.default)(errors);
	      var upCode = String(code).toUpperCase();
	      var codeCheck = _currencyFormatter2.default.findCurrency(upCode);
	
	      if (!codeCheck || codeCheck.code !== upCode) {
	        errs.msg.push('currency is not a valid ISO-4217 country code');
	        errs.fields.push('currency');
	      }
	
	      return errs;
	    }
	
	    /**
	     * If no interval is present, or its not set to 'weekly' or 'monthly'
	     * then send back a tuple with a rejected Promise with an error message
	     *
	     * @param {String} interval
	     * @return {Array}
	     */
	
	  }, {
	    key: 'validateInterval',
	    value: function validateInterval(interval) {
	      var out = [true];
	
	      // Slightly complex check is complex
	      var test = function test(t) {
	        if (!t) {
	          return false;
	        }
	        if (t === 'weekly' || t === 'monthly') {
	          return false;
	        }
	        return true;
	      };
	
	      if (test(interval)) {
	        var response = this.http.generateErrorResponse({
	          valid: false,
	          fields: ['interval'],
	          msg: ['Interval must be weekly or monthly']
	        });
	        out = [false, _promise2.default.reject(response)];
	      }
	      return out;
	    }
	
	    /**
	     * Validate the payment against the schema. If it fails then return a tuple
	     * with a rejected Promise containing an error message
	     *
	     * @param {Object} payment
	     * @param {Object} schema
	     * @return {Array}
	     */
	
	  }, {
	    key: 'validateSchema',
	    value: function validateSchema(payment, schema) {
	      var _this = this;
	
	      var out = [true];
	
	      var valid = this.schemaUtils.validateSchema(this.attachIdentity(payment), schema);
	      if (valid.length > 0) {
	        (function () {
	          var ret = _this.http.generateErrorObject();
	          valid.forEach(function (err) {
	            ret.msg.push(err.message);
	            ret.fields.push(_this.schemaUtils.extractFieldByError(err));
	          });
	          out = [false, _promise2.default.reject(_this.http.generateErrorResponse(ret))];
	        })();
	      }
	      return out;
	    }
	
	    /**
	     * Generate a standardized validation message for payment object. The
	     * payment object should already have its types coerced before being
	     * passed into this function.
	     *
	     * @param {Object} payment
	     * @param {Object} [schema]
	     * @return {Object}
	     */
	
	  }, {
	    key: 'validatePayment',
	    value: function validatePayment(payment, schema) {
	      var _this2 = this;
	
	      var ret = this.http.generateErrorObject();
	      var _schema = schema || this.schema;
	      var validSchema = this.schemaUtils.validateSchema(payment, _schema);
	
	      // Bail out on empty form
	      if (!payment || (0, _utils.isEmpty)(payment)) {
	        ret.msg = ['Required fields missing'];
	        ret.fields = this.schema.required;
	        return ret;
	      }
	
	      // Loop through schema errors and build up
	      if (validSchema.length > 0) {
	        validSchema.forEach(function (err) {
	          ret.msg.push(err.message);
	          ret.fields.push(_this2.schemaUtils.extractFieldByError(err));
	        });
	      }
	
	      // Check the CC
	      ret = this.validateCCPayment(payment, ret);
	
	      // Check currency code if it exists
	      if ((0, _utils.has)(payment, 'currency')) {
	        ret = this.validateCurrencyCode(payment.currency, ret);
	      }
	
	      if (ret.fields.length === 0) {
	        ret.valid = true;
	      }
	      return ret;
	    }
	
	    /**
	     * Build up validation errors related to Credit Cards
	     *
	     * @access private
	     * @param {Object} payment
	     * @param {Object} errors - http error object
	     * @return {Object}
	     */
	
	  }, {
	    key: 'validateCCPayment',
	    value: function validateCCPayment(payment, errors) {
	      var ret = (0, _cloneDeep2.default)(errors);
	      var validCard = this.validateCreditCard(payment);
	      delete validCard.customValidation; // Un-used
	
	      (0, _forEach2.default)(validCard, function (val, key) {
	        if (!val && key !== 'isExpired') {
	          var field = CC_MAP[key];
	          ret.msg.push(field + ' is invalid');
	          ret.fields.push(field);
	        }
	      });
	
	      if (validCard.isExpired) {
	        ret.msg.push('Credit card expired');
	        ret.fields.push(CC_MAP.isExpired);
	      }
	
	      return ret;
	    }
	
	    /**
	     * Remove all currency symbols and punctuation from amount (except for
	     * decimal)
	     *
	     * @example
	     * removeCurrencyFormatting('$1,123.33'); // => '1123.33'
	     *
	     * @param {String} [amount] - currency amount
	     * @return {String}
	     */
	
	  }, {
	    key: 'removeCurrencyFormatting',
	    value: function removeCurrencyFormatting() {
	      var amount = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      var _amount = amount;
	      if (typeof _amount !== 'string') {
	        _amount = String(_amount);
	      }
	      return (0, _numeral2.default)(_amount).format('0.00');
	    }
	
	    /**
	     * Remove any currency formatting and return as an Integer. This is
	     * specifically for dealing with non-divisible currencies such as Yen
	     * which cannot be divided into 'cents'. Also, this will round up
	     * (see example)
	     *
	     * @example
	     * toIndivisible('-¥12,300') // => 12300
	     * toIndivisible('-¥12,300.55') // => 12301
	     *
	     * @param {String} [amount]
	     * @return {Number}
	     */
	
	  }, {
	    key: 'toIndivisible',
	    value: function toIndivisible() {
	      var amount = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      return Math.abs(Number(this.removeCurrencyFormatting(amount)).toFixed(0));
	    }
	
	    /**
	     * Convert a currency amount into a 'cents' value
	     *
	     * !! Note: expects amount to be an amount divisible by 100, such as dollars
	     * or euros. If using a non-divisible amount such as Yen then do not use
	     * this function and use toIndivisible
	     *
	     * @example
	     * toCents('$12.04') // => 1204
	     * toCents(1000) // => 100000
	     *
	     * @param {String} amount - string representation of value
	     * @return {Number}
	     */
	
	  }, {
	    key: 'toCents',
	    value: function toCents() {
	      var amount = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      var amt = this.removeCurrencyFormatting(amount);
	      var abs = Math.abs(Number(amt).toFixed(2));
	      return abs <= 0 ? Number(String(abs).replace(/\D/g, '')) : abs * 100;
	    }
	
	    /**
	     * Format the amount from API in cents  based on the ISO-4217 country
	     * code provided
	     *
	     * @param {Number} [cents] - amount from API in cents
	     * @param {String} code
	     * @return {String}
	     */
	
	  }, {
	    key: 'formatCurrency',
	    value: function formatCurrency() {
	      var cents = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var code = arguments[1];
	
	      var _currencyFormatter$fi = _currencyFormatter2.default.findCurrency(code);
	
	      var decimalDigits = _currencyFormatter$fi.decimalDigits;
	
	      var amount = Number(cents) / Math.pow(10, decimalDigits);
	      return _currencyFormatter2.default.format(amount, { code: code });
	    }
	
	    /**
	     * If a GWID is present then attach to the request. This is immutable,
	     * a new object is returned (we don't mutate the original payment)
	     *
	     * @param {Object} [payment]
	     * @return {Object}
	     */
	
	  }, {
	    key: 'attachIdentity',
	    value: function attachIdentity() {
	      var payment = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var fields = {};
	      var auth = this.config.get(constants.CONFIG_AUTH);
	      if ((0, _utils.has)(auth, 'gwid')) {
	        fields.gwid = auth.gwid;
	      }
	      return (0, _merge2.default)({}, payment, fields);
	    }
	
	    /**
	     * Interface to Http::get
	     *
	     * @access private
	     * @param {String} url
	     * @param {Object} params
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetchCollection',
	    value: function fetchCollection() {
	      var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      return this.http.get(url, { params: params });
	    }
	
	    /**
	     * GET the health status of the Donations service. Passing in features: true
	     * will get the status of the service AND its available features
	     *
	     * @param {Object} opts
	     * @param {Boolean} [opts.features] - get features status
	     * @return {Proimise}
	     */
	
	  }, {
	    key: 'health',
	    value: function health() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var features = opts.features;
	
	      var urlBase = (0, _utils.urlJoin)(this.namespace, 'health');
	      var url = features ? (0, _utils.urlJoin)(urlBase, 'features') : urlBase;
	      return this.http.get(url);
	    }
	  }]);
	  return Payment;
	}();
	
	exports.default = Payment;

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _keys = __webpack_require__(29);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _assign = __webpack_require__(246);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Reach = __webpack_require__(250);
	
	var _defaults = {
	  cardTypes: {
	    VISA: {
	      cardType: 'VISA',
	      cardPattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
	      partialPattern: /^4/,
	      cvvPattern: /^\d{3}$/
	    },
	    MASTERCARD: {
	      cardType: 'MASTERCARD',
	      cardPattern: /^5[1-5][0-9]{14}$/,
	      partialPattern: /^5[1-5]/,
	      cvvPattern: /^\d{3}$/
	    },
	    AMERICANEXPRESS: {
	      cardType: 'AMERICANEXPRESS',
	      cardPattern: /^3[47][0-9]{13}$/,
	      partialPattern: /^3[47]/,
	      cvvPattern: /^\d{4}$/
	    },
	    DINERSCLUB: {
	      cardType: 'DINERSCLUB',
	      cardPattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
	      partialPattern: /^3(0[0-5]|[68])/,
	      cvvPattern: /^\d{3}$/
	    },
	    DISCOVER: {
	      cardType: 'DISCOVER',
	      cardPattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
	      partialPattern: /^6(011|5[0-9])/,
	      cvvPattern: /^\d{3}$/
	    },
	    JCB: {
	      cardType: 'JCB',
	      cardPattern: /^(?:2131|1800|35\d{3})\d{11}$/,
	      partialPattern: /^(2131|1800|35)/,
	      cvvPattern: /^\d{3}$/
	    }
	  },
	  expiryMonths: {
	    min: 1,
	    max: 12
	  },
	  expiryYears: {
	    min: 1900,
	    max: 2200
	  },
	  schema: {
	    cardType: 'cardType',
	    number: 'number',
	    expiryMonth: 'expiryMonth',
	    expiryYear: 'expiryYear',
	    cvv: 'cvv'
	  }
	};
	
	// Setup Aliases
	_setupCardTypeAliases('VISA', ['vc', 'VC', 'visa']);
	_setupCardTypeAliases('MASTERCARD', ['mc', 'MC', 'mastercard', 'master card', 'MASTER CARD']);
	_setupCardTypeAliases('AMERICANEXPRESS', ['ae', 'AE', 'ax', 'AX', 'amex', 'AMEX', 'american express', 'AMERICAN EXPRESS']);
	_setupCardTypeAliases('DINERSCLUB', ['dinersclub']);
	_setupCardTypeAliases('DISCOVER', ['dc', 'DC', 'discover']);
	_setupCardTypeAliases('JCB', ['jcb']);
	
	// Store original defaults. This must happen after aliases are setup
	var _originalDefaults = (0, _assign2.default)({}, _defaults);
	
	function validate(card, options) {
	  card = card || {};
	
	  var settings = (0, _assign2.default)({}, _defaults, options);
	  var schema = settings.schema;
	  var cardType = Reach(card, schema.cardType);
	  var number = sanitizeNumberString(Reach(card, schema.number));
	  var expiryMonth = Reach(card, schema.expiryMonth);
	  var expiryYear = Reach(card, schema.expiryYear);
	  var cvv = sanitizeNumberString(Reach(card, schema.cvv));
	  var customValidationFn = settings.customValidation;
	  var customValidation = void 0;
	
	  // Optional custom validation
	  if (typeof customValidationFn === 'function') {
	    customValidation = customValidationFn(card, settings);
	  }
	
	  return {
	    card: card,
	    validCardNumber: isValidCardNumber(number, cardType, settings.cardTypes),
	    validExpiryMonth: isValidExpiryMonth(expiryMonth, settings.expiryMonths),
	    validExpiryYear: isValidExpiryYear(expiryYear, settings.expiryYears),
	    validCvv: doesCvvMatchType(cvv, cardType, settings.cardTypes),
	    isExpired: isExpired(expiryMonth, expiryYear),
	    customValidation: customValidation
	  };
	}
	
	function determineCardType(number, options) {
	  var settings = (0, _assign2.default)({}, _defaults, options);
	  var cardTypes = settings.cardTypes;
	  var keys = (0, _keys2.default)(cardTypes);
	
	  number = sanitizeNumberString(number);
	
	  for (var i = 0; i < keys.length; ++i) {
	    var key = keys[i];
	    var type = cardTypes[key];
	
	    if (type.cardPattern.test(number) || settings.allowPartial === true && type.partialPattern.test(number)) {
	      return type.cardType;
	    }
	  }
	
	  return null;
	}
	
	function isValidCardNumber(number, type, options) {
	  return doesNumberMatchType(number, type, options) && luhn(number);
	}
	
	function isValidExpiryMonth(month, options) {
	  var settings = (0, _assign2.default)({}, _defaults.expiryMonths, options);
	
	  if (typeof month === 'string' && month.length > 2) {
	    return false;
	  }
	
	  month = ~ ~month;
	  return month >= settings.min && month <= settings.max;
	}
	
	function isValidExpiryYear(year, options) {
	  var settings = (0, _assign2.default)({}, _defaults.expiryYears, options);
	
	  if (typeof year === 'string' && year.length !== 4) {
	    return false;
	  }
	
	  year = ~ ~year;
	  return year >= settings.min && year <= settings.max;
	}
	
	function doesNumberMatchType(number, type, options) {
	  var settings = (0, _assign2.default)({}, _defaults.cardTypes, options);
	  var patterns = settings[type];
	
	  if (!patterns) {
	    return false;
	  }
	
	  return patterns.cardPattern.test(number);
	}
	
	function doesCvvMatchType(number, type, options) {
	  var settings = (0, _assign2.default)({}, _defaults.cardTypes, options);
	  var patterns = settings[type];
	
	  if (!patterns) {
	    return false;
	  }
	
	  return patterns.cvvPattern.test(number);
	}
	
	function isExpired(month, year) {
	  month = ~ ~month;
	  year = ~ ~year;
	
	  // Cards are good until the end of the month
	  // http://stackoverflow.com/questions/54037/credit-card-expiration-dates-inclusive-or-exclusive
	  var expiration = new Date(year, month);
	
	  return Date.now() >= expiration;
	}
	
	function luhn(number) {
	  // Source - https://gist.github.com/DiegoSalazar/4075533
	
	  if (/[^\d]+/.test(number) || typeof number !== 'string' || !number) {
	    return false;
	  }
	
	  var nCheck = 0;
	  var bEven = false;
	  var nDigit = void 0;
	
	  for (var i = number.length - 1; i >= 0; --i) {
	    nDigit = ~ ~number.charAt(i);
	
	    if (bEven) {
	      if ((nDigit *= 2) > 9) {
	        nDigit -= 9;
	      }
	    }
	
	    nCheck += nDigit;
	    bEven = !bEven;
	  }
	
	  return nCheck % 10 === 0;
	}
	
	function sanitizeNumberString(number) {
	  if (typeof number !== 'string') {
	    return '';
	  }
	
	  return number.replace(/[^\d]/g, '');
	}
	
	function defaults(options, overwrite) {
	  options = options || {};
	
	  if (overwrite === true) {
	    _defaults = (0, _assign2.default)({}, options);
	  } else {
	    _defaults = (0, _assign2.default)({}, _defaults, options);
	  }
	
	  return _defaults;
	}
	
	function reset() {
	  _defaults = (0, _assign2.default)({}, _originalDefaults);
	  return _defaults;
	}
	
	function _setupCardTypeAliases(type, aliases) {
	  for (var i = 0; i < aliases.length; ++i) {
	    _defaults.cardTypes[aliases[i]] = _defaults.cardTypes[type];
	  }
	}
	
	module.exports = {
	  validate: validate,
	  determineCardType: determineCardType,
	  isValidCardNumber: isValidCardNumber,
	  isValidExpiryMonth: isValidExpiryMonth,
	  isValidExpiryYear: isValidExpiryYear,
	  doesNumberMatchType: doesNumberMatchType,
	  doesCvvMatchType: doesCvvMatchType,
	  isExpired: isExpired,
	  luhn: luhn,
	  sanitizeNumberString: sanitizeNumberString,
	  defaults: defaults,
	  reset: reset
	};

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(247), __esModule: true };

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(248);
	module.exports = __webpack_require__(10).Object.assign;

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(8);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(249)});

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(34)
	  , gOPS     = __webpack_require__(140)
	  , pIE      = __webpack_require__(79)
	  , toObject = __webpack_require__(32)
	  , IObject  = __webpack_require__(38)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(19)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _assign = __webpack_require__(246);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	module.exports = reach;
	
	var defaults = {
	  separator: '.',
	  strict: false,
	  default: undefined
	};
	
	function reach(obj, chain, options) {
	  if (typeof chain !== 'string') {
	    throw new TypeError('Reach path must a string. Found ' + chain + '.');
	  }
	
	  var settings = (0, _assign2.default)({}, defaults, options);
	  var path = chain.split(settings.separator);
	  var ref = obj;
	
	  for (var i = 0; i < path.length; ++i) {
	    var key = path[i];
	
	    if (key[0] === '-' && Array.isArray(ref)) {
	      key = key.slice(1, key.length);
	      key = ref.length - key;
	    }
	
	    // ref must be an object or function and contain key
	    if (ref === null || (typeof ref === 'undefined' ? 'undefined' : (0, _typeof3.default)(ref)) !== 'object' && typeof ref !== 'function' || !(key in ref)) {
	      if (settings.strict) {
	        throw new Error('Invalid segment, ' + key + ', in reach path ' + chain + '.');
	      }
	
	      return settings.default;
	    }
	
	    ref = ref[key];
	  }
	
	  return ref;
	}

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var currencies = __webpack_require__(252)
	var accounting = __webpack_require__(253)
	var find = __webpack_require__(254)
	
	exports.defaultCurrency = {
	  symbol: '',
	  thousandsSeparator: ',',
	  decimalSeparator: '.',
	  symbolOnLeft: true,
	  spaceBetweenAmountAndSymbol: false,
	  decimalDigits: 2
	}
	
	exports.currencies = currencies
	
	exports.format = function (value, options) {
	  var currency = find(currencies, function (c) { return c.code === options.code }) || exports.defaultCurrency
	
	  var symbolOnLeft = currency.symbolOnLeft
	  var spaceBetweenAmountAndSymbol = currency.spaceBetweenAmountAndSymbol
	
	  var format = ''
	  if (symbolOnLeft) {
	    format = spaceBetweenAmountAndSymbol
	              ? '%s %v'
	              : '%s%v'
	  } else {
	    format = spaceBetweenAmountAndSymbol
	              ? '%v %s'
	              : '%v%s'
	  }
	
	  return accounting.formatMoney(value, {
	    symbol: isUndefined(options.symbol)
	              ? currency.symbol
	              : options.symbol,
	
	    decimal: isUndefined(options.decimal)
	              ? currency.decimalSeparator
	              : options.decimal,
	
	    thousand: isUndefined(options.thousand)
	              ? currency.thousandsSeparator
	              : options.thousand,
	
	    precision: typeof options.precision === 'number'
	              ? options.precision
	              : currency.decimalDigits,
	
	    format: typeof options.format === 'string'
	              ? options.format
	              : format
	  })
	}
	
	exports.findCurrency = function (currencyCode) {
	  return find(currencies, function (c) { return c.code === currencyCode })
	}
	
	function isUndefined (val) {
	  return typeof val === 'undefined'
	}


/***/ },
/* 252 */
/***/ function(module, exports) {

	module.exports = [
	  {
	    code: 'AED',
	    symbol: 'د.إ.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'AFN',
	    symbol: '؋',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'ALL',
	    symbol: 'Lek',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'AMD',
	    symbol: '֏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'ANG',
	    symbol: 'ƒ',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'AOA',
	    symbol: 'Kz',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'ARS',
	    symbol: '$',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'AUD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'AWG',
	    symbol: 'ƒ',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'AZN',
	    symbol: '₼',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'BAM',
	    symbol: 'КМ',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'BBD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'BDT',
	    symbol: '৳',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 0
	  },
	  {
	    code: 'BGN',
	    symbol: 'лв.',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'BHD',
	    symbol: 'د.ب.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 3
	  },
	  {
	    code: 'BIF',
	    symbol: 'FBu',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'BMD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'BND',
	    symbol: '$',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'BOB',
	    symbol: 'Bs',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'BRL',
	    symbol: 'R$',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'BSD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'BTN',
	    symbol: 'Nu.',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 1
	  },
	  {
	    code: 'BWP',
	    symbol: 'P',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'BYR',
	    symbol: 'р.',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'BZD',
	    symbol: 'BZ$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'CAD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'CDF',
	    symbol: 'FC',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'CHF',
	    symbol: 'Fr.',
	    thousandsSeparator: '\'',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'CLP',
	    symbol: '$',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'CNY',
	    symbol: '¥',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'COP',
	    symbol: '$',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'CRC',
	    symbol: '₡',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'CUC',
	    symbol: 'CUC',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'CUP',
	    symbol: '$MN',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'CVE',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'CZK',
	    symbol: 'Kč',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'DJF',
	    symbol: 'Fdj',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'DKK',
	    symbol: 'kr.',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'DOP',
	    symbol: 'RD$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'DZD',
	    symbol: 'د.ج.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'EGP',
	    symbol: 'ج.م.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'ERN',
	    symbol: 'Nfk',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'ETB',
	    symbol: 'ETB',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'EUR',
	    symbol: '€',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'FJD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'GBP',
	    symbol: '£',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'GEL',
	    symbol: 'Lari',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'GHS',
	    symbol: '₵',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'GIP',
	    symbol: '£',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'GMD',
	    symbol: 'D',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'GNF',
	    symbol: 'FG',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'GTQ',
	    symbol: 'Q',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'GYD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'HKD',
	    symbol: 'HK$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'HNL',
	    symbol: 'L.',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'HRK',
	    symbol: 'kn',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'HTG',
	    symbol: 'G',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'HUF',
	    symbol: 'Ft',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'IDR',
	    symbol: 'Rp',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'ILS',
	    symbol: '₪',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'INR',
	    symbol: '₹',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'IQD',
	    symbol: 'د.ع.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'IRR',
	    symbol: '﷼',
	    thousandsSeparator: ',',
	    decimalSeparator: '/',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'ISK',
	    symbol: 'kr.',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 0
	  },
	  {
	    code: 'JMD',
	    symbol: 'J$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'JOD',
	    symbol: 'د.ا.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 3
	  },
	  {
	    code: 'JPY',
	    symbol: '¥',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'KES',
	    symbol: 'S',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'KGS',
	    symbol: 'сом',
	    thousandsSeparator: ' ',
	    decimalSeparator: '-',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'KHR',
	    symbol: '៛',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'KMF',
	    symbol: 'CF',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'KPW',
	    symbol: '₩',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'KRW',
	    symbol: '₩',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'KWD',
	    symbol: 'د.ك.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 3
	  },
	  {
	    code: 'KYD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'KZT',
	    symbol: '₸',
	    thousandsSeparator: ' ',
	    decimalSeparator: '-',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'LAK',
	    symbol: '₭',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'LBP',
	    symbol: 'ل.ل.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'LKR',
	    symbol: '₨',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 0
	  },
	  {
	    code: 'LRD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'LSL',
	    symbol: 'M',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'LYD',
	    symbol: 'د.ل.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 3
	  },
	  {
	    code: 'MAD',
	    symbol: 'د.م.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'MDL',
	    symbol: 'lei',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'MGA',
	    symbol: 'Ar',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'MKD',
	    symbol: 'ден.',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'MMK',
	    symbol: 'K',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'MNT',
	    symbol: '₮',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'MOP',
	    symbol: 'MOP$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'MRO',
	    symbol: 'UM',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'MUR',
	    symbol: '₨',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'MVR',
	    symbol: 'MVR',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 1
	  },
	  {
	    code: 'MWK',
	    symbol: 'MK',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'MXN',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'MYR',
	    symbol: 'RM',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'MZN',
	    symbol: 'MT',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'NAD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'NGN',
	    symbol: '₦',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'NIO',
	    symbol: 'C$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'NOK',
	    symbol: 'kr',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'NPR',
	    symbol: '₨',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'NZD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'OMR',
	    symbol: '﷼',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 3
	  },
	  {
	    code: 'PAB',
	    symbol: 'B/.',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'PEN',
	    symbol: 'S/.',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'PGK',
	    symbol: 'K',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'PHP',
	    symbol: '₱',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'PKR',
	    symbol: '₨',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'PLN',
	    symbol: 'zł',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'PYG',
	    symbol: '₲',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'QAR',
	    symbol: '﷼',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'RON',
	    symbol: 'lei',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'RSD',
	    symbol: 'Дин.',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'RUB',
	    symbol: '₽',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'RWF',
	    symbol: 'RWF',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'SAR',
	    symbol: '﷼',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'SBD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SCR',
	    symbol: '₨',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SDD',
	    symbol: 'LSd',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SDG',
	    symbol: '£‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SEK',
	    symbol: 'kr',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'SGD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SHP',
	    symbol: '£',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SLL',
	    symbol: 'Le',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SOS',
	    symbol: 'S',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SRD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'STD',
	    symbol: 'Db',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'SYP',
	    symbol: '£',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'SZL',
	    symbol: 'E',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'THB',
	    symbol: '฿',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'TJS',
	    symbol: 'TJS',
	    thousandsSeparator: ' ',
	    decimalSeparator: ';',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'TMT',
	    symbol: 'm',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'TND',
	    symbol: 'د.ت.‏',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 3
	  },
	  {
	    code: 'TOP',
	    symbol: 'T$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'TRY',
	    symbol: 'TL',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'TTD',
	    symbol: 'TT$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'TVD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'TWD',
	    symbol: 'NT$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'TZS',
	    symbol: 'TSh',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'UAH',
	    symbol: '₴',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'UGX',
	    symbol: 'USh',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'USD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'UYU',
	    symbol: '$U',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'UZS',
	    symbol: 'сўм',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'VEB',
	    symbol: 'Bs.',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'VEF',
	    symbol: 'Bs. F.',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'VND',
	    symbol: '₫',
	    thousandsSeparator: '.',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 1
	  },
	  {
	    code: 'VUV',
	    symbol: 'VT',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 0
	  },
	  {
	    code: 'WST',
	    symbol: 'WS$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'XAF',
	    symbol: 'F',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'XCD',
	    symbol: '$',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'XOF',
	    symbol: 'F',
	    thousandsSeparator: ' ',
	    decimalSeparator: ',',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'XPF',
	    symbol: 'F',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: false,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  },
	  {
	    code: 'YER',
	    symbol: '﷼',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'ZAR',
	    symbol: 'R',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: true,
	    decimalDigits: 2
	  },
	  {
	    code: 'ZMW',
	    symbol: 'ZK',
	    thousandsSeparator: ',',
	    decimalSeparator: '.',
	    symbolOnLeft: true,
	    spaceBetweenAmountAndSymbol: false,
	    decimalDigits: 2
	  }
	]


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * accounting.js v0.4.1
	 * Copyright 2014 Open Exchange Rates
	 *
	 * Freely distributable under the MIT license.
	 * Portions of accounting.js are inspired or borrowed from underscore.js
	 *
	 * Full details and documentation:
	 * http://openexchangerates.github.io/accounting.js/
	 */
	
	(function(root, undefined) {
	
		/* --- Setup --- */
	
		// Create the local library object, to be exported or referenced globally later
		var lib = {};
	
		// Current version
		lib.version = '0.4.1';
	
	
		/* --- Exposed settings --- */
	
		// The library's settings configuration object. Contains default parameters for
		// currency and number formatting
		lib.settings = {
			currency: {
				symbol : "$",		// default currency symbol is '$'
				format : "%s%v",	// controls output: %s = symbol, %v = value (can be object, see docs)
				decimal : ".",		// decimal point separator
				thousand : ",",		// thousands separator
				precision : 2,		// decimal places
				grouping : 3		// digit grouping (not implemented yet)
			},
			number: {
				precision : 0,		// default precision on numbers is 0
				grouping : 3,		// digit grouping (not implemented yet)
				thousand : ",",
				decimal : "."
			}
		};
	
	
		/* --- Internal Helper Methods --- */
	
		// Store reference to possibly-available ECMAScript 5 methods for later
		var nativeMap = Array.prototype.map,
			nativeIsArray = Array.isArray,
			toString = Object.prototype.toString;
	
		/**
		 * Tests whether supplied parameter is a string
		 * from underscore.js
		 */
		function isString(obj) {
			return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
		}
	
		/**
		 * Tests whether supplied parameter is a string
		 * from underscore.js, delegates to ECMA5's native Array.isArray
		 */
		function isArray(obj) {
			return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
		}
	
		/**
		 * Tests whether supplied parameter is a true object
		 */
		function isObject(obj) {
			return obj && toString.call(obj) === '[object Object]';
		}
	
		/**
		 * Extends an object with a defaults object, similar to underscore's _.defaults
		 *
		 * Used for abstracting parameter handling from API methods
		 */
		function defaults(object, defs) {
			var key;
			object = object || {};
			defs = defs || {};
			// Iterate over object non-prototype properties:
			for (key in defs) {
				if (defs.hasOwnProperty(key)) {
					// Replace values with defaults only if undefined (allow empty/zero values):
					if (object[key] == null) object[key] = defs[key];
				}
			}
			return object;
		}
	
		/**
		 * Implementation of `Array.map()` for iteration loops
		 *
		 * Returns a new Array as a result of calling `iterator` on each array value.
		 * Defers to native Array.map if available
		 */
		function map(obj, iterator, context) {
			var results = [], i, j;
	
			if (!obj) return results;
	
			// Use native .map method if it exists:
			if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
	
			// Fallback for native .map:
			for (i = 0, j = obj.length; i < j; i++ ) {
				results[i] = iterator.call(context, obj[i], i, obj);
			}
			return results;
		}
	
		/**
		 * Check and normalise the value of precision (must be positive integer)
		 */
		function checkPrecision(val, base) {
			val = Math.round(Math.abs(val));
			return isNaN(val)? base : val;
		}
	
	
		/**
		 * Parses a format string or object and returns format obj for use in rendering
		 *
		 * `format` is either a string with the default (positive) format, or object
		 * containing `pos` (required), `neg` and `zero` values (or a function returning
		 * either a string or object)
		 *
		 * Either string or format.pos must contain "%v" (value) to be valid
		 */
		function checkCurrencyFormat(format) {
			var defaults = lib.settings.currency.format;
	
			// Allow function as format parameter (should return string or object):
			if ( typeof format === "function" ) format = format();
	
			// Format can be a string, in which case `value` ("%v") must be present:
			if ( isString( format ) && format.match("%v") ) {
	
				// Create and return positive, negative and zero formats:
				return {
					pos : format,
					neg : format.replace("-", "").replace("%v", "-%v"),
					zero : format
				};
	
			// If no format, or object is missing valid positive value, use defaults:
			} else if ( !format || !format.pos || !format.pos.match("%v") ) {
	
				// If defaults is a string, casts it to an object for faster checking next time:
				return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
					pos : defaults,
					neg : defaults.replace("%v", "-%v"),
					zero : defaults
				};
	
			}
			// Otherwise, assume format was fine:
			return format;
		}
	
	
		/* --- API Methods --- */
	
		/**
		 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
		 * Alias: `accounting.parse(string)`
		 *
		 * Decimal must be included in the regular expression to match floats (defaults to
		 * accounting.settings.number.decimal), so if the number uses a non-standard decimal 
		 * separator, provide it as the second argument.
		 *
		 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
		 *
		 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
		 */
		var unformat = lib.unformat = lib.parse = function(value, decimal) {
			// Recursively unformat arrays:
			if (isArray(value)) {
				return map(value, function(val) {
					return unformat(val, decimal);
				});
			}
	
			// Fails silently (need decent errors):
			value = value || 0;
	
			// Return the value as-is if it's already a number:
			if (typeof value === "number") return value;
	
			// Default decimal point comes from settings, but could be set to eg. "," in opts:
			decimal = decimal || lib.settings.number.decimal;
	
			 // Build regex to strip out everything except digits, decimal point and minus sign:
			var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
				unformatted = parseFloat(
					("" + value)
					.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
					.replace(regex, '')         // strip out any cruft
					.replace(decimal, '.')      // make sure decimal point is standard
				);
	
			// This will fail silently which may cause trouble, let's wait and see:
			return !isNaN(unformatted) ? unformatted : 0;
		};
	
	
		/**
		 * Implementation of toFixed() that treats floats more like decimals
		 *
		 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
		 * problems for accounting- and finance-related software.
		 */
		var toFixed = lib.toFixed = function(value, precision) {
			precision = checkPrecision(precision, lib.settings.number.precision);
			var power = Math.pow(10, precision);
	
			// Multiply up by precision, round accurately, then divide and use native toFixed():
			return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
		};
	
	
		/**
		 * Format a number, with comma-separated thousands and custom precision/decimal places
		 * Alias: `accounting.format()`
		 *
		 * Localise by overriding the precision and thousand / decimal separators
		 * 2nd parameter `precision` can be an object matching `settings.number`
		 */
		var formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
			// Resursively format arrays:
			if (isArray(number)) {
				return map(number, function(val) {
					return formatNumber(val, precision, thousand, decimal);
				});
			}
	
			// Clean up number:
			number = unformat(number);
	
			// Build options object from second param (if object) or all params, extending defaults:
			var opts = defaults(
					(isObject(precision) ? precision : {
						precision : precision,
						thousand : thousand,
						decimal : decimal
					}),
					lib.settings.number
				),
	
				// Clean up precision
				usePrecision = checkPrecision(opts.precision),
	
				// Do some calc:
				negative = number < 0 ? "-" : "",
				base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
				mod = base.length > 3 ? base.length % 3 : 0;
	
			// Format the number:
			return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
		};
	
	
		/**
		 * Format a number into currency
		 *
		 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
		 * defaults: (0, "$", 2, ",", ".", "%s%v")
		 *
		 * Localise by overriding the symbol, precision, thousand / decimal separators and format
		 * Second param can be an object matching `settings.currency` which is the easiest way.
		 *
		 * To do: tidy up the parameters
		 */
		var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
			// Resursively format arrays:
			if (isArray(number)) {
				return map(number, function(val){
					return formatMoney(val, symbol, precision, thousand, decimal, format);
				});
			}
	
			// Clean up number:
			number = unformat(number);
	
			// Build options object from second param (if object) or all params, extending defaults:
			var opts = defaults(
					(isObject(symbol) ? symbol : {
						symbol : symbol,
						precision : precision,
						thousand : thousand,
						decimal : decimal,
						format : format
					}),
					lib.settings.currency
				),
	
				// Check format (returns object with pos, neg and zero):
				formats = checkCurrencyFormat(opts.format),
	
				// Choose which format to use for this value:
				useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;
	
			// Return with currency symbol added:
			return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
		};
	
	
		/**
		 * Format a list of numbers into an accounting column, padding with whitespace
		 * to line up currency symbols, thousand separators and decimals places
		 *
		 * List should be an array of numbers
		 * Second parameter can be an object containing keys that match the params
		 *
		 * Returns array of accouting-formatted number strings of same length
		 *
		 * NB: `white-space:pre` CSS rule is required on the list container to prevent
		 * browsers from collapsing the whitespace in the output strings.
		 */
		lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
			if (!list) return [];
	
			// Build options object from second param (if object) or all params, extending defaults:
			var opts = defaults(
					(isObject(symbol) ? symbol : {
						symbol : symbol,
						precision : precision,
						thousand : thousand,
						decimal : decimal,
						format : format
					}),
					lib.settings.currency
				),
	
				// Check format (returns object with pos, neg and zero), only need pos for now:
				formats = checkCurrencyFormat(opts.format),
	
				// Whether to pad at start of string or after currency symbol:
				padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,
	
				// Store value for the length of the longest string in the column:
				maxLength = 0,
	
				// Format the list according to options, store the length of the longest string:
				formatted = map(list, function(val, i) {
					if (isArray(val)) {
						// Recursively format columns if list is a multi-dimensional array:
						return lib.formatColumn(val, opts);
					} else {
						// Clean up the value
						val = unformat(val);
	
						// Choose which format to use for this value (pos, neg or zero):
						var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,
	
							// Format this value, push into formatted list and save the length:
							fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));
	
						if (fVal.length > maxLength) maxLength = fVal.length;
						return fVal;
					}
				});
	
			// Pad each number in the list and send back the column of numbers:
			return map(formatted, function(val, i) {
				// Only if this is a string (not a nested array, which would have already been padded):
				if (isString(val) && val.length < maxLength) {
					// Depending on symbol position, pad after symbol or at index 0:
					return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
				}
				return val;
			});
		};
	
	
		/* --- Module Definition --- */
	
		// Export accounting for CommonJS. If being loaded as an AMD module, define it as such.
		// Otherwise, just add `accounting` to the global object
		if (true) {
			if (typeof module !== 'undefined' && module.exports) {
				exports = module.exports = lib;
			}
			exports.accounting = lib;
		} else if (typeof define === 'function' && define.amd) {
			// Return the library as an AMD module:
			define([], function() {
				return lib;
			});
		} else {
			// Use accounting.noConflict to restore `accounting` back to its original value.
			// Returns a reference to the library's `accounting` object;
			// e.g. `var numbers = accounting.noConflict();`
			lib.noConflict = (function(oldAccounting) {
				return function() {
					// Reset the value of the root's `accounting` variable:
					root.accounting = oldAccounting;
					// Delete the noConflict method:
					lib.noConflict = undefined;
					// Return reference to the library to re-assign it:
					return lib;
				};
			})(root.accounting);
	
			// Declare `fx` on the root (global/window) object:
			root['accounting'] = lib;
		}
	
		// Root will be `window` in browser or `global` on the server:
	}(this));


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	var baseEach = __webpack_require__(255),
	    baseFind = __webpack_require__(256),
	    baseFindIndex = __webpack_require__(257),
	    baseIteratee = __webpack_require__(258);
	
	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	function find(collection, predicate) {
	  predicate = baseIteratee(predicate, 3);
	  if (isArray(collection)) {
	    var index = baseFindIndex(collection, predicate);
	    return index > -1 ? collection[index] : undefined;
	  }
	  return baseFind(collection, predicate, baseEach);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = find;


/***/ },
/* 255 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    stringTag = '[object String]';
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf,
	    nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototype(object) === null);
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseEach;


/***/ },
/* 256 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	 * without support for callback shorthands and `this` binding, which iterates
	 * over `collection` using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element
	 *  instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function(value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}
	
	module.exports = baseFind;


/***/ },
/* 257 */
/***/ function(module, exports) {

	/**
	 * lodash 3.6.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	var stringToPath = __webpack_require__(259);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();
	
	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}
	
	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	/**
	 * Converts `set` to its value-value pairs.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the value-value pairs.
	 */
	function setToPairs(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = [value, value];
	  });
	  return result;
	}
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/** Built-in value references. */
	var Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf,
	    nativeKeys = Object.keys;
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}
	
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}
	
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
	    cache = this.__data__ = new MapCache(cache.__data__);
	  }
	  cache.set(key, value);
	  return this;
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototype(object) === null);
	}
	
	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	/**
	 * Creates a `_.toPairs` or `_.toPairsIn` function.
	 *
	 * @private
	 * @param {Function} keysFunc The function to get the keys of a given object.
	 * @returns {Function} Returns the new pairs function.
	 */
	function createToPairs(keysFunc) {
	  return function(object) {
	    var tag = getTag(object);
	    if (tag == mapTag) {
	      return mapToArray(object);
	    }
	    if (tag == setTag) {
	      return setToPairs(object);
	    }
	    return baseToPairs(object, keysFunc(object));
	  };
	}
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);
	
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;
	
	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var result,
	      index = -1,
	      length = path.length;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isString(object) || isArguments(object));
	}
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Creates an array of own enumerable string keyed-value pairs for `object`
	 * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
	 * entries are returned.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias entries
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	var toPairs = createToPairs(keys);
	
	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = baseIteratee;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(150)(module), (function() { return this; }())))

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	var baseToString = __webpack_require__(260);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();
	
	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map'),
	    nativeCreate = getNative(Object, 'create');
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = stringToPath;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(150)(module), (function() { return this; }())))

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();
	
	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = baseToString;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(150)(module), (function() { return this; }())))

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * numeral.js
	 * version : 1.5.3
	 * author : Adam Draper
	 * license : MIT
	 * http://adamwdraper.github.com/Numeral-js/
	 */
	
	(function () {
	
	    /************************************
	        Constants
	    ************************************/
	
	    var numeral,
	        VERSION = '1.5.3',
	        // internal storage for language config files
	        languages = {},
	        currentLanguage = 'en',
	        zeroFormat = null,
	        defaultFormat = '0,0',
	        // check for nodeJS
	        hasModule = (typeof module !== 'undefined' && module.exports);
	
	
	    /************************************
	        Constructors
	    ************************************/
	
	
	    // Numeral prototype object
	    function Numeral (number) {
	        this._value = number;
	    }
	
	    /**
	     * Implementation of toFixed() that treats floats more like decimals
	     *
	     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	     * problems for accounting- and finance-related software.
	     */
	    function toFixed (value, precision, roundingFunction, optionals) {
	        var power = Math.pow(10, precision),
	            optionalsRegExp,
	            output;
	            
	        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
	        // Multiply up by precision, round accurately, then divide and use native toFixed():
	        output = (roundingFunction(value * power) / power).toFixed(precision);
	
	        if (optionals) {
	            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
	            output = output.replace(optionalsRegExp, '');
	        }
	
	        return output;
	    }
	
	    /************************************
	        Formatting
	    ************************************/
	
	    // determine what type of formatting we need to do
	    function formatNumeral (n, format, roundingFunction) {
	        var output;
	
	        // figure out what kind of format we are dealing with
	        if (format.indexOf('$') > -1) { // currency!!!!!
	            output = formatCurrency(n, format, roundingFunction);
	        } else if (format.indexOf('%') > -1) { // percentage
	            output = formatPercentage(n, format, roundingFunction);
	        } else if (format.indexOf(':') > -1) { // time
	            output = formatTime(n, format);
	        } else { // plain ol' numbers or bytes
	            output = formatNumber(n._value, format, roundingFunction);
	        }
	
	        // return string
	        return output;
	    }
	
	    // revert to number
	    function unformatNumeral (n, string) {
	        var stringOriginal = string,
	            thousandRegExp,
	            millionRegExp,
	            billionRegExp,
	            trillionRegExp,
	            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            bytesMultiplier = false,
	            power;
	
	        if (string.indexOf(':') > -1) {
	            n._value = unformatTime(string);
	        } else {
	            if (string === zeroFormat) {
	                n._value = 0;
	            } else {
	                if (languages[currentLanguage].delimiters.decimal !== '.') {
	                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
	                }
	
	                // see if abbreviations are there so that we can multiply to the correct number
	                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	
	                // see if bytes are there so that we can multiply to the correct number
	                for (power = 0; power <= suffixes.length; power++) {
	                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;
	
	                    if (bytesMultiplier) {
	                        break;
	                    }
	                }
	
	                // do some math to create our number
	                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));
	
	                // round if we are talking about bytes
	                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
	            }
	        }
	        return n._value;
	    }
	
	    function formatCurrency (n, format, roundingFunction) {
	        var symbolIndex = format.indexOf('$'),
	            openParenIndex = format.indexOf('('),
	            minusSignIndex = format.indexOf('-'),
	            space = '',
	            spliceIndex,
	            output;
	
	        // check for space before or after currency
	        if (format.indexOf(' $') > -1) {
	            space = ' ';
	            format = format.replace(' $', '');
	        } else if (format.indexOf('$ ') > -1) {
	            space = ' ';
	            format = format.replace('$ ', '');
	        } else {
	            format = format.replace('$', '');
	        }
	
	        // format the number
	        output = formatNumber(n._value, format, roundingFunction);
	
	        // position the symbol
	        if (symbolIndex <= 1) {
	            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
	                output = output.split('');
	                spliceIndex = 1;
	                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
	                    // the symbol appears before the "(" or "-"
	                    spliceIndex = 0;
	                }
	                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
	                output = output.join('');
	            } else {
	                output = languages[currentLanguage].currency.symbol + space + output;
	            }
	        } else {
	            if (output.indexOf(')') > -1) {
	                output = output.split('');
	                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
	                output = output.join('');
	            } else {
	                output = output + space + languages[currentLanguage].currency.symbol;
	            }
	        }
	
	        return output;
	    }
	
	    function formatPercentage (n, format, roundingFunction) {
	        var space = '',
	            output,
	            value = n._value * 100;
	
	        // check for space before %
	        if (format.indexOf(' %') > -1) {
	            space = ' ';
	            format = format.replace(' %', '');
	        } else {
	            format = format.replace('%', '');
	        }
	
	        output = formatNumber(value, format, roundingFunction);
	        
	        if (output.indexOf(')') > -1 ) {
	            output = output.split('');
	            output.splice(-1, 0, space + '%');
	            output = output.join('');
	        } else {
	            output = output + space + '%';
	        }
	
	        return output;
	    }
	
	    function formatTime (n) {
	        var hours = Math.floor(n._value/60/60),
	            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
	            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
	        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
	    }
	
	    function unformatTime (string) {
	        var timeArray = string.split(':'),
	            seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	            // minutes
	            seconds = seconds + (Number(timeArray[1]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        } else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + (Number(timeArray[0]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }
	
	    function formatNumber (value, format, roundingFunction) {
	        var negP = false,
	            signed = false,
	            optDec = false,
	            abbr = '',
	            abbrK = false, // force abbreviation to thousands
	            abbrM = false, // force abbreviation to millions
	            abbrB = false, // force abbreviation to billions
	            abbrT = false, // force abbreviation to trillions
	            abbrForce = false, // force abbreviation
	            bytes = '',
	            ord = '',
	            abs = Math.abs(value),
	            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            min,
	            max,
	            power,
	            w,
	            precision,
	            thousands,
	            d = '',
	            neg = false;
	
	        // check if number is zero and a custom zero format has been set
	        if (value === 0 && zeroFormat !== null) {
	            return zeroFormat;
	        } else {
	            // see if we should use parentheses for negative number or if we should prefix with a sign
	            // if both are present we default to parentheses
	            if (format.indexOf('(') > -1) {
	                negP = true;
	                format = format.slice(1, -1);
	            } else if (format.indexOf('+') > -1) {
	                signed = true;
	                format = format.replace(/\+/g, '');
	            }
	
	            // see if abbreviation is wanted
	            if (format.indexOf('a') > -1) {
	                // check if abbreviation is specified
	                abbrK = format.indexOf('aK') >= 0;
	                abbrM = format.indexOf('aM') >= 0;
	                abbrB = format.indexOf('aB') >= 0;
	                abbrT = format.indexOf('aT') >= 0;
	                abbrForce = abbrK || abbrM || abbrB || abbrT;
	
	                // check for space before abbreviation
	                if (format.indexOf(' a') > -1) {
	                    abbr = ' ';
	                    format = format.replace(' a', '');
	                } else {
	                    format = format.replace('a', '');
	                }
	
	                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
	                    // trillion
	                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
	                    value = value / Math.pow(10, 12);
	                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
	                    // billion
	                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
	                    value = value / Math.pow(10, 9);
	                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
	                    // million
	                    abbr = abbr + languages[currentLanguage].abbreviations.million;
	                    value = value / Math.pow(10, 6);
	                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
	                    // thousand
	                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
	                    value = value / Math.pow(10, 3);
	                }
	            }
	
	            // see if we are formatting bytes
	            if (format.indexOf('b') > -1) {
	                // check for space before
	                if (format.indexOf(' b') > -1) {
	                    bytes = ' ';
	                    format = format.replace(' b', '');
	                } else {
	                    format = format.replace('b', '');
	                }
	
	                for (power = 0; power <= suffixes.length; power++) {
	                    min = Math.pow(1024, power);
	                    max = Math.pow(1024, power+1);
	
	                    if (value >= min && value < max) {
	                        bytes = bytes + suffixes[power];
	                        if (min > 0) {
	                            value = value / min;
	                        }
	                        break;
	                    }
	                }
	            }
	
	            // see if ordinal is wanted
	            if (format.indexOf('o') > -1) {
	                // check for space before
	                if (format.indexOf(' o') > -1) {
	                    ord = ' ';
	                    format = format.replace(' o', '');
	                } else {
	                    format = format.replace('o', '');
	                }
	
	                ord = ord + languages[currentLanguage].ordinal(value);
	            }
	
	            if (format.indexOf('[.]') > -1) {
	                optDec = true;
	                format = format.replace('[.]', '.');
	            }
	
	            w = value.toString().split('.')[0];
	            precision = format.split('.')[1];
	            thousands = format.indexOf(',');
	
	            if (precision) {
	                if (precision.indexOf('[') > -1) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
	                } else {
	                    d = toFixed(value, precision.length, roundingFunction);
	                }
	
	                w = d.split('.')[0];
	
	                if (d.split('.')[1].length) {
	                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
	                } else {
	                    d = '';
	                }
	
	                if (optDec && Number(d.slice(1)) === 0) {
	                    d = '';
	                }
	            } else {
	                w = toFixed(value, null, roundingFunction);
	            }
	
	            // format number
	            if (w.indexOf('-') > -1) {
	                w = w.slice(1);
	                neg = true;
	            }
	
	            if (thousands > -1) {
	                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
	            }
	
	            if (format.indexOf('.') === 0) {
	                w = '';
	            }
	
	            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
	        }
	    }
	
	    /************************************
	        Top Level Functions
	    ************************************/
	
	    numeral = function (input) {
	        if (numeral.isNumeral(input)) {
	            input = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            input = 0;
	        } else if (!Number(input)) {
	            input = numeral.fn.unformat(input);
	        }
	
	        return new Numeral(Number(input));
	    };
	
	    // version number
	    numeral.version = VERSION;
	
	    // compare numeral object
	    numeral.isNumeral = function (obj) {
	        return obj instanceof Numeral;
	    };
	
	    // This function will load languages and then set the global language.  If
	    // no arguments are passed in, it will simply return the current global
	    // language key.
	    numeral.language = function (key, values) {
	        if (!key) {
	            return currentLanguage;
	        }
	
	        if (key && !values) {
	            if(!languages[key]) {
	                throw new Error('Unknown language : ' + key);
	            }
	            currentLanguage = key;
	        }
	
	        if (values || !languages[key]) {
	            loadLanguage(key, values);
	        }
	
	        return numeral;
	    };
	    
	    // This function provides access to the loaded language data.  If
	    // no arguments are passed in, it will simply return the current
	    // global language object.
	    numeral.languageData = function (key) {
	        if (!key) {
	            return languages[currentLanguage];
	        }
	        
	        if (!languages[key]) {
	            throw new Error('Unknown language : ' + key);
	        }
	        
	        return languages[key];
	    };
	
	    numeral.language('en', {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            var b = number % 10;
	            return (~~ (number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '$'
	        }
	    });
	
	    numeral.zeroFormat = function (format) {
	        zeroFormat = typeof(format) === 'string' ? format : null;
	    };
	
	    numeral.defaultFormat = function (format) {
	        defaultFormat = typeof(format) === 'string' ? format : '0.0';
	    };
	
	    /************************************
	        Helpers
	    ************************************/
	
	    function loadLanguage(key, values) {
	        languages[key] = values;
	    }
	
	    /************************************
	        Floating-point helpers
	    ************************************/
	
	    // The floating-point helper functions and implementation
	    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/
	
	    /**
	     * Array.prototype.reduce for browsers that don't support it
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
	     */
	    if ('function' !== typeof Array.prototype.reduce) {
	        Array.prototype.reduce = function (callback, opt_initialValue) {
	            'use strict';
	            
	            if (null === this || 'undefined' === typeof this) {
	                // At the moment all modern browsers, that support strict mode, have
	                // native implementation of Array.prototype.reduce. For instance, IE8
	                // does not support strict mode, so this check is actually useless.
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }
	            
	            if ('function' !== typeof callback) {
	                throw new TypeError(callback + ' is not a function');
	            }
	
	            var index,
	                value,
	                length = this.length >>> 0,
	                isValueSet = false;
	
	            if (1 < arguments.length) {
	                value = opt_initialValue;
	                isValueSet = true;
	            }
	
	            for (index = 0; length > index; ++index) {
	                if (this.hasOwnProperty(index)) {
	                    if (isValueSet) {
	                        value = callback(value, this[index], index, this);
	                    } else {
	                        value = this[index];
	                        isValueSet = true;
	                    }
	                }
	            }
	
	            if (!isValueSet) {
	                throw new TypeError('Reduce of empty array with no initial value');
	            }
	
	            return value;
	        };
	    }
	
	    
	    /**
	     * Computes the multiplier necessary to make x >= 1,
	     * effectively eliminating miscalculations caused by
	     * finite precision.
	     */
	    function multiplier(x) {
	        var parts = x.toString().split('.');
	        if (parts.length < 2) {
	            return 1;
	        }
	        return Math.pow(10, parts[1].length);
	    }
	
	    /**
	     * Given a variable number of arguments, returns the maximum
	     * multiplier that must be used to normalize an operation involving
	     * all of them.
	     */
	    function correctionFactor() {
	        var args = Array.prototype.slice.call(arguments);
	        return args.reduce(function (prev, next) {
	            var mp = multiplier(prev),
	                mn = multiplier(next);
	        return mp > mn ? mp : mn;
	        }, -Infinity);
	    }        
	
	
	    /************************************
	        Numeral Prototype
	    ************************************/
	
	
	    numeral.fn = Numeral.prototype = {
	
	        clone : function () {
	            return numeral(this);
	        },
	
	        format : function (inputString, roundingFunction) {
	            return formatNumeral(this, 
	                  inputString ? inputString : defaultFormat, 
	                  (roundingFunction !== undefined) ? roundingFunction : Math.round
	              );
	        },
	
	        unformat : function (inputString) {
	            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
	                return inputString; 
	            }
	            return unformatNumeral(this, inputString ? inputString : defaultFormat);
	        },
	
	        value : function () {
	            return this._value;
	        },
	
	        valueOf : function () {
	            return this._value;
	        },
	
	        set : function (value) {
	            this._value = Number(value);
	            return this;
	        },
	
	        add : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum + corrFactor * curr;
	            }
	            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
	            return this;
	        },
	
	        subtract : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum - corrFactor * curr;
	            }
	            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
	            return this;
	        },
	
	        multiply : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) * (curr * corrFactor) /
	                    (corrFactor * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback, 1);
	            return this;
	        },
	
	        divide : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) / (curr * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback);            
	            return this;
	        },
	
	        difference : function (value) {
	            return Math.abs(numeral(this._value).subtract(value).value());
	        }
	
	    };
	
	    /************************************
	        Exposing Numeral
	    ************************************/
	
	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = numeral;
	    }
	
	    /*global ender:false */
	    if (typeof ender === 'undefined') {
	        // here, `this` means `window` in the browser, or `global` on the server
	        // add `numeral` as a global object via a string identifier,
	        // for Closure Compiler 'advanced' mode
	        this['numeral'] = numeral;
	    }
	
	    /*global define:false */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return numeral;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}).call(this);


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _tv = __webpack_require__(263);
	
	var _tv2 = _interopRequireDefault(_tv);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * JSON Schema functions
	 */
	
	var SchemaUtils = function () {
	  function SchemaUtils() {
	    (0, _classCallCheck3.default)(this, SchemaUtils);
	  }
	
	  (0, _createClass3.default)(SchemaUtils, null, [{
	    key: 'validateSchema',
	
	    /**
	     * Validate the payment object with JSON-Schema
	     *
	     * Look at /schema/donation.js to see the required fields for a donation
	     * object.
	     *
	     * @param {Object} target - object to validate
	     * @param {Object} [schema] - JSON schema object
	     * @return {Array<object>}
	     */
	    value: function validateSchema(target, schema) {
	      var ret = [];
	      var validate = _tv2.default.validateMultiple(target, schema);
	
	      if (!validate.valid) {
	        ret = validate.errors;
	      }
	
	      return ret;
	    }
	
	    /**
	     * Find the correct field name of the invalid item based on error
	     * codes
	     *
	     * @param {Object} err - Schema Validation error object
	     * @return {String}
	     */
	
	  }, {
	    key: 'extractFieldByError',
	    value: function extractFieldByError(err) {
	      switch (err.code) {
	        case 0:
	          // type error
	          return err.dataPath.replace('/', '');
	
	        case 302:
	          // required missing
	          return err.params.key;
	
	        default:
	          // default
	          return err.schemaPath;
	      }
	    }
	  }]);
	  return SchemaUtils;
	}();
	
	exports.default = SchemaUtils;

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	Author: Geraint Luff and others
	Year: 2013
	
	This code is released into the "public domain" by its author(s).  Anybody may use, alter and distribute the code without restriction.  The author makes no guarantees, and takes no liability of any kind for use of this code.
	
	If you find a bug or make an improvement, it would be courteous to let the author know, but it is not compulsory.
	*/
	(function (global, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && module.exports){
	    // CommonJS. Define export.
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.tv4 = factory();
	  }
	}(this, function () {
	
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FObject%2Fkeys
	if (!Object.keys) {
		Object.keys = (function () {
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;
	
			return function (obj) {
				if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
					throw new TypeError('Object.keys called on non-object');
				}
	
				var result = [];
	
				for (var prop in obj) {
					if (hasOwnProperty.call(obj, prop)) {
						result.push(prop);
					}
				}
	
				if (hasDontEnumBug) {
					for (var i=0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
						}
					}
				}
				return result;
			};
		})();
	}
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	if (!Object.create) {
		Object.create = (function(){
			function F(){}
	
			return function(o){
				if (arguments.length !== 1) {
					throw new Error('Object.create implementation only accepts one parameter.');
				}
				F.prototype = o;
				return new F();
			};
		})();
	}
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FisArray
	if(!Array.isArray) {
		Array.isArray = function (vArg) {
			return Object.prototype.toString.call(vArg) === "[object Array]";
		};
	}
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FindexOf
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
			if (this === null) {
				throw new TypeError();
			}
			var t = Object(this);
			var len = t.length >>> 0;
	
			if (len === 0) {
				return -1;
			}
			var n = 0;
			if (arguments.length > 1) {
				n = Number(arguments[1]);
				if (n !== n) { // shortcut for verifying if it's NaN
					n = 0;
				} else if (n !== 0 && n !== Infinity && n !== -Infinity) {
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}
			if (n >= len) {
				return -1;
			}
			var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
			for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		};
	}
	
	// Grungey Object.isFrozen hack
	if (!Object.isFrozen) {
		Object.isFrozen = function (obj) {
			var key = "tv4_test_frozen_key";
			while (obj.hasOwnProperty(key)) {
				key += Math.random();
			}
			try {
				obj[key] = true;
				delete obj[key];
				return false;
			} catch (e) {
				return true;
			}
		};
	}
	// Based on: https://github.com/geraintluff/uri-templates, but with all the de-substitution stuff removed
	
	var uriTemplateGlobalModifiers = {
		"+": true,
		"#": true,
		".": true,
		"/": true,
		";": true,
		"?": true,
		"&": true
	};
	var uriTemplateSuffices = {
		"*": true
	};
	
	function notReallyPercentEncode(string) {
		return encodeURI(string).replace(/%25[0-9][0-9]/g, function (doubleEncoded) {
			return "%" + doubleEncoded.substring(3);
		});
	}
	
	function uriTemplateSubstitution(spec) {
		var modifier = "";
		if (uriTemplateGlobalModifiers[spec.charAt(0)]) {
			modifier = spec.charAt(0);
			spec = spec.substring(1);
		}
		var separator = "";
		var prefix = "";
		var shouldEscape = true;
		var showVariables = false;
		var trimEmptyString = false;
		if (modifier === '+') {
			shouldEscape = false;
		} else if (modifier === ".") {
			prefix = ".";
			separator = ".";
		} else if (modifier === "/") {
			prefix = "/";
			separator = "/";
		} else if (modifier === '#') {
			prefix = "#";
			shouldEscape = false;
		} else if (modifier === ';') {
			prefix = ";";
			separator = ";";
			showVariables = true;
			trimEmptyString = true;
		} else if (modifier === '?') {
			prefix = "?";
			separator = "&";
			showVariables = true;
		} else if (modifier === '&') {
			prefix = "&";
			separator = "&";
			showVariables = true;
		}
	
		var varNames = [];
		var varList = spec.split(",");
		var varSpecs = [];
		var varSpecMap = {};
		for (var i = 0; i < varList.length; i++) {
			var varName = varList[i];
			var truncate = null;
			if (varName.indexOf(":") !== -1) {
				var parts = varName.split(":");
				varName = parts[0];
				truncate = parseInt(parts[1], 10);
			}
			var suffices = {};
			while (uriTemplateSuffices[varName.charAt(varName.length - 1)]) {
				suffices[varName.charAt(varName.length - 1)] = true;
				varName = varName.substring(0, varName.length - 1);
			}
			var varSpec = {
				truncate: truncate,
				name: varName,
				suffices: suffices
			};
			varSpecs.push(varSpec);
			varSpecMap[varName] = varSpec;
			varNames.push(varName);
		}
		var subFunction = function (valueFunction) {
			var result = "";
			var startIndex = 0;
			for (var i = 0; i < varSpecs.length; i++) {
				var varSpec = varSpecs[i];
				var value = valueFunction(varSpec.name);
				if (value === null || value === undefined || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
					startIndex++;
					continue;
				}
				if (i === startIndex) {
					result += prefix;
				} else {
					result += (separator || ",");
				}
				if (Array.isArray(value)) {
					if (showVariables) {
						result += varSpec.name + "=";
					}
					for (var j = 0; j < value.length; j++) {
						if (j > 0) {
							result += varSpec.suffices['*'] ? (separator || ",") : ",";
							if (varSpec.suffices['*'] && showVariables) {
								result += varSpec.name + "=";
							}
						}
						result += shouldEscape ? encodeURIComponent(value[j]).replace(/!/g, "%21") : notReallyPercentEncode(value[j]);
					}
				} else if (typeof value === "object") {
					if (showVariables && !varSpec.suffices['*']) {
						result += varSpec.name + "=";
					}
					var first = true;
					for (var key in value) {
						if (!first) {
							result += varSpec.suffices['*'] ? (separator || ",") : ",";
						}
						first = false;
						result += shouldEscape ? encodeURIComponent(key).replace(/!/g, "%21") : notReallyPercentEncode(key);
						result += varSpec.suffices['*'] ? '=' : ",";
						result += shouldEscape ? encodeURIComponent(value[key]).replace(/!/g, "%21") : notReallyPercentEncode(value[key]);
					}
				} else {
					if (showVariables) {
						result += varSpec.name;
						if (!trimEmptyString || value !== "") {
							result += "=";
						}
					}
					if (varSpec.truncate != null) {
						value = value.substring(0, varSpec.truncate);
					}
					result += shouldEscape ? encodeURIComponent(value).replace(/!/g, "%21"): notReallyPercentEncode(value);
				}
			}
			return result;
		};
		subFunction.varNames = varNames;
		return {
			prefix: prefix,
			substitution: subFunction
		};
	}
	
	function UriTemplate(template) {
		if (!(this instanceof UriTemplate)) {
			return new UriTemplate(template);
		}
		var parts = template.split("{");
		var textParts = [parts.shift()];
		var prefixes = [];
		var substitutions = [];
		var varNames = [];
		while (parts.length > 0) {
			var part = parts.shift();
			var spec = part.split("}")[0];
			var remainder = part.substring(spec.length + 1);
			var funcs = uriTemplateSubstitution(spec);
			substitutions.push(funcs.substitution);
			prefixes.push(funcs.prefix);
			textParts.push(remainder);
			varNames = varNames.concat(funcs.substitution.varNames);
		}
		this.fill = function (valueFunction) {
			var result = textParts[0];
			for (var i = 0; i < substitutions.length; i++) {
				var substitution = substitutions[i];
				result += substitution(valueFunction);
				result += textParts[i + 1];
			}
			return result;
		};
		this.varNames = varNames;
		this.template = template;
	}
	UriTemplate.prototype = {
		toString: function () {
			return this.template;
		},
		fillFromObject: function (obj) {
			return this.fill(function (varName) {
				return obj[varName];
			});
		}
	};
	var ValidatorContext = function ValidatorContext(parent, collectMultiple, errorReporter, checkRecursive, trackUnknownProperties) {
		this.missing = [];
		this.missingMap = {};
		this.formatValidators = parent ? Object.create(parent.formatValidators) : {};
		this.schemas = parent ? Object.create(parent.schemas) : {};
		this.collectMultiple = collectMultiple;
		this.errors = [];
		this.handleError = collectMultiple ? this.collectError : this.returnError;
		if (checkRecursive) {
			this.checkRecursive = true;
			this.scanned = [];
			this.scannedFrozen = [];
			this.scannedFrozenSchemas = [];
			this.scannedFrozenValidationErrors = [];
			this.validatedSchemasKey = 'tv4_validation_id';
			this.validationErrorsKey = 'tv4_validation_errors_id';
		}
		if (trackUnknownProperties) {
			this.trackUnknownProperties = true;
			this.knownPropertyPaths = {};
			this.unknownPropertyPaths = {};
		}
		this.errorReporter = errorReporter || defaultErrorReporter('en');
		if (typeof this.errorReporter === 'string') {
			throw new Error('debug');
		}
		this.definedKeywords = {};
		if (parent) {
			for (var key in parent.definedKeywords) {
				this.definedKeywords[key] = parent.definedKeywords[key].slice(0);
			}
		}
	};
	ValidatorContext.prototype.defineKeyword = function (keyword, keywordFunction) {
		this.definedKeywords[keyword] = this.definedKeywords[keyword] || [];
		this.definedKeywords[keyword].push(keywordFunction);
	};
	ValidatorContext.prototype.createError = function (code, messageParams, dataPath, schemaPath, subErrors, data, schema) {
		var error = new ValidationError(code, messageParams, dataPath, schemaPath, subErrors);
		error.message = this.errorReporter(error, data, schema);
		return error;
	};
	ValidatorContext.prototype.returnError = function (error) {
		return error;
	};
	ValidatorContext.prototype.collectError = function (error) {
		if (error) {
			this.errors.push(error);
		}
		return null;
	};
	ValidatorContext.prototype.prefixErrors = function (startIndex, dataPath, schemaPath) {
		for (var i = startIndex; i < this.errors.length; i++) {
			this.errors[i] = this.errors[i].prefixWith(dataPath, schemaPath);
		}
		return this;
	};
	ValidatorContext.prototype.banUnknownProperties = function (data, schema) {
		for (var unknownPath in this.unknownPropertyPaths) {
			var error = this.createError(ErrorCodes.UNKNOWN_PROPERTY, {path: unknownPath}, unknownPath, "", null, data, schema);
			var result = this.handleError(error);
			if (result) {
				return result;
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.addFormat = function (format, validator) {
		if (typeof format === 'object') {
			for (var key in format) {
				this.addFormat(key, format[key]);
			}
			return this;
		}
		this.formatValidators[format] = validator;
	};
	ValidatorContext.prototype.resolveRefs = function (schema, urlHistory) {
		if (schema['$ref'] !== undefined) {
			urlHistory = urlHistory || {};
			if (urlHistory[schema['$ref']]) {
				return this.createError(ErrorCodes.CIRCULAR_REFERENCE, {urls: Object.keys(urlHistory).join(', ')}, '', '', null, undefined, schema);
			}
			urlHistory[schema['$ref']] = true;
			schema = this.getSchema(schema['$ref'], urlHistory);
		}
		return schema;
	};
	ValidatorContext.prototype.getSchema = function (url, urlHistory) {
		var schema;
		if (this.schemas[url] !== undefined) {
			schema = this.schemas[url];
			return this.resolveRefs(schema, urlHistory);
		}
		var baseUrl = url;
		var fragment = "";
		if (url.indexOf('#') !== -1) {
			fragment = url.substring(url.indexOf("#") + 1);
			baseUrl = url.substring(0, url.indexOf("#"));
		}
		if (typeof this.schemas[baseUrl] === 'object') {
			schema = this.schemas[baseUrl];
			var pointerPath = decodeURIComponent(fragment);
			if (pointerPath === "") {
				return this.resolveRefs(schema, urlHistory);
			} else if (pointerPath.charAt(0) !== "/") {
				return undefined;
			}
			var parts = pointerPath.split("/").slice(1);
			for (var i = 0; i < parts.length; i++) {
				var component = parts[i].replace(/~1/g, "/").replace(/~0/g, "~");
				if (schema[component] === undefined) {
					schema = undefined;
					break;
				}
				schema = schema[component];
			}
			if (schema !== undefined) {
				return this.resolveRefs(schema, urlHistory);
			}
		}
		if (this.missing[baseUrl] === undefined) {
			this.missing.push(baseUrl);
			this.missing[baseUrl] = baseUrl;
			this.missingMap[baseUrl] = baseUrl;
		}
	};
	ValidatorContext.prototype.searchSchemas = function (schema, url) {
		if (Array.isArray(schema)) {
			for (var i = 0; i < schema.length; i++) {
				this.searchSchemas(schema[i], url);
			}
		} else if (schema && typeof schema === "object") {
			if (typeof schema.id === "string") {
				if (isTrustedUrl(url, schema.id)) {
					if (this.schemas[schema.id] === undefined) {
						this.schemas[schema.id] = schema;
					}
				}
			}
			for (var key in schema) {
				if (key !== "enum") {
					if (typeof schema[key] === "object") {
						this.searchSchemas(schema[key], url);
					} else if (key === "$ref") {
						var uri = getDocumentUri(schema[key]);
						if (uri && this.schemas[uri] === undefined && this.missingMap[uri] === undefined) {
							this.missingMap[uri] = uri;
						}
					}
				}
			}
		}
	};
	ValidatorContext.prototype.addSchema = function (url, schema) {
		//overload
		if (typeof url !== 'string' || typeof schema === 'undefined') {
			if (typeof url === 'object' && typeof url.id === 'string') {
				schema = url;
				url = schema.id;
			}
			else {
				return;
			}
		}
		if (url === getDocumentUri(url) + "#") {
			// Remove empty fragment
			url = getDocumentUri(url);
		}
		this.schemas[url] = schema;
		delete this.missingMap[url];
		normSchema(schema, url);
		this.searchSchemas(schema, url);
	};
	
	ValidatorContext.prototype.getSchemaMap = function () {
		var map = {};
		for (var key in this.schemas) {
			map[key] = this.schemas[key];
		}
		return map;
	};
	
	ValidatorContext.prototype.getSchemaUris = function (filterRegExp) {
		var list = [];
		for (var key in this.schemas) {
			if (!filterRegExp || filterRegExp.test(key)) {
				list.push(key);
			}
		}
		return list;
	};
	
	ValidatorContext.prototype.getMissingUris = function (filterRegExp) {
		var list = [];
		for (var key in this.missingMap) {
			if (!filterRegExp || filterRegExp.test(key)) {
				list.push(key);
			}
		}
		return list;
	};
	
	ValidatorContext.prototype.dropSchemas = function () {
		this.schemas = {};
		this.reset();
	};
	ValidatorContext.prototype.reset = function () {
		this.missing = [];
		this.missingMap = {};
		this.errors = [];
	};
	
	ValidatorContext.prototype.validateAll = function (data, schema, dataPathParts, schemaPathParts, dataPointerPath) {
		var topLevel;
		schema = this.resolveRefs(schema);
		if (!schema) {
			return null;
		} else if (schema instanceof ValidationError) {
			this.errors.push(schema);
			return schema;
		}
	
		var startErrorCount = this.errors.length;
		var frozenIndex, scannedFrozenSchemaIndex = null, scannedSchemasIndex = null;
		if (this.checkRecursive && data && typeof data === 'object') {
			topLevel = !this.scanned.length;
			if (data[this.validatedSchemasKey]) {
				var schemaIndex = data[this.validatedSchemasKey].indexOf(schema);
				if (schemaIndex !== -1) {
					this.errors = this.errors.concat(data[this.validationErrorsKey][schemaIndex]);
					return null;
				}
			}
			if (Object.isFrozen(data)) {
				frozenIndex = this.scannedFrozen.indexOf(data);
				if (frozenIndex !== -1) {
					var frozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].indexOf(schema);
					if (frozenSchemaIndex !== -1) {
						this.errors = this.errors.concat(this.scannedFrozenValidationErrors[frozenIndex][frozenSchemaIndex]);
						return null;
					}
				}
			}
			this.scanned.push(data);
			if (Object.isFrozen(data)) {
				if (frozenIndex === -1) {
					frozenIndex = this.scannedFrozen.length;
					this.scannedFrozen.push(data);
					this.scannedFrozenSchemas.push([]);
				}
				scannedFrozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].length;
				this.scannedFrozenSchemas[frozenIndex][scannedFrozenSchemaIndex] = schema;
				this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = [];
			} else {
				if (!data[this.validatedSchemasKey]) {
					try {
						Object.defineProperty(data, this.validatedSchemasKey, {
							value: [],
							configurable: true
						});
						Object.defineProperty(data, this.validationErrorsKey, {
							value: [],
							configurable: true
						});
					} catch (e) {
						//IE 7/8 workaround
						data[this.validatedSchemasKey] = [];
						data[this.validationErrorsKey] = [];
					}
				}
				scannedSchemasIndex = data[this.validatedSchemasKey].length;
				data[this.validatedSchemasKey][scannedSchemasIndex] = schema;
				data[this.validationErrorsKey][scannedSchemasIndex] = [];
			}
		}
	
		var errorCount = this.errors.length;
		var error = this.validateBasic(data, schema, dataPointerPath)
			|| this.validateNumeric(data, schema, dataPointerPath)
			|| this.validateString(data, schema, dataPointerPath)
			|| this.validateArray(data, schema, dataPointerPath)
			|| this.validateObject(data, schema, dataPointerPath)
			|| this.validateCombinations(data, schema, dataPointerPath)
			|| this.validateHypermedia(data, schema, dataPointerPath)
			|| this.validateFormat(data, schema, dataPointerPath)
			|| this.validateDefinedKeywords(data, schema, dataPointerPath)
			|| null;
	
		if (topLevel) {
			while (this.scanned.length) {
				var item = this.scanned.pop();
				delete item[this.validatedSchemasKey];
			}
			this.scannedFrozen = [];
			this.scannedFrozenSchemas = [];
		}
	
		if (error || errorCount !== this.errors.length) {
			while ((dataPathParts && dataPathParts.length) || (schemaPathParts && schemaPathParts.length)) {
				var dataPart = (dataPathParts && dataPathParts.length) ? "" + dataPathParts.pop() : null;
				var schemaPart = (schemaPathParts && schemaPathParts.length) ? "" + schemaPathParts.pop() : null;
				if (error) {
					error = error.prefixWith(dataPart, schemaPart);
				}
				this.prefixErrors(errorCount, dataPart, schemaPart);
			}
		}
	
		if (scannedFrozenSchemaIndex !== null) {
			this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = this.errors.slice(startErrorCount);
		} else if (scannedSchemasIndex !== null) {
			data[this.validationErrorsKey][scannedSchemasIndex] = this.errors.slice(startErrorCount);
		}
	
		return this.handleError(error);
	};
	ValidatorContext.prototype.validateFormat = function (data, schema) {
		if (typeof schema.format !== 'string' || !this.formatValidators[schema.format]) {
			return null;
		}
		var errorMessage = this.formatValidators[schema.format].call(null, data, schema);
		if (typeof errorMessage === 'string' || typeof errorMessage === 'number') {
			return this.createError(ErrorCodes.FORMAT_CUSTOM, {message: errorMessage}, '', '/format', null, data, schema);
		} else if (errorMessage && typeof errorMessage === 'object') {
			return this.createError(ErrorCodes.FORMAT_CUSTOM, {message: errorMessage.message || "?"}, errorMessage.dataPath || '', errorMessage.schemaPath || "/format", null, data, schema);
		}
		return null;
	};
	ValidatorContext.prototype.validateDefinedKeywords = function (data, schema, dataPointerPath) {
		for (var key in this.definedKeywords) {
			if (typeof schema[key] === 'undefined') {
				continue;
			}
			var validationFunctions = this.definedKeywords[key];
			for (var i = 0; i < validationFunctions.length; i++) {
				var func = validationFunctions[i];
				var result = func(data, schema[key], schema, dataPointerPath);
				if (typeof result === 'string' || typeof result === 'number') {
					return this.createError(ErrorCodes.KEYWORD_CUSTOM, {key: key, message: result}, '', '', null, data, schema).prefixWith(null, key);
				} else if (result && typeof result === 'object') {
					var code = result.code;
					if (typeof code === 'string') {
						if (!ErrorCodes[code]) {
							throw new Error('Undefined error code (use defineError): ' + code);
						}
						code = ErrorCodes[code];
					} else if (typeof code !== 'number') {
						code = ErrorCodes.KEYWORD_CUSTOM;
					}
					var messageParams = (typeof result.message === 'object') ? result.message : {key: key, message: result.message || "?"};
					var schemaPath = result.schemaPath || ("/" + key.replace(/~/g, '~0').replace(/\//g, '~1'));
					return this.createError(code, messageParams, result.dataPath || null, schemaPath, null, data, schema);
				}
			}
		}
		return null;
	};
	
	function recursiveCompare(A, B) {
		if (A === B) {
			return true;
		}
		if (A && B && typeof A === "object" && typeof B === "object") {
			if (Array.isArray(A) !== Array.isArray(B)) {
				return false;
			} else if (Array.isArray(A)) {
				if (A.length !== B.length) {
					return false;
				}
				for (var i = 0; i < A.length; i++) {
					if (!recursiveCompare(A[i], B[i])) {
						return false;
					}
				}
			} else {
				var key;
				for (key in A) {
					if (B[key] === undefined && A[key] !== undefined) {
						return false;
					}
				}
				for (key in B) {
					if (A[key] === undefined && B[key] !== undefined) {
						return false;
					}
				}
				for (key in A) {
					if (!recursiveCompare(A[key], B[key])) {
						return false;
					}
				}
			}
			return true;
		}
		return false;
	}
	
	ValidatorContext.prototype.validateBasic = function validateBasic(data, schema, dataPointerPath) {
		var error;
		if (error = this.validateType(data, schema, dataPointerPath)) {
			return error.prefixWith(null, "type");
		}
		if (error = this.validateEnum(data, schema, dataPointerPath)) {
			return error.prefixWith(null, "type");
		}
		return null;
	};
	
	ValidatorContext.prototype.validateType = function validateType(data, schema) {
		if (schema.type === undefined) {
			return null;
		}
		var dataType = typeof data;
		if (data === null) {
			dataType = "null";
		} else if (Array.isArray(data)) {
			dataType = "array";
		}
		var allowedTypes = schema.type;
		if (!Array.isArray(allowedTypes)) {
			allowedTypes = [allowedTypes];
		}
	
		for (var i = 0; i < allowedTypes.length; i++) {
			var type = allowedTypes[i];
			if (type === dataType || (type === "integer" && dataType === "number" && (data % 1 === 0))) {
				return null;
			}
		}
		return this.createError(ErrorCodes.INVALID_TYPE, {type: dataType, expected: allowedTypes.join("/")}, '', '', null, data, schema);
	};
	
	ValidatorContext.prototype.validateEnum = function validateEnum(data, schema) {
		if (schema["enum"] === undefined) {
			return null;
		}
		for (var i = 0; i < schema["enum"].length; i++) {
			var enumVal = schema["enum"][i];
			if (recursiveCompare(data, enumVal)) {
				return null;
			}
		}
		return this.createError(ErrorCodes.ENUM_MISMATCH, {value: (typeof JSON !== 'undefined') ? JSON.stringify(data) : data}, '', '', null, data, schema);
	};
	
	ValidatorContext.prototype.validateNumeric = function validateNumeric(data, schema, dataPointerPath) {
		return this.validateMultipleOf(data, schema, dataPointerPath)
			|| this.validateMinMax(data, schema, dataPointerPath)
			|| this.validateNaN(data, schema, dataPointerPath)
			|| null;
	};
	
	var CLOSE_ENOUGH_LOW = Math.pow(2, -51);
	var CLOSE_ENOUGH_HIGH = 1 - CLOSE_ENOUGH_LOW;
	ValidatorContext.prototype.validateMultipleOf = function validateMultipleOf(data, schema) {
		var multipleOf = schema.multipleOf || schema.divisibleBy;
		if (multipleOf === undefined) {
			return null;
		}
		if (typeof data === "number") {
			var remainder = (data/multipleOf)%1;
			if (remainder >= CLOSE_ENOUGH_LOW && remainder < CLOSE_ENOUGH_HIGH) {
				return this.createError(ErrorCodes.NUMBER_MULTIPLE_OF, {value: data, multipleOf: multipleOf}, '', '', null, data, schema);
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateMinMax = function validateMinMax(data, schema) {
		if (typeof data !== "number") {
			return null;
		}
		if (schema.minimum !== undefined) {
			if (data < schema.minimum) {
				return this.createError(ErrorCodes.NUMBER_MINIMUM, {value: data, minimum: schema.minimum}, '', '/minimum', null, data, schema);
			}
			if (schema.exclusiveMinimum && data === schema.minimum) {
				return this.createError(ErrorCodes.NUMBER_MINIMUM_EXCLUSIVE, {value: data, minimum: schema.minimum}, '', '/exclusiveMinimum', null, data, schema);
			}
		}
		if (schema.maximum !== undefined) {
			if (data > schema.maximum) {
				return this.createError(ErrorCodes.NUMBER_MAXIMUM, {value: data, maximum: schema.maximum}, '', '/maximum', null, data, schema);
			}
			if (schema.exclusiveMaximum && data === schema.maximum) {
				return this.createError(ErrorCodes.NUMBER_MAXIMUM_EXCLUSIVE, {value: data, maximum: schema.maximum}, '', '/exclusiveMaximum', null, data, schema);
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateNaN = function validateNaN(data, schema) {
		if (typeof data !== "number") {
			return null;
		}
		if (isNaN(data) === true || data === Infinity || data === -Infinity) {
			return this.createError(ErrorCodes.NUMBER_NOT_A_NUMBER, {value: data}, '', '/type', null, data, schema);
		}
		return null;
	};
	
	ValidatorContext.prototype.validateString = function validateString(data, schema, dataPointerPath) {
		return this.validateStringLength(data, schema, dataPointerPath)
			|| this.validateStringPattern(data, schema, dataPointerPath)
			|| null;
	};
	
	ValidatorContext.prototype.validateStringLength = function validateStringLength(data, schema) {
		if (typeof data !== "string") {
			return null;
		}
		if (schema.minLength !== undefined) {
			if (data.length < schema.minLength) {
				return this.createError(ErrorCodes.STRING_LENGTH_SHORT, {length: data.length, minimum: schema.minLength}, '', '/minLength', null, data, schema);
			}
		}
		if (schema.maxLength !== undefined) {
			if (data.length > schema.maxLength) {
				return this.createError(ErrorCodes.STRING_LENGTH_LONG, {length: data.length, maximum: schema.maxLength}, '', '/maxLength', null, data, schema);
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateStringPattern = function validateStringPattern(data, schema) {
		if (typeof data !== "string" || (typeof schema.pattern !== "string" && !(schema.pattern instanceof RegExp))) {
			return null;
		}
		var regexp;
		if (schema.pattern instanceof RegExp) {
		  regexp = schema.pattern;
		}
		else {
		  var body, flags = '';
		  // Check for regular expression literals
		  // @see http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.5
		  var literal = schema.pattern.match(/^\/(.+)\/([img]*)$/);
		  if (literal) {
		    body = literal[1];
		    flags = literal[2];
		  }
		  else {
		    body = schema.pattern;
		  }
		  regexp = new RegExp(body, flags);
		}
		if (!regexp.test(data)) {
			return this.createError(ErrorCodes.STRING_PATTERN, {pattern: schema.pattern}, '', '/pattern', null, data, schema);
		}
		return null;
	};
	
	ValidatorContext.prototype.validateArray = function validateArray(data, schema, dataPointerPath) {
		if (!Array.isArray(data)) {
			return null;
		}
		return this.validateArrayLength(data, schema, dataPointerPath)
			|| this.validateArrayUniqueItems(data, schema, dataPointerPath)
			|| this.validateArrayItems(data, schema, dataPointerPath)
			|| null;
	};
	
	ValidatorContext.prototype.validateArrayLength = function validateArrayLength(data, schema) {
		var error;
		if (schema.minItems !== undefined) {
			if (data.length < schema.minItems) {
				error = this.createError(ErrorCodes.ARRAY_LENGTH_SHORT, {length: data.length, minimum: schema.minItems}, '', '/minItems', null, data, schema);
				if (this.handleError(error)) {
					return error;
				}
			}
		}
		if (schema.maxItems !== undefined) {
			if (data.length > schema.maxItems) {
				error = this.createError(ErrorCodes.ARRAY_LENGTH_LONG, {length: data.length, maximum: schema.maxItems}, '', '/maxItems', null, data, schema);
				if (this.handleError(error)) {
					return error;
				}
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateArrayUniqueItems = function validateArrayUniqueItems(data, schema) {
		if (schema.uniqueItems) {
			for (var i = 0; i < data.length; i++) {
				for (var j = i + 1; j < data.length; j++) {
					if (recursiveCompare(data[i], data[j])) {
						var error = this.createError(ErrorCodes.ARRAY_UNIQUE, {match1: i, match2: j}, '', '/uniqueItems', null, data, schema);
						if (this.handleError(error)) {
							return error;
						}
					}
				}
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateArrayItems = function validateArrayItems(data, schema, dataPointerPath) {
		if (schema.items === undefined) {
			return null;
		}
		var error, i;
		if (Array.isArray(schema.items)) {
			for (i = 0; i < data.length; i++) {
				if (i < schema.items.length) {
					if (error = this.validateAll(data[i], schema.items[i], [i], ["items", i], dataPointerPath + "/" + i)) {
						return error;
					}
				} else if (schema.additionalItems !== undefined) {
					if (typeof schema.additionalItems === "boolean") {
						if (!schema.additionalItems) {
							error = (this.createError(ErrorCodes.ARRAY_ADDITIONAL_ITEMS, {}, '/' + i, '/additionalItems', null, data, schema));
							if (this.handleError(error)) {
								return error;
							}
						}
					} else if (error = this.validateAll(data[i], schema.additionalItems, [i], ["additionalItems"], dataPointerPath + "/" + i)) {
						return error;
					}
				}
			}
		} else {
			for (i = 0; i < data.length; i++) {
				if (error = this.validateAll(data[i], schema.items, [i], ["items"], dataPointerPath + "/" + i)) {
					return error;
				}
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateObject = function validateObject(data, schema, dataPointerPath) {
		if (typeof data !== "object" || data === null || Array.isArray(data)) {
			return null;
		}
		return this.validateObjectMinMaxProperties(data, schema, dataPointerPath)
			|| this.validateObjectRequiredProperties(data, schema, dataPointerPath)
			|| this.validateObjectProperties(data, schema, dataPointerPath)
			|| this.validateObjectDependencies(data, schema, dataPointerPath)
			|| null;
	};
	
	ValidatorContext.prototype.validateObjectMinMaxProperties = function validateObjectMinMaxProperties(data, schema) {
		var keys = Object.keys(data);
		var error;
		if (schema.minProperties !== undefined) {
			if (keys.length < schema.minProperties) {
				error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MINIMUM, {propertyCount: keys.length, minimum: schema.minProperties}, '', '/minProperties', null, data, schema);
				if (this.handleError(error)) {
					return error;
				}
			}
		}
		if (schema.maxProperties !== undefined) {
			if (keys.length > schema.maxProperties) {
				error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MAXIMUM, {propertyCount: keys.length, maximum: schema.maxProperties}, '', '/maxProperties', null, data, schema);
				if (this.handleError(error)) {
					return error;
				}
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateObjectRequiredProperties = function validateObjectRequiredProperties(data, schema) {
		if (schema.required !== undefined) {
			for (var i = 0; i < schema.required.length; i++) {
				var key = schema.required[i];
				if (data[key] === undefined) {
					var error = this.createError(ErrorCodes.OBJECT_REQUIRED, {key: key}, '', '/required/' + i, null, data, schema);
					if (this.handleError(error)) {
						return error;
					}
				}
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateObjectProperties = function validateObjectProperties(data, schema, dataPointerPath) {
		var error;
		for (var key in data) {
			var keyPointerPath = dataPointerPath + "/" + key.replace(/~/g, '~0').replace(/\//g, '~1');
			var foundMatch = false;
			if (schema.properties !== undefined && schema.properties[key] !== undefined) {
				foundMatch = true;
				if (error = this.validateAll(data[key], schema.properties[key], [key], ["properties", key], keyPointerPath)) {
					return error;
				}
			}
			if (schema.patternProperties !== undefined) {
				for (var patternKey in schema.patternProperties) {
					var regexp = new RegExp(patternKey);
					if (regexp.test(key)) {
						foundMatch = true;
						if (error = this.validateAll(data[key], schema.patternProperties[patternKey], [key], ["patternProperties", patternKey], keyPointerPath)) {
							return error;
						}
					}
				}
			}
			if (!foundMatch) {
				if (schema.additionalProperties !== undefined) {
					if (this.trackUnknownProperties) {
						this.knownPropertyPaths[keyPointerPath] = true;
						delete this.unknownPropertyPaths[keyPointerPath];
					}
					if (typeof schema.additionalProperties === "boolean") {
						if (!schema.additionalProperties) {
							error = this.createError(ErrorCodes.OBJECT_ADDITIONAL_PROPERTIES, {key: key}, '', '/additionalProperties', null, data, schema).prefixWith(key, null);
							if (this.handleError(error)) {
								return error;
							}
						}
					} else {
						if (error = this.validateAll(data[key], schema.additionalProperties, [key], ["additionalProperties"], keyPointerPath)) {
							return error;
						}
					}
				} else if (this.trackUnknownProperties && !this.knownPropertyPaths[keyPointerPath]) {
					this.unknownPropertyPaths[keyPointerPath] = true;
				}
			} else if (this.trackUnknownProperties) {
				this.knownPropertyPaths[keyPointerPath] = true;
				delete this.unknownPropertyPaths[keyPointerPath];
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateObjectDependencies = function validateObjectDependencies(data, schema, dataPointerPath) {
		var error;
		if (schema.dependencies !== undefined) {
			for (var depKey in schema.dependencies) {
				if (data[depKey] !== undefined) {
					var dep = schema.dependencies[depKey];
					if (typeof dep === "string") {
						if (data[dep] === undefined) {
							error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {key: depKey, missing: dep}, '', '', null, data, schema).prefixWith(null, depKey).prefixWith(null, "dependencies");
							if (this.handleError(error)) {
								return error;
							}
						}
					} else if (Array.isArray(dep)) {
						for (var i = 0; i < dep.length; i++) {
							var requiredKey = dep[i];
							if (data[requiredKey] === undefined) {
								error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {key: depKey, missing: requiredKey}, '', '/' + i, null, data, schema).prefixWith(null, depKey).prefixWith(null, "dependencies");
								if (this.handleError(error)) {
									return error;
								}
							}
						}
					} else {
						if (error = this.validateAll(data, dep, [], ["dependencies", depKey], dataPointerPath)) {
							return error;
						}
					}
				}
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateCombinations = function validateCombinations(data, schema, dataPointerPath) {
		return this.validateAllOf(data, schema, dataPointerPath)
			|| this.validateAnyOf(data, schema, dataPointerPath)
			|| this.validateOneOf(data, schema, dataPointerPath)
			|| this.validateNot(data, schema, dataPointerPath)
			|| null;
	};
	
	ValidatorContext.prototype.validateAllOf = function validateAllOf(data, schema, dataPointerPath) {
		if (schema.allOf === undefined) {
			return null;
		}
		var error;
		for (var i = 0; i < schema.allOf.length; i++) {
			var subSchema = schema.allOf[i];
			if (error = this.validateAll(data, subSchema, [], ["allOf", i], dataPointerPath)) {
				return error;
			}
		}
		return null;
	};
	
	ValidatorContext.prototype.validateAnyOf = function validateAnyOf(data, schema, dataPointerPath) {
		if (schema.anyOf === undefined) {
			return null;
		}
		var errors = [];
		var startErrorCount = this.errors.length;
		var oldUnknownPropertyPaths, oldKnownPropertyPaths;
		if (this.trackUnknownProperties) {
			oldUnknownPropertyPaths = this.unknownPropertyPaths;
			oldKnownPropertyPaths = this.knownPropertyPaths;
		}
		var errorAtEnd = true;
		for (var i = 0; i < schema.anyOf.length; i++) {
			if (this.trackUnknownProperties) {
				this.unknownPropertyPaths = {};
				this.knownPropertyPaths = {};
			}
			var subSchema = schema.anyOf[i];
	
			var errorCount = this.errors.length;
			var error = this.validateAll(data, subSchema, [], ["anyOf", i], dataPointerPath);
	
			if (error === null && errorCount === this.errors.length) {
				this.errors = this.errors.slice(0, startErrorCount);
	
				if (this.trackUnknownProperties) {
					for (var knownKey in this.knownPropertyPaths) {
						oldKnownPropertyPaths[knownKey] = true;
						delete oldUnknownPropertyPaths[knownKey];
					}
					for (var unknownKey in this.unknownPropertyPaths) {
						if (!oldKnownPropertyPaths[unknownKey]) {
							oldUnknownPropertyPaths[unknownKey] = true;
						}
					}
					// We need to continue looping so we catch all the property definitions, but we don't want to return an error
					errorAtEnd = false;
					continue;
				}
	
				return null;
			}
			if (error) {
				errors.push(error.prefixWith(null, "" + i).prefixWith(null, "anyOf"));
			}
		}
		if (this.trackUnknownProperties) {
			this.unknownPropertyPaths = oldUnknownPropertyPaths;
			this.knownPropertyPaths = oldKnownPropertyPaths;
		}
		if (errorAtEnd) {
			errors = errors.concat(this.errors.slice(startErrorCount));
			this.errors = this.errors.slice(0, startErrorCount);
			return this.createError(ErrorCodes.ANY_OF_MISSING, {}, "", "/anyOf", errors, data, schema);
		}
	};
	
	ValidatorContext.prototype.validateOneOf = function validateOneOf(data, schema, dataPointerPath) {
		if (schema.oneOf === undefined) {
			return null;
		}
		var validIndex = null;
		var errors = [];
		var startErrorCount = this.errors.length;
		var oldUnknownPropertyPaths, oldKnownPropertyPaths;
		if (this.trackUnknownProperties) {
			oldUnknownPropertyPaths = this.unknownPropertyPaths;
			oldKnownPropertyPaths = this.knownPropertyPaths;
		}
		for (var i = 0; i < schema.oneOf.length; i++) {
			if (this.trackUnknownProperties) {
				this.unknownPropertyPaths = {};
				this.knownPropertyPaths = {};
			}
			var subSchema = schema.oneOf[i];
	
			var errorCount = this.errors.length;
			var error = this.validateAll(data, subSchema, [], ["oneOf", i], dataPointerPath);
	
			if (error === null && errorCount === this.errors.length) {
				if (validIndex === null) {
					validIndex = i;
				} else {
					this.errors = this.errors.slice(0, startErrorCount);
					return this.createError(ErrorCodes.ONE_OF_MULTIPLE, {index1: validIndex, index2: i}, "", "/oneOf", null, data, schema);
				}
				if (this.trackUnknownProperties) {
					for (var knownKey in this.knownPropertyPaths) {
						oldKnownPropertyPaths[knownKey] = true;
						delete oldUnknownPropertyPaths[knownKey];
					}
					for (var unknownKey in this.unknownPropertyPaths) {
						if (!oldKnownPropertyPaths[unknownKey]) {
							oldUnknownPropertyPaths[unknownKey] = true;
						}
					}
				}
			} else if (error) {
				errors.push(error);
			}
		}
		if (this.trackUnknownProperties) {
			this.unknownPropertyPaths = oldUnknownPropertyPaths;
			this.knownPropertyPaths = oldKnownPropertyPaths;
		}
		if (validIndex === null) {
			errors = errors.concat(this.errors.slice(startErrorCount));
			this.errors = this.errors.slice(0, startErrorCount);
			return this.createError(ErrorCodes.ONE_OF_MISSING, {}, "", "/oneOf", errors, data, schema);
		} else {
			this.errors = this.errors.slice(0, startErrorCount);
		}
		return null;
	};
	
	ValidatorContext.prototype.validateNot = function validateNot(data, schema, dataPointerPath) {
		if (schema.not === undefined) {
			return null;
		}
		var oldErrorCount = this.errors.length;
		var oldUnknownPropertyPaths, oldKnownPropertyPaths;
		if (this.trackUnknownProperties) {
			oldUnknownPropertyPaths = this.unknownPropertyPaths;
			oldKnownPropertyPaths = this.knownPropertyPaths;
			this.unknownPropertyPaths = {};
			this.knownPropertyPaths = {};
		}
		var error = this.validateAll(data, schema.not, null, null, dataPointerPath);
		var notErrors = this.errors.slice(oldErrorCount);
		this.errors = this.errors.slice(0, oldErrorCount);
		if (this.trackUnknownProperties) {
			this.unknownPropertyPaths = oldUnknownPropertyPaths;
			this.knownPropertyPaths = oldKnownPropertyPaths;
		}
		if (error === null && notErrors.length === 0) {
			return this.createError(ErrorCodes.NOT_PASSED, {}, "", "/not", null, data, schema);
		}
		return null;
	};
	
	ValidatorContext.prototype.validateHypermedia = function validateCombinations(data, schema, dataPointerPath) {
		if (!schema.links) {
			return null;
		}
		var error;
		for (var i = 0; i < schema.links.length; i++) {
			var ldo = schema.links[i];
			if (ldo.rel === "describedby") {
				var template = new UriTemplate(ldo.href);
				var allPresent = true;
				for (var j = 0; j < template.varNames.length; j++) {
					if (!(template.varNames[j] in data)) {
						allPresent = false;
						break;
					}
				}
				if (allPresent) {
					var schemaUrl = template.fillFromObject(data);
					var subSchema = {"$ref": schemaUrl};
					if (error = this.validateAll(data, subSchema, [], ["links", i], dataPointerPath)) {
						return error;
					}
				}
			}
		}
	};
	
	// parseURI() and resolveUrl() are from https://gist.github.com/1088850
	//   -  released as public domain by author ("Yaffle") - see comments on gist
	
	function parseURI(url) {
		var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
		// authority = '//' + user + ':' + pass '@' + hostname + ':' port
		return (m ? {
			href     : m[0] || '',
			protocol : m[1] || '',
			authority: m[2] || '',
			host     : m[3] || '',
			hostname : m[4] || '',
			port     : m[5] || '',
			pathname : m[6] || '',
			search   : m[7] || '',
			hash     : m[8] || ''
		} : null);
	}
	
	function resolveUrl(base, href) {// RFC 3986
	
		function removeDotSegments(input) {
			var output = [];
			input.replace(/^(\.\.?(\/|$))+/, '')
				.replace(/\/(\.(\/|$))+/g, '/')
				.replace(/\/\.\.$/, '/../')
				.replace(/\/?[^\/]*/g, function (p) {
					if (p === '/..') {
						output.pop();
					} else {
						output.push(p);
					}
			});
			return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
		}
	
		href = parseURI(href || '');
		base = parseURI(base || '');
	
		return !href || !base ? null : (href.protocol || base.protocol) +
			(href.protocol || href.authority ? href.authority : base.authority) +
			removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
			(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
			href.hash;
	}
	
	function getDocumentUri(uri) {
		return uri.split('#')[0];
	}
	function normSchema(schema, baseUri) {
		if (schema && typeof schema === "object") {
			if (baseUri === undefined) {
				baseUri = schema.id;
			} else if (typeof schema.id === "string") {
				baseUri = resolveUrl(baseUri, schema.id);
				schema.id = baseUri;
			}
			if (Array.isArray(schema)) {
				for (var i = 0; i < schema.length; i++) {
					normSchema(schema[i], baseUri);
				}
			} else {
				if (typeof schema['$ref'] === "string") {
					schema['$ref'] = resolveUrl(baseUri, schema['$ref']);
				}
				for (var key in schema) {
					if (key !== "enum") {
						normSchema(schema[key], baseUri);
					}
				}
			}
		}
	}
	
	function defaultErrorReporter(language) {
		language = language || 'en';
	
		var errorMessages = languages[language];
	
		return function (error) {
			var messageTemplate = errorMessages[error.code] || ErrorMessagesDefault[error.code];
			if (typeof messageTemplate !== 'string') {
				return "Unknown error code " + error.code + ": " + JSON.stringify(error.messageParams);
			}
			var messageParams = error.params;
			// Adapted from Crockford's supplant()
			return messageTemplate.replace(/\{([^{}]*)\}/g, function (whole, varName) {
				var subValue = messageParams[varName];
				return typeof subValue === 'string' || typeof subValue === 'number' ? subValue : whole;
			});
		};
	}
	
	var ErrorCodes = {
		INVALID_TYPE: 0,
		ENUM_MISMATCH: 1,
		ANY_OF_MISSING: 10,
		ONE_OF_MISSING: 11,
		ONE_OF_MULTIPLE: 12,
		NOT_PASSED: 13,
		// Numeric errors
		NUMBER_MULTIPLE_OF: 100,
		NUMBER_MINIMUM: 101,
		NUMBER_MINIMUM_EXCLUSIVE: 102,
		NUMBER_MAXIMUM: 103,
		NUMBER_MAXIMUM_EXCLUSIVE: 104,
		NUMBER_NOT_A_NUMBER: 105,
		// String errors
		STRING_LENGTH_SHORT: 200,
		STRING_LENGTH_LONG: 201,
		STRING_PATTERN: 202,
		// Object errors
		OBJECT_PROPERTIES_MINIMUM: 300,
		OBJECT_PROPERTIES_MAXIMUM: 301,
		OBJECT_REQUIRED: 302,
		OBJECT_ADDITIONAL_PROPERTIES: 303,
		OBJECT_DEPENDENCY_KEY: 304,
		// Array errors
		ARRAY_LENGTH_SHORT: 400,
		ARRAY_LENGTH_LONG: 401,
		ARRAY_UNIQUE: 402,
		ARRAY_ADDITIONAL_ITEMS: 403,
		// Custom/user-defined errors
		FORMAT_CUSTOM: 500,
		KEYWORD_CUSTOM: 501,
		// Schema structure
		CIRCULAR_REFERENCE: 600,
		// Non-standard validation options
		UNKNOWN_PROPERTY: 1000
	};
	var ErrorCodeLookup = {};
	for (var key in ErrorCodes) {
		ErrorCodeLookup[ErrorCodes[key]] = key;
	}
	var ErrorMessagesDefault = {
		INVALID_TYPE: "Invalid type: {type} (expected {expected})",
		ENUM_MISMATCH: "No enum match for: {value}",
		ANY_OF_MISSING: "Data does not match any schemas from \"anyOf\"",
		ONE_OF_MISSING: "Data does not match any schemas from \"oneOf\"",
		ONE_OF_MULTIPLE: "Data is valid against more than one schema from \"oneOf\": indices {index1} and {index2}",
		NOT_PASSED: "Data matches schema from \"not\"",
		// Numeric errors
		NUMBER_MULTIPLE_OF: "Value {value} is not a multiple of {multipleOf}",
		NUMBER_MINIMUM: "Value {value} is less than minimum {minimum}",
		NUMBER_MINIMUM_EXCLUSIVE: "Value {value} is equal to exclusive minimum {minimum}",
		NUMBER_MAXIMUM: "Value {value} is greater than maximum {maximum}",
		NUMBER_MAXIMUM_EXCLUSIVE: "Value {value} is equal to exclusive maximum {maximum}",
		NUMBER_NOT_A_NUMBER: "Value {value} is not a valid number",
		// String errors
		STRING_LENGTH_SHORT: "String is too short ({length} chars), minimum {minimum}",
		STRING_LENGTH_LONG: "String is too long ({length} chars), maximum {maximum}",
		STRING_PATTERN: "String does not match pattern: {pattern}",
		// Object errors
		OBJECT_PROPERTIES_MINIMUM: "Too few properties defined ({propertyCount}), minimum {minimum}",
		OBJECT_PROPERTIES_MAXIMUM: "Too many properties defined ({propertyCount}), maximum {maximum}",
		OBJECT_REQUIRED: "Missing required property: {key}",
		OBJECT_ADDITIONAL_PROPERTIES: "Additional properties not allowed",
		OBJECT_DEPENDENCY_KEY: "Dependency failed - key must exist: {missing} (due to key: {key})",
		// Array errors
		ARRAY_LENGTH_SHORT: "Array is too short ({length}), minimum {minimum}",
		ARRAY_LENGTH_LONG: "Array is too long ({length}), maximum {maximum}",
		ARRAY_UNIQUE: "Array items are not unique (indices {match1} and {match2})",
		ARRAY_ADDITIONAL_ITEMS: "Additional items not allowed",
		// Format errors
		FORMAT_CUSTOM: "Format validation failed ({message})",
		KEYWORD_CUSTOM: "Keyword failed: {key} ({message})",
		// Schema structure
		CIRCULAR_REFERENCE: "Circular $refs: {urls}",
		// Non-standard validation options
		UNKNOWN_PROPERTY: "Unknown property (not in schema)"
	};
	
	function ValidationError(code, params, dataPath, schemaPath, subErrors) {
		Error.call(this);
		if (code === undefined) {
			throw new Error ("No error code supplied: " + schemaPath);
		}
		this.message = '';
		this.params = params;
		this.code = code;
		this.dataPath = dataPath || "";
		this.schemaPath = schemaPath || "";
		this.subErrors = subErrors || null;
	
		var err = new Error(this.message);
		this.stack = err.stack || err.stacktrace;
		if (!this.stack) {
			try {
				throw err;
			}
			catch(err) {
				this.stack = err.stack || err.stacktrace;
			}
		}
	}
	ValidationError.prototype = Object.create(Error.prototype);
	ValidationError.prototype.constructor = ValidationError;
	ValidationError.prototype.name = 'ValidationError';
	
	ValidationError.prototype.prefixWith = function (dataPrefix, schemaPrefix) {
		if (dataPrefix !== null) {
			dataPrefix = dataPrefix.replace(/~/g, "~0").replace(/\//g, "~1");
			this.dataPath = "/" + dataPrefix + this.dataPath;
		}
		if (schemaPrefix !== null) {
			schemaPrefix = schemaPrefix.replace(/~/g, "~0").replace(/\//g, "~1");
			this.schemaPath = "/" + schemaPrefix + this.schemaPath;
		}
		if (this.subErrors !== null) {
			for (var i = 0; i < this.subErrors.length; i++) {
				this.subErrors[i].prefixWith(dataPrefix, schemaPrefix);
			}
		}
		return this;
	};
	
	function isTrustedUrl(baseUrl, testUrl) {
		if(testUrl.substring(0, baseUrl.length) === baseUrl){
			var remainder = testUrl.substring(baseUrl.length);
			if ((testUrl.length > 0 && testUrl.charAt(baseUrl.length - 1) === "/")
				|| remainder.charAt(0) === "#"
				|| remainder.charAt(0) === "?") {
				return true;
			}
		}
		return false;
	}
	
	var languages = {};
	function createApi(language) {
		var globalContext = new ValidatorContext();
		var currentLanguage;
		var customErrorReporter;
		var api = {
			setErrorReporter: function (reporter) {
				if (typeof reporter === 'string') {
					return this.language(reporter);
				}
				customErrorReporter = reporter;
				return true;
			},
			addFormat: function () {
				globalContext.addFormat.apply(globalContext, arguments);
			},
			language: function (code) {
				if (!code) {
					return currentLanguage;
				}
				if (!languages[code]) {
					code = code.split('-')[0]; // fall back to base language
				}
				if (languages[code]) {
					currentLanguage = code;
					return code; // so you can tell if fall-back has happened
				}
				return false;
			},
			addLanguage: function (code, messageMap) {
				var key;
				for (key in ErrorCodes) {
					if (messageMap[key] && !messageMap[ErrorCodes[key]]) {
						messageMap[ErrorCodes[key]] = messageMap[key];
					}
				}
				var rootCode = code.split('-')[0];
				if (!languages[rootCode]) { // use for base language if not yet defined
					languages[code] = messageMap;
					languages[rootCode] = messageMap;
				} else {
					languages[code] = Object.create(languages[rootCode]);
					for (key in messageMap) {
						if (typeof languages[rootCode][key] === 'undefined') {
							languages[rootCode][key] = messageMap[key];
						}
						languages[code][key] = messageMap[key];
					}
				}
				return this;
			},
			freshApi: function (language) {
				var result = createApi();
				if (language) {
					result.language(language);
				}
				return result;
			},
			validate: function (data, schema, checkRecursive, banUnknownProperties) {
				var def = defaultErrorReporter(currentLanguage);
				var errorReporter = customErrorReporter ? function (error, data, schema) {
					return customErrorReporter(error, data, schema) || def(error, data, schema);
				} : def;
				var context = new ValidatorContext(globalContext, false, errorReporter, checkRecursive, banUnknownProperties);
				if (typeof schema === "string") {
					schema = {"$ref": schema};
				}
				context.addSchema("", schema);
				var error = context.validateAll(data, schema, null, null, "");
				if (!error && banUnknownProperties) {
					error = context.banUnknownProperties(data, schema);
				}
				this.error = error;
				this.missing = context.missing;
				this.valid = (error === null);
				return this.valid;
			},
			validateResult: function () {
				var result = {};
				this.validate.apply(result, arguments);
				return result;
			},
			validateMultiple: function (data, schema, checkRecursive, banUnknownProperties) {
				var def = defaultErrorReporter(currentLanguage);
				var errorReporter = customErrorReporter ? function (error, data, schema) {
					return customErrorReporter(error, data, schema) || def(error, data, schema);
				} : def;
				var context = new ValidatorContext(globalContext, true, errorReporter, checkRecursive, banUnknownProperties);
				if (typeof schema === "string") {
					schema = {"$ref": schema};
				}
				context.addSchema("", schema);
				context.validateAll(data, schema, null, null, "");
				if (banUnknownProperties) {
					context.banUnknownProperties(data, schema);
				}
				var result = {};
				result.errors = context.errors;
				result.missing = context.missing;
				result.valid = (result.errors.length === 0);
				return result;
			},
			addSchema: function () {
				return globalContext.addSchema.apply(globalContext, arguments);
			},
			getSchema: function () {
				return globalContext.getSchema.apply(globalContext, arguments);
			},
			getSchemaMap: function () {
				return globalContext.getSchemaMap.apply(globalContext, arguments);
			},
			getSchemaUris: function () {
				return globalContext.getSchemaUris.apply(globalContext, arguments);
			},
			getMissingUris: function () {
				return globalContext.getMissingUris.apply(globalContext, arguments);
			},
			dropSchemas: function () {
				globalContext.dropSchemas.apply(globalContext, arguments);
			},
			defineKeyword: function () {
				globalContext.defineKeyword.apply(globalContext, arguments);
			},
			defineError: function (codeName, codeNumber, defaultMessage) {
				if (typeof codeName !== 'string' || !/^[A-Z]+(_[A-Z]+)*$/.test(codeName)) {
					throw new Error('Code name must be a string in UPPER_CASE_WITH_UNDERSCORES');
				}
				if (typeof codeNumber !== 'number' || codeNumber%1 !== 0 || codeNumber < 10000) {
					throw new Error('Code number must be an integer > 10000');
				}
				if (typeof ErrorCodes[codeName] !== 'undefined') {
					throw new Error('Error already defined: ' + codeName + ' as ' + ErrorCodes[codeName]);
				}
				if (typeof ErrorCodeLookup[codeNumber] !== 'undefined') {
					throw new Error('Error code already used: ' + ErrorCodeLookup[codeNumber] + ' as ' + codeNumber);
				}
				ErrorCodes[codeName] = codeNumber;
				ErrorCodeLookup[codeNumber] = codeName;
				ErrorMessagesDefault[codeName] = ErrorMessagesDefault[codeNumber] = defaultMessage;
				for (var langCode in languages) {
					var language = languages[langCode];
					if (language[codeName]) {
						language[codeNumber] = language[codeNumber] || language[codeName];
					}
				}
			},
			reset: function () {
				globalContext.reset();
				this.error = null;
				this.missing = [];
				this.valid = true;
			},
			missing: [],
			error: null,
			valid: true,
			normSchema: normSchema,
			resolveUrl: resolveUrl,
			getDocumentUri: getDocumentUri,
			errorCodes: ErrorCodes
		};
		api.language(language || 'en');
		return api;
	}
	
	var tv4 = createApi();
	tv4.addLanguage('en-gb', ErrorMessagesDefault);
	
	//legacy property
	tv4.tv4 = tv4;
	
	return tv4; // used by _header.js to globalise.
	
	}));

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseClone = __webpack_require__(165);
	
	var _baseClone2 = _interopRequireDefault(_baseClone);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return (0, _baseClone2.default)(value, true);
	}
	
	exports.default = cloneDeep;

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _arrayEach = __webpack_require__(162);
	
	var _arrayEach2 = _interopRequireDefault(_arrayEach);
	
	var _baseEach = __webpack_require__(266);
	
	var _baseEach2 = _interopRequireDefault(_baseEach);
	
	var _isArray = __webpack_require__(184);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _toFunction = __webpack_require__(268);
	
	var _toFunction2 = _interopRequireDefault(_toFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	 * for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => logs `1` then `2`
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' then 'b' (iteration order is not guaranteed)
	 */
	function forEach(collection, iteratee) {
	  return typeof iteratee == 'function' && (0, _isArray2.default)(collection) ? (0, _arrayEach2.default)(collection, iteratee) : (0, _baseEach2.default)(collection, (0, _toFunction2.default)(iteratee));
	}
	
	exports.default = forEach;

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _baseForOwn = __webpack_require__(188);
	
	var _baseForOwn2 = _interopRequireDefault(_baseForOwn);
	
	var _createBaseEach = __webpack_require__(267);
	
	var _createBaseEach2 = _interopRequireDefault(_createBaseEach);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = (0, _createBaseEach2.default)(_baseForOwn2.default);
	
	exports.default = baseEach;

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isArrayLike = __webpack_require__(180);
	
	var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function (collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!(0, _isArrayLike2.default)(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while (fromRight ? index-- : ++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	exports.default = createBaseEach;

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _identity = __webpack_require__(269);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Converts `value` to a function if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Function} Returns the function.
	 */
	function toFunction(value) {
	  return typeof value == 'function' ? value : _identity2.default;
	}
	
	exports.default = toFunction;

/***/ },
/* 269 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	exports.default = identity;

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props */
	
	exports.default = (0, _freeze2.default)({
	  '$schema': 'http://json-schema.org/draft-04/schema#',
	  'id': '/',
	  'type': 'object',
	  'properties': {
	    'gwid': {
	      'id': 'gwid',
	      'type': 'string'
	    },
	    'emailTemplate': {
	      'id': 'emailTemplate',
	      'type': 'string'
	    },
	    'raiser': {
	      'id': 'raiser',
	      'type': 'string'
	    },
	    'amount': {
	      'id': 'amount',
	      'type': 'integer'
	    },
	    'currency': {
	      'id': 'currency',
	      'type': 'string'
	    },
	    'givenName': {
	      'id': 'givenName',
	      'type': 'string'
	    },
	    'familyName': {
	      'id': 'familyName',
	      'type': 'string'
	    },
	    'address1': {
	      'id': 'address1',
	      'type': 'string'
	    },
	    'address2': {
	      'id': 'address2',
	      'type': 'string'
	    },
	    'city': {
	      'id': 'city',
	      'type': 'string'
	    },
	    'state': {
	      'id': 'state',
	      'type': 'string'
	    },
	    'zip': {
	      'id': 'zip',
	      'type': 'string'
	    },
	    'country': {
	      'id': 'country',
	      'type': 'string'
	    },
	    'passport': {
	      'id': 'passport',
	      'type': 'string'
	    },
	    'email': {
	      'id': 'email',
	      'type': 'string'
	    },
	    'phone': {
	      'id': 'phone',
	      'type': 'string'
	    },
	    'employer': {
	      'id': 'employer',
	      'type': 'string'
	    },
	    'occupation': {
	      'id': 'occupation',
	      'type': 'string'
	    },
	    'ccNum': {
	      'id': 'ccNum',
	      'type': 'string'
	    },
	    'ccExpMonth': {
	      'id': 'ccExpMonth',
	      'type': 'integer'
	    },
	    'ccExpYear': {
	      'id': 'ccExpYear',
	      'type': 'integer'
	    },
	    'ccCvc': {
	      'id': 'ccCvc',
	      'type': 'string'
	    },
	    'tags': {
	      'id': 'tags',
	      'type': 'object'
	    },
	    'agreeToTerms': {
	      'id': 'agreeToTerms',
	      'type': 'boolean'
	    },
	    'source': {
	      'id': 'source',
	      'type': 'string'
	    },
	    'submittingUrl': {
	      'id': 'submittingUrl',
	      'type': 'string'
	    },
	    'paymentMethod': {
	      'id': 'paymentMethod',
	      'type': 'string'
	    }
	  },
	  'required': ['address1', 'agreeToTerms', 'amount', 'ccCvc', 'ccExpMonth', 'ccExpYear', 'ccNum', 'city', 'email', 'employer', 'familyName', 'givenName', 'occupation', 'phone', 'state', 'zip']
	});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ENDPOINT_HOST_UNSUBSCRIBE = exports.ENDPOINT_TICKET = exports.ENDPOINT_MESSAGE = exports.ENDPOINT_INVITATION = exports.ENDPOINT_CATEGORY = exports.ENDPOINT_EVENT = exports.NAMESPACE = undefined;
	
	var _typeof2 = __webpack_require__(130);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Dictionary = __webpack_require__(26);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _Http = __webpack_require__(49);
	
	var _Http2 = _interopRequireDefault(_Http);
	
	var _SchemaUtils = __webpack_require__(262);
	
	var _SchemaUtils2 = _interopRequireDefault(_SchemaUtils);
	
	var _EventCategory = __webpack_require__(279);
	
	var _EventCategory2 = _interopRequireDefault(_EventCategory);
	
	var _EventInvitation = __webpack_require__(281);
	
	var _EventInvitation2 = _interopRequireDefault(_EventInvitation);
	
	var _EventMessage = __webpack_require__(283);
	
	var _EventMessage2 = _interopRequireDefault(_EventMessage);
	
	var _EventTicket = __webpack_require__(285);
	
	var _EventTicket2 = _interopRequireDefault(_EventTicket);
	
	var _event = __webpack_require__(287);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _utils = __webpack_require__(228);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {String} - API endpoint for resource */
	var NAMESPACE = exports.NAMESPACE = 'events';
	
	/** @type {String} - API endpoint for event resource */
	var ENDPOINT_EVENT = exports.ENDPOINT_EVENT = 'events';
	
	/** @type {String} - API endpoint for category resource */
	var ENDPOINT_CATEGORY = exports.ENDPOINT_CATEGORY = 'categories';
	
	/** @type {String} - API endpoint for invitation resource */
	var ENDPOINT_INVITATION = exports.ENDPOINT_INVITATION = 'invitations';
	
	/** @type {String} - API endpoint for message resource */
	var ENDPOINT_MESSAGE = exports.ENDPOINT_MESSAGE = 'messages';
	
	/** @type {String} - API endpoint for ticket resource */
	var ENDPOINT_TICKET = exports.ENDPOINT_TICKET = 'tickets';
	
	/** @type {String} - API endpoint for unsubscribing an email address */
	var ENDPOINT_HOST_UNSUBSCRIBE = exports.ENDPOINT_HOST_UNSUBSCRIBE = 'host-unsubscribe';
	
	/**
	 * An Event is a time and a place of an event. It also encompasses an event's
	 * title and description.
	 *
	 * @example
	 * const gw = new Groundwork({...});
	 *
	 * // List all events, while passing in an optional config
	 * gw.events.list({ page: 2, perPage: 10 })
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.fetch(<event id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * // Create a new event with required properties
	 * const eventProps = {
	 *   address1: '641 Walnut St.',
	 *   addressCity: 'Cincinnati',
	 *   addressCountry: 'USA',
	 *   addressPostalCode: '45202',
	 *   addressStateOrProvince: 'Ohio',
	 *   description: 'Come watch the Democratic and Republican candidates debate!',
	 *   locationName: 'The Righteous Room',
	 *   timeEnd: '2016-09-26T15:00:00',
	 *   timeStart: '2016-09-26T12:00:00',
	 *   title: 'Debate Watch Party at The Righteous Room'
	 * };
	 *
	 * gw.events.create(eventProps)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.update({ description: 'updated description' })
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.replace({...})
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.delete(<event id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * // If authenticated, list all tickets across all events,
	 * gw.events.listAllTickets({...})
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(error))
	 *
	 * gw.events.unsubscribe(<email>, <invitationId>)
	 * 	 .then((response) => console.log(response))
	 * 	 .catch((err) => console.error(err))
	 */
	
	var Event = function () {
	  /**
	   * @param {Dictionary} [config] - configuration dictionary
	   * @param {Http} http - Http instance
	   */
	
	  function Event(config, http) {
	    (0, _classCallCheck3.default)(this, Event);
	
	    /** @type {Dictionary} */
	    this.config = config && config instanceof _Dictionary2.default ? config : new _Dictionary2.default();
	
	    // Resource must have an Http instance
	    if (!http || http instanceof _Http2.default === false) {
	      throw new Error('Event requires Http');
	    }
	
	    /** @type {Http} */
	    this.http = http;
	
	    /** @type {SchemaUtils} */
	    this.schemaUtils = _SchemaUtils2.default;
	  }
	
	  /**
	   * Validate a payload against a schema. If it fails then return a tuple
	   * with a rejected Promise containing an error message.
	   *
	   * @param {Object} [payload]
	   * @param {Object} schema
	   * @return {Array}
	   */
	
	
	  (0, _createClass3.default)(Event, [{
	    key: 'validatePayload',
	    value: function validatePayload() {
	      var _this = this;
	
	      var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var schema = arguments[1];
	
	      var out = [true];
	      var valid = this.schemaUtils.validateSchema(payload, schema);
	
	      if (valid.length > 0) {
	        (function () {
	          var ret = _this.http.generateErrorObject();
	          valid.forEach(function (err) {
	            ret.msg.push(err.message);
	            ret.fields.push(_this.schemaUtils.extractFieldByError(err));
	          });
	          out = [false, _promise2.default.reject(_this.http.generateErrorResponse(ret))];
	        })();
	      }
	      return out;
	    }
	
	    /**
	     * If a specific function argument is missing then send back a tuple with a
	     * rejected Promise containing an error message.
	     *
	     * @param {*} id - value to check
	     * @param {String} [name] - name of argument being checked
	     * @return {Array}
	     */
	
	  }, {
	    key: 'validateId',
	    value: function validateId(id) {
	      var name = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      var out = [true];
	
	      if (typeof id !== 'string' || id === null || id === undefined || id === false) {
	        var response = this.http.generateErrorResponse({
	          valid: false,
	          fields: [name],
	          msg: ['Invalid ID: ' + name]
	        });
	        out = [false, _promise2.default.reject(response)];
	      }
	
	      return out;
	    }
	
	    /**
	     * List all Events
	     *
	     * @param {Object} [opts] - options object
	     * @param {Array|String} [opts.hostGwid] -
	     *   The GWID String of the user who is hosting the event. Only events with the given
	     *   hostGwid will be returned. You may also pass multiple hostGwid's in an array
	     *   include multiple hosts in your request
	     * @param {Boolean} [opts.isDeleted] -
	     *   a Boolean of whether to only return Events that have been deleted. Defaults to
	     *   False. This option is currently only available to Admin users
	     * @param {Number} [opts.latitude] -
	     *   a numeric Float of a latitudinal geographic coordinate by which to filter results.
	     *   This parameter must be provided if performing a geographic filter
	     * @param {Number} [opts.longitude] -
	     *   a numeric Float of a longitudinal geographic coordinate by which to filter results.
	     *   This parameter must be provided if performing a geographic filter
	     * @param {Number} [opts.page] -
	     *   an Integer indicating which page of results should be returned
	     * @param {Number} [opts.perPage] -
	     *   an Integer indicating how many results should be returned per request
	     * @param {Number} [opts.radius] -
	     *   a numeric Float, given in kilometers, of the search radius by with to filter results.
	     *   This parameter must be provided if performing a geographic filter.
	     * @param {String} [opts.search] - a String search field that will query Event titles.
	     * @param {String} [opts.startsBefore] -
	     *   an ISO-8601 formatted String given in local time without a timezone designator.
	     *   Only events occuring before the given timestamp will be returned.
	     * @param {String} [opts.startsAfter] -
	     *   an ISO-8601 formatted String given in local time without a timezone designator.
	     *   Only events occuring after the given timestamp will be returned.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'list',
	    value: function list() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _opts = (0, _utils.only)(['hostGwid', 'isDeleted', 'latitude', 'longitude', 'page', 'perPage', 'radius', 'search', 'startsBefore', 'startsAfter'], opts);
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_EVENT);
	      return this.http.get(url, { params: _opts });
	    }
	
	    /**
	     * Get a specific Event, by id
	     *
	     * @param  {String} eventId - id of event
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetch',
	    value: function fetch(eventId) {
	      var _validateId = this.validateId(eventId, 'eventId');
	
	      var _validateId2 = (0, _slicedToArray3.default)(_validateId, 2);
	
	      var ev = _validateId2[0];
	      var ep = _validateId2[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_EVENT, eventId);
	      return this.http.get(url);
	    }
	
	    /**
	     * Create an Event
	     *
	     * The provided address will be geocoded to discover timezone information. If the
	     * geocode fails, the request will fail and the Event will not be created.
	     *
	     * @param  {Object} [event] - event object
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'create',
	    value: function create() {
	      var event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _validatePayload = this.validatePayload(event, _event2.default);
	
	      var _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2);
	
	      var eventv = _validatePayload2[0];
	      var eventp = _validatePayload2[1];
	
	      if (!eventv) {
	        return eventp;
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_EVENT);
	      return this.http.post(url, event);
	    }
	
	    /**
	     * Update an existing Event, by id
	     *
	     * Only the fields that are passed will be updated.
	     *
	     * If the address field is modified in full or in part, it will be re-geocoded to
	     * update timezone information. If the geocode fails, the request will fail and the
	     * Event will not be modified.
	     *
	     * @param  {String} eventId - id of event
	     * @param  {Object} [event] - fields to update
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'update',
	    value: function update(eventId) {
	      var event = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var _validateId3 = this.validateId(eventId, 'eventId');
	
	      var _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2);
	
	      var ev = _validateId4[0];
	      var ep = _validateId4[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_EVENT, eventId);
	      return this.http.patch(url, event);
	    }
	
	    /**
	     * Replace an existing Event, by id
	     *
	     * All fields are updated. If an optional field is not provided, it will be overwritten
	     * as blank unless otherwise noted.
	     *
	     * If the address field is modified in full or in part, it will be re-geocoded to
	     * update timezone information. If the geocode fails, the request will fail and the
	     * Event will not be modified.
	     *
	     * @param  {String} eventId - id of event
	     * @param  {Object} [event] - fields to update
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'replace',
	    value: function replace(eventId) {
	      var event = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var _validateId5 = this.validateId(eventId, 'eventId');
	
	      var _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2);
	
	      var ev = _validateId6[0];
	      var ep = _validateId6[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validatePayload3 = this.validatePayload(event, _event2.default);
	
	      var _validatePayload4 = (0, _slicedToArray3.default)(_validatePayload3, 2);
	
	      var eventv = _validatePayload4[0];
	      var eventp = _validatePayload4[1];
	
	      if (!eventv) {
	        return eventp;
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_EVENT, eventId);
	      return this.http.put(url, event);
	    }
	
	    /**
	     * Delete a specific Event, by id
	     *
	     * If there are Tickets associated with any Categories under that event, the request
	     * will fail.
	     *
	     * @param  {String} eventId - id of event
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'del',
	    value: function del(eventId) {
	      var _validateId7 = this.validateId(eventId, 'eventId');
	
	      var _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2);
	
	      var ev = _validateId8[0];
	      var ep = _validateId8[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_EVENT, eventId);
	      return this.http.delete(url);
	    }
	
	    /**
	     * Get a list of all Tickets. When called by an authenticated user, it will return all
	     * Tickets that have that user as that `purchaserGwid`. When called by an Admin, it
	     * will return all tickets. Both responses are filterable with the optional query
	     * paramters.
	     *
	     * @param {Object} [opts] - options object
	     * @param {Boolean} [opts.isRedeemed] -
	     *   a Boolean representing whether the ticket has been redeemed. Only tickets with
	     *   the given redemption status will be returned.
	     * @param {Number} [opts.page] -
	     *   an Integer indicating which page of results should be returned
	     * @param {Number} [opts.perPage] -
	     *   an Integer indicating how many results should be returned per request
	     * @param {String} [opts.purchaserGwid] -
	     *   is the GWID String of the user who purchased the tickets. Only tickets with the
	     *   given purchaser will be returned.
	     * @param {String} [opts.startsBefore] -
	     *   an ISO-8601 formatted String given in local time without a timezone designator.
	     *   Only tickets in categories occurring before the given timestamp will be returned
	     * @param {String} [opts.startsAfter] -
	     *   an ISO-8601 formatted String given in local time without a timezone designator.
	     *   Only tickets in categories occurring after the given timestamp will be returned.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'listAllTickets',
	    value: function listAllTickets() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _opts = (0, _utils.only)(['isRedeemed', 'page', 'perPage', 'purchaserGwid', 'startsBefore', 'startsAfter'], opts);
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_TICKET);
	      return this.http.get(url, { params: _opts });
	    }
	
	    /**
	     * Unsubscribe an email address from all communication from a specific Event host.
	     *
	     * @param  {String} email - email address that wishes to unsubscribe
	     * @param  {Object} [opts] - unsubscribe options
	     * @param  {Object} [opts.invitationId] -
	     *   UUID String unique identifier of the Invitation that triggered the
	     *   unsubscribe request
	     * @param  {Object} [opts.messageId] -
	     *   UUID String unique identifier of the Message that triggered the
	     *   unsubscribe request
	     * @return {[type]}
	     */
	
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(email) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var valid = (0, _utils.validEmail)(email) && (typeof opts === 'undefined' ? 'undefined' : (0, _typeof3.default)(opts)) === 'object';
	
	      if (!valid) {
	        var response = this.http.generateErrorResponse({
	          valid: false,
	          fields: ['email', 'opts'],
	          msg: ['Valid `email` and `opts` are required. Passed email (' + email + ').\n               and opts (' + opts + ')']
	        });
	
	        return _promise2.default.reject(response);
	      }
	
	      var invitationId = opts.invitationId;
	      var messageId = opts.messageId;
	
	      // Only allow users to use one type of ID to unsubscribe, not both
	
	      if (invitationId && messageId) {
	        var _response = this.http.generateErrorResponse({
	          valid: false,
	          fields: ['invitationId', 'messageId'],
	          msg: ['Must unsubscribe via `invitationId` or `messageId`, not both.']
	        });
	
	        return _promise2.default.reject(_response);
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_HOST_UNSUBSCRIBE);
	      return this.http.get(url, { params: { email: email, invitationId: invitationId, messageId: messageId } });
	    }
	  }]);
	  return Event;
	}();
	
	(0, _utils.mixin)(Event, _EventCategory2.default, _EventInvitation2.default, _EventMessage2.default, _EventTicket2.default);
	
	exports.default = Event;

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(273);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(276);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(274), __esModule: true };

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(53);
	module.exports = __webpack_require__(275);

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(71)
	  , ITERATOR  = __webpack_require__(64)('iterator')
	  , Iterators = __webpack_require__(58);
	module.exports = __webpack_require__(10).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(277), __esModule: true };

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(53);
	module.exports = __webpack_require__(278);

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(15)
	  , get      = __webpack_require__(76);
	module.exports = __webpack_require__(10).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _utils = __webpack_require__(228);
	
	var _Event = __webpack_require__(271);
	
	var _eventCategory = __webpack_require__(280);
	
	var _eventCategory2 = _interopRequireDefault(_eventCategory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * An EventCategory is a sub-object of an Event. It describes a block of time within
	 * an Event.
	 *
	 * @example
	 * const gw = new Groundwork({...});
	 *
	 * // List all categories, while passing in an optional config
	 * gw.events.listCategories({ page: 2, perPage: 10 })
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.fetchCategory(<event id>, <category id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * // Create a new category with required properties
	 * const categoryProps = {
	 *   description: 'Reserved for our most active supporters',
	 *   quantityTotal: 10,
	 *   timeEnd: '2016-09-26T15:00:00',
	 *   timeStart: '2016-09-26T13:00:00',
	 *   title: 'VIP'
	 * };
	 *
	 * gw.events.createCategory(<event id>, categoryProps)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.updateCategory(<event id>, <category id>, { description: 'new description' })
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.replaceCategory(<event id>, <category id>, {...})
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.delCategory(<event id>, <category id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 */
	
	var EventCategory = function () {
	  function EventCategory() {
	    (0, _classCallCheck3.default)(this, EventCategory);
	  }
	
	  (0, _createClass3.default)(EventCategory, [{
	    key: 'listCategories',
	
	    /**
	     * List all Categories on an Event
	     *
	     * @param {String} eventId - id of event
	     * @param {Object} [opts] - options object
	     * @param {Number} [opts.page] -
	     *   an Integer indicating which page of results should be returned
	     * @param {Number} [opts.perPage] -
	     *   an Integer indicating how many results should be returned per request
	     * @param {String} [opts.startsBefore] -
	     *   an ISO-8601 formatted String given in local time without a timezone designator.
	     *   Only events occuring before the given timestamp will be returned.
	     * @param {String} [opts.startsAfter] -
	     *   an ISO-8601 formatted String given in local time without a timezone designator.
	     *   Only events occuring after the given timestamp will be returned.
	     * @return {Promise}
	     */
	    value: function listCategories(eventId) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var _validateId = this.validateId(eventId, 'eventId');
	
	      var _validateId2 = (0, _slicedToArray3.default)(_validateId, 2);
	
	      var ev = _validateId2[0];
	      var ep = _validateId2[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _opts = (0, _utils.only)(['page', 'perPage', 'startsBefore', 'startsAfter'], opts);
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY);
	
	      return this.http.get(url, { params: _opts });
	    }
	
	    /**
	     * Get a specific Category, by id
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetchCategory',
	    value: function fetchCategory(eventId, categoryId) {
	      var _validateId3 = this.validateId(eventId, 'eventId');
	
	      var _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2);
	
	      var ev = _validateId4[0];
	      var ep = _validateId4[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId5 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2);
	
	      var cv = _validateId6[0];
	      var cp = _validateId6[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId);
	      return this.http.get(url);
	    }
	
	    /**
	     * Create a Category on an Event
	     *
	     * @param  {String} eventId - id of event
	     * @param  {Object} [category] - category object
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'createCategory',
	    value: function createCategory(eventId) {
	      var category = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var _validateId7 = this.validateId(eventId, 'eventId');
	
	      var _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2);
	
	      var ev = _validateId8[0];
	      var ep = _validateId8[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validatePayload = this.validatePayload(category, _eventCategory2.default);
	
	      var _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2);
	
	      var categoryv = _validatePayload2[0];
	      var categoryp = _validatePayload2[1];
	
	      if (!categoryv) {
	        return categoryp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY);
	
	      return this.http.post(url, category);
	    }
	
	    /**
	     * Update an existing Category, by id
	     *
	     * Only the fields that are passed will be updated.
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @param  {Object} [category] - category object
	     * @return {Profile}
	     */
	
	  }, {
	    key: 'updateCategory',
	    value: function updateCategory(eventId, categoryId) {
	      var category = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      var _validateId9 = this.validateId(eventId, 'eventId');
	
	      var _validateId10 = (0, _slicedToArray3.default)(_validateId9, 2);
	
	      var ev = _validateId10[0];
	      var ep = _validateId10[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId11 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId12 = (0, _slicedToArray3.default)(_validateId11, 2);
	
	      var cv = _validateId12[0];
	      var cp = _validateId12[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId);
	
	      return this.http.patch(url, category);
	    }
	
	    /**
	     * Replace an existing Category, by id
	     *
	     * All fields are updated. If an optional field is not provided, it will be
	     * overwritted as blank.
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @param  {Object} [category] - category object
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'replaceCategory',
	    value: function replaceCategory(eventId, categoryId) {
	      var category = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      var _validateId13 = this.validateId(eventId, 'eventId');
	
	      var _validateId14 = (0, _slicedToArray3.default)(_validateId13, 2);
	
	      var ev = _validateId14[0];
	      var ep = _validateId14[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId15 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId16 = (0, _slicedToArray3.default)(_validateId15, 2);
	
	      var cv = _validateId16[0];
	      var cp = _validateId16[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validatePayload3 = this.validatePayload(category, _eventCategory2.default);
	
	      var _validatePayload4 = (0, _slicedToArray3.default)(_validatePayload3, 2);
	
	      var categoryv = _validatePayload4[0];
	      var categoryp = _validatePayload4[1];
	
	      if (!categoryv) {
	        return categoryp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId);
	
	      return this.http.put(url, category);
	    }
	
	    /**
	     * Delete a specific Category, by id
	     *
	     * If there are Tickets associated with that Category, the request will fail.
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'delCategory',
	    value: function delCategory(eventId, categoryId) {
	      var _validateId17 = this.validateId(eventId, 'eventId');
	
	      var _validateId18 = (0, _slicedToArray3.default)(_validateId17, 2);
	
	      var ev = _validateId18[0];
	      var ep = _validateId18[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId19 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId20 = (0, _slicedToArray3.default)(_validateId19, 2);
	
	      var cv = _validateId20[0];
	      var cp = _validateId20[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId);
	      return this.http.delete(url);
	    }
	  }]);
	  return EventCategory;
	}();
	
	exports.default = EventCategory;

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props, quotes */
	
	exports.default = (0, _freeze2.default)({
	  "$schema": "http://json-schema.org/draft-04/schema#",
	  "id": "/",
	  "type": "object",
	  "properties": {
	    "description": {
	      "id": "description",
	      "type": "string"
	    },
	    "quantityTotal": {
	      "id": "quantityTotal",
	      "type": "integer"
	    },
	    "timeEnd": {
	      "id": "timeEnd",
	      "type": "string"
	    },
	    "timeStart": {
	      "id": "timeStart",
	      "type": "string"
	    },
	    "title": {
	      "id": "title",
	      "type": "string"
	    }
	  },
	  "required": ["quantityTotal", "timeEnd", "timeStart"]
	});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _utils = __webpack_require__(228);
	
	var _Event = __webpack_require__(271);
	
	var _eventInvitation = __webpack_require__(282);
	
	var _eventInvitation2 = _interopRequireDefault(_eventInvitation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {Array} - Status options for Invitation RSVP's */
	var STATUSES = ['declined', 'pending'];
	
	/**
	 * An EventInvitation is an email correspondence used to inform people of an event.
	 *
	 * @example
	 * const gw = new Groundwork({...});
	 *
	 * // List all invitations, while passing in an optional config
	 * gw.events.listInvitations({ status: 'pending', page: 2, perPage: 10 })
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.fetchInvitation(<event id>, <invitation id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.createInvitation(<event id>, {...})
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * //
	 * gw.events.updateInvitationStatus(<event id>, <invitation id>, <status>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.delInvitation(<event id>, <invitation id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 */
	
	var EventInvitation = function () {
	  function EventInvitation() {
	    (0, _classCallCheck3.default)(this, EventInvitation);
	  }
	
	  (0, _createClass3.default)(EventInvitation, [{
	    key: 'validateStatus',
	
	
	    /**
	     * If the status of an invitation is neither `declined` nor `pending` then send back a
	     * tuple with a rejected Promise containing an error message.
	     *
	     * @param {String} status - status of the invitation
	     * @return {Array}
	     */
	    value: function validateStatus(status) {
	      var out = [true];
	
	      var valid = STATUSES.some(function (s) {
	        return s === status;
	      });
	
	      if (!valid) {
	        var response = this.http.generateErrorResponse({
	          valid: false,
	          fields: ['status'],
	          msg: ['Invalid status: ' + status + '. Options are `declined` or `pending`']
	        });
	        out = [false, _promise2.default.reject(response)];
	      }
	
	      return out;
	    }
	
	    /**
	     * List all invitations on an Event
	     *
	     * @param  {String} eventId - id of event
	     * @param  {Object} [opts] - options object
	     * @param {Number} [opts.page] -
	     *   an Integer indicating which page of results should be returned
	     * @param {Number} [opts.perPage] -
	     *   an Integer indicating how many results should be returned per request
	     * @param  {String} [opts.status] -
	     *   the status by which you wish to filter. It may be accepted, declined, or pending
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'listInvitations',
	    value: function listInvitations(eventId) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var _validateId = this.validateId(eventId, 'eventId');
	
	      var _validateId2 = (0, _slicedToArray3.default)(_validateId, 2);
	
	      var ev = _validateId2[0];
	      var ep = _validateId2[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _opts = (0, _utils.only)(['page', 'perPage', 'status'], opts);
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_INVITATION);
	
	      return this.http.get(url, { params: _opts });
	    }
	
	    /**
	     * Get a specific Invitation, by id
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} invitationId - id of invitation
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetchInvitation',
	    value: function fetchInvitation(eventId, invitationId) {
	      var _validateId3 = this.validateId(eventId, 'eventId');
	
	      var _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2);
	
	      var ev = _validateId4[0];
	      var ep = _validateId4[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId5 = this.validateId(invitationId, 'invitationId');
	
	      var _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2);
	
	      var iv = _validateId6[0];
	      var ip = _validateId6[1];
	
	      if (!iv) {
	        return ip;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_INVITATION, invitationId);
	      return this.http.get(url);
	    }
	
	    /**
	     * Create a new Invitation
	     *
	     * @param  {String} eventId - id of event
	     * @param  {Object[]} [invitations] - array of invitation objects
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'createInvitation',
	    value: function createInvitation(eventId) {
	      var invitations = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	      var _validateId7 = this.validateId(eventId, 'eventId');
	
	      var _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2);
	
	      var ev = _validateId8[0];
	      var ep = _validateId8[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validatePayload = this.validatePayload(invitations, _eventInvitation2.default);
	
	      var _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2);
	
	      var iv = _validatePayload2[0];
	      var ip = _validatePayload2[1];
	
	      if (!iv) {
	        return ip;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_INVITATION);
	
	      return this.http.post(url, invitations);
	    }
	
	    /**
	     * Update the status of an Invitation, by id
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} invitationId - id of invitation
	     * @param  {String} status -
	     *   current RSVP status of the invitation. It may be `declined`, or `pending`
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'updateInvitationStatus',
	    value: function updateInvitationStatus(eventId, invitationId, status) {
	      var _validateId9 = this.validateId(eventId, 'eventId');
	
	      var _validateId10 = (0, _slicedToArray3.default)(_validateId9, 2);
	
	      var ev = _validateId10[0];
	      var ep = _validateId10[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId11 = this.validateId(invitationId, 'invitationId');
	
	      var _validateId12 = (0, _slicedToArray3.default)(_validateId11, 2);
	
	      var iv = _validateId12[0];
	      var ip = _validateId12[1];
	
	      if (!iv) {
	        return ip;
	      }
	
	      var _validateStatus = this.validateStatus(status);
	
	      var _validateStatus2 = (0, _slicedToArray3.default)(_validateStatus, 2);
	
	      var sv = _validateStatus2[0];
	      var sp = _validateStatus2[1];
	
	      if (!sv) {
	        return sp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_INVITATION, invitationId);
	
	      return this.http.patch(url, { status: status });
	    }
	
	    /**
	     * Delete a specific Invitation, by id
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} invitationId - id of invitation
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'delInvitation',
	    value: function delInvitation(eventId, invitationId) {
	      var _validateId13 = this.validateId(eventId, 'eventId');
	
	      var _validateId14 = (0, _slicedToArray3.default)(_validateId13, 2);
	
	      var ev = _validateId14[0];
	      var ep = _validateId14[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId15 = this.validateId(invitationId, 'invitationId');
	
	      var _validateId16 = (0, _slicedToArray3.default)(_validateId15, 2);
	
	      var iv = _validateId16[0];
	      var ip = _validateId16[1];
	
	      if (!iv) {
	        return ip;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_INVITATION, invitationId);
	      return this.http.delete(url);
	    }
	  }]);
	  return EventInvitation;
	}();
	
	exports.default = EventInvitation;

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props, quotes */
	
	exports.default = (0, _freeze2.default)({
	  "$schema": "http://json-schema.org/draft-04/schema#",
	  "id": "/",
	  "type": "array",
	  "items": {
	    "id": "0",
	    "type": "object",
	    "properties": {
	      "email": {
	        "id": "email",
	        "type": "string"
	      },
	      "familyName": {
	        "id": "familyName",
	        "type": "string"
	      },
	      "givenName": {
	        "id": "givenName",
	        "type": "string"
	      },
	      "message": {
	        "id": "message",
	        "type": "string"
	      },
	      "subject": {
	        "id": "subject",
	        "type": "string"
	      }
	    },
	    "required": ["email"]
	  },
	  "required": ["0"]
	});

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _utils = __webpack_require__(228);
	
	var _Event = __webpack_require__(271);
	
	var _eventMessage = __webpack_require__(284);
	
	var _eventMessage2 = _interopRequireDefault(_eventMessage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Send a Message to a subset of people associated with an eventId.
	 *
	 * @example
	 * const gw = new Groundwork({...});
	 *
	 * // List all messages, while passing in an optional config
	 * gw.events.listMessages({ page: 2, perPage: 10 })
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.fetchMessage(<event id>, <message id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * // Create a new message with required properties
	 * const messageProps = {
	 *   message: 'Excited to see you at my event!',
	 *   recipientTypes: [
	 *   	 'attendees_redeemed',
	 *   	 'attendees_not_redeemed',
	 *   	 'invitees_pending',
	 *   	 'invitees_declined'
	 *   ],
	 *   subject: 'Cant wait to see you!',
	 *   template: 'my_template',
	 *   title: '1 more day!'
	 * };
	 *
	 * gw.events.createMessage(<event id>, messageProps)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.delMessage(<event id>, <message id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 */
	
	var EventMessage = function () {
	  function EventMessage() {
	    (0, _classCallCheck3.default)(this, EventMessage);
	  }
	
	  (0, _createClass3.default)(EventMessage, [{
	    key: 'listMessages',
	
	
	    /**
	     * List all Messages on an Event
	     *
	     * @param {String} eventId - id of event
	     * @param {Object} [opts] - options object
	     * @param {Number} [opts.page] -
	     *   an Integer indicating which page of results should be returned
	     * @param {Number} [opts.perPage] -
	     *   an Integer indicating how many results should be returned per request
	     * @return {Promise}
	     */
	    value: function listMessages(eventId) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var _validateId = this.validateId(eventId, 'eventId');
	
	      var _validateId2 = (0, _slicedToArray3.default)(_validateId, 2);
	
	      var ev = _validateId2[0];
	      var ep = _validateId2[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _opts = (0, _utils.only)(['page', 'perPage'], opts);
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_MESSAGE);
	
	      return this.http.get(url, { params: _opts });
	    }
	
	    /**
	     * Get a specific Message, by id
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} messageId - id of message
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetchMessage',
	    value: function fetchMessage(eventId, messageId) {
	      var _validateId3 = this.validateId(eventId, 'eventId');
	
	      var _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2);
	
	      var ev = _validateId4[0];
	      var ep = _validateId4[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId5 = this.validateId(messageId, 'messageId');
	
	      var _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2);
	
	      var mv = _validateId6[0];
	      var mp = _validateId6[1];
	
	      if (!mv) {
	        return mp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_MESSAGE, messageId);
	      return this.http.get(url);
	    }
	
	    /**
	     * Create a Message on an Event
	     *
	     * @param  {String} eventId - id of event
	     * @param  {Object} [message] - message object
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'createMessage',
	    value: function createMessage(eventId) {
	      var message = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var _validateId7 = this.validateId(eventId, 'eventId');
	
	      var _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2);
	
	      var ev = _validateId8[0];
	      var ep = _validateId8[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validatePayload = this.validatePayload(message, _eventMessage2.default);
	
	      var _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2);
	
	      var mv = _validatePayload2[0];
	      var mp = _validatePayload2[1];
	
	      if (!mv) {
	        return mp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_MESSAGE);
	
	      return this.http.post(url, message);
	    }
	
	    /**
	     * Delete a specific Message, by id
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} messageId - id of message
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'delMessage',
	    value: function delMessage(eventId, messageId) {
	      var _validateId9 = this.validateId(eventId, 'eventId');
	
	      var _validateId10 = (0, _slicedToArray3.default)(_validateId9, 2);
	
	      var ev = _validateId10[0];
	      var ep = _validateId10[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId11 = this.validateId(messageId, 'messageId');
	
	      var _validateId12 = (0, _slicedToArray3.default)(_validateId11, 2);
	
	      var mv = _validateId12[0];
	      var mp = _validateId12[1];
	
	      if (!mv) {
	        return mp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_MESSAGE, messageId);
	      return this.http.delete(url);
	    }
	  }]);
	  return EventMessage;
	}();
	
	exports.default = EventMessage;

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props, quotes */
	
	exports.default = (0, _freeze2.default)({
	  "$schema": "http://json-schema.org/draft-04/schema#",
	  "type": "object",
	  "properties": {
	    "message": {
	      "type": "string",
	      "id": "message"
	    },
	    "recipientTypes": {
	      "type": "array",
	      "items": {
	        "type": "string"
	      },
	      "id": "recipientTypes"
	    },
	    "subject": {
	      "type": "string",
	      "id": "subject"
	    },
	    "template": {
	      "type": "string",
	      "id": "template"
	    },
	    "title": {
	      "type": "string",
	      "id": "title"
	    }
	  },
	  "id": "/",
	  "required": ["recipientTypes", "template"]
	});

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _utils = __webpack_require__(228);
	
	var _Event = __webpack_require__(271);
	
	var _eventTicket = __webpack_require__(286);
	
	var _eventTicket2 = _interopRequireDefault(_eventTicket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * An EventTicket represents participation in an EventCategory.
	 *
	 * @example
	 * const gw = new Groundwork({...});
	 *
	 * // List all tickets, while passing in an optional config
	 * gw.events.listTickets({ page: 2, perPage: 10 })
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.fetchTicket(<event id>, <category id>, <ticket id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.createTicket(<event id>, <category id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.updateTicket(<event id>, <category id>, <ticket id>, {...})
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.replaceTicket(<event id>, <category id>, <ticket id>, {...})
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 *
	 * gw.events.deleteTicket(<event id>, <category id>, <ticket id>)
	 *   .then((response) => console.log(response))
	 *   .catch((err) => console.error(err));
	 */
	
	var EventTicket = function () {
	  function EventTicket() {
	    (0, _classCallCheck3.default)(this, EventTicket);
	  }
	
	  (0, _createClass3.default)(EventTicket, [{
	    key: 'listTickets',
	
	    /**
	     * List all Tickets on a Category
	     *
	     * @param {String} eventId - id of event
	     * @param {String} categoryId - id of category
	     * @param {Object} [opts] - options object
	     * @param {Boolean} [opts.isRedeemed] -
	     *   a Boolean representing whether the ticket has been redeemed. Only tickets with
	     *   the given redemption status will be returned.
	     * @param {Number} [opts.page] -
	     *   an Integer indicating which page of results should be returned
	     * @param {Number} [opts.perPage] -
	     *   an Integer indicating how many results should be returned per request
	     * @param {String} [opts.purchaserGwid] -
	     *   is the GWID String of the user who purchased the tickets. Only tickets with the
	     *   given purchaser will be returned.
	     * @return {Promise}
	     */
	    value: function listTickets(eventId, categoryId) {
	      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      var _validateId = this.validateId(eventId, 'eventId');
	
	      var _validateId2 = (0, _slicedToArray3.default)(_validateId, 2);
	
	      var ev = _validateId2[0];
	      var ep = _validateId2[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId3 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2);
	
	      var cv = _validateId4[0];
	      var cp = _validateId4[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _opts = (0, _utils.only)(['isRedeemed', 'page', 'perPage', 'purchaserGwid'], opts);
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId, _Event.ENDPOINT_TICKET);
	
	      return this.http.get(url, { params: _opts });
	    }
	
	    /**
	     * Get a specific Ticket, by id
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @param  {String} ticketId - id of ticket
	     * @return {[type]}
	     */
	
	  }, {
	    key: 'fetchTicket',
	    value: function fetchTicket(eventId, categoryId, ticketId) {
	      var _validateId5 = this.validateId(eventId, 'eventId');
	
	      var _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2);
	
	      var ev = _validateId6[0];
	      var ep = _validateId6[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId7 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2);
	
	      var cv = _validateId8[0];
	      var cp = _validateId8[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validateId9 = this.validateId(ticketId, 'ticketId');
	
	      var _validateId10 = (0, _slicedToArray3.default)(_validateId9, 2);
	
	      var tv = _validateId10[0];
	      var tp = _validateId10[1];
	
	      if (!tv) {
	        return tp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId, _Event.ENDPOINT_TICKET, ticketId);
	      return this.http.get(url);
	    }
	
	    /**
	     * Create a Ticket
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @param  {Object} [ticket] - ticket object
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'createTicket',
	    value: function createTicket(eventId, categoryId) {
	      var ticket = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      var _validateId11 = this.validateId(eventId, 'eventId');
	
	      var _validateId12 = (0, _slicedToArray3.default)(_validateId11, 2);
	
	      var ev = _validateId12[0];
	      var ep = _validateId12[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId13 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId14 = (0, _slicedToArray3.default)(_validateId13, 2);
	
	      var cv = _validateId14[0];
	      var cp = _validateId14[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validatePayload = this.validatePayload(ticket, _eventTicket2.default);
	
	      var _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2);
	
	      var ticketv = _validatePayload2[0];
	      var ticketp = _validatePayload2[1];
	
	      if (!ticketv) {
	        return ticketp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId, _Event.ENDPOINT_TICKET);
	
	      return this.http.post(url, ticket);
	    }
	
	    /**
	     * Update an existing Ticket, by id
	     *
	     * Only the fields that are passed will be updated.
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @param  {String} ticketId - id of ticket
	     * @param  {Object} [ticket] - ticket object
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'updateTicket',
	    value: function updateTicket(eventId, categoryId, ticketId) {
	      var ticket = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	      var _validateId15 = this.validateId(eventId, 'eventId');
	
	      var _validateId16 = (0, _slicedToArray3.default)(_validateId15, 2);
	
	      var ev = _validateId16[0];
	      var ep = _validateId16[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId17 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId18 = (0, _slicedToArray3.default)(_validateId17, 2);
	
	      var cv = _validateId18[0];
	      var cp = _validateId18[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validateId19 = this.validateId(ticketId, 'ticketId');
	
	      var _validateId20 = (0, _slicedToArray3.default)(_validateId19, 2);
	
	      var tv = _validateId20[0];
	      var tp = _validateId20[1];
	
	      if (!tv) {
	        return tp;
	      }
	
	      var _validatePayload3 = this.validatePayload(ticket, _eventTicket2.default);
	
	      var _validatePayload4 = (0, _slicedToArray3.default)(_validatePayload3, 2);
	
	      var ticketv = _validatePayload4[0];
	      var ticketp = _validatePayload4[1];
	
	      if (!ticketv) {
	        return ticketp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId, _Event.ENDPOINT_TICKET, ticketId);
	
	      return this.http.patch(url, ticket);
	    }
	
	    /**
	     * Replace an existing Ticket, by id
	     *
	     * All fields are updated. If an optional field is not provided, it will be
	     * overwritten as blank.
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @param  {String} ticketId - id of ticket
	     * @param  {Object} [ticket] - ticket object
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'replaceTicket',
	    value: function replaceTicket(eventId, categoryId, ticketId) {
	      var ticket = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	      var _validateId21 = this.validateId(eventId, 'eventId');
	
	      var _validateId22 = (0, _slicedToArray3.default)(_validateId21, 2);
	
	      var ev = _validateId22[0];
	      var ep = _validateId22[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId23 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId24 = (0, _slicedToArray3.default)(_validateId23, 2);
	
	      var cv = _validateId24[0];
	      var cp = _validateId24[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validateId25 = this.validateId(ticketId, 'ticketId');
	
	      var _validateId26 = (0, _slicedToArray3.default)(_validateId25, 2);
	
	      var tv = _validateId26[0];
	      var tp = _validateId26[1];
	
	      if (!tv) {
	        return tp;
	      }
	
	      var _validatePayload5 = this.validatePayload(ticket, _eventTicket2.default);
	
	      var _validatePayload6 = (0, _slicedToArray3.default)(_validatePayload5, 2);
	
	      var ticketv = _validatePayload6[0];
	      var ticketp = _validatePayload6[1];
	
	      if (!ticketv) {
	        return ticketp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId, _Event.ENDPOINT_TICKET, ticketId);
	
	      return this.http.put(url, ticket);
	    }
	
	    /**
	     * Delete a specific Ticket, by id
	     *
	     * @param  {String} eventId - id of event
	     * @param  {String} categoryId - id of category
	     * @param  {String} ticketId - id of ticket
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'delTicket',
	    value: function delTicket(eventId, categoryId, ticketId) {
	      var _validateId27 = this.validateId(eventId, 'eventId');
	
	      var _validateId28 = (0, _slicedToArray3.default)(_validateId27, 2);
	
	      var ev = _validateId28[0];
	      var ep = _validateId28[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId29 = this.validateId(categoryId, 'categoryId');
	
	      var _validateId30 = (0, _slicedToArray3.default)(_validateId29, 2);
	
	      var cv = _validateId30[0];
	      var cp = _validateId30[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validateId31 = this.validateId(ticketId, 'ticketId');
	
	      var _validateId32 = (0, _slicedToArray3.default)(_validateId31, 2);
	
	      var tv = _validateId32[0];
	      var tp = _validateId32[1];
	
	      if (!tv) {
	        return tp;
	      }
	
	      var url = (0, _utils.urlJoin)(_Event.NAMESPACE, _Event.ENDPOINT_EVENT, eventId, _Event.ENDPOINT_CATEGORY, categoryId, _Event.ENDPOINT_TICKET, ticketId);
	      return this.http.delete(url);
	    }
	  }]);
	  return EventTicket;
	}();
	
	exports.default = EventTicket;

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props, quotes */
	
	exports.default = (0, _freeze2.default)({
	  "$schema": "http://json-schema.org/draft-04/schema#",
	  "id": "/",
	  "type": "object",
	  "properties": {
	    "attendeeGwid": {
	      "id": "attendeeGwid",
	      "type": "string"
	    }
	  },
	  "required": ["attendeeGwid"]
	});

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props, quotes */
	
	exports.default = (0, _freeze2.default)({
	  "$schema": "http://json-schema.org/draft-04/schema#",
	  "id": "/",
	  "type": "object",
	  "properties": {
	    "address1": {
	      "id": "address1",
	      "type": "string"
	    },
	    "address2": {
	      "id": "address2",
	      "type": "string"
	    },
	    "addressCity": {
	      "id": "addressCity",
	      "type": "string"
	    },
	    "addressCountry": {
	      "id": "addressCountry",
	      "type": "string"
	    },
	    "addressCounty": {
	      "id": "addressCounty",
	      "type": "string"
	    },
	    "addressDistrict": {
	      "id": "addressDistrict",
	      "type": "string"
	    },
	    "addressPostalCode": {
	      "id": "addressPostalCode",
	      "type": "string"
	    },
	    "addressStateOrProvince": {
	      "id": "addressStateOrProvince",
	      "type": "string"
	    },
	    "description": {
	      "id": "description",
	      "type": "string"
	    },
	    "locationName": {
	      "id": "locationName",
	      "type": "string"
	    },
	    "timeEnd": {
	      "id": "timeEnd",
	      "type": "string"
	    },
	    "timeStart": {
	      "id": "timeStart",
	      "type": "string"
	    },
	    "title": {
	      "id": "title",
	      "type": "string"
	    }
	  },
	  "required": ["address1", "addressCity", "addressCountry", "addressPostalCode", "description", "timeEnd", "timeStart", "title"]
	});

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Dictionary = __webpack_require__(26);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _Http = __webpack_require__(49);
	
	var _Http2 = _interopRequireDefault(_Http);
	
	var _SchemaUtils = __webpack_require__(262);
	
	var _SchemaUtils2 = _interopRequireDefault(_SchemaUtils);
	
	var _profile = __webpack_require__(289);
	
	var _profile2 = _interopRequireDefault(_profile);
	
	var _utils = __webpack_require__(228);
	
	var _cloneDeep = __webpack_require__(264);
	
	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {String} - API endpoint for resource */
	var NAMESPACE = 'the-claw';
	
	/** @type {String} - API endpoint for profile resource */
	var ENDPOINT_PROFILE = 'profiles';
	
	/** @type {String} - API endpoint for password reset */
	var ENDPOINT_PASSWORD_RESET = 'password_resets';
	
	var Profile = function () {
	  /**
	   * @param {Dictionary} [config] - configuration dictionary
	   * @param {Http} http
	   */
	
	  function Profile(config, http) {
	    (0, _classCallCheck3.default)(this, Profile);
	
	    /** @type {Dictionary} */
	    this.config = config && config instanceof _Dictionary2.default ? config : new _Dictionary2.default();
	
	    // Resource must have an Http instance
	    if (!http || http instanceof _Http2.default === false) {
	      throw new Error('Profile requires Http');
	    }
	
	    /** @type {Http} */
	    this.http = http;
	
	    /** @type {String} */
	    this.schema = _profile2.default;
	
	    /** @type {SchemaUtils} */
	    this.schemaUtils = _SchemaUtils2.default;
	  }
	
	  /**
	   * Validate payload object and return object with validation status and any
	   * errors that crop up
	   *
	   * @example
	   *
	   * validateProfile({foo: 1, source: 'foo', email: 'bar'});
	   * // => { valid: false, fields: ['email'], msg: ['Invalid email address']}
	   *
	   *
	   * validateProfile({source: 'foo', email: 'bar@baz.biz'});
	   * // => { valid: true, fields: [], msg: [] }
	   *
	   * @param {Object} [profile={}] - profile object
	   * @param {Object} [_schema=this.schema] - JSON schema for profile
	   * @return {Object}
	   */
	
	
	  (0, _createClass3.default)(Profile, [{
	    key: 'validateProfile',
	    value: function validateProfile() {
	      var _this = this;
	
	      var profile = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _schema = arguments.length <= 1 || arguments[1] === undefined ? this.schema : arguments[1];
	
	      var out = [true];
	      var valid = this.schemaUtils.validateSchema(profile, _schema);
	
	      if (valid.length > 0) {
	        (function () {
	          var ret = _this.http.generateErrorObject();
	          valid.forEach(function (err) {
	            ret.msg.push(err.message);
	            ret.fields.push(_this.schemaUtils.extractFieldByError(err));
	          });
	          out = [false, _promise2.default.reject(_this.http.generateErrorResponse(ret))];
	        })();
	      }
	      return out;
	    }
	
	    /**
	     * Fetch a single Profile object
	     *
	     * @param {String} [gwid=''] - profile gwid
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetch',
	    value: function fetch() {
	      var gwid = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_PROFILE, gwid);
	      return this.http.get(url);
	    }
	
	    /**
	     * POST a Profile record to the API
	     *
	     * The passed in form object will be validated. If it fails, a mock response
	     * with any errors will be sent back in a rejected Promise. This is to present
	     * the least amount of surprise to the developer.
	     *
	     * @example
	     * // validation fail
	     * profile.create({}).catch((err) => console.log(err));
	     * // => { status: 400, data: { error: { valid: false, ... } } ... }
	     *
	     * @param {Object} [profile={}] - profile object
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'create',
	    value: function create() {
	      var profile = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      // Return a mock error response with validation errors
	
	      var _validateProfile = this.validateProfile(profile);
	
	      var _validateProfile2 = (0, _slicedToArray3.default)(_validateProfile, 2);
	
	      var cf = _validateProfile2[0];
	      var cp = _validateProfile2[1];
	
	      if (!cf) {
	        return cp;
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_PROFILE);
	      return this.http.post(url, profile);
	    }
	
	    /**
	     * PUT a Profile record to the API
	     *
	     * The passed in form object will be validated. If it fails, a mock response
	     * with any errors will be sent back in a rejected Promise. This is to present
	     * the least amount of surprise to the developer.
	     *
	     * @example
	     * // validation fail
	     * profile.update({}).catch((err) => console.log(err));
	     * // => { status: 400, data: { error: { valid: false, ... } } ... }
	     *
	     * @param {String} [gwid=''] - gwid of profile to update
	     * @param {Object} [profile={}] - fields to update
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'update',
	    value: function update() {
	      var gwid = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var profile = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      // Return a mock error response with validation errors
	      var putSchema = (0, _cloneDeep2.default)(this.schema);
	      delete putSchema.required; // No required fields in PUTs
	
	      var _validateProfile3 = this.validateProfile(profile, putSchema);
	
	      var _validateProfile4 = (0, _slicedToArray3.default)(_validateProfile3, 2);
	
	      var cf = _validateProfile4[0];
	      var cp = _validateProfile4[1];
	
	      if (!cf) {
	        return cp;
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_PROFILE, gwid);
	      return this.http.put(url, profile);
	    }
	
	    /**
	     * Trigger a password reset for an email
	     *
	     * Email will be sent to the requested address with a reset link containing
	     * a token
	     *
	     * @param {String} [email=''] - profile email
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'requestResetToken',
	    value: function requestResetToken() {
	      var email = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_PASSWORD_RESET, '');
	      return this.http.post(url, { email: email });
	    }
	
	    /**
	     * PUT the new password and token to the API
	     *
	     * @param {String} [token=''] - reset token
	     * @param {String} [password=''] - new password
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'resetPassword',
	    value: function resetPassword() {
	      var token = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var password = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_PASSWORD_RESET, token);
	      return this.http.put(url, { token: token, password: password });
	    }
	  }]);
	  return Profile;
	}();
	
	exports.default = Profile;

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props */
	
	exports.default = (0, _freeze2.default)({
	  '$schema': 'http://json-schema.org/draft-04/schema#',
	  'id': '/',
	  'type': 'object',
	  'properties': {
	    'gwid': {
	      'id': 'gwid',
	      'type': 'string'
	    },
	    'email': {
	      'id': 'email',
	      'type': 'string'
	    },
	    'isStaff': {
	      'id': 'isStaff',
	      'type': 'boolean'
	    },
	    'isActive': {
	      'id': 'isActive',
	      'type': 'boolean'
	    },
	    'dateJoined': {
	      'id': 'dateJoined',
	      'type': 'string',
	      'format': 'date-time'
	    },
	    'dateModified': {
	      'id': 'dateModified',
	      'type': 'string',
	      'format': 'date-time'
	    },
	    'dateOfBirth': {
	      'id': 'dateOfBirth',
	      'type': ['string', 'null'],
	      'format': 'date-time'
	    },
	    'givenName': {
	      'id': 'givenName',
	      'type': 'string'
	    },
	    'familyName': {
	      'id': 'familyName',
	      'type': 'string'
	    },
	    'honorificPrefix': {
	      'id': 'honorificPrefix',
	      'type': 'string'
	    },
	    'honorificSuffix': {
	      'id': 'honorificSuffix',
	      'type': 'string'
	    },
	    'gender': {
	      'id': 'gender',
	      'type': ['integer', 'null'],
	      'minimum': 0,
	      'maximum': 4
	    },
	    'genderIdentity': {
	      'id': 'genderIdentity',
	      'type': 'string'
	    },
	    'partyIdentification': {
	      'id': 'partyIdentification',
	      'type': ['integer', 'null'],
	      'minimum': 0,
	      'maximum': 4
	    },
	    'password': {
	      'id': 'password',
	      'type': 'string'
	    },
	    'employer': {
	      'id': 'employer',
	      'type': 'string'
	    },
	    'occupation': {
	      'id': 'occupation',
	      'type': 'string'
	    },
	    'phoneNumber': {
	      'id': 'phoneNumber',
	      'type': 'string'
	    },
	    'address1': {
	      'id': 'address1',
	      'type': 'string'
	    },
	    'address2': {
	      'id': 'address2',
	      'type': 'string'
	    },
	    'locality': {
	      'id': 'locality',
	      'type': 'string'
	    },
	    'state': {
	      'id': 'state',
	      'type': 'string'
	    },
	    'zipCode': {
	      'id': 'zipCode',
	      'type': 'string'
	    }
	  },
	  'required': ['email', 'familyName', 'givenName', 'password']
	});

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _getPrototypeOf = __webpack_require__(172);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(236);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(237);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _Payment2 = __webpack_require__(244);
	
	var _Payment3 = _interopRequireDefault(_Payment2);
	
	var _quickcard2 = __webpack_require__(291);
	
	var _quickcard3 = _interopRequireDefault(_quickcard2);
	
	var _quickcardPay = __webpack_require__(292);
	
	var _quickcardPay2 = _interopRequireDefault(_quickcardPay);
	
	var _utils = __webpack_require__(228);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {String} - API endpoint for resource */
	var ENDPOINT_QUICKCARD = 'quickcards';
	
	/**
	 * Create and view quickcards
	 *
	 * list(opts) - get a filtered list of quickcards
	 * create(quickcard) - create a new quickcard
	 * fetch(id) - fetch a quickcard object
	 *
	 */
	
	var Quickcard = function (_Payment) {
	  (0, _inherits3.default)(Quickcard, _Payment);
	
	  function Quickcard() {
	    (0, _classCallCheck3.default)(this, Quickcard);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Quickcard).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Quickcard, [{
	    key: 'list',
	
	    /**
	     * Fetch a collection of Quickcard objects for a specific gwid. We try
	     * to enforce the inclusion of a gwid if one is present in CONFIG_AUTH
	     *
	     * @param {Object} opts
	     * @param {String} opts.gwid - gwid is required
	     * @param {String} [opts.email] - filter on email
	     * @param {Number} [opts.page] - page number
	     * @param {Number} [opts.perPage] - quickcards per page
	     * @return {Promise}
	     */
	    value: function list() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var params = (0, _utils.only)(['gwid', 'email', 'page', 'perPage'], this.attachIdentity(opts));
	
	      // Allow opts to Override the gwid from config
	      if ((0, _utils.has)(opts, 'gwid')) {
	        params.gwid = opts.gwid;
	      }
	
	      // Max 50 p/page
	      if ((0, _utils.has)(opts, 'perPage')) {
	        params.perPage = (0, _utils.max)(opts.perPage);
	      }
	
	      // Failsafe to force gwid property into place no matter what
	      if (!(0, _utils.has)(params, 'gwid')) {
	        params.gwid = undefined;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_QUICKCARD);
	      return this.fetchCollection(url, params);
	    }
	
	    /**
	     * Fetch a list of all donations made for a quickcard
	     *
	     * @param {String} id - quickcard id
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'listDonations',
	    value: function listDonations() {
	      var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      // Must have an id
	
	      var _validateId = this.validateId(id);
	
	      var _validateId2 = (0, _slicedToArray3.default)(_validateId, 2);
	
	      var idv = _validateId2[0];
	      var idp = _validateId2[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_QUICKCARD, id, 'donations');
	      return this.fetchCollection(url);
	    }
	
	    /**
	     * Fetch a single Quickcard object
	     *
	     * @param {String} id - quickcard id
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetch',
	    value: function fetch() {
	      var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      // Must have an id
	
	      var _validateId3 = this.validateId(id);
	
	      var _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2);
	
	      var idv = _validateId4[0];
	      var idp = _validateId4[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_QUICKCARD, id);
	      return this.fetchCollection(url);
	    }
	
	    /**
	     * POST a quickcard record to the API
	     *
	     * User must be authed / have a gwid
	     *
	     * The passed in form object will be validated. If it fails, a mock response
	     * with any errors will be sent back in a rejected Promise. This is to present
	     * the least amount of surprise to the developer.
	     *
	     * Note: All of the values in the object passed to the method should have had
	     * their types coerced already or validation will fail.
	     *
	     * @example
	     * // validation fail
	     * donation.create({}).catch((err) => console.log(err));
	     * // => { status: 400, data: { error: { valid: false, ... } } ... }
	     *
	     * @param {Object} [quickcard]
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'create',
	    value: function create() {
	      var quickcard = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _quickcard = this.attachIdentity(quickcard);
	      var checkQuickcard = this.validatePayment(_quickcard, _quickcard3.default);
	
	      // Return a mock error response with validation errors
	      if (checkQuickcard.valid === false) {
	        var response = this.http.generateErrorResponse(checkQuickcard);
	        return _promise2.default.reject(response);
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_QUICKCARD);
	      return this.http.post(url, _quickcard);
	    }
	
	    /**
	     * Delete (cancel) a quickcard
	     *
	     * Note: Quickcards can be cancelled on a date in the future by passing
	     * additional arguments.
	     *
	     * @example
	     * // Cancel quickcard abc123 today
	     * del('abc123');
	     *
	     * // Set a cancellation date of Oct 13, 2015 for quickcard abc123
	     * del('abc123', 2015, 10, 13)
	     *
	     * @param {String} id - quickcard id
	     * @param {...time<number>} [time] - year, month, day for a specific epoch
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'del',
	    value: function del() {
	      var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      for (var _len = arguments.length, time = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        time[_key - 1] = arguments[_key];
	      }
	
	      var date = _utils.epoch.apply(null, time);
	
	      // Must have an id
	
	      var _validateId5 = this.validateId(id);
	
	      var _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2);
	
	      var idv = _validateId6[0];
	      var idp = _validateId6[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_QUICKCARD, id);
	      return this.http.put(url, { deleted: date });
	    }
	
	    /**
	     * Make a Quick Donate Payment - The Quick Donate endpoint can only be used if
	     * two conditions are met. First, the request needs to come from an
	     * authenticated user. Second, that authenticated user must have a stored and
	     * active Card object.
	     *
	     * @param {String} id - QuickCard id
	     * @param {Object} payment - payment object for QuickCard
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'pay',
	    value: function pay(id) {
	      var payment = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      // Must have an id
	
	      var _validateId7 = this.validateId(id);
	
	      var _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2);
	
	      var idv = _validateId8[0];
	      var idp = _validateId8[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var _payment = this.attachIdentity(payment);
	
	      // Validate payment and reject if errors
	
	      var _validateSchema = this.validateSchema(_payment, _quickcardPay2.default);
	
	      var _validateSchema2 = (0, _slicedToArray3.default)(_validateSchema, 2);
	
	      var pv = _validateSchema2[0];
	      var pp = _validateSchema2[1];
	
	      if (!pv) {
	        return pp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_QUICKCARD, id, 'donations');
	
	      return this.http.post(url, _payment);
	    }
	  }]);
	  return Quickcard;
	}(_Payment3.default);
	
	exports.default = Quickcard;

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props */
	
	exports.default = (0, _freeze2.default)({
	  '$schema': 'http://json-schema.org/draft-04/schema#',
	  'id': '/',
	  'type': 'object',
	  'properties': {
	    'amount': {
	      'id': 'amount',
	      'type': 'integer'
	    },
	    'currency': {
	      'id': 'currency',
	      'type': 'string'
	    },
	    'givenName': {
	      'id': 'givenName',
	      'type': 'string'
	    },
	    'gwid': {
	      'id': 'gwid',
	      'type': 'string'
	    },
	    'familyName': {
	      'id': 'familyName',
	      'type': 'string'
	    },
	    'address1': {
	      'id': 'address1',
	      'type': 'string'
	    },
	    'city': {
	      'id': 'city',
	      'type': 'string'
	    },
	    'state': {
	      'id': 'state',
	      'type': 'string'
	    },
	    'zip': {
	      'id': 'zip',
	      'type': 'string'
	    },
	    'country': {
	      'id': 'country',
	      'type': 'string'
	    },
	    'email': {
	      'id': 'email',
	      'type': 'string'
	    },
	    'phone': {
	      'id': 'phone',
	      'type': 'string'
	    },
	    'employer': {
	      'id': 'employer',
	      'type': 'string'
	    },
	    'occupation': {
	      'id': 'occupation',
	      'type': 'string'
	    },
	    'ccNum': {
	      'id': 'ccNum',
	      'type': 'string'
	    },
	    'ccExpMonth': {
	      'id': 'ccExpMonth',
	      'type': 'integer'
	    },
	    'ccExpYear': {
	      'id': 'ccExpYear',
	      'type': 'integer'
	    },
	    'ccCvc': {
	      'id': 'ccCvc',
	      'type': 'string'
	    },
	    'agreeToTerms': {
	      'id': 'agreeToTerms',
	      'type': 'boolean'
	    }
	  },
	  'required': ['address1', 'agreeToTerms', 'ccCvc', 'ccExpMonth', 'ccExpYear', 'ccNum', 'city', 'country', 'email', 'employer', 'familyName', 'givenName', 'gwid', 'occupation', 'phone', 'state', 'zip']
	});

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props */
	
	exports.default = (0, _freeze2.default)({
	  '$schema': 'http://json-schema.org/draft-04/schema#',
	  'id': '/',
	  'type': 'object',
	  'properties': {
	    'amount': {
	      'id': 'amount',
	      'type': 'integer'
	    },
	    'currency': {
	      'id': 'currency',
	      'type': 'string'
	    },
	    'tags': {
	      'id': 'tags',
	      'type': 'object'
	    },
	    'submittingUrl': {
	      'id': 'submittingUrl',
	      'type': 'string'
	    },
	    'emailTemplate': {
	      'id': 'emailTemplate',
	      'type': 'string'
	    },
	    'gwid': {
	      'id': 'gwid',
	      'type': 'string'
	    }
	  },
	  'required': ['amount', 'gwid']
	});

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _getPrototypeOf = __webpack_require__(172);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(236);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(237);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _Payment2 = __webpack_require__(244);
	
	var _Payment3 = _interopRequireDefault(_Payment2);
	
	var _donation = __webpack_require__(270);
	
	var _donation2 = _interopRequireDefault(_donation);
	
	var _utils = __webpack_require__(228);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {String} - API endpoint for resource */
	var ENDPOINT_SUBSCRIPTION = 'subscriptions';
	
	/**
	 * Create and view subscriptions
	 *
	 * list(opts) - get a filtered list of subscriptions
	 * create(subscription) - create a new subscription
	 * fetch(id) - fetch a subscription object
	 *
	 */
	
	var Subscription = function (_Payment) {
	  (0, _inherits3.default)(Subscription, _Payment);
	
	  function Subscription() {
	    (0, _classCallCheck3.default)(this, Subscription);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Subscription).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Subscription, [{
	    key: 'list',
	
	    /**
	     * Fetch a collection of Subscription objects for a specific gwid. We try
	     * to enforce the inclusion of a gwid if one is present in CONFIG_AUTH
	     *
	     * @param {Object} opts
	     * @param {String} opts.gwid - gwid is required
	     * @param {String} [opts.email] - filter on email
	     * @param {Number} [opts.page] - page number
	     * @param {Number} [opts.perPage] - subscriptions per page
	     * @return {Promise}
	     */
	    value: function list() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var params = (0, _utils.only)(['gwid', 'email', 'page', 'perPage'], this.attachIdentity(opts));
	
	      // Allow opts to override the gwid from config
	      if ((0, _utils.has)(opts, 'gwid')) {
	        params.gwid = opts.gwid;
	      }
	
	      // Max 50 p/page
	      if ((0, _utils.has)(opts, 'perPage')) {
	        params.perPage = (0, _utils.max)(opts.perPage);
	      }
	
	      // Failsafe to force gwid property into place no matter what
	      if (!(0, _utils.has)(params, 'gwid')) {
	        params.gwid = undefined;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_SUBSCRIPTION);
	      return this.fetchCollection(url, params);
	    }
	
	    /**
	     * Fetch a list of all donations made for a subscription
	     *
	     * @param {String} id - subscription id
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'listDonations',
	    value: function listDonations() {
	      var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      // Must have an id
	
	      var _validateId = this.validateId(id);
	
	      var _validateId2 = (0, _slicedToArray3.default)(_validateId, 2);
	
	      var idv = _validateId2[0];
	      var idp = _validateId2[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_SUBSCRIPTION, id, 'donations');
	      return this.fetchCollection(url);
	    }
	
	    /**
	     * Fetch a single Subscription object
	     *
	     * @param {String} id - subscription id
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetch',
	    value: function fetch() {
	      var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      // Must have an id
	
	      var _validateId3 = this.validateId(id);
	
	      var _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2);
	
	      var idv = _validateId4[0];
	      var idp = _validateId4[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_SUBSCRIPTION, id);
	      return this.fetchCollection(url);
	    }
	
	    /**
	     * POST a subscription record to the API
	     *
	     * The passed in form object will be validated. If it fails, a mock response
	     * with any errors will be sent back in a rejected Promise. This is to present
	     * the least amount of surprise to the developer.
	     *
	     * Note: All of the values in the object passed to the method should have had
	     * their types coerced already or validation will fail.
	     *
	     * @example
	     * // validation fail
	     * supporter.create({}).catch((err) => console.log(err));
	     * // => { status: 400, data: { error: { valid: false, ... } } ... }
	     *
	     * @param {Object} [subscription]
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'create',
	    value: function create() {
	      var subscription = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      // Make sure the interval is correct if its set
	
	      var _validateInterval = this.validateInterval(subscription.interval);
	
	      var _validateInterval2 = (0, _slicedToArray3.default)(_validateInterval, 2);
	
	      var intervalv = _validateInterval2[0];
	      var intervalp = _validateInterval2[1];
	
	      if (!intervalv) {
	        return intervalp;
	      }
	
	      var checkSubscription = this.validatePayment(subscription, _donation2.default);
	
	      // Return a mock error response with validation errors
	      if (checkSubscription.valid === false) {
	        var response = this.http.generateErrorResponse(checkSubscription);
	        return _promise2.default.reject(response);
	      }
	
	      var _subscription = this.attachIdentity(subscription);
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_SUBSCRIPTION);
	      return this.http.post(url, _subscription);
	    }
	
	    /**
	     * Delete (cancel) a subscription
	     *
	     * Note: Subscriptions can be cancelled on a date in the future by passing
	     * additional arguments. Only Subscriptions created with a GWID can be
	     * cancelled through the API, and only the user that owns the Subscription
	     * can cancel it.
	     *
	     * @example
	     * // Cancel subscription abc123 today
	     * del('abc123');
	     *
	     * // Set a cancellation date of Oct 13, 2015 for subscription abc123
	     * del('abc123', 2015, 10, 13)
	     *
	     * @param {String} id - subscription id
	     * @param {...time<number>} [time] - year, month, day for a specific epoch
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'del',
	    value: function del() {
	      var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      // Must have an id
	
	      var _validateId5 = this.validateId(id);
	
	      var _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2);
	
	      var idv = _validateId6[0];
	      var idp = _validateId6[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      for (var _len = arguments.length, time = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        time[_key - 1] = arguments[_key];
	      }
	
	      var date = _utils.epoch.apply(null, time);
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_SUBSCRIPTION, id);
	      return this.http.put(url, { cancelled: date });
	    }
	
	    /**
	     * Update the amount of a subscription. Return error of the amount is not set.
	     *
	     * @param {String} id - subscription id
	     * @param {Number} amount - new amount of subscription
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'updateAmount',
	    value: function updateAmount(id, amount) {
	      // Must have an id
	      var newAmount = Number(amount);
	
	      var _validateId7 = this.validateId(id);
	
	      var _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2);
	
	      var idv = _validateId8[0];
	      var idp = _validateId8[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var _validateArg = this.validateArg(amount, 'amount');
	
	      var _validateArg2 = (0, _slicedToArray3.default)(_validateArg, 2);
	
	      var amountv = _validateArg2[0];
	      var amountp = _validateArg2[1];
	
	      if (!amountv) {
	        return amountp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_SUBSCRIPTION, id);
	      return this.http.put(url, { amount: newAmount });
	    }
	  }]);
	  return Subscription;
	}(_Payment3.default);
	
	exports.default = Subscription;

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(272);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(50);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Http = __webpack_require__(49);
	
	var _Http2 = _interopRequireDefault(_Http);
	
	var _Dictionary = __webpack_require__(26);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _SchemaUtils = __webpack_require__(262);
	
	var _SchemaUtils2 = _interopRequireDefault(_SchemaUtils);
	
	var _utils = __webpack_require__(228);
	
	var _supporter = __webpack_require__(295);
	
	var _supporter2 = _interopRequireDefault(_supporter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {String} - Top level endpoint */
	var NAMESPACE = 'bucket';
	
	/** @type {String} - API endpoints for resource */
	var ENDPOINT_SUPPORTERS = 'supporters';
	
	/**
	 * Manage Supporter endpoint. Supporter POSTs are validated before a request
	 * is made to the API.
	 */
	
	var Supporter = function () {
	  /**
	   * @param {Dictionary} [config] - configuration dictionary
	   * @param {Http} http
	   */
	
	  function Supporter(config, http) {
	    (0, _classCallCheck3.default)(this, Supporter);
	
	    /** @type {Dictionary} */
	    this.config = config && config instanceof _Dictionary2.default ? config : new _Dictionary2.default();
	
	    // Resource must have an Http instance
	    if (!http || http instanceof _Http2.default === false) {
	      throw new Error('Supporter requires Http');
	    }
	
	    /** @type {Http} */
	    this.http = http;
	
	    /** @type {Object} */
	    this.schema = _supporter2.default;
	
	    /** @type {SchemaUtils} */
	    this.schemaUtils = _SchemaUtils2.default;
	  }
	
	  /**
	   * Validate payload object and return object with validation status and any
	   * errors that crop up
	   *
	   * @example
	   *
	   * validateForm({foo: 1, source: 'foo', email: 'bar'});
	   * // => { valid: false, fields: ['email'], msg: ['Invalid email address']}
	   *
	   *
	   * validateForm({source: 'foo', email: 'bar@baz.biz'});
	   * // => { valid: true, fields: [], msg: [] }
	   *
	   * @param {Object} form
	   * @return {Object}
	   */
	
	
	  (0, _createClass3.default)(Supporter, [{
	    key: 'validateForm',
	    value: function validateForm() {
	      var _this = this;
	
	      var form = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var out = [true];
	      var valid = this.schemaUtils.validateSchema(form, this.schema);
	
	      if (valid.length > 0) {
	        (function () {
	          var ret = _this.http.generateErrorObject();
	          valid.forEach(function (err) {
	            ret.msg.push(err.message);
	            ret.fields.push(_this.schemaUtils.extractFieldByError(err));
	          });
	          out = [false, _promise2.default.reject(_this.http.generateErrorResponse(ret))];
	        })();
	      }
	      return out;
	    }
	
	    /**
	     * POST a supporter record to the API
	     *
	     * The passed in form object will be validated. If it fails, a mock response
	     * with any errors will be sent back in a rejected Promise. This is to present
	     * the least amount of surprise to the developer.
	     *
	     * @example
	     * // validation fail
	     * supporter.create({}).catch((err) => console.log(err));
	     * // => { status: 400, data: { error: { valid: false, ... } } ... }
	     *
	     * @param {Object} form
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'create',
	    value: function create() {
	      var form = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      // Return a mock error response with validation errors
	
	      var _validateForm = this.validateForm(form);
	
	      var _validateForm2 = (0, _slicedToArray3.default)(_validateForm, 2);
	
	      var cf = _validateForm2[0];
	      var cp = _validateForm2[1];
	
	      if (!cf) {
	        return cp;
	      }
	
	      var url = (0, _utils.urlJoin)(NAMESPACE);
	      return this.http.post(url, form);
	    }
	
	    /**
	     * Fetch a collection of Supporter objects.
	     * Pagination information can be sent as well. Opts are whitelisted
	     * to only the fields listed.
	     *
	     * @param {Object} opts
	     * @param {Number} [opts.page] - page number
	     * @param {Number} [opts.perPage] - donations per page
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'list',
	    value: function list() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _opts = (0, _utils.only)(['page', 'perPage'], opts);
	      return this.http.get((0, _utils.urlJoin)(NAMESPACE, ENDPOINT_SUPPORTERS), { params: _opts });
	    }
	  }]);
	  return Supporter;
	}();
	
	exports.default = Supporter;

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _freeze = __webpack_require__(87);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint-disable quote-props */
	
	exports.default = (0, _freeze2.default)({
	  '$schema': 'http://json-schema.org/draft-04/schema#',
	  'id': '/',
	  'type': 'object',
	  'properties': {
	    'address1': {
	      'id': 'address1',
	      'type': 'string'
	    },
	    'address2': {
	      'id': 'address2',
	      'type': 'string'
	    },
	    'city': {
	      'id': 'city',
	      'type': 'string'
	    },
	    'country': {
	      'id': 'country',
	      'type': 'string'
	    },
	    'email': {
	      'id': 'email',
	      'type': 'string'
	    },
	    'externalId': {
	      'id': 'externalId',
	      'type': 'string'
	    },
	    'familyName': {
	      'id': 'familyName',
	      'type': 'string'
	    },
	    'givenName': {
	      'id': 'givenName',
	      'type': 'string'
	    },
	    'postalCode': {
	      'id': 'postalCode',
	      'type': 'string'
	    },
	    'source': {
	      'id': 'source',
	      'type': 'string'
	    },
	    'state': {
	      'id': 'state',
	      'type': 'string'
	    },
	    'tags': {
	      'id': 'tags',
	      'type': 'object',
	      'properties': {}
	    }
	  },
	  'required': []
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=groundwork.js.map