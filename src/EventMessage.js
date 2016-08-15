import { only, urlJoin } from './utils';
import { NAMESPACE, ENDPOINT_EVENT, ENDPOINT_MESSAGE } from './Event';
import eventMessageSchema from './schema/eventMessage';

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
export default class EventMessage {

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
  listMessages(eventId, opts = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const _opts = only(['page', 'perPage'], opts);
    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_MESSAGE);

    return this.http.get(url, { params: _opts });
  }

  /**
   * Get a specific Message, by id
   *
   * @param  {String} eventId - id of event
   * @param  {String} messageId - id of message
   * @return {Promise}
   */
  fetchMessage(eventId, messageId) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [mv, mp] = this.validateId(messageId, 'messageId');
    if (!mv) { return mp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_MESSAGE, messageId);
    return this.http.get(url);
  }

  /**
   * Create a Message on an Event
   *
   * @param  {String} eventId - id of event
   * @param  {Object} [message] - message object
   * @return {Promise}
   */
  createMessage(eventId, message = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [mv, mp] = this.validatePayload(message, eventMessageSchema);
    if (!mv) { return mp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_MESSAGE);

    return this.http.post(url, message);
  }

  /**
   * Delete a specific Message, by id
   *
   * @param  {String} eventId - id of event
   * @param  {String} messageId - id of message
   * @return {Promise}
   */
  delMessage(eventId, messageId) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [mv, mp] = this.validateId(messageId, 'messageId');
    if (!mv) { return mp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_MESSAGE, messageId);
    return this.http.delete(url);
  }

}
