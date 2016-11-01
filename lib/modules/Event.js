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
return webpackJsonpGroundwork([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(292);


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

/***/ }

})
});
;
//# sourceMappingURL=Event.js.map