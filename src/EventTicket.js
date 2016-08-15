import { only, urlJoin } from './utils';
import { NAMESPACE, ENDPOINT_EVENT, ENDPOINT_CATEGORY, ENDPOINT_TICKET } from './Event';
import eventTicketSchema from './schema/eventTicket';

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
export default class EventTicket {
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
  listTickets(eventId, categoryId, opts = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const _opts = only(['isRedeemed', 'page', 'perPage', 'purchaserGwid'], opts);

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId,
                                   ENDPOINT_TICKET);

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
  fetchTicket(eventId, categoryId, ticketId) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const [tv, tp] = this.validateId(ticketId, 'ticketId');
    if (!tv) { return tp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId,
                                   ENDPOINT_TICKET, ticketId);
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
  createTicket(eventId, categoryId, ticket = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const [ticketv, ticketp] = this.validatePayload(ticket, eventTicketSchema);
    if (!ticketv) { return ticketp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId,
                                   ENDPOINT_TICKET);

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
  updateTicket(eventId, categoryId, ticketId, ticket = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const [tv, tp] = this.validateId(ticketId, 'ticketId');
    if (!tv) { return tp; }

    const [ticketv, ticketp] = this.validatePayload(ticket, eventTicketSchema);
    if (!ticketv) { return ticketp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId,
                                   ENDPOINT_TICKET, ticketId);

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
  replaceTicket(eventId, categoryId, ticketId, ticket = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const [tv, tp] = this.validateId(ticketId, 'ticketId');
    if (!tv) { return tp; }

    const [ticketv, ticketp] = this.validatePayload(ticket, eventTicketSchema);
    if (!ticketv) { return ticketp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId,
                                   ENDPOINT_TICKET, ticketId);

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
  delTicket(eventId, categoryId, ticketId) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const [tv, tp] = this.validateId(ticketId, 'ticketId');
    if (!tv) { return tp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId,
                                   ENDPOINT_TICKET, ticketId);
    return this.http.delete(url);
  }
}
