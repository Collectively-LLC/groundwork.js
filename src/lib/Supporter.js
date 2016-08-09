import Http from 'lib/Http';
import Dictionary from 'lib/Dictionary';
import SchemaUtils from 'lib/SchemaUtils';
import { urlJoin, only } from 'lib/utils';

import schema from 'lib/schema/supporter';

/** @type {String} - Top level endpoint */
const NAMESPACE = 'bucket';

/** @type {String} - API endpoints for resource */
const ENDPOINT_SUPPORTERS = 'supporters';

/**
 * Manage Supporter endpoint. Supporter POSTs are validated before a request
 * is made to the API.
 */
export default class Supporter {
  /**
   * @param {Dictionary} [config] - configuration dictionary
   * @param {Http} http
   */
  constructor(config, http) {
    /** @type {Dictionary} */
    this.config = (config && config instanceof Dictionary) ?
      config : new Dictionary();

    // Resource must have an Http instance
    if (!http || !(http instanceof Http)) {
      throw new Error('Supporter requires Http');
    }

    /** @type {Http} */
    this.http = http;

    /** @type {Object} */
    this.schema = schema;

    /** @type {SchemaUtils} */
    this.schemaUtils = SchemaUtils;
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
  validateForm(form = {}) {
    let out = [true];
    const valid = this.schemaUtils.validateSchema(form, this.schema);

    if (valid.length > 0) {
      const ret = this.http.generateErrorObject();
      valid.forEach((err) => {
        ret.msg.push(err.message);
        ret.fields.push(this.schemaUtils.extractFieldByError(err));
      });
      out = [false, Promise.reject(this.http.generateErrorResponse(ret))];
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
  create(form = {}) {
    // Return a mock error response with validation errors
    const [cf, cp] = this.validateForm(form);
    if (!cf) { return cp; }

    const url = urlJoin(NAMESPACE);
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
  list(opts = {}) {
    const _opts = only(['page', 'perPage'], opts);
    return this.http.get(urlJoin(NAMESPACE, ENDPOINT_SUPPORTERS),
                         { params: _opts });
  }
}
