import * as constants from 'lib/constants';
import Auth from 'lib/Auth';
import Dictionary from 'lib/Dictionary';
import Donation from 'lib/Donation';
import Event from 'lib/Event';
import Http from 'lib/Http';
import Profile from 'lib/Profile';
import Quickcard from 'lib/Quickcard';
import Subscription from 'lib/Subscription';
import Supporter from 'lib/Supporter';
import { deprecate, isApiVersion } from 'lib/utils';

/**
 * Map of resource modules to attach to Groundwork instances
 */
const RESOURCES = {
  auth: Auth,
  donations: Donation,
  events: Event,
  profiles: Profile,
  quickcards: Quickcard,
  subscriptions: Subscription,
  supporters: Supporter
};

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
 * @example
 * let gw = new Groundwork({'apiKey': '1234'});
 */
export default class Groundwork {
  /**
   * Constructor
   * @param {Object} config - client configuration
   */
  constructor(config = {}) {
    // display a deprecation warning for oauth_client_id in DEV only
    deprecate(config.oauth_client_id,
              'oauth_client_id is deprecated, please use apiKey instead');

    // display a deprecation warning for api_url in DEV only
    deprecate(config.api_url,
              'api_url is deprecated, please use apiUrl instead');

    // alias apiKey to OAUTH_CLIENT_ID
    if (config.apiKey) {
      config[constants.OAUTH_CLIENT_ID] = config.apiKey;
      delete config.apiKey;
    }

    // alias apiUrl to API_URL
    if (config.apiUrl) {
      config[constants.API_URL] = config.apiUrl;
      delete config.apiUrl;
    }

    /** @type {Dictionary} */
    this.config = new Dictionary(DEFAULTS);
    this.config.merge(config);

    /** @type {Http} */
    this.http = new Http(this.config);

    // Attach resource modules and pass in config
    for (const resource in RESOURCES) {
      if (RESOURCES.hasOwnProperty(resource)) {
        this[resource] = new RESOURCES[resource](this.config, this.http);
      }
    }
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
