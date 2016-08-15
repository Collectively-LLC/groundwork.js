import Payment from './Payment';
import schema from './schema/donation';
import { max, only, urlJoin } from './utils';

/** @type {String} - API endpoint for resource */
const ENDPOINT_DONATION = 'donations';

/**
 * Create and view donations
 *
 * list(opts) - get a filtered list of donations
 * create(donation) - create a new donation
 * fetch(id) - fetch a donation object
 *
 */
export default class Donation extends Payment {
  /** @type {String} */
  static service = 'donations';

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
  list(opts = {}) {
    const whitelist = ['gwid', 'subscription', 'quickCard', 'email', 'page',
                     'perPage'];

    const params = only(whitelist, opts);
    if (params.perPage) {
      params.perPage = max(params.perPage); // Max of 50
    }

    const url = urlJoin(this.namespace, ENDPOINT_DONATION);
    return this.fetchCollection(url, params);
  }

  /**
   * Fetch a single Donation object
   *
   * @param {String} id - donation id
   * @return {Promise}
   */
  fetch(id = '') {
    const url = urlJoin(this.namespace, ENDPOINT_DONATION, id);
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
  create(donation = {}) {
    const checkDonation = this.validatePayment(donation, schema);

    // Return a mock error response with validation errors
    if (checkDonation.valid === false) {
      const response = this.http.generateErrorResponse(checkDonation);
      return Promise.reject(response);
    }

    const _donation = this.attachIdentity(donation);
    const url = urlJoin(this.namespace, ENDPOINT_DONATION);
    return this.http.post(url, _donation);
  }
}
