import * as constants from './constants';
import Dictionary from './Dictionary';
import axios from 'axios';
import { urlJoin, isEmpty } from './utils';

/** @type {String} */
const API_VERSION_HEADER = 'gw-api-version';

/** @type {String} */
const CLIENT_HEADER = 'gw-js-client';

/** @type {Function} */
const CLIENT_VERSION = (TAG) ? TAG.replace(/[\s]*/g, '') : 'None';

// Template for XHR responses
/** @type {Object} */
const GENERIC_RESPONSE = Object.freeze({
  config: {},
  data: {},
  headers: {},
  status: 0,
  statusText: ''
});

/**
 * Core AJAX handling with the API
 *
 * @desc
 * Under the hood XHR is handled via Axios - https://github.com/mzabriskie/axios
 * which provides a simple Promise-based interface for JSON communication via
 * XHR.
 *
 * Http also manages custom headers needed by The Groundwork API. `gw-version`
 * is added to all requests. If the client has received an auth token, the
 * appropriate `Authorization` header will be sent as well.
 *
 * All HTTP verb methods (get, put, post, delete) return a Promise for handling
 * success and error states.
 *
 * @example
 * let http = new Http();
 * // make a GET request to `/foo`
 * http.get('foo').then((response) => {
 *    console.log(response)
 *  ).catch((err) => {
 *    console.log(error);
 * });
 *
 */
export default class Http {
  /**
   * Constructor
   * @param {Dictionary} config - client configuration
   */
  constructor(config) {
    /** @type {Dictionary} */
    this.config = (config && config instanceof Dictionary) ?
      config : new Dictionary();

    /** @type {Object} */
    this.genericResponse = GENERIC_RESPONSE;

    this.setupRequestInterceptors();
  }

  /**
   * Create a mock Axios response, used in error messages returned from
   * Promises that don't make it to the server (validation errors, etc.)
   *
   * @param {Object} [mock] - object to merge into genericResponse
   * @return {Object}
   */
  generateMockResponse(mock = {}) {
    return Object.assign({}, this.genericResponse, mock);
  }

  /**
   * Generate a 400 response. This is usually used to throw an error in a
   * consistent format without hitting the API, such a schema validation error
   *
   * @param {Object} error - error object to return
   * @param {Number} [code] - http code for error
   * @param {String} [status] - error status message
   * @return {Object}
   */
  generateErrorResponse(error = {}, code = 400, status = 'Invalid Data') {
    return this.generateMockResponse({
      status: code,
      statusText: status,
      data: {
        error
      }
    });
  }

  /**
   * Return a standardizes object to use in validation error messages
   *
   * @return {Object}
   */
  generateErrorObject() {
    return {
      valid: false,
      fields: [],
      msg: []
    };
  }

  /**
   * Predicate: checks presence of AUTH_ACCESS_TOKEN
   *
   * @return {Boolean}
   */
  hasAuthToken() {
    const auth = this.config.get(constants.CONFIG_AUTH);
    if (!auth) { return false; }
    return !!auth[constants.AUTH_ACCESS_TOKEN];
  }

  /**
   * Create a string auth token for use in Authorization headers
   *
   * @return {String|undefined}
   */
  generateAuthorizationHeader() {
    const a = this.config.get(constants.CONFIG_AUTH);
    if (isEmpty(a)) {
      if (__LOG__) {
        console.warn('No authorization token is set!'); // eslint-disable-line
      }
      return undefined;
    }
    return `${ a[constants.AUTH_TOKEN_TYPE] }\ ${ a[constants.AUTH_ACCESS_TOKEN] }`;
  }

  /**
   * Generate a basic auth token for use in Authorization headers
   *
   * @return {String|undefined}
   */
  generateBasicAuthHeader() {
    const id = this.config.get(constants.OAUTH_CLIENT_ID);
    if (!id) {
      if (__LOG__) {
        console.warn('No oauth_client_id is set!'); // eslint-disable-line
      }
      return undefined;
    }
    return `Basic ${ btoa(id + ':') }`; // eslint-disable-line
  }

  /**
   * Generate an object of default headers
   *
   * Note: the `Authorization` header can be omit from a request by passing
   * a `noauth` property in the requestConfig object.
   *
   * @example
   * let http = new Http(new Dictionary({auth: authObject}));
   * http.get('foo', { noauth: true }); // will not send Authorization header
   *
   * @param {Object} [requestConfig] - request config object
   * @return {Object}
   */
  defaultHeaders(requestConfig = {}) {
    const apiVersion = this.config.get(constants.API_VERSION);
    const headers = {
      [CLIENT_HEADER]: `js-${ CLIENT_VERSION }`
    };

    // Attach an API Version header
    if (apiVersion) {
      headers[API_VERSION_HEADER] = apiVersion;
    }

    // Add Authorization header if config.noauth is falsy & auth is truthy
    if (!requestConfig.noauth && this.hasAuthToken()) {
      headers.Authorization = this.generateAuthorizationHeader();
    }

    // Add Basic Auth header if config.noauth is truthy OR auth is falsy
    if (!this.hasAuthToken() || requestConfig.noauth) {
      headers.Authorization = this.generateBasicAuthHeader();
    }

    return headers;
  }

  /**
   * Attach interceptors to requests/responses to do PRE/POST processing, such
   * as attaching client headers and massaging messages
   *
   * @access private
   * @return {void}
   */
  setupRequestInterceptors() {
    const defaults = this.defaultHeaders.bind(this);
    axios.interceptors.request.use((config) => {
      const headers = (config.headers) ?
            Object.assign(config.headers, defaults(config)) :
            defaults(config);

      config.headers = headers; // eslint-disable-line
      return config;
    }, (error) => {
      // Do something with request error
      if (__LOG__) {
        console.error('REQUEST_ERROR', error); // eslint-disable-line
      }
      return Promise.reject(error);
    });
  }

  /**
   * Ensure the api_url is prepended to all requests
   * @param {String} url
   * @return {String}
   */
  assembleUrl(url) {
    return urlJoin(this.config.get(constants.API_URL), url);
  }

  /**
   * GET
   * @param {String} url
   * @param {Object} [opts] - optional configuration for request
   * @return {Promise}
   */
  get(url, opts = {}) {
    return axios.get(this.assembleUrl(url), opts);
  }

  /**
   * POST
   * @param {String} url
   * @param {Object} data - payload sent to services
   * @param {Object} [opts] - optional configuration for request
   * @return {Promise}
   */
  post(url, data, opts = {}) {
    return axios.post(this.assembleUrl(url), data, opts);
  }

  /**
   * PUT
   * @param {String} url
   * @param {Object} data - payload sent to services
   * @param {Object} [opts] - optional configuration for request
   * @return {Promise}
   */
  put(url, data, opts = {}) {
    return axios.put(this.assembleUrl(url), data, opts);
  }

  /**
   * PATCH
   * @param {String} url
   * @param {Object} data - payload sent to services
   * @param {Object} [opts] - optional configuration for request
   * @return {Promise}
   */
  patch(url, data, opts = {}) {
    return axios.patch(this.assembleUrl(url), data, opts);
  }

  /**
   * DELETE
   * @param {String} url
   * @param {Object} [opts] - optional configuration for request
   * @return {Promise}
   */
  delete(url, opts = {}) {
    return axios.delete(this.assembleUrl(url), opts);
  }
}
