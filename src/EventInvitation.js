import { only, urlJoin } from './utils';
import { NAMESPACE, ENDPOINT_EVENT, ENDPOINT_INVITATION } from './Event';
import eventInvitationSchema from './schema/eventInvitation';

/** @type {Array} - Status options for Invitation RSVP's */
const STATUSES = ['declined', 'pending'];

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
export default class EventInvitation {

  /**
   * If the status of an invitation is neither `declined` nor `pending` then send back a
   * tuple with a rejected Promise containing an error message.
   *
   * @param {String} status - status of the invitation
   * @return {Array}
   */
  validateStatus(status) {
    let out = [true];

    const valid = STATUSES.some(s => s === status);

    if (!valid) {
      const response = this.http.generateErrorResponse({
        valid: false,
        fields: ['status'],
        msg: [`Invalid status: ${status}. Options are \`declined\` or \`pending\``]
      });
      out = [false, Promise.reject(response)];
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
  listInvitations(eventId, opts = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const _opts = only(['page', 'perPage', 'status'], opts);
    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_INVITATION);

    return this.http.get(url, { params: _opts });
  }

  /**
   * Get a specific Invitation, by id
   *
   * @param  {String} eventId - id of event
   * @param  {String} invitationId - id of invitation
   * @return {Promise}
   */
  fetchInvitation(eventId, invitationId) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [iv, ip] = this.validateId(invitationId, 'invitationId');
    if (!iv) { return ip; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_INVITATION, invitationId);
    return this.http.get(url);
  }

  /**
   * Create a new Invitation
   *
   * @param  {String} eventId - id of event
   * @param  {Object[]} [invitations] - array of invitation objects
   * @return {Promise}
   */
  createInvitation(eventId, invitations = []) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [iv, ip] = this.validatePayload(invitations, eventInvitationSchema);
    if (!iv) { return ip; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_INVITATION);

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
  updateInvitationStatus(eventId, invitationId, status) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [iv, ip] = this.validateId(invitationId, 'invitationId');
    if (!iv) { return ip; }

    const [sv, sp] = this.validateStatus(status);
    if (!sv) { return sp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_INVITATION, invitationId);

    return this.http.patch(url, { status });
  }

  /**
   * Delete a specific Invitation, by id
   *
   * @param  {String} eventId - id of event
   * @param  {String} invitationId - id of invitation
   * @return {Promise}
   */
  delInvitation(eventId, invitationId) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [iv, ip] = this.validateId(invitationId, 'invitationId');
    if (!iv) { return ip; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_INVITATION, invitationId);
    return this.http.delete(url);
  }

}
