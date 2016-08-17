/**
 * Constants: Mostly keys for various objects within the library
 */

/**
 * Auth Key
 * @type {String}
 */
const AUTH_ACCESS_TOKEN = 'accessToken';

/**
 * Auth Key
 * @type {String}
 */
const AUTH_GWID = 'gwid';

/**
 * Auth Key
 * @type {String}
 */
const AUTH_TOKEN_TYPE = 'tokenType';

/**
 * Config Key
 * @type {String}
 */
const API_URL = 'api_url';

/**
 * Config Key
 * @type {String}
 */
const API_VERSION = 'api_version';

/**
 * Config Key
 * @type {String}
 */
const CONFIG_AUTH = 'auth';

/**
 * Config Key
 * @type {String}
 */
const FACEBOOK_APP_ID = 'facebook_app_id';

/**
 * Config Key
 * @type {String}
 */
const OAUTH_CLIENT_ID = 'oauth_client_id';

/** @type {String} */
const DEFAULT_API_URL = 'https://api.thegroundwork.com';

/** @type {RegExp} */
const RE_API_VERSION = /^\d{4}[-]\d{2}[-]\d{2}(:\d+)?$/gm;

export {
  API_URL,
  API_VERSION,
  AUTH_ACCESS_TOKEN,
  AUTH_GWID,
  AUTH_TOKEN_TYPE,
  CONFIG_AUTH,
  DEFAULT_API_URL,
  FACEBOOK_APP_ID,
  OAUTH_CLIENT_ID,
  RE_API_VERSION
};
