import Collection from './Collection';
import SchemaUtils from './SchemaUtils';
import schema from './schema/supporter';

/** @type {String} - name of collection */
const COLLECTION = 'supporters';

/**
 * Manage Supporter endpoint. Supporter POSTs are validated before a request
 * is made to the API.
 */
export default class Supporter extends Collection {
  /** @type {String} */
  static service = 'supporters';

  /**
   * @param {Dictionary} [config] - configuration dictionary
   * @param {Http} http
   */
  constructor(config, http) {
    super(config, http);

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
   * Extract the first schemaId from a collections/schema response
   *
   * @param {Object} response
   * @return {String}
   */
  getSchemaIdFromResponse(response={data: {}}) {
    if (response && !response.data) {
      return undefined;
    }
    const {data: {results=[{id: undefined}]}} = response;
    const [head] = results;
    const {id} = head;
    return id;
  }

  /**
   * Provides a higher-order function bound to form. Uses response
   * from collections/schema to make a POST to createRecord.
   * Note: returned function returns a Promise (createRecord).
   *
   * @param {Object} [form]
   * @return {Function}
   */
  getCreateRecord(form={}) {
    return (id) => {
      if (!id) {
        return Promise.reject(new Error('No schemaId returned from collections'));
      }

      return this.createRecord(COLLECTION, id, form);
    };
  }

  /**
   * Attempt to get the supporter schema from collections
   *
   * @return {Promise}
   */
  getSupporterSchemaId() {
    return this.listSchemas(COLLECTION)
      .then(this.getSchemaIdFromResponse);
  }

  /**
   * POST a supporter record to the API
   *
   * The form object passed into create should have a schemaId field containing
   * the schemaId for your default supporter schema:
   *
   * { schemaId: '4abc-123-fgh', ... }
   *
   * If you do not provide the schemaId, a separate request will be made to the
   * API to fetch it. You can retrieve this schemaId using gw.js via
   * getSupporterSchemaId() - which you can run from the console if you have
   * Groundwork.js exposed.
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
    let schemaId;
    if (form && form.schemaId) {
      schemaId = form.schemaId;
      delete form.schemaId;
    }

    // Return a mock error response with validation errors
    const [cf, cp] = this.validateForm(form);
    if (!cf) { return cp; }

    if (!schemaId) {
      if (__LOG__) {
        const warning =
              '(Supporter.create) Not providing a schemaId will result in ' +
              'an extra request being made to find it. You can retrieve ' +
              'the schemaId using Supporter.getSupporterSchemaId';
        console.warn(warning); // eslint-disable-line
      }
      return this.getSupporterSchemaId().then(this.getCreateRecord(form));
    }

    return this.createRecord(COLLECTION, schemaId, form);
  }
}
