import Dictionary from "./Dictionary";
import SchemaUtils from "./SchemaUtils";
import EventCategory from "./EventCategory";
import EventInvitation from "./EventInvitation";
import EventMessage from "./EventMessage";
import EventTicket from "./EventTicket";
import eventSchema from "./schema/event";
import { mixin, only, urlJoin, validEmail } from "./utils";

/** @type {String} - API endpoint for resource */
export const NAMESPACE = "events";

/** @type {String} - API endpoint for event resource */
export const ENDPOINT_EVENT = "events";

/** @type {String} - API endpoint for category resource */
export const ENDPOINT_CATEGORY = "categories";

/** @type {String} - API endpoint for invitation resource */
export const ENDPOINT_INVITATION = "invitations";

/** @type {String} - API endpoint for message resource */
export const ENDPOINT_MESSAGE = "messages";

/** @type {String} - API endpoint for ticket resource */
export const ENDPOINT_TICKET = "tickets";

/** @type {String} - API endpoint for unsubscribing an email address */
export const ENDPOINT_HOST_UNSUBSCRIBE = "host-unsubscribe";

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
class Event {
  /** @type {String} */
  static service = "events";

  /**
   * @param {Dictionary} [config] - configuration dictionary
   * @param {Http} http - Http instance
   */
  constructor(config, http) {
    /** @type {Dictionary} */
    this.config = config && config instanceof Dictionary
      ? config
      : new Dictionary();

    // Resource must have an Http instance
    if (!http) {
      throw new Error("Event requires Http");
    }

    /** @type {Http} */
    this.http = http;

    /** @type {SchemaUtils} */
    this.schemaUtils = SchemaUtils;
  }

  /**
   * Validate a payload against a schema. If it fails then return a tuple
   * with a rejected Promise containing an error message.
   *
   * @param {Object} [payload]
   * @param {Object} schema
   * @return {Array}
   */
  validatePayload(payload = {}, schema) {
    let out = [true];
    const valid = this.schemaUtils.validateSchema(payload, schema);

    if (valid.length > 0) {
      const ret = this.http.generateErrorObject();
      valid.forEach(err => {
        ret.msg.push(err.message);
        ret.fields.push(this.schemaUtils.extractFieldByError(err));
      });
      out = [false, Promise.reject(this.http.generateErrorResponse(ret))];
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
  validateId(id, name = "") {
    let out = [true];

    if (
      typeof id !== "string" || id === null || id === undefined || id === false
    ) {
      const response = this.http.generateErrorResponse({
        valid: false,
        fields: [name],
        msg: [`Invalid ID: ${name}`]
      });
      out = [false, Promise.reject(response)];
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
  list(opts = {}) {
    const _opts = only(
      [
        "hostGwid",
        "isDeleted",
        "latitude",
        "longitude",
        "page",
        "perPage",
        "radius",
        "search",
        "startsBefore",
        "startsAfter"
      ],
      opts
    );

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT);
    return this.http.get(url, { params: _opts });
  }

  /**
   * Get a specific Event, by id
   *
   * @param  {String} eventId - id of event
   * @return {Promise}
   */
  fetch(eventId) {
    const [ev, ep] = this.validateId(eventId, "eventId");
    if (!ev) {
      return ep;
    }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId);
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
  create(event = {}) {
    const [eventv, eventp] = this.validatePayload(event, eventSchema);
    if (!eventv) {
      return eventp;
    }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT);
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
  update(eventId, event = {}) {
    const [ev, ep] = this.validateId(eventId, "eventId");
    if (!ev) {
      return ep;
    }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId);
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
  replace(eventId, event = {}) {
    const [ev, ep] = this.validateId(eventId, "eventId");
    if (!ev) {
      return ep;
    }

    const [eventv, eventp] = this.validatePayload(event, eventSchema);
    if (!eventv) {
      return eventp;
    }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId);
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
  del(eventId) {
    const [ev, ep] = this.validateId(eventId, "eventId");
    if (!ev) {
      return ep;
    }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId);
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
  listAllTickets(opts = {}) {
    const _opts = only(
      [
        "isRedeemed",
        "page",
        "perPage",
        "purchaserGwid",
        "startsBefore",
        "startsAfter"
      ],
      opts
    );

    const url = urlJoin(NAMESPACE, ENDPOINT_TICKET);
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
  unsubscribe(email, opts = {}) {
    const valid = validEmail(email) && typeof opts === "object";

    if (!valid) {
      const response = this.http.generateErrorResponse({
        valid: false,
        fields: ["email", "opts"],
        msg: [
          `Valid \`email\` and \`opts\` are required. Passed email (${email}).
               and opts (${opts})`
        ]
      });

      return Promise.reject(response);
    }

    const { invitationId, messageId } = opts;

    // Only allow users to use one type of ID to unsubscribe, not both
    if (invitationId && messageId) {
      const response = this.http.generateErrorResponse({
        valid: false,
        fields: ["invitationId", "messageId"],
        msg: ["Must unsubscribe via `invitationId` or `messageId`, not both."]
      });

      return Promise.reject(response);
    }

    const url = urlJoin(NAMESPACE, ENDPOINT_HOST_UNSUBSCRIBE);
    return this.http.get(url, { params: { email, invitationId, messageId } });
  }
}

mixin(Event, EventCategory, EventInvitation, EventMessage, EventTicket);

export default Event;
