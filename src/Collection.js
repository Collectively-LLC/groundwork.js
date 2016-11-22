import Dictionary from './Dictionary';
import { urlJoin, only, validateArgs } from './utils';

/** @type {String} - API endpoint for resource */
const NAMESPACE = 'collections';

export default class Collection {
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
      throw new Error('Payment requires Http');
    }

    /** @type {Http} */
    this.http = http;

    /** @type {String} */
    this.namespace = NAMESPACE;
  }

  /**
   * Generate an Ajax-esque error for validation issues
   *
   * @param {String} methodName
   * @param {Array} args - list of arg names
   * @return {Promise}
   */
  syntheticError(methodName, args) {
    const response = this.http.generateErrorResponse({
      valid: false,
      fields: args,
      msg: [`${methodName} was called without ${JSON.stringify(args)}`]
    });
    return Promise.reject(response);
  }

  /**
   * Fetch the collections available for your org
   *
   * @param {Object} [opts]
   * @return {Promise}
   */
  listCollections(opts = {}) {
    const _opts = only(['page', 'perPage'], opts);
    return this.http.get(NAMESPACE, { params: _opts });
  }

  /**
   * Fetch the schemas available for your collection
   *
   * @param {String} collection - name of collection
   * @param {Object} [opts]
   * @return {Promise}
   */
  listSchemas(collection, opts = {}) {
    const v = validateArgs(['collection', collection]);
    if (v.length) {
      return this.syntheticError('listSchemas', v);
    }

    const _opts = only(['page', 'perPage'], opts);
    return this.http.get(urlJoin(NAMESPACE, collection, 'schemas'),
                         { params: _opts });
  }

  /**
   * POST a record into a collection.
   * All args are required for this method. Collections endpoint
   * will also validate data against the schema and return errors.
   *
   * @param {String} collection
   * @param {String} schemaId
   * @param {Object} data
   * @return {Promise}
   */
  createRecord(collection, schemaId, data) {
    const v = validateArgs(['collection', collection],
                           ['schemaId', schemaId],
                           ['data', data]);

    if (v.length) {
      return this.syntheticError('createRecord', v);
    }

    const payload = {schemaId, data};
    return this.http.post(urlJoin(NAMESPACE, collection, 'records'), payload);
  }
}
