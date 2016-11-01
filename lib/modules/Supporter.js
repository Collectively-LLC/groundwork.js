/*! groundwork.js 1.4.0 | (c) 2016 Timshel / The Groundwork - BSD Licence https://opensource.org/licenses/BSD-3-Clause */
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
return webpackJsonpGroundwork([6],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(337);


/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(293);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(2);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(71);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(72);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Dictionary = __webpack_require__(278);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _SchemaUtils = __webpack_require__(281);
	
	var _SchemaUtils2 = _interopRequireDefault(_SchemaUtils);
	
	var _utils = __webpack_require__(283);
	
	var _supporter = __webpack_require__(338);
	
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
	    if (!http) {
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
	
	  /** @type {String} */
	
	
	  (0, _createClass3.default)(Supporter, [{
	    key: 'validateForm',
	    value: function validateForm() {
	      var _this = this;
	
	      var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	      var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      // Return a mock error response with validation errors
	      var _validateForm = this.validateForm(form),
	          _validateForm2 = (0, _slicedToArray3.default)(_validateForm, 2),
	          cf = _validateForm2[0],
	          cp = _validateForm2[1];
	
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
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      var _opts = (0, _utils.only)(['page', 'perPage'], opts);
	      return this.http.get((0, _utils.urlJoin)(NAMESPACE, ENDPOINT_SUPPORTERS), { params: _opts });
	    }
	  }]);
	  return Supporter;
	}();
	
	Supporter.service = 'supporters';
	exports.default = Supporter;

/***/ },

/***/ 338:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable quote-props */
	
	exports.default = {
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
	};

/***/ }

})
});
;
//# sourceMappingURL=Supporter.js.map