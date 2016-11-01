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
return webpackJsonpGroundwork([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(333);


/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(2);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _slicedToArray2 = __webpack_require__(293);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _getPrototypeOf = __webpack_require__(67);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(71);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(72);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(76);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(96);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _Payment2 = __webpack_require__(104);
	
	var _Payment3 = _interopRequireDefault(_Payment2);
	
	var _quickcard2 = __webpack_require__(334);
	
	var _quickcard3 = _interopRequireDefault(_quickcard2);
	
	var _quickcardPay = __webpack_require__(335);
	
	var _quickcardPay2 = _interopRequireDefault(_quickcardPay);
	
	var _utils = __webpack_require__(283);
	
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
	    return (0, _possibleConstructorReturn3.default)(this, (Quickcard.__proto__ || (0, _getPrototypeOf2.default)(Quickcard)).apply(this, arguments));
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
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	
	    /** @type {String} */
	
	  }, {
	    key: 'listDonations',
	    value: function listDonations() {
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	      // Must have an id
	      var _validateId = this.validateId(id),
	          _validateId2 = (0, _slicedToArray3.default)(_validateId, 2),
	          idv = _validateId2[0],
	          idp = _validateId2[1];
	
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
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	      // Must have an id
	      var _validateId3 = this.validateId(id),
	          _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2),
	          idv = _validateId4[0],
	          idp = _validateId4[1];
	
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
	      var quickcard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	      for (var _len = arguments.length, time = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        time[_key - 1] = arguments[_key];
	      }
	
	      var date = _utils.epoch.apply(null, time);
	
	      // Must have an id
	
	      var _validateId5 = this.validateId(id),
	          _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2),
	          idv = _validateId6[0],
	          idp = _validateId6[1];
	
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
	      var payment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      // Must have an id
	      var _validateId7 = this.validateId(id),
	          _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2),
	          idv = _validateId8[0],
	          idp = _validateId8[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var _payment = this.attachIdentity(payment);
	
	      // Validate payment and reject if errors
	
	      var _validateSchema = this.validateSchema(_payment, _quickcardPay2.default),
	          _validateSchema2 = (0, _slicedToArray3.default)(_validateSchema, 2),
	          pv = _validateSchema2[0],
	          pp = _validateSchema2[1];
	
	      if (!pv) {
	        return pp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_QUICKCARD, id, 'donations');
	
	      return this.http.post(url, _payment);
	    }
	  }]);
	  return Quickcard;
	}(_Payment3.default);
	
	Quickcard.service = 'quickcards';
	exports.default = Quickcard;

/***/ },

/***/ 334:
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
	};

/***/ },

/***/ 335:
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
	};

/***/ }

})
});
;
//# sourceMappingURL=Quickcard.js.map