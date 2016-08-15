import Dictionary from './Dictionary';
import SchemaUtils from './SchemaUtils';
import schema from './schema/profile';
import { urlJoin } from './utils';

import { cloneDeep } from 'lodash';

/** @type {String} - API endpoint for resource */
const NAMESPACE = 'the-claw';

/** @type {String} - API endpoint for profile resource */
const ENDPOINT_PROFILE = 'profiles';

/** @type {String} - API endpoint for password reset */
const ENDPOINT_PASSWORD_RESET = 'password_resets';

export default class Profile {
  /** @type {String} */
  static service = 'profiles';

  /**
   * @param {Dictionary} [config] - configuration dictionary
   * @param {Http} http
   */
  constructor(config, http) {
    /** @type {Dictionary} */
    this.config = (config && config instanceof Dictionary) ?
      config : new Dictionary();

    // Resource must have an Http instance
    if (!http) {
      throw new Error('Profile requires Http');
    }

    /** @type {Http} */
    this.http = http;

    /** @type {String} */
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
  validateProfile(profile = {}, _schema = this.schema) {
    let out = [true];
    const valid = this.schemaUtils.validateSchema(profile, _schema);

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
   * Fetch a single Profile object
   *
   * @param {String} [gwid=''] - profile gwid
   * @return {Promise}
   */
  fetch(gwid = '') {
    const url = urlJoin(NAMESPACE, ENDPOINT_PROFILE, gwid);
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
  create(profile = {}) {
    // Return a mock error response with validation errors
    const [cf, cp] = this.validateProfile(profile);
    if (!cf) { return cp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_PROFILE);
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
  update(gwid = '', profile = {}) {
    // Return a mock error response with validation errors
    const putSchema = cloneDeep(this.schema);
    delete putSchema.required; // No required fields in PUTs
    const [cf, cp] = this.validateProfile(profile, putSchema);
    if (!cf) { return cp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_PROFILE, gwid);
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
  requestResetToken(email = '') {
    const url = urlJoin(NAMESPACE, ENDPOINT_PASSWORD_RESET, '');
    return this.http.post(url, { email });
  }

  /**
   * PUT the new password and token to the API
   *
   * @param {String} [token=''] - reset token
   * @param {String} [password=''] - new password
   * @return {Promise}
   */
  resetPassword(token = '', password = '') {
    const url = urlJoin(NAMESPACE, ENDPOINT_PASSWORD_RESET, token);
    return this.http.put(url, { token, password });
  }

}
