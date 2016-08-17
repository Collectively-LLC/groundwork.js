/**
 * Simple dictionary for storing configuration key/val pairs
 *
 * @example
 * let d = new Dictionary({foo: 1});
 * d.get('foo'); // returns 1
 * d.set('bar', 2); d.get('bar'); // returns 2
 */
export default class Dictionary {
  /**
   * Constructor with or without default values
   * @param {Object} [defaults] - initial values in dictionary
   */
  constructor(defaults = {}) {
    /**
     * @type {Object}
     */
    this.dict = {};
    if (defaults) {
      this.merge(defaults);
    }
  }

  /**
   * Set or overwrite a value
   * @param {string} key - name of value
   * @param {*} val - value to store
   * @return {Object|undefined}
   */
  set(key, val) {
    if (!key || !val) {
      return undefined;
    }

    this.dict[key] = val;
    return this.data();
  }

  /**
   * Get a value
   * @param {string} key - name of value
   * @return {*}
   */
  get(key) {
    if (key && this.dict[key]) {
      return this.dict[key];
    }
    return undefined;
  }

  /**
   * Delete a value
   * @param {string} key - name of value
   * @return {undefined}
   */
  del(key) {
    if (key && this.dict[key]) {
      delete this.dict[key];
      return this.data();
    }
    return undefined;
  }

  /**
   * Predicate: check existence of key
   * @param {string} key - name of value
   * @return {boolean}
   */
  has(key) {
    return !!(key && this.dict[key]);
  }

  /**
   * Return a list of keynames
   * @return {Array<string>}
   */
  keys() {
    return Object.keys(this.dict);
  }

  /**
   * Return a list of values
   * @return {Array}
   */
  values() {
    const ret = [];
    const data = this.data();

    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        ret.push(this.get(k));
      }
    }

    return ret.filter((x) => x);
  }

  /**
   * Merge an object into the existing dictionary. This will mutate the
   * dictionary.
   * @return {Object}
   */
  merge(obj) {
    if (!obj) {
      return this.data();
    }

    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        this.set(k, obj[k]);
      }
    }

    return this.data();
  }

  /**
   * Return a JSON string representation of the dictionary
   * @return {string}
   */
  toString() {
    return JSON.stringify(this.data());
  }

  /**
   * Return the raw dictionary object
   * @return {Object}
   */
  data() {
    return this.dict;
  }

  /**
   * Return the 'length' of the dictionary (# of keys)
   * @return {Number}
   */
  length() {
    return this.keys().length;
  }
}
