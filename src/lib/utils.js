import * as constants from 'lib/constants';

/**
 * Utility Functions
 */

// For speed
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Normalize URL strings (handle slashes, query params, etc)
 * @param {String} [str=''] - url string to normalize
 * @return {String}
 */
function normalizeUrl(str = '') {
  return str
    .replace(/[\/]+/g, '/')
    .replace(/\/\?/g, '?')
    .replace(/\/\#/g, '#')
    .replace(/\:\//g, '://');
}

/**
 * Checks if `path` is a direct property. (Courtesy of lodash)
 *
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
 * @example
 *
 * const object = { 'a': { 'b': { 'c': 3 } } };
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b.c');
 * // => true
 *
 * _.has(object, ['a', 'b', 'c']);
 * // => true
 *
 */
function has(object, path) {
  return object != null && hasOwnProperty.call(object, path); // eslint-disable-line
}

/**
 * Join an array of strings into a URL
 * @param {...url<string>} url - fragments
 * @return {String}
 */
function urlJoin(...url) {
  const joined = [].slice.call(url, 0).join('/');
  return normalizeUrl(joined);
}

/**
 * Check to see if an Object is Empty
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true; // eslint-disable-line

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

/**
 * Attempt to validate an email address with a variant on RFC5322
 * @link http://tools.ietf.org/html/rfc5322#section-3.4
 * @param {String} str
 * @return {Boolean}
 */
function validEmail(str) {
  const re = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/); // eslint-disable-line
  return re.test(str);
}

/**
 * Return an object with only the whitelisted properties
 * @param {Array<string>} whitelist - names of properties to keep
 * @param {Object} obj - object to filter
 * @return {Object} - filtered object
 */
function only(whitelist = [], obj = {}) {
  return whitelist.reduce((ret, p) => {
    if (has(obj, p)) { ret[p] = obj[p]; } // eslint-disable-line
    return ret;
  }, {});
}

/**
 * Return the current DateTime in Epoch w/o milliseconds
 *
 * @example
 * epoch(); // => 1440705061 instead of 1440705061191
 * epoch(2015, 10, 13) // => 1447390800
 *
 * @param {...time<number>} time - year, month, day for a specific epoch
 * @return {Number}
 */
function epoch(...time) {
  const [year, month, day] = time;
  const d = (time.length > 0) ? new Date(year, month, day) : new Date();
  return Math.floor(d.getTime() / 1000);
}

/**
 * Prevent a number from passing a threshold. NaNs are converted to 0
 *
 * @param {Number} num
 * @param {Number} [maximum] - defaults to 50
 * @return {Number}
 */
function max(num, maximum = 50) {
  const [n, m] = [Number(num), Number(maximum)];
  let r = (n > m) ? m : n;
  if (isNaN(n)) { r = 0; }
  return r;
}

/**
 * Log a deprecation warning in console only in DEV mode
 *
 * @example
 * const opts = {bar: 1};
 * deprecate(opts.bar, 'opts.bar is deprecated!') // 'opts.bar is deprecated'
 *
 * const foo = 1;
 * deprecate((typeof foo === String), 'String support is deprecated, given %s', foo)
 * // 'String support is deprecated, given 1'
 *
 * @param {Boolean} pred - predicate or value should be "truthy" or "falsey"
 * @param {String} format - warning message template
 * @param {...args<any>} args - values to substitue into format
 * @return {void}
 */
function deprecate(pred, format, ...args) {
  if (__LOG__ && pred) {
    if (format === undefined) {
      throw new Error('deprecate requires an error message');
    }

    let warning;
    if (args.length) {
      warning = args.reduce((prev, next) => prev.replace(/%s/g, next), format);
    } else {
      warning = format;
    }

    console.warn(warning); // eslint-disable-line
  }
}

/**
 * Mixin properties from a source Class (or sources) into a target Class
 *
 * @example
 * class Foo {}
 * class Bar { hiBar() { return 'Hi from bar!'} }
 * class Baz { hiBaz() { return 'Hi from baz!'} }
 *
 * mixin(Foo, Bar, Baz);
 *
 * const foo = new Foo();
 * foo.hiBar() // => 'Hi from bar!'
 * foo.hiBaz() // => 'Hi from baz!'
 *
 * @param  {Class} target - target to merge properties into
 * @param  {...sources<Class>} sources - sources to merge properties from
 * @return {void}
 */
function mixin(target, ...sources) {
  const tp = target.prototype;

  sources.forEach((source) => {
    const sp = source.prototype;

    Object.getOwnPropertyNames(sp).forEach((name) => {
      if (name !== 'constructor') {
        Object.defineProperty(tp, name, Object.getOwnPropertyDescriptor(sp, name));
      }
    });
  });
}

/**
 * Predicate that checks the value of a string against the API Version format
 *
 * @param {String} version - should be `YYYY-MM-DD` with an optional integer
 * @return {Boolean}
 */
function isApiVersion(version = '') {
  return Boolean(String(version).match(constants.RE_API_VERSION));
}

export {
  deprecate,
  epoch,
  has,
  isEmpty,
  max,
  mixin,
  normalizeUrl,
  only,
  urlJoin,
  validEmail,
  isApiVersion
};
