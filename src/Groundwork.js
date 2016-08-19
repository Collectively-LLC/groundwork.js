import * as constants from './constants';
import Auth from './Auth';
import Dictionary from './Dictionary';
import Http from './Http';
import { deprecate, isApiVersion } from './utils';

/**
 * Auth must be present in all instances
 */
const DEFAULT_SERVICES = [Auth];

/**
 * Default configuration for client
 */
const DEFAULTS = {
  [constants.API_URL]: constants.DEFAULT_API_URL,
  [constants.OAUTH_CLIENT_ID]: '',
  [constants.FACEBOOK_APP_ID]: '',
  [constants.CONFIG_AUTH]: {}
};

/**
 * Groundwork Client Library
 *
 * @desc
 * For backwards compatability apiKey is aliased to oauth_client_id within the
 * config dictionary. The clientId getter/setters remain next to the same
 * getters/setters for apiKey. This allows code written for older versions of
 * groundwork.js to continue to use oauth_client_id to configure an instance while
 * new code is encouraged to use apiKey.
 *
 * For convenience, groundworkFactory.js provides a function which will let you
 * set the services array for the class and returns a function accepting the
 * config object in the construction. Calling the returned function will give
 * you a ready to go instance of Groundwork. This is useful if you are importing
 * Groundwork.js as a module into your code and wish to omit certain services
 *
 * @example
 * let gw = new Groundwork([Auth, Donationm, ...], {'apiKey': '1234'});
 */
export default class Groundwork {
  /**
   * Constructor
   * @param {Array} [services] - service modules to include in the instance
   * @param {Object} [config] - client configuration
   */
  constructor(services = [], config = {}) {
    // Display a deprecation warning for oauth_client_id in DEV only
    deprecate(config.oauth_client_id,
              'oauth_client_id is deprecated, please use apiKey instead');

    // Display a deprecation warning for api_url in DEV only
    deprecate(config.api_url,
              'api_url is deprecated, please use apiUrl instead');

    // Alias apiKey to OAUTH_CLIENT_ID
    if (config.apiKey) {
      config[constants.OAUTH_CLIENT_ID] = config.apiKey;
      delete config.apiKey;
    }

    // Alias apiUrl to API_URL
    if (config.apiUrl) {
      config[constants.API_URL] = config.apiUrl;
      delete config.apiUrl;
    }

    /** @type {Dictionary} */
    this.config = new Dictionary(DEFAULTS);
    this.config.merge(config);

    /** @type {Http} */
    this.http = new Http(this.config);

    // Ensure default modules are included
    const servicesList = DEFAULT_SERVICES.concat(services);

    // Attach requested service modules to the Groundwork instance
    servicesList.forEach(Service => {
      this[Service.service] = new Service(this.config, this.http);
    });
  }

  /**
   * Getters / Setters
   */

  /**
   * Get the version # of this build as deteremined by Webpack
   * @return {String}
   */
  get version() {
    return TAG;
  }

  /**
   * Get OAUTH_CLIENT_ID
   * @deprecated use apiKey instead
   * @return {*}
   */
  get clientId() {
    deprecate(true, 'clientId is deprecated, please use apiKey instead');
    return this.config.get(constants.OAUTH_CLIENT_ID);
  }

  /**
   * Mutate OAUTH_CLIENT_ID within an instance of Groundwork
   * @deprecated use apiKey instead
   * @type {String}
   */
  set clientId(id) {
    deprecate(true, 'clientId is deprecated, please use apiKey instead');
    this.config.set(constants.OAUTH_CLIENT_ID, id);
  }

  /**
   * Get apiKey, alias for OAUTH_CLIENT_ID
   * @return {*}
   */
  get apiKey() {
    return this.config.get(constants.OAUTH_CLIENT_ID);
  }

  /**
   * Mutate apiKey within an instance of Groundwork
   * Alias for OAUTH_CLIENT_ID
   * @type {String}
   */
  set apiKey(id) {
    this.config.set(constants.OAUTH_CLIENT_ID, id);
  }

  /**
   * Get API_URL
   * @return {*}
   */
  get apiUrl() {
    return this.config.get(constants.API_URL);
  }

  /**
   * Mutate API_URL within an instance of Groundwork
   * @type {String}
   */
  set apiUrl(url) {
    this.config.set(constants.API_URL, url);
  }

  /**
   * Get API_VERSION
   * @return {*}
   */
  get apiVersion() {
    return this.config.get(constants.API_VERSION);
  }

  /**
   * Mutate API_VERSION within an instance of Groundwork
   * @type {String}
   */
  set apiVersion(version) {
    if (!isApiVersion(version)) {
      throw new Error(`apiVersion must be formatted in either YYYY-MM-DD or with
an optinal integer like 2028-03-23:12`);
    } else {
      this.config.set(constants.API_VERSION, version);
    }
  }
}
