/*! groundwork.js ab1dff1 | (c) 2016 Timshel / The Groundwork - BSD Licence https://opensource.org/licenses/BSD-3-Clause */
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
return webpackJsonpGroundwork([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(336);


/***/ },

/***/ 336:
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
	
	var _donation = __webpack_require__(291);
	
	var _donation2 = _interopRequireDefault(_donation);
	
	var _utils = __webpack_require__(283);
	
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
	    return (0, _possibleConstructorReturn3.default)(this, (Subscription.__proto__ || (0, _getPrototypeOf2.default)(Subscription)).apply(this, arguments));
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
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	      // Must have an id
	      var _validateId3 = this.validateId(id),
	          _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2),
	          idv = _validateId4[0],
	          idp = _validateId4[1];
	
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
	      var subscription = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      // Make sure the interval is correct if its set
	      var _validateInterval = this.validateInterval(subscription.interval),
	          _validateInterval2 = (0, _slicedToArray3.default)(_validateInterval, 2),
	          intervalv = _validateInterval2[0],
	          intervalp = _validateInterval2[1];
	
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
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	      // Must have an id
	      var _validateId5 = this.validateId(id),
	          _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2),
	          idv = _validateId6[0],
	          idp = _validateId6[1];
	
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
	
	      var _validateId7 = this.validateId(id),
	          _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2),
	          idv = _validateId8[0],
	          idp = _validateId8[1];
	
	      if (!idv) {
	        return idp;
	      }
	
	      var _validateArg = this.validateArg(amount, 'amount'),
	          _validateArg2 = (0, _slicedToArray3.default)(_validateArg, 2),
	          amountv = _validateArg2[0],
	          amountp = _validateArg2[1];
	
	      if (!amountv) {
	        return amountp;
	      }
	
	      var url = (0, _utils.urlJoin)(this.namespace, ENDPOINT_SUBSCRIPTION, id);
	      return this.http.put(url, { amount: newAmount });
	    }
	  }]);
	  return Subscription;
	}(_Payment3.default);
	
	Subscription.service = 'subscriptions';
	exports.default = Subscription;

/***/ }

})
});
;
//# sourceMappingURL=Subscription.js.map