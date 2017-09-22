import * as constants from "./constants";
import Dictionary from "./Dictionary";
import { urlJoin } from "./utils";

/**
 * API Endpoints
 */
const NAMESPACE = "oauth";
const ENDPOINT_TOKEN = "token";

/**
 * Manage oauth and user tokens for the client. Once a successful auth token has
 * been fetched it is stored in `this.config` for use in authenticated
 * requests to the API.
 */
export default class Auth {
  /** @type {String} */
  static service = "auth";

  /**
   * Constructor
   * @param {Dictionary} [config] - client configuration
   * @param {Http} http - required
   */
  constructor(config, http) {
    /** @type {Dictionary} */
    this.config = config && config instanceof Dictionary
      ? config
      : new Dictionary();

    // Resource must have an Http instance
    if (!http) {
      throw new Error("Auth requires Http");
    }

    /** @type {Http} */
    this.http = http;
  }

  /**
   * If a response contains data, drop it into the user key in config
   *
   * @access private
   * @param {Object} response
   * @return {Object}
   */
  storeAuthResponse(response) {
    if (response && response.status === 200) {
      this.auth = Object.assign({}, this.auth, response.data);
    }
    return response;
  }

  /**
   * Make a POST to the token endpoint and pass the result to
   * storeAuthResponse for handling. The Promise is then returned to the
   * original caller for further chaining.
   *
   * @access private
   * @param {Object} params sent to the endpoint
   * @return {Promise}
   */
  requestToken(data) {
    const url = urlJoin(NAMESPACE, ENDPOINT_TOKEN);
    return this.http.post(url, data).then(this.storeAuthResponse.bind(this));
  }

  /**
   * Wipe out auth settings in config, which will prevent authenticated requests
   * until a new one is fetchd
   *
   * @return {Object}
   */
  destroyToken() {
    this.config.del(constants.CONFIG_AUTH);
    return this.config.set(constants.CONFIG_AUTH, {});
  }

  /**
   * Use email / password to fetch Rex token
   *
   * @param {String} email
   * @param {String} password
   * @return {Promise}
   */
  fetchUsingPassword(email = "", password = "") {
    return this.requestToken({
      email,
      password,
      grant_type: "password"
    });
  }

  /**
   * Use Facebook to fetch Rex token
   *
   * @param {String} accessToken
   * @return {Promise}
   */
  fetchUsingFacebook(accessToken = "") {
    return this.requestToken({
      access_token: accessToken,
      grant_type: "facebook"
    });
  }

  /**
   * Use Google to fetch Rex token
   *
   * @param {String} accessToken
   * @return {Promise}
   */
  fetchUsingGoogle(accessToken = "") {
    return this.requestToken({
      access_token: accessToken,
      grant_type: "google"
    });
  }

  /**
   * Convenience method to get the Facebook APP Id registered with the client
   *
   * @return {String}
   */
  get facebookAppId() {
    return this.config.get(constants.FACEBOOK_APP_ID);
  }

  /**
   * Return the entire authentication object
   *
   * @return {Object}
   */
  get auth() {
    return this.config.get(constants.CONFIG_AUTH);
  }

  /**
   * Return the authorization token
   *
   * @return {String}
   */
  get token() {
    return this.auth[constants.AUTH_ACCESS_TOKEN];
  }

  /**
   * Return the authorization token
   *
   * @return {String}
   */
  get tokenType() {
    return this.auth[constants.AUTH_TOKEN_TYPE];
  }

  /**
   * Return the gwid
   *
   * @return {String}
   */
  get gwid() {
    return this.auth[constants.AUTH_GWID];
  }

  /**
   * Return a string for use in an Authorization header: "{tokenType} {token}"
   *
   * @return {String}
   */
  get authorizationHeader() {
    return `${this.tokenType} ${this.token}`;
  }

  /**
   * Safely merge a key/val into the auth config object, used in setters
   *
   * @access private
   * @param {String} key - key name
   * @param {<any>} val - value to store, usually a string
   * @return {undefined|Object}
   */
  insertAuthKey(key, val) {
    const auth = Object.assign({}, this.auth);
    if (!key || !val) {
      return undefined;
    }
    auth[key] = val;
    this.auth = auth;
    return this.auth;
  }

  /**
   * Set auth config object
   *
   * @param {Object} obj - obj to set
   * @return {Object}
   */
  set auth(obj) {
    this.config.set(constants.CONFIG_AUTH, Object.assign({}, obj));
    return this.auth;
  }

  /**
   * Set token config object
   *
   * @type {String}
   */
  set token(token) {
    this.insertAuthKey(constants.AUTH_ACCESS_TOKEN, token);
  }

  /**
   * Set gwid config object
   *
   * @type {String}
   */
  set gwid(gwid) {
    this.insertAuthKey(constants.AUTH_GWID, gwid);
  }

  /**
   * Set tokenType config object
   *
   * @type {String}
   */
  set tokenType(type) {
    this.insertAuthKey(constants.AUTH_TOKEN_TYPE, type);
  }
}
