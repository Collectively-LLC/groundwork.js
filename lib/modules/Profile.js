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
return webpackJsonpGroundwork([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(331);


/***/ },

/***/ 331:
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
	
	var _cloneDeep2 = __webpack_require__(263);
	
	var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);
	
	var _Dictionary = __webpack_require__(278);
	
	var _Dictionary2 = _interopRequireDefault(_Dictionary);
	
	var _SchemaUtils = __webpack_require__(281);
	
	var _SchemaUtils2 = _interopRequireDefault(_SchemaUtils);
	
	var _profile = __webpack_require__(332);
	
	var _profile2 = _interopRequireDefault(_profile);
	
	var _utils = __webpack_require__(283);
	
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
	    if (!http) {
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
	
	  /** @type {String} */
	
	
	  (0, _createClass3.default)(Profile, [{
	    key: 'validateProfile',
	    value: function validateProfile() {
	      var _this = this;
	
	      var profile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      var _schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.schema;
	
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
	      var gwid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
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
	      var profile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      // Return a mock error response with validation errors
	      var _validateProfile = this.validateProfile(profile),
	          _validateProfile2 = (0, _slicedToArray3.default)(_validateProfile, 2),
	          cf = _validateProfile2[0],
	          cp = _validateProfile2[1];
	
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
	      var gwid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var profile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      // Return a mock error response with validation errors
	      var putSchema = (0, _cloneDeep3.default)(this.schema);
	      delete putSchema.required; // No required fields in PUTs
	
	      var _validateProfile3 = this.validateProfile(profile, putSchema),
	          _validateProfile4 = (0, _slicedToArray3.default)(_validateProfile3, 2),
	          cf = _validateProfile4[0],
	          cp = _validateProfile4[1];
	
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
	      var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
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
	      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	      var url = (0, _utils.urlJoin)(NAMESPACE, ENDPOINT_PASSWORD_RESET, token);
	      return this.http.put(url, { token: token, password: password });
	    }
	  }]);
	  return Profile;
	}();
	
	Profile.service = 'profiles';
	exports.default = Profile;

/***/ },

/***/ 332:
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
	};

/***/ }

})
});
;
//# sourceMappingURL=Profile.js.map