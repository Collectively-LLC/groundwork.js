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
return webpackJsonpGroundwork([9],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(341);


/***/ },

/***/ 1:
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

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ENDPOINT_HOST_UNSUBSCRIBE = exports.ENDPOINT_TICKET = exports.ENDPOINT_MESSAGE = exports.ENDPOINT_INVITATION = exports.ENDPOINT_CATEGORY = exports.ENDPOINT_EVENT = exports.NAMESPACE = undefined;
	
	var _typeof2 = __webpack_require__(77);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
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
	
	var _EventCategory = __webpack_require__(300);
	
	var _EventCategory2 = _interopRequireDefault(_EventCategory);
	
	var _EventInvitation = __webpack_require__(302);
	
	var _EventInvitation2 = _interopRequireDefault(_EventInvitation);
	
	var _EventMessage = __webpack_require__(304);
	
	var _EventMessage2 = _interopRequireDefault(_EventMessage);
	
	var _EventTicket = __webpack_require__(306);
	
	var _EventTicket2 = _interopRequireDefault(_EventTicket);
	
	var _event = __webpack_require__(308);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _utils = __webpack_require__(283);
	
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
	    if (!http) {
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
	
	  /** @type {String} */
	
	
	  (0, _createClass3.default)(Event, [{
	    key: 'validatePayload',
	    value: function validatePayload() {
	      var _this = this;
	
	      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
	      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
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
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	      var _validateId = this.validateId(eventId, 'eventId'),
	          _validateId2 = (0, _slicedToArray3.default)(_validateId, 2),
	          ev = _validateId2[0],
	          ep = _validateId2[1];
	
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
	      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      var _validatePayload = this.validatePayload(event, _event2.default),
	          _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2),
	          eventv = _validatePayload2[0],
	          eventp = _validatePayload2[1];
	
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
	      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var _validateId3 = this.validateId(eventId, 'eventId'),
	          _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2),
	          ev = _validateId4[0],
	          ep = _validateId4[1];
	
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
	      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var _validateId5 = this.validateId(eventId, 'eventId'),
	          _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2),
	          ev = _validateId6[0],
	          ep = _validateId6[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validatePayload3 = this.validatePayload(event, _event2.default),
	          _validatePayload4 = (0, _slicedToArray3.default)(_validatePayload3, 2),
	          eventv = _validatePayload4[0],
	          eventp = _validatePayload4[1];
	
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
	      var _validateId7 = this.validateId(eventId, 'eventId'),
	          _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2),
	          ev = _validateId8[0],
	          ep = _validateId8[1];
	
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
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var valid = (0, _utils.validEmail)(email) && (typeof opts === 'undefined' ? 'undefined' : (0, _typeof3.default)(opts)) === 'object';
	
	      if (!valid) {
	        var response = this.http.generateErrorResponse({
	          valid: false,
	          fields: ['email', 'opts'],
	          msg: ['Valid `email` and `opts` are required. Passed email (' + email + ').\n               and opts (' + opts + ')']
	        });
	
	        return _promise2.default.reject(response);
	      }
	
	      var invitationId = opts.invitationId,
	          messageId = opts.messageId;
	
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
	
	Event.service = 'events';
	
	
	(0, _utils.mixin)(Event, _EventCategory2.default, _EventInvitation2.default, _EventMessage2.default, _EventTicket2.default);
	
	exports.default = Event;

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(293);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(71);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(72);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _utils = __webpack_require__(283);
	
	var _Event = __webpack_require__(292);
	
	var _eventCategory = __webpack_require__(301);
	
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
	      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var _validateId = this.validateId(eventId, 'eventId'),
	          _validateId2 = (0, _slicedToArray3.default)(_validateId, 2),
	          ev = _validateId2[0],
	          ep = _validateId2[1];
	
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
	      var _validateId3 = this.validateId(eventId, 'eventId'),
	          _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2),
	          ev = _validateId4[0],
	          ep = _validateId4[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId5 = this.validateId(categoryId, 'categoryId'),
	          _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2),
	          cv = _validateId6[0],
	          cp = _validateId6[1];
	
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
	      var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var _validateId7 = this.validateId(eventId, 'eventId'),
	          _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2),
	          ev = _validateId8[0],
	          ep = _validateId8[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validatePayload = this.validatePayload(category, _eventCategory2.default),
	          _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2),
	          categoryv = _validatePayload2[0],
	          categoryp = _validatePayload2[1];
	
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
	      var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	      var _validateId9 = this.validateId(eventId, 'eventId'),
	          _validateId10 = (0, _slicedToArray3.default)(_validateId9, 2),
	          ev = _validateId10[0],
	          ep = _validateId10[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId11 = this.validateId(categoryId, 'categoryId'),
	          _validateId12 = (0, _slicedToArray3.default)(_validateId11, 2),
	          cv = _validateId12[0],
	          cp = _validateId12[1];
	
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
	      var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	      var _validateId13 = this.validateId(eventId, 'eventId'),
	          _validateId14 = (0, _slicedToArray3.default)(_validateId13, 2),
	          ev = _validateId14[0],
	          ep = _validateId14[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId15 = this.validateId(categoryId, 'categoryId'),
	          _validateId16 = (0, _slicedToArray3.default)(_validateId15, 2),
	          cv = _validateId16[0],
	          cp = _validateId16[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validatePayload3 = this.validatePayload(category, _eventCategory2.default),
	          _validatePayload4 = (0, _slicedToArray3.default)(_validatePayload3, 2),
	          categoryv = _validatePayload4[0],
	          categoryp = _validatePayload4[1];
	
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
	      var _validateId17 = this.validateId(eventId, 'eventId'),
	          _validateId18 = (0, _slicedToArray3.default)(_validateId17, 2),
	          ev = _validateId18[0],
	          ep = _validateId18[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId19 = this.validateId(categoryId, 'categoryId'),
	          _validateId20 = (0, _slicedToArray3.default)(_validateId19, 2),
	          cv = _validateId20[0],
	          cp = _validateId20[1];
	
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

/***/ 301:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable quote-props, quotes */
	
	exports.default = {
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
	};

/***/ },

/***/ 302:
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
	
	var _utils = __webpack_require__(283);
	
	var _Event = __webpack_require__(292);
	
	var _eventInvitation = __webpack_require__(303);
	
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
	      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var _validateId = this.validateId(eventId, 'eventId'),
	          _validateId2 = (0, _slicedToArray3.default)(_validateId, 2),
	          ev = _validateId2[0],
	          ep = _validateId2[1];
	
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
	      var _validateId3 = this.validateId(eventId, 'eventId'),
	          _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2),
	          ev = _validateId4[0],
	          ep = _validateId4[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId5 = this.validateId(invitationId, 'invitationId'),
	          _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2),
	          iv = _validateId6[0],
	          ip = _validateId6[1];
	
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
	      var invitations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	      var _validateId7 = this.validateId(eventId, 'eventId'),
	          _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2),
	          ev = _validateId8[0],
	          ep = _validateId8[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validatePayload = this.validatePayload(invitations, _eventInvitation2.default),
	          _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2),
	          iv = _validatePayload2[0],
	          ip = _validatePayload2[1];
	
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
	      var _validateId9 = this.validateId(eventId, 'eventId'),
	          _validateId10 = (0, _slicedToArray3.default)(_validateId9, 2),
	          ev = _validateId10[0],
	          ep = _validateId10[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId11 = this.validateId(invitationId, 'invitationId'),
	          _validateId12 = (0, _slicedToArray3.default)(_validateId11, 2),
	          iv = _validateId12[0],
	          ip = _validateId12[1];
	
	      if (!iv) {
	        return ip;
	      }
	
	      var _validateStatus = this.validateStatus(status),
	          _validateStatus2 = (0, _slicedToArray3.default)(_validateStatus, 2),
	          sv = _validateStatus2[0],
	          sp = _validateStatus2[1];
	
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
	      var _validateId13 = this.validateId(eventId, 'eventId'),
	          _validateId14 = (0, _slicedToArray3.default)(_validateId13, 2),
	          ev = _validateId14[0],
	          ep = _validateId14[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId15 = this.validateId(invitationId, 'invitationId'),
	          _validateId16 = (0, _slicedToArray3.default)(_validateId15, 2),
	          iv = _validateId16[0],
	          ip = _validateId16[1];
	
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

/***/ 303:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable quote-props, quotes */
	
	exports.default = {
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
	};

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(293);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(71);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(72);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _utils = __webpack_require__(283);
	
	var _Event = __webpack_require__(292);
	
	var _eventMessage = __webpack_require__(305);
	
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
	      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var _validateId = this.validateId(eventId, 'eventId'),
	          _validateId2 = (0, _slicedToArray3.default)(_validateId, 2),
	          ev = _validateId2[0],
	          ep = _validateId2[1];
	
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
	      var _validateId3 = this.validateId(eventId, 'eventId'),
	          _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2),
	          ev = _validateId4[0],
	          ep = _validateId4[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId5 = this.validateId(messageId, 'messageId'),
	          _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2),
	          mv = _validateId6[0],
	          mp = _validateId6[1];
	
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
	      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var _validateId7 = this.validateId(eventId, 'eventId'),
	          _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2),
	          ev = _validateId8[0],
	          ep = _validateId8[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validatePayload = this.validatePayload(message, _eventMessage2.default),
	          _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2),
	          mv = _validatePayload2[0],
	          mp = _validatePayload2[1];
	
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
	      var _validateId9 = this.validateId(eventId, 'eventId'),
	          _validateId10 = (0, _slicedToArray3.default)(_validateId9, 2),
	          ev = _validateId10[0],
	          ep = _validateId10[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId11 = this.validateId(messageId, 'messageId'),
	          _validateId12 = (0, _slicedToArray3.default)(_validateId11, 2),
	          mv = _validateId12[0],
	          mp = _validateId12[1];
	
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

/***/ 305:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable quote-props, quotes */
	
	exports.default = {
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
	};

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(293);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(71);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(72);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _utils = __webpack_require__(283);
	
	var _Event = __webpack_require__(292);
	
	var _eventTicket = __webpack_require__(307);
	
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
	      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	      var _validateId = this.validateId(eventId, 'eventId'),
	          _validateId2 = (0, _slicedToArray3.default)(_validateId, 2),
	          ev = _validateId2[0],
	          ep = _validateId2[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId3 = this.validateId(categoryId, 'categoryId'),
	          _validateId4 = (0, _slicedToArray3.default)(_validateId3, 2),
	          cv = _validateId4[0],
	          cp = _validateId4[1];
	
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
	      var _validateId5 = this.validateId(eventId, 'eventId'),
	          _validateId6 = (0, _slicedToArray3.default)(_validateId5, 2),
	          ev = _validateId6[0],
	          ep = _validateId6[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId7 = this.validateId(categoryId, 'categoryId'),
	          _validateId8 = (0, _slicedToArray3.default)(_validateId7, 2),
	          cv = _validateId8[0],
	          cp = _validateId8[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validateId9 = this.validateId(ticketId, 'ticketId'),
	          _validateId10 = (0, _slicedToArray3.default)(_validateId9, 2),
	          tv = _validateId10[0],
	          tp = _validateId10[1];
	
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
	      var ticket = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	      var _validateId11 = this.validateId(eventId, 'eventId'),
	          _validateId12 = (0, _slicedToArray3.default)(_validateId11, 2),
	          ev = _validateId12[0],
	          ep = _validateId12[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId13 = this.validateId(categoryId, 'categoryId'),
	          _validateId14 = (0, _slicedToArray3.default)(_validateId13, 2),
	          cv = _validateId14[0],
	          cp = _validateId14[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validatePayload = this.validatePayload(ticket, _eventTicket2.default),
	          _validatePayload2 = (0, _slicedToArray3.default)(_validatePayload, 2),
	          ticketv = _validatePayload2[0],
	          ticketp = _validatePayload2[1];
	
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
	      var ticket = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	      var _validateId15 = this.validateId(eventId, 'eventId'),
	          _validateId16 = (0, _slicedToArray3.default)(_validateId15, 2),
	          ev = _validateId16[0],
	          ep = _validateId16[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId17 = this.validateId(categoryId, 'categoryId'),
	          _validateId18 = (0, _slicedToArray3.default)(_validateId17, 2),
	          cv = _validateId18[0],
	          cp = _validateId18[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validateId19 = this.validateId(ticketId, 'ticketId'),
	          _validateId20 = (0, _slicedToArray3.default)(_validateId19, 2),
	          tv = _validateId20[0],
	          tp = _validateId20[1];
	
	      if (!tv) {
	        return tp;
	      }
	
	      var _validatePayload3 = this.validatePayload(ticket, _eventTicket2.default),
	          _validatePayload4 = (0, _slicedToArray3.default)(_validatePayload3, 2),
	          ticketv = _validatePayload4[0],
	          ticketp = _validatePayload4[1];
	
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
	      var ticket = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	      var _validateId21 = this.validateId(eventId, 'eventId'),
	          _validateId22 = (0, _slicedToArray3.default)(_validateId21, 2),
	          ev = _validateId22[0],
	          ep = _validateId22[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId23 = this.validateId(categoryId, 'categoryId'),
	          _validateId24 = (0, _slicedToArray3.default)(_validateId23, 2),
	          cv = _validateId24[0],
	          cp = _validateId24[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validateId25 = this.validateId(ticketId, 'ticketId'),
	          _validateId26 = (0, _slicedToArray3.default)(_validateId25, 2),
	          tv = _validateId26[0],
	          tp = _validateId26[1];
	
	      if (!tv) {
	        return tp;
	      }
	
	      var _validatePayload5 = this.validatePayload(ticket, _eventTicket2.default),
	          _validatePayload6 = (0, _slicedToArray3.default)(_validatePayload5, 2),
	          ticketv = _validatePayload6[0],
	          ticketp = _validatePayload6[1];
	
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
	      var _validateId27 = this.validateId(eventId, 'eventId'),
	          _validateId28 = (0, _slicedToArray3.default)(_validateId27, 2),
	          ev = _validateId28[0],
	          ep = _validateId28[1];
	
	      if (!ev) {
	        return ep;
	      }
	
	      var _validateId29 = this.validateId(categoryId, 'categoryId'),
	          _validateId30 = (0, _slicedToArray3.default)(_validateId29, 2),
	          cv = _validateId30[0],
	          cp = _validateId30[1];
	
	      if (!cv) {
	        return cp;
	      }
	
	      var _validateId31 = this.validateId(ticketId, 'ticketId'),
	          _validateId32 = (0, _slicedToArray3.default)(_validateId31, 2),
	          tv = _validateId32[0],
	          tp = _validateId32[1];
	
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

/***/ 307:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable quote-props, quotes */
	
	exports.default = {
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
	};

/***/ },

/***/ 308:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable quote-props, quotes */
	
	exports.default = {
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
	};

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

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Groundwork = __webpack_require__(309);
	
	var _Groundwork2 = _interopRequireDefault(_Groundwork);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function groundworkFactory(services) {
	  return function lambda(opts) {
	    return new _Groundwork2.default(services, opts);
	  };
	}
	
	exports.default = groundworkFactory;

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Donation = __webpack_require__(1);
	
	var _Donation2 = _interopRequireDefault(_Donation);
	
	var _Event = __webpack_require__(292);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Profile = __webpack_require__(331);
	
	var _Profile2 = _interopRequireDefault(_Profile);
	
	var _Quickcard = __webpack_require__(333);
	
	var _Quickcard2 = _interopRequireDefault(_Quickcard);
	
	var _Subscription = __webpack_require__(336);
	
	var _Subscription2 = _interopRequireDefault(_Subscription);
	
	var _Supporter = __webpack_require__(337);
	
	var _Supporter2 = _interopRequireDefault(_Supporter);
	
	var _groundworkFactory = __webpack_require__(340);
	
	var _groundworkFactory2 = _interopRequireDefault(_groundworkFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Default build with all services included
	var Groundwork = (0, _groundworkFactory2.default)([_Donation2.default, _Event2.default, _Profile2.default, _Quickcard2.default, _Subscription2.default, _Supporter2.default]);
	
	module.exports = Groundwork;

/***/ }

})
});
;
//# sourceMappingURL=index.js.map