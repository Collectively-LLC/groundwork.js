import Payment from "./Payment";
import schema from "./schema/donation";
import { urlJoin, has, only, epoch, max } from "./utils";

/** @type {String} - API endpoint for resource */
const ENDPOINT_SUBSCRIPTION = "subscriptions";

/**
 * Create and view subscriptions
 *
 * list(opts) - get a filtered list of subscriptions
 * create(subscription) - create a new subscription
 * fetch(id) - fetch a subscription object
 *
 */
export default class Subscription extends Payment {
  /** @type {String} */
  static service = "subscriptions";

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
  list(opts = {}) {
    const params = only(
      ["gwid", "email", "page", "perPage"],
      this.attachIdentity(opts)
    );

    // Allow opts to override the gwid from config
    if (has(opts, "gwid")) {
      params.gwid = opts.gwid;
    }

    // Max 50 p/page
    if (has(opts, "perPage")) {
      params.perPage = max(opts.perPage);
    }

    // Failsafe to force gwid property into place no matter what
    if (!has(params, "gwid")) {
      params.gwid = undefined;
    }

    const url = urlJoin(this.namespace, ENDPOINT_SUBSCRIPTION);
    return this.fetchCollection(url, params);
  }

  /**
   * Fetch a list of all donations made for a subscription
   *
   * @param {String} id - subscription id
   * @return {Promise}
   */
  listDonations(id = "") {
    // Must have an id
    const [idv, idp] = this.validateId(id);
    if (!idv) {
      return idp;
    }

    const url = urlJoin(this.namespace, ENDPOINT_SUBSCRIPTION, id, "donations");
    return this.fetchCollection(url);
  }

  /**
   * Fetch a single Subscription object
   *
   * @param {String} id - subscription id
   * @return {Promise}
   */
  fetch(id = "") {
    // Must have an id
    const [idv, idp] = this.validateId(id);
    if (!idv) {
      return idp;
    }

    const url = urlJoin(this.namespace, ENDPOINT_SUBSCRIPTION, id);
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
  create(subscription = {}) {
    // Make sure the interval is correct if its set
    const [intervalv, intervalp] = this.validateInterval(subscription.interval);
    if (!intervalv) {
      return intervalp;
    }

    const checkSubscription = this.validatePayment(subscription, schema);

    // Return a mock error response with validation errors
    if (checkSubscription.valid === false) {
      const response = this.http.generateErrorResponse(checkSubscription);
      return Promise.reject(response);
    }

    const _subscription = this.attachIdentity(subscription);
    const url = urlJoin(this.namespace, ENDPOINT_SUBSCRIPTION);
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
  del(id = "", ...time) {
    // Must have an id
    const [idv, idp] = this.validateId(id);
    if (!idv) {
      return idp;
    }

    const date = epoch.apply(null, time);
    const url = urlJoin(this.namespace, ENDPOINT_SUBSCRIPTION, id);
    return this.http.put(url, { cancelled: date });
  }

  /**
   * Update the amount of a subscription. Return error of the amount is not set.
   *
   * @param {String} id - subscription id
   * @param {Number} amount - new amount of subscription
   * @return {Promise}
   */
  updateAmount(id, amount) {
    // Must have an id
    const newAmount = Number(amount);
    const [idv, idp] = this.validateId(id);
    if (!idv) {
      return idp;
    }

    const [amountv, amountp] = this.validateArg(amount, "amount");
    if (!amountv) {
      return amountp;
    }

    const url = urlJoin(this.namespace, ENDPOINT_SUBSCRIPTION, id);
    return this.http.put(url, { amount: newAmount });
  }
}
