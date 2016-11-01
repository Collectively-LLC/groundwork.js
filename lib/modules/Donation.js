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
return webpackJsonpGroundwork([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(2);
	
	var _promise2 = _interopRequireDefault(_promise);
	
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
	
	var _donation2 = __webpack_require__(291);
	
	var _donation3 = _interopRequireDefault(_donation2);
	
	var _utils = __webpack_require__(283);
	
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
	    return (0, _possibleConstructorReturn3.default)(this, (Donation.__proto__ || (0, _getPrototypeOf2.default)(Donation)).apply(this, arguments));
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
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	
	    /** @type {String} */
	
	  }, {
	    key: 'fetch',
	    value: function fetch() {
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
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
	      var donation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	
	Donation.service = 'donations';
	exports.default = Donation;

/***/ }
])
});
;
//# sourceMappingURL=Donation.js.map