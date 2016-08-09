import Payment from 'lib/Payment';
import schema from 'lib/schema/quickcard';
import schemaPay from 'lib/schema/quickcardPay';
import { urlJoin, has, only, epoch, max } from 'lib/utils';

/** @type {String} - API endpoint for resource */
const ENDPOINT_QUICKCARD = 'quickcards';

/**
 * Create and view quickcards
 *
 * list(opts) - get a filtered list of quickcards
 * create(quickcard) - create a new quickcard
 * fetch(id) - fetch a quickcard object
 *
 */
export default class Quickcard extends Payment {
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
  list(opts = {}) {
    const params = only(['gwid', 'email', 'page', 'perPage'],
                     this.attachIdentity(opts));

    // Allow opts to Override the gwid from config
    if (has(opts, 'gwid')) { params.gwid = opts.gwid; }

    // Max 50 p/page
    if (has(opts, 'perPage')) { params.perPage = max(opts.perPage); }

    // Failsafe to force gwid property into place no matter what
    if (!has(params, 'gwid')) { params.gwid = undefined; }

    const url = urlJoin(this.namespace, ENDPOINT_QUICKCARD);
    return this.fetchCollection(url, params);
  }

  /**
   * Fetch a list of all donations made for a quickcard
   *
   * @param {String} id - quickcard id
   * @return {Promise}
   */
  listDonations(id = '') {
    // Must have an id
    const [idv, idp] = this.validateId(id);
    if (!idv) { return idp; }

    const url = urlJoin(this.namespace, ENDPOINT_QUICKCARD, id, 'donations');
    return this.fetchCollection(url);
  }

  /**
   * Fetch a single Quickcard object
   *
   * @param {String} id - quickcard id
   * @return {Promise}
   */
  fetch(id = '') {
    // Must have an id
    const [idv, idp] = this.validateId(id);
    if (!idv) { return idp; }

    const url = urlJoin(this.namespace, ENDPOINT_QUICKCARD, id);
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
  create(quickcard = {}) {
    const _quickcard = this.attachIdentity(quickcard);
    const checkQuickcard = this.validatePayment(_quickcard, schema);

    // Return a mock error response with validation errors
    if (checkQuickcard.valid === false) {
      const response = this.http.generateErrorResponse(checkQuickcard);
      return Promise.reject(response);
    }

    const url = urlJoin(this.namespace, ENDPOINT_QUICKCARD);
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
  del(id = '', ...time) {
    const date = epoch.apply(null, time);

    // Must have an id
    const [idv, idp] = this.validateId(id);
    if (!idv) { return idp; }

    const url = urlJoin(this.namespace, ENDPOINT_QUICKCARD, id);
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
  pay(id, payment = {}) {
    // Must have an id
    const [idv, idp] = this.validateId(id);
    if (!idv) { return idp; }

    const _payment = this.attachIdentity(payment);

    // Validate payment and reject if errors
    const [pv, pp] = this.validateSchema(_payment, schemaPay);
    if (!pv) { return pp; }

    const url = urlJoin(this.namespace,
                        ENDPOINT_QUICKCARD,
                        id,
                        'donations');

    return this.http.post(url, _payment);
  }
}
